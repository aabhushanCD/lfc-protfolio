import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AuthProvider } from "./context/authContext.tsx";
import AppRoute from "./routes/AppRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoute></AppRoute>
    </AuthProvider>
  </StrictMode>,
);
