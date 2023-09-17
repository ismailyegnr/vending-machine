import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

function RequireAuth({ children }) {
  const auth = useAuth();

  if (auth.loggedIn === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
