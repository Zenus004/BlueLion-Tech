import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { dashboardService } from "../../services/dashboardService";
import { LoadingState, ErrorState } from "../../components/common/States";

const links = [
  { to: "/dashboard", label: "Overview" },
  { to: "/dashboard/applications", label: "Applications" },
  { to: "/dashboard/enrollments", label: "Enrollments" },
  { to: "/dashboard/profile", label: "Profile" },
];

export default function UserProfilePage() {
  const [state, setState] = useState({ loading: true, error: "", user: null });
  useEffect(() => {
    dashboardService.userProfile().then((res) => setState({ loading: false, error: "", user: res.data.data.user })).catch((e) => setState({ loading: false, error: e?.response?.data?.message || "Failed to load", user: null }));
  }, []);

  return (
    <DashboardLayout title="My Profile" links={links}>
      {state.loading ? <LoadingState /> : state.error ? <ErrorState message={state.error} /> : (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white/10 p-4"><p className="text-xs text-blue-100">Full Name</p><p className="text-lg font-semibold">{state.user.fullName}</p></div>
          <div className="rounded-xl bg-white/10 p-4"><p className="text-xs text-blue-100">Email</p><p className="text-lg font-semibold">{state.user.email}</p></div>
          <div className="rounded-xl bg-white/10 p-4"><p className="text-xs text-blue-100">Role</p><p className="text-lg font-semibold uppercase">{state.user.role}</p></div>
          <div className="rounded-xl bg-white/10 p-4"><p className="text-xs text-blue-100">Status</p><p className="text-lg font-semibold">{state.user.isBlocked ? "Blocked" : "Active"}</p></div>
        </div>
      )}
    </DashboardLayout>
  );
}
