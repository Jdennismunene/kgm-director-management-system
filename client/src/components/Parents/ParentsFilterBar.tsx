import { Search, SlidersHorizontal, X } from "lucide-react";

interface ParentsFilterBarProps {
  searchTerm: string;
  selectedBranch: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const ParentsFilterBar = ({
  searchTerm,
  selectedBranch,
  selectedStatus,
  onSearchChange,
  onBranchChange,
  onStatusChange,
}: ParentsFilterBarProps) => {
  const hasFilters =
    searchTerm !== "" ||
    selectedBranch !== "All Branches" ||
    selectedStatus !== "All Status";

  const clearFilters = () => {
    onSearchChange("");
    onBranchChange("All Branches");
    onStatusChange("All Status");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search parent by name, phone or email..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        {/* Branch Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="hidden text-gray-400 sm:block"
          />

          <select
            value={selectedBranch}
            onChange={(e) => onBranchChange(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option>All Branches</option>
            <option>Main Church</option>
            <option>Shiloh Worship Centre</option>
            <option>Ukombozi Restoration Center</option>
          </select>
        </div>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ParentsFilterBar;
