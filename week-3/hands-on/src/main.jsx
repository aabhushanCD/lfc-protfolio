import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import AppRoutes from "./routes/AppRoutes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes>
      <App />
    </AppRoutes>
  </StrictMode>,
);
