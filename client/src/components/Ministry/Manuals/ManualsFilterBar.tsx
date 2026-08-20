import { Search, SlidersHorizontal } from "lucide-react";

interface ManualsFilterBarProps {
  searchTerm: string;
  selectedCategory: string;
  selectedAgeGroup: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAgeGroupChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const ManualsFilterBar = ({
  searchTerm,
  selectedCategory,
  selectedAgeGroup,
  selectedStatus,
  onSearchChange,
  onCategoryChange,
  onAgeGroupChange,
  onStatusChange,
}: ManualsFilterBarProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
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
            placeholder="Search manuals..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-gray-900"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Category */}
          <div className="relative">
            <SlidersHorizontal
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:w-44"
            >
              <option>All Categories</option>
              <option>Christian Education</option>
              <option>Bible Education</option>
              <option>Church Ministry</option>
            </select>
          </div>

          {/* Age Group */}
          <select
            value={selectedAgeGroup}
            onChange={(e) => onAgeGroupChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:w-44"
          >
            <option>All Age Groups</option>
            <option>All Ages</option>
            <option>Children & Youth</option>
            <option>4–6 Years</option>
            <option>7–9 Years</option>
            <option>10–12 Years</option>
            <option>13+ Years</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:w-40"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ManualsFilterBar;
