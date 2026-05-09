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
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortOrder: "desc",
    createdFrom: "",
    createdTo: "",
  });

  const load = useCallback(() => {
    setState((p) => ({ ...p, loading: true }));
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    userManagementService
      .list(activeFilters)
      .then((res) =>
        setState({
          loading: false,
          error: "",
          items: res.data.data.users,
          pagination: res.data.data.pagination,
        })
      )
      .catch((e) =>
        setState({
          loading: false,
          error: e?.response?.data?.message || "Failed to load",
          items: [],
          pagination: null,
        })
      );
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      load();
    }, 300);
    return () => clearTimeout(timer);
  }, [load]);

  return (
    <DashboardLayout title="User Management" links={links}>
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        customFilters={[]} 
        statusOptions={[]} 
      />

      {state.loading && state.items.length === 0 ? (
        <LoadingState />
      ) : state.error ? (
        <ErrorState message={state.error} />
      ) : (
        <>
          <div className="space-y-3 relative">
            {state.loading && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center">
                 <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
              </div>
            )}
            {state.items.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-xl bg-white/10 p-4">
                <div>
                  <p className="font-semibold text-white">{item.fullName}</p>
                  <p className="text-xs text-blue-100">{item.email}</p>
                  <p className="text-[10px] text-blue-200/70 mt-1">Joined: {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => (item.isBlocked ? userManagementService.unblock(item._id) : userManagementService.block(item._id)).then(load)} 
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${item.isBlocked ? "bg-emerald-500/80" : "bg-red-500/80"}`}
                >
                  {item.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            ))}
            
            {state.items.length === 0 && !state.loading && (
              <div className="text-center text-blue-200 py-8">No users found.</div>
            )}
          </div>
          <Pagination pagination={state.pagination} filters={filters} setFilters={setFilters} />
        </>
      )}
    </DashboardLayout>
  );
}
