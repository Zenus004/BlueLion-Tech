import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { userManagementService } from "../../services/managementService";
import { LoadingState, ErrorState } from "../../components/common/States";
import FilterBar from "../../components/dashboard/FilterBar";
import Pagination from "../../components/dashboard/Pagination";

const links = [
  { to: "/admin/dashboard", label: "Overview" },
  { to: "/admin/dashboard/applications", label: "Applications" },
  { to: "/admin/dashboard/enrollments", label: "Enrollments" },
  { to: "/admin/dashboard/contacts", label: "Contacts" },
  { to: "/admin/dashboard/users", label: "Users" },
  { to: "/admin/dashboard/admins", label: "Admins" },
];

export default function AdminUsersPage() {
  const [state, setState] = useState({ loading: true, error: "", items: [], pagination: null });
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "", sortOrder: "desc", createdFrom: "", createdTo: "" });

  const load = useCallback(() => {
    setState((p) => ({ ...p, loading: true }));
    userManagementService
      .list(Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "")))
      .then((res) => setState({ loading: false, error: "", items: res.data.data.users, pagination: res.data.data.pagination }))
      .catch((e) => setState({ loading: false, error: e?.response?.data?.message || "Failed to load", items: [], pagination: null }));
  }, [filters]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <DashboardLayout title="User Management" links={links}>
      <FilterBar filters={filters} setFilters={setFilters} customFilters={[]} statusOptions={[]} />
      {state.loading && state.items.length === 0 ? <LoadingState /> : state.error ? <ErrorState message={state.error} /> : (
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
                  <p className="font-semibold text-gray-800">{item.fullName}</p>
                  <p className="text-xs text-gray-500">{item.email}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Joined: {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <button
                  onClick={() => (item.isBlocked ? userManagementService.unblock(item._id) : userManagementService.block(item._id)).then(load)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${item.isBlocked ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"}`}
                >
                  {item.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            ))}
            {state.items.length === 0 && !state.loading && <p className="py-8 text-center text-sm text-gray-400">No users found.</p>}
          </div>
          <Pagination pagination={state.pagination} filters={filters} setFilters={setFilters} />
        </>
      )}
    </DashboardLayout>
  );
}
