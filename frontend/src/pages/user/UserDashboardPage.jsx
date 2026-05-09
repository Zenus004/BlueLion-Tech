import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { dashboardService } from "../../services/dashboardService";
import { LoadingState, ErrorState } from "../../components/common/States";
import StatusBadge from "../../components/dashboard/StatusBadge";

const links = [
  { to: "/dashboard", label: "Overview" },
  { to: "/dashboard/applications", label: "Applications" },
  { to: "/dashboard/enrollments", label: "Enrollments" },
  { to: "/dashboard/profile", label: "Profile" },
];

export default function UserDashboardPage() {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    dashboardService
      .userDashboard()
      .then((res) => setState({ loading: false, error: "", data: res.data.data }))
      .catch((e) => setState({ loading: false, error: e?.response?.data?.message || "Failed to load dashboard", data: null }));
  }, []);

  return (
    <DashboardLayout title="User Dashboard" links={links}>
      {state.loading && <LoadingState label="Loading dashboard..." />}
      {state.error && <ErrorState message={state.error} />}
      {state.data && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/10 p-4"><p className="text-sm text-blue-100">Total Applications</p><p className="text-3xl font-bold">{state.data.summary.totalApplications}</p></div>
            <div className="rounded-xl bg-white/10 p-4"><p className="text-sm text-blue-100">Total Enrollments</p><p className="text-3xl font-bold">{state.data.summary.totalEnrollments}</p></div>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <h3 className="mb-3 text-lg font-semibold">Latest Activity</h3>
            <div className="space-y-3">
              {state.data.latestActivity.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <div><p className="font-semibold">{item.title}</p><p className="text-xs text-blue-100">{item.type}</p></div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
