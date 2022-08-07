import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [beUser] = useAuth().beUser;
  const [userRole] = useAuth().userRole;

  if (!beUser) {
    return <Navigate to="/" />;
  } else {
    if (userRole !== 0) {
      return <Navigate to="/" />;
    }
  }

  return !beUser ? (
    <Navigate to="/" />
  ) : userRole !== "admin" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export const ProtectedRouteAdmin = ({ children }) => {
  const [beUser] = useAuth().beUser;
  const [userRole] = useAuth().userRole;

  if (!beUser) {
    return <Navigate to="/" />;
  } else {
    if (userRole !== 1) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export const ProtectedRouteObbCode = ({ children }) => {
  const query = useQuery();
  const oobCode = query.get("oobCode");

  if (!oobCode) return <Navigate to="/" />;

  return children;
};
