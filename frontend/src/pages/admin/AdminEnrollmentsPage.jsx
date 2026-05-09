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

export default function AdminEnrollmentsPage() {
  const [state, setState] = useState({ loading: true, error: "", items: [], pagination: null });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    selectedProgram: "",
    sortOrder: "desc",
    createdFrom: "",
    createdTo: "",
  });

  const load = useCallback(() => {
    setState((p) => ({ ...p, loading: true }));
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    enrollmentService
      .list(activeFilters)
      .then((res) =>
        setState({
          loading: false,
          error: "",
          items: res.data.data.enrollments,
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

  const customFilters = [
    {
      name: "selectedProgram",
      placeholder: "All Programs",
      options: [
        { value: "Tech Explorers", label: "Tech Explorers" },
        { value: "Future Innovators", label: "Future Innovators" },
        { value: "Junior Developers", label: "Junior Developers" },
      ], // Assuming these are the programs
    },
  ];

  const statusOptions = ["pending", "reviewed", "approved", "rejected"];

  return (
    <DashboardLayout title="Manage Enrollments" links={links}>
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        customFilters={customFilters} 
        statusOptions={statusOptions} 
      />

      {state.loading && state.items.length === 0 ? (
        <LoadingState />
      ) : state.error ? (
        <ErrorState message={state.error} />
      ) : (
        <>
          <div className="space-y-4 relative">
            {state.loading && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center">
                 <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
              </div>
            )}
            {state.items.map((item) => (
              <div key={item._id} className="rounded-xl bg-white/10 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.studentName}</p>
                    <p className="text-xs text-blue-100">Submitted: {new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} />
                    <select
                      className="rounded-lg bg-white/20 px-2 py-1 text-xs"
                      value={item.status}
                      onChange={(e) =>
                        enrollmentService
                          .updateStatus(item._id, e.target.value)
                          .then(load)
                      }
                    >
                      <option className="text-black">pending</option>
                      <option className="text-black">reviewed</option>
                      <option className="text-black">approved</option>
                      <option className="text-black">rejected</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-blue-50 md:grid-cols-2">
                  <p><span className="text-blue-200">Program:</span> {item.selectedProgram}</p>
                  <p><span className="text-blue-200">Duration:</span> {item.duration}</p>
                  <p><span className="text-blue-200">Grade:</span> {item.grade}</p>
                  <p><span className="text-blue-200">Email:</span> {item.email}</p>
                  <p><span className="text-blue-200">Phone:</span> {item.phone}</p>
                  <p><span className="text-blue-200">Address:</span> {item.address}</p>
                </div>
              </div>
            ))}
            
            {state.items.length === 0 && !state.loading && (
              <div className="text-center text-blue-200 py-8">No enrollments found.</div>
            )}
          </div>
          <Pagination pagination={state.pagination} filters={filters} setFilters={setFilters} />
        </>
      )}
    </DashboardLayout>
  );
}
