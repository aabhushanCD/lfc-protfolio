import { useMeetingStore } from "../store/useMeeting";

export const useSelector = () => {
  const meetings = useMeetingStore((state) => state.meetings);

  const today = new Date().toDateString();
  const todayMeetings = meetings.filter(
    (m) => new Date(m.date).toDateString() === today,
  );

  const hostedBy = (host) => meetings.filter((m) => m.host === host);

  const upComingMeetings = meetings.filter(
    (m) => new Date(m.date) > new Date(),
  );
  return { todayMeetings, hostedBy, upComingMeetings };
};
