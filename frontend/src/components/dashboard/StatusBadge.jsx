export default function StatusBadge({ status }) {
  const styleByStatus = {
    pending: "bg-yellow-500/20 text-yellow-200 border-yellow-300/30",
    reviewed: "bg-blue-500/20 text-blue-200 border-blue-300/30",
    approved: "bg-emerald-500/20 text-emerald-200 border-emerald-300/30",
    rejected: "bg-red-500/20 text-red-200 border-red-300/30",
    contacted: "bg-purple-500/20 text-purple-200 border-purple-300/30",
    received: "bg-cyan-500/20 text-cyan-200 border-cyan-300/30",
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${styleByStatus[status] || "bg-white/20 text-white border-white/30"}`}>
      {status}
    </span>
  );
}
