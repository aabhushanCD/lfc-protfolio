import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { SessionProvider } from "./context/SessionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <AppRoutes>
        <App />
      </AppRoutes>
    </SessionProvider>
  </StrictMode>,
);
