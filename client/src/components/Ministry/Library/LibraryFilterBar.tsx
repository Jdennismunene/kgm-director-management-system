import { Filter, Search, X } from "lucide-react";

interface LibraryFilterBarProps {
  searchTerm: string;
  selectedType: string;
  selectedCategory: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const LibraryFilterBar = ({
  searchTerm,
  selectedType,
  selectedCategory,
  selectedStatus,
  onSearchChange,
  onTypeChange,
  onCategoryChange,
  onStatusChange,
}: LibraryFilterBarProps) => {
  const hasFilters =
    searchTerm ||
    selectedType !== "All Types" ||
    selectedCategory !== "All Categories" ||
    selectedStatus !== "All Status";

  const clearFilters = () => {
    onSearchChange("");
    onTypeChange("All Types");
    onCategoryChange("All Categories");
    onStatusChange("All Status");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4">
        {/* Top Row */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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
              placeholder="Search library resources..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          {/* Filter Label + Clear */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Filter size={17} />
              Filters
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 transition hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                <X size={15} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Resource Type */}
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="All Types">All Types</option>
            <option value="Document">Document</option>
            <option value="Video">Video</option>
            <option value="Photo">Photo</option>
            <option value="Audio">Audio</option>
            <option value="Other">Other</option>
          </select>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="All Categories">All Categories</option>
            <option value="Photography">Photography</option>
            <option value="VBS">VBS</option>
            <option value="Competition">Competition</option>
            <option value="Baptism">Baptism</option>
            <option value="Teaching">Teaching</option>
            <option value="General">General</option>
          </select>

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
      </div>
    </div>
  );
};

export default LibraryFilterBar;
