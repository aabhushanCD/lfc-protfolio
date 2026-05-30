import "./App.css";
import Card from "./components/Card";
import { Video } from "lucide-react";
import UpcommingCard from "./components/UpcommingCard";
import { useMeetingStore } from "./store/useMeeting";
import { useSession } from "./context/SessionContext";

const stats = [
  {
    title: "Start New Meeting",
    btmName: "Start Now",
    note: "Start an Instant Meeting",
    variant: "blue",
    icon: Video,
  },
  {
    title: "Join with code",
    btmName: "Join a meeting with code",
    note: "Join Meeting",
    variant: "purple",
    icon: Video,
  },
  {
    title: "Schedule  Meeting",
    btmName: "Schedule Now",
    note: "Plan  your meeting",
    variant: "orange",
    icon: Video,
  },
];

function App() {
  const meetings = useMeetingStore((state) => state.meetings);
  const meetingsCount = useMeetingStore((state) =>
    state.upComingMeetingsCount(),
  );
  const { user, theme } = useSession();
  return (
    <div
      style={{
        padding: "5px 20px",
      }}
    >
      <section className={`top-section ${theme}`}>
        <h2>Good Morning, {user.name}</h2>
        <p>Here's what's happening with your meetings today.</p>
      </section>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 20,
        }}
      >
        {stats.map((stat, index) => (
          <Card key={index} stat={stat} />
        ))}
      </div>

      <section
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <h3>Upcomming Meetings : {meetingsCount}</h3>
        {meetings.map((stats) => (
          <UpcommingCard stats={stats} key={stats.id} />
        ))}
      </section>
    </div>
  );
}

export default App;
