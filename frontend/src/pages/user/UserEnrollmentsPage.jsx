import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { enrollmentService } from "../../services/enrollmentService";
import { LoadingState, ErrorState } from "../../components/common/States";
import StatusBadge from "../../components/dashboard/StatusBadge";

const links = [
  { to: "/dashboard", label: "Overview" },
  { to: "/dashboard/applications", label: "Applications" },
  { to: "/dashboard/enrollments", label: "Enrollments" },
  { to: "/dashboard/profile", label: "Profile" },
];

export default function UserEnrollmentsPage() {
  const [state, setState] = useState({ loading: true, error: "", items: [] });

  useEffect(() => {
    enrollmentService
      .mine()
      .then((res) =>
        setState({
          loading: false,
          error: "",
          items: res.data.data.enrollments,
        })
      )
      .catch((e) =>
        setState({
          loading: false,
          error: e?.response?.data?.message || "Failed to load",
          items: [],
        })
      );
  }, []);

  return (
    <DashboardLayout title="My Enrollments" links={links}>
      {state.loading ? (
        <LoadingState />
      ) : state.error ? (
        <ErrorState message={state.error} />
      ) : (
        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={item._id} className="rounded-xl bg-white/10 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{item.studentName}</p>
                  <p className="text-xs text-blue-100">Submitted: {new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <StatusBadge status={item.status} />
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
        </div>
      )}
    </DashboardLayout>
  );
}
