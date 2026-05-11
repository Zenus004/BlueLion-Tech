import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ pagination, filters, setFilters }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, total } = pagination;

  const handlePrev = () => {
    if (page > 1) setFilters((p) => ({ ...p, page: p.page - 1 }));
  };
  const handleNext = () => {
    if (page < totalPages) setFilters((p) => ({ ...p, page: p.page + 1 }));
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm sm:flex-row">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-800">{total}</span> result{total !== 1 ? "s" : ""}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="min-w-[80px] text-center text-sm text-gray-600">
          Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
          <span className="font-semibold text-gray-800">{totalPages}</span>
        </span>
        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
