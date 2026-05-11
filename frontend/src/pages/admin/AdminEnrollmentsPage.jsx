import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { enrollmentService } from "../../services/enrollmentService";
import StatusBadge from "../../components/dashboard/StatusBadge";
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

const selectCls = "rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm focus:border-indigo-400 focus:outline-none transition";

export default function AdminEnrollmentsPage() {
  const [state, setState] = useState({ loading: true, error: "", items: [], pagination: null });
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "", status: "", selectedProgram: "", sortOrder: "desc", createdFrom: "", createdTo: "" });

  const load = useCallback(() => {
    setState((p) => ({ ...p, loading: true }));
    enrollmentService
      .list(Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "")))
      .then((res) => setState({ loading: false, error: "", items: res.data.data.enrollments, pagination: res.data.data.pagination }))
      .catch((e) => setState({ loading: false, error: e?.response?.data?.message || "Failed to load", items: [], pagination: null }));
  }, [filters]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <DashboardLayout title="Manage Enrollments" links={links}>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        statusOptions={["pending", "reviewed", "approved", "rejected"]}
        customFilters={[{ name: "selectedProgram", placeholder: "All Programs", options: [{ value: "Tech Explorers", label: "Tech Explorers" }, { value: "Future Innovators", label: "Future Innovators" }, { value: "Junior Developers", label: "Junior Developers" }] }]}
      />

      {state.loading && state.items.length === 0 ? (
        <LoadingState />
      ) : state.error ? (
        <ErrorState message={state.error} />
      ) : (
        <>
          <div className="space-y-3 relative">
            {state.loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-[2px]">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              </div>
            )}
            {state.items.map((item) => (
              <div key={item._id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:shadow-md transition-shadow">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-800">{item.studentName}</p>
                    <p className="text-xs text-gray-400">Submitted: {new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} />
                    <select className={selectCls} value={item.status} onChange={(e) => enrollmentService.updateStatus(item._id, e.target.value).then(load)}>
                      {["pending", "reviewed", "approved", "rejected"].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  {[["Program", item.selectedProgram], ["Duration", item.duration], ["Grade", item.grade], ["Email", item.email], ["Phone", item.phone], ["Address", item.address]].map(([label, val]) => (
                    <p key={label}><span className="text-gray-400">{label}: </span><span className="font-medium text-gray-700">{val}</span></p>
                  ))}
                </div>
              </div>
            ))}
            {state.items.length === 0 && !state.loading && (
              <p className="py-8 text-center text-sm text-gray-400">No enrollments found.</p>
            )}
          </div>
          <Pagination pagination={state.pagination} filters={filters} setFilters={setFilters} />
        </>
      )}
    </DashboardLayout>
  );
}
