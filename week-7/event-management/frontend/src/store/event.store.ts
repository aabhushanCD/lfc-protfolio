import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { isAxiosError } from "axios";
import { eventApi } from "../api/event.api"; // adjust path to match your project
import type {
  UpdateEventType,
  // adjust if your schema exports the full event type under a different name
} from "../schema/event.schema";
import type { EventType } from "../types/eventType";
import { getUploadUrl, minioConfirm, minioUpload } from "../api/media.api";

interface EventState {
  events: EventType[];
  currentEvent: EventType | null;
  isLoading: boolean;
  error: string | null;
}

interface EventActions {
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
  fetchDraftEvents: () => Promise<void>;
  createEvent: (data: FormData) => Promise<EventType | null>;
  updateEvent: (id: string, data: UpdateEventType) => Promise<EventType | null>;
  deleteEvent: (id: string) => Promise<boolean>;
  publishEvent: (id: string) => Promise<EventType | null>;
  uploadBanner: (id: string, data: FormData) => Promise<EventType | null>;
  uploadVenueImage: (id: string, file: File) => Promise<EventType | null>;
  clearCurrentEvent: () => void;
  clearError: () => void;
  reset: () => void;
}

type EventStore = EventState & EventActions;

const initialState: EventState = {
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,
};

function getErrorMessage(err: unknown): string {
  if (isAxiosError(err)) {
    return err.response?.data?.message ?? err.message ?? "Request failed";
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}

function mergeEvent(list: EventType[], id: string, patch: Partial<EventType>) {
  return list.map((e) => (e._id === id ? { ...e, ...patch } : e));
}

export const useEventStore = create<EventStore>()(
  devtools(
    (set) => ({
      ...initialState,

      fetchEvents: async () => {
        set({ isLoading: true, error: null });
        try {
          const events = await eventApi.getAll();
          set({ events, isLoading: false });
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
        }
      },

      fetchEventById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const event = await eventApi.getById(id);
          set({ currentEvent: event, isLoading: false });
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
        }
      },

      createEvent: async (data: FormData) => {
        set({ isLoading: true, error: null });
        try {
          console.log(data);
          const newEvent = await eventApi.create(data);
          set((state) => ({
            events: [...state.events, newEvent],
            isLoading: false,
          }));

          return newEvent;
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
          return null;
        }
      },
      fetchDraftEvents: async () => {
        set({ isLoading: true, error: null });
        try {
          const events = await eventApi.draft();
          set({ events, isLoading: false });
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
        }
      },

      updateEvent: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          const updated = await eventApi.update(id, data);
          set((state) => ({
            events: state.events.map((e: EventType) =>
              e._id === id ? updated : e,
            ),
            currentEvent:
              state.currentEvent && (state.currentEvent as EventType)._id === id
                ? updated
                : state.currentEvent,
            isLoading: false,
          }));
          return updated;
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
          return null;
        }
      },

      deleteEvent: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await eventApi.deletes(id);
          set((state) => ({
            events: state.events.filter((e: EventType) => e._id !== id),
            currentEvent:
              state.currentEvent && (state.currentEvent as EventType)._id === id
                ? null
                : state.currentEvent,
            isLoading: false,
          }));
          return true;
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
          return false;
        }
      },

      publishEvent: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const published = await eventApi.publishEvent(id);
          set((state) => ({
            events: state.events.map((e: EventType) =>
              e._id === id ? published : e,
            ),
            currentEvent:
              state.currentEvent && (state.currentEvent as EventType)._id === id
                ? published
                : state.currentEvent,
            isLoading: false,
          }));
          return published;
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
          return null;
        }
      },

      uploadBanner: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          const updated = await eventApi.bannerUpload(id, data);
          set((state) => ({
            events: state.events.map((e: EventType) =>
              e._id === id ? updated : e,
            ),
            currentEvent:
              state.currentEvent && (state.currentEvent as EventType)._id === id
                ? updated
                : state.currentEvent,
            isLoading: false,
          }));
          return updated;
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
          return null;
        }
      },
      uploadVenueImage: async (id, file) => {
        set({ isLoading: true, error: null });
        try {
          // NOTE: assumes the response shape is { uploadUrl, objectKey }.
          // Adjust the destructuring if your endpoint returns differently.
          const { uploadUrl: presignedUrl, objectKey } = await getUploadUrl(
            id,
            file.type,
          );

          await minioUpload(presignedUrl, file);

          // NOTE: assumes minioConfirm's response contains fields you want
          // merged onto the event (e.g. a venueImageUrl). If it only returns
          // a bare confirmation, you'll need a separate call to resolve a
          // viewable URL from objectKey.
          const updated = await minioConfirm(id, objectKey);

          set((state) => ({
            events: mergeEvent(state.events, id, updated),
            currentEvent:
              state.currentEvent && state.currentEvent._id === id
                ? { ...state.currentEvent, ...updated }
                : state.currentEvent,
            isLoading: false,
          }));
          return updated;
        } catch (err) {
          set({ error: getErrorMessage(err), isLoading: false });
          return null;
        }
      },
      clearCurrentEvent: () => set({ currentEvent: null }),
      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    { name: "event-store" },
  ),
);
