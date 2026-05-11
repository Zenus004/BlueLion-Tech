export default function StatusBadge({ status }) {
  const styles = {
    pending:   { dot: "bg-yellow-400", text: "text-yellow-700", bg: "bg-yellow-50"  },
    reviewed:  { dot: "bg-blue-400",   text: "text-blue-700",   bg: "bg-blue-50"    },
    approved:  { dot: "bg-green-500",  text: "text-green-700",  bg: "bg-green-50"   },
    rejected:  { dot: "bg-red-400",    text: "text-red-700",    bg: "bg-red-50"     },
    contacted: { dot: "bg-purple-400", text: "text-purple-700", bg: "bg-purple-50"  },
    received:  { dot: "bg-cyan-500",   text: "text-cyan-700",   bg: "bg-cyan-50"    },
  };
  const s = styles[status] || { dot: "bg-gray-400", text: "text-gray-600", bg: "bg-gray-50" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "—"}
    </span>
  );
}
