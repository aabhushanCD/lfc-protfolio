import { FaBell } from "react-icons/fa";

import "../styles/header.css";
import { useSession } from "../context/SessionContext";
import Button from "./ui/Button";
const Header = () => {
  const { theme, toggleTheme } = useSession();
  return (
    <header className={`header ${theme}`}>
      <div className="header-content">
        <Button onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"}
        </Button>
        <div className="dates">
          <p
            style={{
              borderRight: "1px solid black",
              paddingRight: "20px",
            }}
          >
            Wednesday, May 6, 2026
          </p>
          <p> 08:57 PM</p>
        </div>
        <div className="profiles">
          <FaBell />
          <div className="profile">
            <img
              src="https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
              alt=""
              width={"100%"}
            />
          </div>
          <select name="" id="">
            <option value="">option1</option>
            <option value="">option1</option>
            <option value="">option1</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
