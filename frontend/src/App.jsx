import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ApplicationPage from "./pages/ApplicationPage";
import EnrollmentPage from "./pages/EnrollmentPage";
import SuccessPage from "./pages/SuccessPage";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import UserApplicationsPage from "./pages/user/UserApplicationsPage";
import UserEnrollmentsPage from "./pages/user/UserEnrollmentsPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminEnrollmentsPage from "./pages/admin/AdminEnrollmentsPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminAdminsPage from "./pages/admin/AdminAdminsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/enroll" element={<EnrollmentPage />} />
        <Route path="/success" element={<SuccessPage />} />

        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/dashboard/applications" element={<UserApplicationsPage />} />
          <Route path="/dashboard/enrollments" element={<UserEnrollmentsPage />} />
          <Route path="/dashboard/profile" element={<UserProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/dashboard/applications" element={<AdminApplicationsPage />} />
          <Route path="/admin/dashboard/enrollments" element={<AdminEnrollmentsPage />} />
          <Route path="/admin/dashboard/contacts" element={<AdminContactsPage />} />
          <Route path="/admin/dashboard/users" element={<AdminUsersPage />} />
          <Route path="/admin/dashboard/admins" element={<AdminAdminsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
