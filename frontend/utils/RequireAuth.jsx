/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";

export function RequireAuth({ children }) {
  const authentication = true;
  const location = useLocation();

  if (!authentication.user) {
    return <Navigate to="/login" state={{path: location.pathname}} />;
  } else {
    return children;
  }
}
