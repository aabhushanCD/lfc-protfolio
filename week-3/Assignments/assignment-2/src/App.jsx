import "./App.css";
import Card from "./components/Card";
import { Video } from "lucide-react";
import UpcommingCard from "./components/UpcommingCard";

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

const upcommingStat = [
  {
    title: "Project Planning Meeting",
    host: "Risan Basukala",
    date: "Today, 10:00 AM - 11:00 AM",
  },
  {
    title: "Marketing Strategy",
    host: "Alice",
    date: "Today, 10:00 AM - 11:00 AM",
  },
  {
    title: "Team Sync-Up",
    host: "John Doe",
    date: "Today, 10:00 AM - 11:00 AM",
  },
];
function App() {
  return (
    <div
      style={{
        padding: "5px 20px",
      }}
    >
      <section className="top-section">
        <h2>Good Morning, Aabhushan</h2>
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
        <h3>Upcomming Meetings</h3>
        {upcommingStat.map((stats, index) => (
          <UpcommingCard stats={stats} index={index} />
        ))}
      </section>
    </div>
  );
}

export default App;
