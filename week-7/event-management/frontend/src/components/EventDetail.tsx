import { useEffect, useState } from "react";
import { useEventStore } from "../store/event.store";
import { EditEventModal } from "./EditEventModal";
import { useParams } from "react-router";

const EventDetail = () => {
  const {
    fetchEventById,
    currentEvent: event,
    uploadVenueImage,
  } = useEventStore();
  const { id } = useParams();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [venuePreview, setVenuePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchEventById(id);
  }, [id, fetchEventById]);

  if (!event) return null;

  const handleVenueImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    setVenuePreview(URL.createObjectURL(file));
    setUploadingImage(true);
    try {
      await uploadVenueImage(id, file);
    } finally {
      setUploadingImage(false);
    }
  };

  // falls back to a local preview while uploading, then to whatever url field
  // your confirm endpoint returns — adjust the field name if it differs
  const venueImageSrc = venuePreview ?? event.venueImageUrl ?? null;

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

            {/* Venue Image */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Venue Image
              </h2>

              <label
                htmlFor="venue-image"
                className="relative mt-2 flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed bg-gray-100 text-sm text-gray-500 transition hover:border-blue-400"
              >
                {venueImageSrc ? (
                  <>
                    <img
                      src={venueImageSrc}
                      alt="Venue"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 font-medium text-white opacity-0 transition hover:bg-black/40 hover:opacity-100">
                      {uploadingImage ? "Uploading…" : "Change image"}
                    </span>
                  </>
                ) : (
                  <span>
                    {uploadingImage
                      ? "Uploading…"
                      : "Click to upload a venue image"}
                  </span>
                )}
                <input
                  id="venue-image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleVenueImageChange}
                  disabled={uploadingImage}
                />
              </label>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
                Register
              </button>

              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="rounded-lg border px-5 py-2 text-gray-700 hover:bg-gray-100"
              >
                Edit
              </button>

              <button className="rounded-lg border px-5 py-2 text-gray-700 hover:bg-gray-100">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <EditEventModal event={event} onClose={() => setIsEditOpen(false)} />
      )}
    </div>
  );
};

export default EventDetail;
