import { Outlet } from "react-router-dom";

import AsideBar from "./AsideBar";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/layout.css";
const Layout = () => {
  return (
    <div className="grid-layout">
      <header>
        <Header />
      </header>
      <aside>
        <AsideBar />
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
