import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEventStore } from "../store/event.store";
import type { EventType } from "../types/eventType";
import {
  updateEventSchema,
  type UpdateEventType,
} from "../schema/event.schema";

export function EditEventModal({
  event,
  onClose,
}: {
  event: EventType;
  onClose: () => void;
}) {
  const { updateEvent, isLoading, error, clearError } = useEventStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateEventType>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      // assumes event.date is an ISO datetime string; trimmed for <input type="date">
      date: event.date?.slice(0, 10),
      venue: event.venue,
      capacity: event.capacity,
      status: event.status,
    },
  });

  const busy = isSubmitting || isLoading;

  const onSubmit = async (data: UpdateEventType) => {
    clearError();
    const updated = await updateEvent(event._id, data);
    if (updated) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Edit event</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 transition hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Title
            </label>
            <input
              {...register("title")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Description
            </label>
            <textarea
              rows={3}
              {...register("description")}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">
                Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
              {errors.date && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">
                Capacity
              </label>
              <input
                type="number"
                {...register("capacity", { valueAsNumber: true })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
              {errors.capacity && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Venue
            </label>
            <input
              {...register("venue")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {errors.venue && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.venue.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
