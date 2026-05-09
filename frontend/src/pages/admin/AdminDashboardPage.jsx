import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { dashboardService } from "../../services/dashboardService";
import { LoadingState, ErrorState } from "../../components/common/States";

const links = [
  { to: "/admin/dashboard", label: "Overview" },
  { to: "/admin/dashboard/applications", label: "Applications" },
  { to: "/admin/dashboard/enrollments", label: "Enrollments" },
  { to: "/admin/dashboard/contacts", label: "Contacts" },
  { to: "/admin/dashboard/users", label: "Users" },
  { to: "/admin/dashboard/admins", label: "Admins" },
];

export default function AdminDashboardPage() {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    dashboardService.adminStats().then((res) => setState({ loading: false, error: "", data: res.data.data })).catch((e) => setState({ loading: false, error: e?.response?.data?.message || "Failed to load", data: null }));
  }, []);

  return (
    <DashboardLayout title="Admin Dashboard" links={links}>
      {state.loading && <LoadingState label="Loading stats..." />}
      {state.error && <ErrorState message={state.error} />}
      {state.data && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[{label:"Users",value:state.data.totalUsers},{label:"Applications",value:state.data.totalApplications},{label:"Enrollments",value:state.data.totalEnrollments},{label:"Contacts",value:state.data.totalContacts},{label:"Pending Apps",value:state.data.pendingApplications},{label:"Approved Apps",value:state.data.approvedApplications}].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/10 p-4"><p className="text-sm text-blue-100">{item.label}</p><p className="text-3xl font-bold">{item.value}</p></div>
            ))}
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <h3 className="mb-3 text-lg font-semibold">Recent Submissions</h3>
            <div className="space-y-2">
              {state.data.recentSubmissions.map((row) => <div key={`${row.type}-${row.id}`} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"><p>{row.name} <span className="text-xs text-blue-100">({row.type})</span></p><p className="text-xs text-blue-100">{new Date(row.createdAt).toLocaleString()}</p></div>)}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
