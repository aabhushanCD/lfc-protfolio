import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEventSchema,
  type CreateEventType,
} from "../schema/event.schema";
import { useEventStore } from "../store/event.store";
import Loading from "./Loading";
import {
  Type,
  AlignLeft,
  Calendar,
  MapPin,
  Users,
  ImagePlus,
  X,
  AlertCircle,
  FileEdit,
  Globe,
  Loader2,
  PartyPopper,
} from "lucide-react";

const CreateEventForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { createEvent, error, isLoading } = useEventStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      status: "draft",
    },
  });

  const onSubmit = async (data: CreateEventType) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("venue", data.venue);
      formData.append("capacity", String(data.capacity));
      formData.append("status", data.status);

      if (data.banner) {
        formData.append("banner", data.banner);
      }

      const res = await createEvent(formData);

      if (res) {
        alert("Event Created Successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle banner upload
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("banner", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearBanner = () => {
    setValue("banner", undefined as unknown as File);
    setPreview(null);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50  py-10 flex items-start justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/70 overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
            <PartyPopper className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Create event
            </h2>
            <p className="text-sm text-slate-500">
              Fill in the details below to set up your event
            </p>
          </div>
        </div>

        {/* Ticket-stub perforation */}
        <div className="relative">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-50" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-50" />
          <div className="border-t-2 border-dashed border-slate-200" />
        </div>

        <div className="px-8 py-7 space-y-6">
          {/* Title */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5">
              <Type className="h-3.5 w-3.5" />
              Event title
            </label>
            <input
              placeholder="Summer Music Festival"
              {...register("title")}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
            {errors.title?.message && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5">
              <AlignLeft className="h-3.5 w-3.5" />
              Description
            </label>
            <textarea
              placeholder="Tell people what to expect..."
              rows={4}
              {...register("description")}
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
            {errors.description?.message && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date + Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
              {errors.date?.message && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Venue
              </label>
              <input
                placeholder="Central Park, NYC"
                {...register("venue")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
              {errors.venue?.message && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.venue.message}
                </p>
              )}
            </div>
          </div>

          {/* Capacity + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5">
                <Users className="h-3.5 w-3.5" />
                Capacity
              </label>
              <input
                type="number"
                placeholder="250"
                {...register("capacity", { valueAsNumber: true })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
              {errors.capacity?.message && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.capacity.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="relative">
                  <input
                    type="radio"
                    value="draft"
                    {...register("status")}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 text-sm text-slate-500 cursor-pointer transition peer-checked:border-indigo-400 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 peer-checked:font-medium">
                    <FileEdit className="h-3.5 w-3.5" />
                    Draft
                  </div>
                </label>
                <label className="relative">
                  <input
                    type="radio"
                    value="published"
                    {...register("status")}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 text-sm text-slate-500 cursor-pointer transition peer-checked:border-indigo-400 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 peer-checked:font-medium">
                    <Globe className="h-3.5 w-3.5" />
                    Published
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Banner Upload */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5">
              <ImagePlus className="h-3.5 w-3.5" />
              Banner image
            </label>

            {!preview ? (
              <label
                htmlFor="banner-upload"
                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-8 text-center cursor-pointer transition hover:border-indigo-300 hover:bg-indigo-50/30"
              >
                <ImagePlus className="h-6 w-6 text-slate-400" />
                <span className="text-sm text-slate-600">
                  <span className="font-medium text-indigo-600">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </span>
                <span className="text-xs text-slate-400">
                  PNG or JPG, recommended 1200×600
                </span>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative group">
                <img
                  src={preview}
                  alt="Banner preview"
                  className="w-full h-44 object-cover rounded-xl border border-slate-200"
                />
                <button
                  type="button"
                  onClick={clearBanner}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-slate-900/70 text-white flex items-center justify-center transition hover:bg-slate-900"
                  aria-label="Remove banner"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Submit */}
        <div className="px-8 pb-8">
          {!isLoading ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Creating event..." : "Create event"}
            </button>
          ) : (
            <Loading />
          )}

          {error && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-rose-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
