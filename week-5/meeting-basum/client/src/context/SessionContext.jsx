/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const [user, setUser] = useState({
    id: 1,
    name: "Aabhushan",
    role: "user",
  });

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <SessionContext.Provider
      value={{ toggleTheme, theme, setTheme, setUser, user }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
