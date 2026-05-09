import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ role }) {
  const { isAuthenticated, isAdmin, isUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin" && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (role === "user" && !isUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
