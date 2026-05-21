import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("Theme provider should be wraped with app");
  return ctx;
};
