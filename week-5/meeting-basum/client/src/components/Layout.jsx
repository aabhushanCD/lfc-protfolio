import { Outlet } from "react-router-dom";
import "../index.css";
import AsideBar from "./AsideBar";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/layout.css";
import { useSession } from "../context/SessionContext";

const Layout = () => {
  const { theme } = useSession();

  return (
    <div className={`grid-layout ${theme}`}>
      <header className={theme}>
        <Header />
      </header>
      <aside>
        <AsideBar />
      </aside>
      <main className={theme}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
