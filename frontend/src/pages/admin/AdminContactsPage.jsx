import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { contactService } from "../../services/contactService";
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

export default function AdminContactsPage() {
  const [state, setState] = useState({ loading: true, error: "", items: [], pagination: null });
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "", sortOrder: "desc", createdFrom: "", createdTo: "" });

  const load = useCallback(() => {
    setState((p) => ({ ...p, loading: true }));
    contactService
      .list(Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "")))
      .then((res) => setState({ loading: false, error: "", items: res.data.data.contacts, pagination: res.data.data.pagination }))
      .catch((e) => setState({ loading: false, error: e?.response?.data?.message || "Failed to load", items: [], pagination: null }));
  }, [filters]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <DashboardLayout title="Contact Submissions" links={links}>
      <FilterBar filters={filters} setFilters={setFilters} customFilters={[]} statusOptions={[]} />

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
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.email}</p>
                    <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => contactService.remove(item._id).then(load)}
                    className="flex-shrink-0 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-2 rounded-xl bg-white border border-gray-100 p-3 text-sm text-gray-700">{item.message}</p>
              </div>
            ))}
            {state.items.length === 0 && !state.loading && (
              <p className="py-8 text-center text-sm text-gray-400">No contact submissions found.</p>
            )}
          </div>
          <Pagination pagination={state.pagination} filters={filters} setFilters={setFilters} />
        </>
      )}
    </DashboardLayout>
  );
}
