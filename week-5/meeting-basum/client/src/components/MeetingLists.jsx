import { useMeetingStore } from "../store/useMeeting";

const MeetingLists = () => {
  const meetings = useMeetingStore((state) => state.meetings);
  return (
    <div>
      {meetings &&
        meetings.map((meeting) => (
          <div key={meeting.id} className="upcomming-section">
            {meeting.title}
          </div>
        ))}
    </div>
  );
};

export default MeetingLists;
