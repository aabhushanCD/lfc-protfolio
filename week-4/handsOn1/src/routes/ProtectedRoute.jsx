import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!accessToken) {   
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
