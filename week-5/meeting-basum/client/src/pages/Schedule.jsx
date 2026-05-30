import UpcommingCard from "../components/UpcommingCard";
import { useMeetingStore } from "../store/useMeeting";

const Schedule = () => {
  const meetings = useMeetingStore((state) => state.meetings);
  return (
    <div>
      {meetings.map((meeting) => (
        <UpcommingCard stats={meeting} />
      ))}
    </div>
  );
};

export default Schedule;
