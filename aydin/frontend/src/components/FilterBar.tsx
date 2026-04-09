import { Search, Filter, X } from 'lucide-react';
import { useEventStore } from '../stores/eventStore';

export default function FilterBar() {
  const { filters, setFilters, resetFilters } = useEventStore();

  const categories = ['Music', 'Tech', 'Sports', 'General'];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search || ''}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={filters.category || ''}
            onChange={(e) => setFilters({ category: e.target.value || undefined })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            placeholder="Start date"
            value={filters.dateRange?.start || ''}
            onChange={(e) =>
              setFilters({
                dateRange: {
                  ...filters.dateRange,
                  start: e.target.value,
                },
              })
            }
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            placeholder="End date"
            value={filters.dateRange?.end || ''}
            onChange={(e) =>
              setFilters({
                dateRange: {
                  ...filters.dateRange,
                  end: e.target.value,
                },
              })
            }
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}