import { useEffect, useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { adminManagementService } from "../../services/managementService";
import { LoadingState, ErrorState } from "../../components/common/States";
import FilterBar from "../../components/dashboard/FilterBar";
import Pagination from "../../components/dashboard/Pagination";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin/dashboard", label: "Overview" },
  { to: "/admin/dashboard/applications", label: "Applications" },
  { to: "/admin/dashboard/enrollments", label: "Enrollments" },
  { to: "/admin/dashboard/contacts", label: "Contacts" },
  { to: "/admin/dashboard/users", label: "Users" },
  { to: "/admin/dashboard/admins", label: "Admins" },
];

export default function AdminAdminsPage() {
  const { auth } = useAuth();
  const isSuperAdmin = auth?.profile?.role === "super_admin";
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({ loading: true, error: "", items: [], pagination: null });
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "", sortOrder: "desc", createdFrom: "", createdTo: "" });

  const load = useCallback(() => {
    setState((p) => ({ ...p, loading: true }));
    adminManagementService
      .list(Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "")))
      .then((res) => setState({ loading: false, error: "", items: res.data.data.admins, pagination: res.data.data.pagination }))
      .catch((e) => setState({ loading: false, error: e?.response?.data?.message || "Failed to load", items: [], pagination: null }));
  }, [filters]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const onCreate = async (e) => {
    e.preventDefault();
    await adminManagementService.create(form);
    setForm({ username: "", password: "" });
    setShowPassword(false);
    load();
  };

  // Non-super-admins see only the access required message
  if (!isSuperAdmin) {
    return (
      <DashboardLayout title="Admin Management" links={links}>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 text-5xl">🔒</div>
          <h2 className="text-xl font-bold text-gray-800">Super Admin Access Required</h2>
          <p className="mt-2 text-sm text-gray-500">You do not have permission to view or manage admins.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin Management" links={links}>
      {state.error && <ErrorState message={state.error} />}

      {/* Create Admin Form — Super Admin only */}
      {isSuperAdmin ? (
        <form onSubmit={onCreate} className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <h2 className="mb-3 text-sm font-bold text-indigo-700">Create New Admin</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <input
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                required
              />
              <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition">
              Create Admin
            </button>
          </div>
        </form>
      ) : null}

      <FilterBar filters={filters} setFilters={setFilters} customFilters={[]} statusOptions={[]} />

      {state.loading && state.items.length === 0 ? <LoadingState /> : (
        <>
          <div className="space-y-3 relative">
            {state.loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-[2px]">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              </div>
            )}
            {state.items.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:shadow-md transition-shadow">
                <div>
                  <p className="font-semibold text-gray-800">{item.username}</p>
                  <p className="text-xs text-indigo-500 capitalize font-medium">{item.role?.replace("_", " ")}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Joined: {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                {isSuperAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => (item.isBlocked ? adminManagementService.unblock(item._id) : adminManagementService.block(item._id)).then(load)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${item.isBlocked ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"}`}
                    >
                      {item.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => adminManagementService.remove(item._id).then(load)}
                      className="rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold text-orange-600 hover:bg-orange-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            {state.items.length === 0 && !state.loading && <p className="py-8 text-center text-sm text-gray-400">No admins found.</p>}
          </div>
          <Pagination pagination={state.pagination} filters={filters} setFilters={setFilters} />
        </>
      )}
    </DashboardLayout>
  );
}
