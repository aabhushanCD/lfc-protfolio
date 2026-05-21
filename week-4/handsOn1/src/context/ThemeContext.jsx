import { createContext } from "react";

const ThemContext = createContext({
  theme: "dark",
  toogleTheme: () => {},
});

export default ThemContext;
