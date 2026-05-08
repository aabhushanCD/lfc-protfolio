import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <h1>Logo</h1>
      </div>
      <div className="navbar-links">
        <NavLink
          className={({ isActive }) => (isActive ? "navbar-link-active" : "")}
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "navbar-link-active" : "")}
          to={"/about"}
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "navbar-link-active" : "")}
          to={"/contact"}
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
