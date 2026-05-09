import { useEffect, useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { adminManagementService } from "../../services/managementService";
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

export default function AdminAdminsPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
    adminManagementService
      .list(activeFilters)
      .then((res) =>
        setState({
          loading: false,
          error: "",
          items: res.data.data.admins,
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

  const onCreate = async (e) => {
    e.preventDefault();
    await adminManagementService.create(form);
    setForm({ username: "", password: "" });
    setShowPassword(false);
    load();
  };

  return (
    <DashboardLayout title="Admin Management" links={links}>
      {state.error ? (
        <ErrorState message={state.error} />
      ) : (
        <>
          <form
            onSubmit={onCreate}
            className="grid gap-3 rounded-xl bg-white/10 p-4 md:grid-cols-3 mb-6"
          >
            <input
              className="rounded-lg border border-white/20 bg-white/10 p-2"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm((p) => ({ ...p, username: e.target.value }))
              }
              required
            />
            <div className="relative">
              <input
                className="w-full rounded-lg border border-white/20 bg-white/10 p-2 pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-blue-100"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-2 font-semibold text-white">
              Create Admin
            </button>
          </form>

          <FilterBar 
            filters={filters} 
            setFilters={setFilters} 
            customFilters={[]} 
            statusOptions={[]} 
          />

          {state.loading && state.items.length === 0 ? (
            <LoadingState />
          ) : (
            <>
              <div className="space-y-4 relative">
                {state.loading && (
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
                  </div>
                )}
                {state.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-xl bg-white/10 p-4"
                  >
                    <div>
                      <p className="font-semibold text-white">{item.username}</p>
                      <p className="text-xs text-blue-100">{item.role}</p>
                      <p className="text-[10px] text-blue-200/70 mt-1">Joined: {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          (item.isBlocked
                            ? adminManagementService.unblock(item._id)
                            : adminManagementService.block(item._id)
                          ).then(load)
                        }
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.isBlocked ? "bg-emerald-500/80" : "bg-red-500/80"
                        }`}
                      >
                        {item.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => adminManagementService.remove(item._id).then(load)}
                        className="rounded-full bg-orange-500/80 px-3 py-1 text-xs font-semibold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                
                {state.items.length === 0 && !state.loading && (
                  <div className="text-center text-blue-200 py-8">No admins found.</div>
                )}
              </div>
              <Pagination pagination={state.pagination} filters={filters} setFilters={setFilters} />
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
