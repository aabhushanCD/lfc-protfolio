import { NavLink } from "react-router";
import { Calendar, PlusCircle, LayoutDashboard } from "lucide-react";

type Item = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: Item[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Create Event",
    path: "create",
    icon: <PlusCircle size={20} />,
  },
  {
    title: "View Events",
    path: "events",
    icon: <Calendar size={20} />,
  },
  {
    title: "Draft Events",
    path: "draft",
    icon: <Calendar size={20} />,
  },
];

const SidebarNavItem = ({ title, path, icon }: Item) => {
  return (
    <NavLink
      to={path}
      end={path === "/"}
      className={({ isActive }) =>
        `
        flex items-center gap-3 rounded-xl px-4 py-3
        transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `
      }
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
};

const AsideBar = () => {
  return (
    <aside className="h-screen w-72 border-r border-gray-200 bg-white px-5 py-8 flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-blue-600">Event Manager</h1>
        <p className="text-sm text-gray-500 mt-1">Organize and manage events</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <SidebarNavItem key={item.path} {...item} />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto rounded-xl bg-gray-50 p-4 border border-gray-200">
        <p className="font-medium text-gray-800">Event Analytics</p>
        <p className="mt-1 text-sm text-gray-500">
          Track registrations, attendees, and event performance.
        </p>
      </div>
    </aside>
  );
};

export default AsideBar;
