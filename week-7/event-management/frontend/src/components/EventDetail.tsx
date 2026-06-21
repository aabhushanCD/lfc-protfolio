import { useEffect } from "react";
import { useEventStore } from "../store/event.store";
import { useParams } from "react-router";

const EventDetail = () => {
  const { fetchEventById, currentEvent: event } = useEventStore();
  const { id } = useParams();
  useEffect(() => {
    const events = async () => {
      await fetchEventById(id!);
    };
    events();
  }, [id, fetchEventById]);
  if (!event) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Banner */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="h-64 w-full bg-gray-200">
            {event.bannerUrl ? (
              <img
                src={event.bannerUrl}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No Banner Available
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title + Status */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {event.title}
              </h1>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium
                ${
                  event.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }
              `}
              >
                {event.status}
              </span>
            </div>

            {/* Meta Info */}
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">
              <div>
                📅 <span className="font-medium">Date:</span>{" "}
                {new Date(event.date).toDateString()}
              </div>

              <div>
                📍 <span className="font-medium">Venue:</span> {event.venue}
              </div>

              <div>
                👥 <span className="font-medium">Capacity:</span>{" "}
                {event.capacity}
              </div>

              <div>
                🧑 <span className="font-medium">Organizer:</span>{" "}
                {event.createdBy.name}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Description
              </h2>
              <p className="mt-2 leading-relaxed text-gray-600">
                {event.description}
              </p>
            </div>

            {/* Venue Image Section (future ready) */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Venue Image
              </h2>

              <div className="mt-2 h-40 rounded-xl border border-dashed bg-gray-100 flex items-center justify-center text-gray-500">
                {event.venueImageKey
                  ? "Venue image available (load via signed URL)"
                  : "No venue image uploaded"}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
                Register
              </button>

              <button className="rounded-lg border px-5 py-2 text-gray-700 hover:bg-gray-100">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
