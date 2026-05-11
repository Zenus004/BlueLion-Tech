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

const STAT_ICONS = {
  Users: "👤", Applications: "📄", Enrollments: "🎓",
  Contacts: "📨", "Pending Apps": "⏳", "Approved Apps": "✅",
  "Pending Enrolls": "🕐", "Approved Enrolls": "🏆",
};
const STAT_COLORS = {
  Users: "text-indigo-600", Applications: "text-blue-600", Enrollments: "text-purple-600",
  Contacts: "text-cyan-600", "Pending Apps": "text-yellow-600", "Approved Apps": "text-green-600",
  "Pending Enrolls": "text-orange-500", "Approved Enrolls": "text-emerald-600",
};

export default function AdminDashboardPage() {
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    dashboardService.adminStats()
      .then((res) => setState({ loading: false, error: "", data: res.data.data }))
      .catch((e) => setState({ loading: false, error: e?.response?.data?.message || "Failed to load", data: null }));
  }, []);

  const stats = state.data
    ? [
        { label: "Users",             value: state.data.totalUsers },
        { label: "Applications",      value: state.data.totalApplications },
        { label: "Enrollments",       value: state.data.totalEnrollments },
        { label: "Contacts",          value: state.data.totalContacts },
        { label: "Pending Apps",      value: state.data.pendingApplications },
        { label: "Approved Apps",     value: state.data.approvedApplications },
        { label: "Pending Enrolls",   value: state.data.pendingEnrollments },
        { label: "Approved Enrolls",  value: state.data.approvedEnrollments },
      ]
    : [];

  return (
    <DashboardLayout title="Admin Dashboard" links={links}>
      {state.loading && <LoadingState label="Loading stats..." />}
      {state.error && <ErrorState message={state.error} />}
      {state.data && (
        <div className="space-y-6">
          {/* Stats grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                  <span className="text-2xl">{STAT_ICONS[item.label]}</span>
                </div>
                <p className={`text-4xl font-bold ${STAT_COLORS[item.label] || "text-gray-800"}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Recent submissions */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-gray-800">Recent Submissions</h2>
            <div className="space-y-2">
              {state.data.recentSubmissions.map((row) => (
                <div
                  key={`${row.type}-${row.id}`}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 hover:bg-indigo-50 transition"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{row.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{row.type}</p>
                  </div>
                  <p className="text-xs text-gray-400">{new Date(row.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
