import { useMemo, useState } from "react";
import ThemContext from "../context/ThemeContext";

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState();
  const value = useMemo(
    () => ({
      mode,
      toggle: () => {
        (console.log("toggle theme"),
          setMode((curr) => (curr === "light" ? "dark" : "light")));
      },
    }),
    [mode],
  );
  return <ThemContext.Provider value={value}>{children}</ThemContext.Provider>;
};

export default ThemeProvider;
