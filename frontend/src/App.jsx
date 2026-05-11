import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ApplicationPage from "./pages/ApplicationPage";
import EnrollmentPage from "./pages/EnrollmentPage";
import SuccessPage from "./pages/SuccessPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminEnrollmentsPage from "./pages/admin/AdminEnrollmentsPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminAdminsPage from "./pages/admin/AdminAdminsPage";

const ROUTES_WITHOUT_FOOTER = ["/"];

function GlobalFooter() {
  const { pathname } = useLocation();
  if (ROUTES_WITHOUT_FOOTER.includes(pathname)) return null;
  return (
    <footer className="border-t border-gray-200 bg-white py-3 text-center text-xs text-gray-400">
      © 2026 BlueLion Tech · All rights reserved · Managed by{" "}
      <span className="font-semibold text-indigo-500">RSR Global Services</span>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/apply" element={<ApplicationPage />} />
            <Route path="/enroll" element={<EnrollmentPage />} />
            <Route path="/success" element={<SuccessPage />} />

            {/* User profile */}
            <Route element={<ProtectedRoute role="user" />}>
              <Route path="/profile" element={<UserProfilePage />} />
            </Route>

            {/* Admin dashboard */}
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/dashboard/applications" element={<AdminApplicationsPage />} />
              <Route path="/admin/dashboard/enrollments" element={<AdminEnrollmentsPage />} />
              <Route path="/admin/dashboard/contacts" element={<AdminContactsPage />} />
              <Route path="/admin/dashboard/users" element={<AdminUsersPage />} />
              <Route path="/admin/dashboard/admins" element={<AdminAdminsPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <GlobalFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
