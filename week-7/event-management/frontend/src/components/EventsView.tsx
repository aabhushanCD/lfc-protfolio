import { useEffect } from "react";
import { useEventStore } from "../store/event.store";
import EventCard from "./EventCard";
import Loading from "./Loading";
import { useNavigate } from "react-router";

const EventsView = () => {
  const { fetchEvents, isLoading, error, events } = useEventStore();
  const navigate = useNavigate();
  useEffect(() => {
    const loadEvents = async () => {
      await fetchEvents();
    };

    loadEvents();
  }, [fetchEvents]);

  if (isLoading) return <Loading></Loading>;

  if (error) return <span>{error}</span>;

  return (
    <div>
      {events.length === 0 && (
        <div className="flex items-center justify-center min-h-75 mt-50">
          <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              📅
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              No Events Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are no events available right now. Create your first event
              to get started.
            </p>

            <button
              onClick={() => navigate("/create")}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
            >
              Create Event
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-8 flex-wrap  mt-10 p-10">
        {events.map((event) => (
          <EventCard key={event._id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventsView;
