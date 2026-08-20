import { FileText, Filter, Search, X } from "lucide-react";

interface DocumentsFilterBarProps {
  searchTerm: string;
  selectedCategory: string;
  selectedType: string;
  selectedStatus: string;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;

  onReset: () => void;
}

const DocumentsFilterBar = ({
  searchTerm,
  selectedCategory,
  selectedType,
  selectedStatus,
  onSearchChange,
  onCategoryChange,
  onTypeChange,
  onStatusChange,
  onReset,
}: DocumentsFilterBarProps) => {
  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "All Categories" ||
    selectedType !== "All Types" ||
    selectedStatus !== "All Status";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4">
        {/* Top row */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
            <Filter size={17} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Filter Documents
            </h2>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Search and filter your documents.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search documents..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="All Categories">All Categories</option>
            <option value="VBS">VBS</option>
            <option value="Competition">Competition</option>
            <option value="Baptism">Baptism</option>
            <option value="Teaching">Teaching</option>
            <option value="Administration">Administration</option>
            <option value="Reports">Reports</option>
            <option value="General">General</option>
          </select>

          {/* Document Type */}
          <div className="relative">
            <FileText
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-8 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              <option value="All Types">All Types</option>
              <option value="PDF">PDF</option>
              <option value="Word">Word</option>
              <option value="Excel">Excel</option>
              <option value="PowerPoint">PowerPoint</option>
              <option value="Text">Text</option>
            </select>
          </div>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <X size={15} />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsFilterBar;
