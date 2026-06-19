import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/Auth.context.tsx";

import AppRoute from "./routes/AppRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  </StrictMode>,
);
