import { Outlet } from "react-router";
import AsideBar from "../components/AsideBar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 h-screen">
        <AsideBar />
      </aside>
      <main className="flex-1 bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
