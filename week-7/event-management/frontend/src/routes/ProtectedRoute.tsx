import { Navigate } from "react-router";


import { useAuth } from "../context/authContext";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactNode => {
  const { currentUser, status } = useAuth();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
