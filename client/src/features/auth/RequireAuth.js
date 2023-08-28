import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// protect the routes
const RequireAuth = ({ allowedRoles }) => {
  const { roles } = useAuth();
  const location = useLocation();
  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    // take me to the login page
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
