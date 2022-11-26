import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const AuthRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
export default AuthRoute;
