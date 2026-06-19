import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/Auth.context";
import type React from "react";

const ProtectedRoute = (): React.ReactElement => {
  const { currentUser, status } = useAuth();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
