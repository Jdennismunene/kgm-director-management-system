import { Filter, Search } from "lucide-react";

interface TeachersFilterBarProps {
  searchTerm: string;
  selectedClass: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onFilter: () => void;
}

const TeachersFilterBar = ({
  searchTerm,
  selectedClass,
  selectedStatus,
  onSearchChange,
  onClassChange,
  onStatusChange,
  onFilter,
}: TeachersFilterBarProps) => {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search teacher by name, phone or email..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-[#6f8f8c] dark:focus:ring-[#6f8f8c]"
          />
        </div>

        {/* Class Filter */}
        <div className="w-full lg:w-56">
          <select
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-[#6f8f8c] dark:focus:ring-[#6f8f8c]"
          >
            <option value="">All Classes</option>
            <option value="Toddlers">Toddlers</option>
            <option value="Nursery">Nursery</option>
            <option value="Primary 1">Primary 1</option>
            <option value="Primary 2">Primary 2</option>
            <option value="Primary 3">Primary 3</option>
            <option value="Primary 4">Primary 4</option>
            <option value="Primary 5">Primary 5</option>
            <option value="Primary 6">Primary 6</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-full lg:w-52">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-[#6f8f8c] dark:focus:ring-[#6f8f8c]"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Filter Button */}
        <button
          type="button"
          onClick={onFilter}
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <Filter size={17} />
          Filter
        </button>
      </div>
    </div>
  );
};

export default TeachersFilterBar;
