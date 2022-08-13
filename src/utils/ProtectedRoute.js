import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = () => {
  const [beUser] = useAuth().beUser;

  return !beUser ? <Navigate to="/" /> : <Outlet />;
};
