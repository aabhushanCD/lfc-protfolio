import "./App.css";
import Card from "./components/Card";
import { Video } from "lucide-react";
import UpcommingCard from "./components/UpcommingCard";
import { useMeetingStore } from "./store/useMeeting";
import { useSession } from "./context/SessionContext";
import { useState } from "react";
import { useSelector } from "./selectors/useSelector";
import Button from "./components/ui/Button";

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
  const [filter, setFilter] = useState("all");
  const meetingsCount = useMeetingStore((state) =>
    state.upComingMeetingsCount(),
  );

  const { todayMeetings, hostedBy, upComingMeetings } = useSelector();

  const filteredMeetings =
    filter === "today"
      ? todayMeetings
      : filter === "hosted"
        ? hostedBy(user.name)
        : upComingMeetings;
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
        <h3>Upcoming Meetings: {meetingsCount}</h3>

        <div style={{ display: "flex", gap: 8 }}>
          {[
            { label: "Upcoming", value: "all" },
            { label: "Today", value: "today" },
            { label: "Hosted", value: "hosted" },
          ].map(({ label, value }) => (
            <Button
              key={value}
              onClick={() => setFilter(value)}
              style={{
                fontWeight: filter === value ? "bold" : "normal",
                borderBottom:
                  filter === value ? "2px solid currentColor" : "none",
              }}
            >
              {label}
            </Button>
          ))}
        </div>

        {filteredMeetings.map((meeting) => (
          <UpcommingCard stats={meeting} key={meeting.id} />
        ))}
      </section>
    </div>
  );
}

export default App;
