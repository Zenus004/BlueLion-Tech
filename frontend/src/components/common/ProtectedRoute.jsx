import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ role }) {
  const { isAuthenticated, isAdmin, isUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin trying to access user-only route
  if (role === "user" && !isUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // User trying to access admin-only route
  if (role === "admin" && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
