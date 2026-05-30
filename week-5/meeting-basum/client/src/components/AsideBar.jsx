import { NavLink } from "react-router-dom";
import "../styles/aside.css";
import { Play, Link, Calendar, Clock, Home } from "lucide-react";
const navItems = [
  { title: "Dashboard", path: "/", icon: Home },
  {
    title: "New Meeting",
    path: "new-meeting",
    icon: Play,
  },
  {
    title: "Calendar",
    path: "calendar",
    icon: Calendar,
  },
  {
    title: "Schedule Meeting",
    path: "schedule-meeting",
    icon: Clock,
  },
  {
    title: "Profile Settings",
    path: "profile-settings",
    icon: Link,
  },
];

const SidebarNavItems = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="sidebar_item">
      <NavLink
        to={item.path}
        end={item.path === "/"}
        className={({ isActive }) =>
          `sidebar_link ${isActive ? "sidebar_link_active" : ""}`
        }
      >
        <Icon />
        <span>{item.title}</span>
      </NavLink>
    </div>
  );
};

const AsideBar = () => {
  return (
    <aside className="aside">
      <div className="aside-title">Meeting Basum</div>
      {navItems.map((item, index) => (
        <SidebarNavItems key={index} item={item} />
      ))}
    </aside>
  );
};

export default AsideBar;
