import { Search } from "lucide-react";

export default function FilterBar({ filters, setFilters, customFilters = [], statusOptions = [] }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition";

  return (
    <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            name="search"
            value={filters.search || ""}
            onChange={handleChange}
            placeholder="Search..."
            className={`${inputCls} pl-9`}
          />
        </div>

        {/* Status Filter */}
        {statusOptions.length > 0 && (
          <select name="status" value={filters.status || ""} onChange={handleChange} className={inputCls}>
            <option value="">All Statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        )}

        {/* Custom Filters */}
        {customFilters.map((cf) => (
          <select key={cf.name} name={cf.name} value={filters[cf.name] || ""} onChange={handleChange} className={inputCls}>
            <option value="">{cf.placeholder}</option>
            {cf.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}

        {/* Sort */}
        <select name="sortOrder" value={filters.sortOrder || "desc"} onChange={handleChange} className={inputCls}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Date range */}
      <div className="mt-3 flex flex-col items-center gap-3 border-t border-gray-200 pt-3 sm:flex-row">
        <span className="text-xs font-medium text-gray-500 flex-shrink-0">Date Range:</span>
        <input
          type="date"
          name="createdFrom"
          value={filters.createdFrom || ""}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
        />
        <span className="text-gray-400 text-xs">to</span>
        <input
          type="date"
          name="createdTo"
          value={filters.createdTo || ""}
          onChange={handleChange}
          className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
        />
      </div>
    </div>
  );
}
