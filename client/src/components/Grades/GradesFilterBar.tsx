import { RotateCcw, Search } from "lucide-react";

interface GradesFilterBarProps {
  searchTerm: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const GradesFilterBar = ({
  searchTerm,
  selectedStatus,
  onSearchChange,
  onStatusChange,
}: GradesFilterBarProps) => {
  const hasFilters = searchTerm.trim() !== "" || selectedStatus !== "All";

  const handleClear = () => {
    onSearchChange("");
    onStatusChange("All");
  };

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search grades or teachers..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-[#8eb0ac] dark:focus:ring-[#8eb0ac]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-[#8eb0ac] dark:focus:ring-[#8eb0ac]"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Clear Filters */}
          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#365452] dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
            >
              <RotateCcw size={16} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradesFilterBar;
