import { Link, useNavigate } from "react-router";
import EventCard from "../components/EventCard";
import { useAuth } from "../context/authContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const handleLogout = async () => {
    logout();
  };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">Eventify</h1>

        <nav className="flex gap-6 text-sm">
          <a href="#features">Features</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
        </nav>

        {currentUser ? (
          <div className="flex gap-4">
            <span>{currentUser.name}</span>
            <button className="text-red-800" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/sign-up"
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Get Started
          </Link>
        )}
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-linear-to-b from-white to-gray-100">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Manage Events Like a Pro
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Create, manage, and publish events with ease. A modern event
          management platform built for organizers and teams.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard/create")}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Create Event
          </button>
          <button
            className="border px-6 py-3 rounded-lg"
            onClick={() => navigate("/events")}
          >
            View Events
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto py-10 px-6">
        {[
          { label: "Events", value: "120+" },
          { label: "Users", value: "5K+" },
          { label: "Countries", value: "15+" },
          { label: "Success Rate", value: "99%" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-2xl font-bold">{item.value}</h3>
            <p className="text-gray-500 text-sm">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Event Creation",
              desc: "Create events in seconds with smart forms and validation.",
            },
            {
              title: "Banner Uploads",
              desc: "Upload and preview event banners instantly.",
            },
            {
              title: "Status Control",
              desc: "Control visibility with draft and published states.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Preview */}
      <section id="events" className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map(() => (
            <EventCard />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-black text-white px-6">
        <h2 className="text-3xl font-bold">Start Managing Your Events Today</h2>
        <p className="text-gray-300 mt-3">
          Join thousands of organizers using Eventify
        </p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg">
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Eventify. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
