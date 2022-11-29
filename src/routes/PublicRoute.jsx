import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const PublicRoute = () => {
  const { isAuthenticated, userInfo } = useAuthContext();

  if (isAuthenticated) {
    if (userInfo.role === "admin") {
      return <Navigate to="/admin" />;
    }
    if (userInfo.role === "psikolog") {
      return <Navigate to="/psikolog" />;
    }
    return <Navigate to="/" />;
  }

  return <Navigate to="/login" />;
};

export default PublicRoute;
