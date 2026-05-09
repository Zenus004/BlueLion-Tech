import { Search } from "lucide-react";

export default function FilterBar({ filters, setFilters, customFilters = [], statusOptions = [] }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  return (
    <div className="mb-6 rounded-xl bg-white/5 p-4 border border-white/10 shadow-lg">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-blue-200/50" />
          </div>
          <input
            type="text"
            name="search"
            value={filters.search || ""}
            onChange={handleChange}
            placeholder="Search..."
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-blue-200/50 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
          />
        </div>

        {/* Status Filter */}
        {statusOptions.length > 0 && (
          <select
            name="status"
            value={filters.status || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 appearance-none"
          >
            <option value="" className="text-black">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status} className="text-black">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        )}

        {/* Custom Filters */}
        {customFilters.map((cf) => (
          <select
            key={cf.name}
            name={cf.name}
            value={filters[cf.name] || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 appearance-none"
          >
            <option value="" className="text-black">{cf.placeholder}</option>
            {cf.options.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-black">
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {/* Sorting */}
        <select
          name="sortOrder"
          value={filters.sortOrder || "desc"}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 appearance-none"
        >
          <option value="desc" className="text-black">Newest First</option>
          <option value="asc" className="text-black">Oldest First</option>
        </select>
      </div>

      <div className="mt-4 flex flex-col md:flex-row gap-4 items-center border-t border-white/5 pt-4">
        <div className="text-sm text-blue-200">Date Range:</div>
        <input
          type="date"
          name="createdFrom"
          value={filters.createdFrom || ""}
          onChange={handleChange}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white placeholder-blue-200/50 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 [color-scheme:dark]"
        />
        <span className="text-blue-200/50">to</span>
        <input
          type="date"
          name="createdTo"
          value={filters.createdTo || ""}
          onChange={handleChange}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white placeholder-blue-200/50 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 [color-scheme:dark]"
        />
      </div>
    </div>
  );
}
