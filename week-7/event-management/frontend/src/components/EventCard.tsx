import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useEventStore } from "../store/event.store";
import Loading from "./Loading";
import { EditEventModal } from "./EditEventModal";

type CreatedBy = {
  _id: string;
  name: string;
  email: string;
};
type EventProp = {
  _id: string;
  _v: string;
  updatedAt: string;
  createdAt: string;
  createdBy: CreatedBy;
  title: string;
  description: string;
  date: string;
  venue: string;
  capacity: number;
  status: "draft" | "published";
  bannerUrl?: string | null;
  venueImageKey: string;
};

const EventCard = (event: EventProp) => {
  const [showOption, setShowOption] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { publishEvent, deleteEvent, error, isLoading } = useEventStore();
  if (error) {
    <span className="text-red-800">{error}</span>;
  }
  if (isLoading) {
    <Loading></Loading>;
  }
  console.log(event);
  return (
    <div className="w-80 rounded-xl overflow-hidden shadow-md border bg-white">
      {/* Banner */}
      <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        {event.bannerUrl ? (
          <img
            src={event?.bannerUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-3xl font-bold text-gray-500">{event.title}</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 ">
        {/* Title + Status */}
        <div className="flex justify-between items-start min-h-21">
          <h1 className="text-lg font-semibold ">{event.title}</h1>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              event.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {event.status}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Date: {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">Venue: {event.venue}</p>
        <p className="text-sm font-medium">Capacity: {event.capacity} </p>

        {/* Actions */}
        <div className="flex  gap-2 mt-3">
          {currentUser?._id === event?.createdBy?._id ? (
            <button
              onClick={() => navigate(`${event._id}`)}
              className="flex-1 bg-black text-white py-2 rounded-md text-sm"
            >
              Manage Event
            </button>
          ) : (
            <button className="flex-1 bg-black text-white py-2 rounded-md text-sm">
              View Details
            </button>
          )}
          {isEditOpen && (
            <EditEventModal
              event={event}
              onClose={() => setIsEditOpen(false)}
            />
          )}
          <div className="relative">
            {currentUser?._id === event?.createdBy?._id && showOption && (
              <div className="flex flex-col items-start absolute  border p-1 rounded text-white bg-gray-500  -top-20 right-0">
                <button
                  onClick={() => setIsEditOpen((prev: boolean) => !prev)}
                  className="hover:text-black hover:bg-gray-700 p-1 w-full rounded transition-colors"
                >
                  Edit
                </button>
                {event.status === "draft" ? (
                  <button
                    className="hover:text-black hover:bg-gray-700 p-1 w-full rounded transition-colors"
                    onClick={async () => await publishEvent(event._id)}
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={async () => await publishEvent(event._id)}
                    className="hover:text-black hover:bg-gray-700 p-1 w-full rounded transition-colors"
                  >
                    Unpublish
                  </button>
                )}
                <button
                  onClick={async () => await deleteEvent(event._id)}
                  className="hover:text-black hover:bg-gray-700 p-1 w-full rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <button
            className="px-3 py-2 border rounded-md text-sm"
            onClick={() => setShowOption((prev: boolean) => !prev)}
          >
            ⋯
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
