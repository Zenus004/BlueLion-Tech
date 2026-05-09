import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ pagination, filters, setFilters }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, total } = pagination;

  const handlePrev = () => {
    if (page > 1) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row rounded-xl bg-white/5 p-4 border border-white/10">
      <div className="text-sm text-blue-200">
        Showing total <span className="font-semibold text-white">{total}</span> results
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page <= 1}
          className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        
        <span className="text-sm text-blue-200 px-2">
          Page <span className="font-semibold text-white">{page}</span> of{" "}
          <span className="font-semibold text-white">{totalPages}</span>
        </span>
        
        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
