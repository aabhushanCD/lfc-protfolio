import { create } from "zustand";
import { persist } from "zustand/middleware";
const useMeetingStore = create(
  (set, get) => ({
    meetings: [
      {
        id: 1,
        title: "Project Planning Meeting",
        host: "Risan Basukala",
        date: "2026/06/17 10:00:00",
      },
      {
        id: 2,
        title: "Marketing Strategy",
        host: "Alice",
        date: "2026/06/17 10:00:00",
      },
      {
        id: 3,
        title: "Team Sync-Up",
        host: "John Doe",
        date: "2026/06/17 10:00:00",
      },
      {
        id: 4,
        title: "Team Sync-Up",
        host: "John Doe",
        date: "2026/06/01 10:00:00",
      },
    ],

    addMeeting: (meeting) =>
      set((state) => ({ meetings: [...state.meetings, meeting] })),

    updateMeeting: (id, updatedData) =>
      set((state) => ({
        meetings: state.meetings.map((meeting) =>
          meeting.id === id ? { ...meeting, ...updatedData } : meeting,
        ),
      })),
    removeMeeting: (id) =>
      set((state) => ({
        meetings: state.meetings.filter((meeting) => meeting.id !== id),
      })),

    upComingMeetingsCount: () => {
      const meetings = get().meetings;
      return meetings.filter((meeting) => new Date(meeting.date) > new Date())
        .length;
    },
  }),
  {
    persist,
  },
);

export { useMeetingStore };
