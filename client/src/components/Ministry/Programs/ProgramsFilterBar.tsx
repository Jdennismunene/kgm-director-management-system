import { Search, SlidersHorizontal } from "lucide-react";
import type { ProgramStatus, ProgramType } from "../../../data/programsData";

interface ProgramsFilterBarProps {
  searchTerm: string;
  selectedType: ProgramType | "All";
  selectedStatus: ProgramStatus | "All";
  onSearchChange: (value: string) => void;
  onTypeChange: (value: ProgramType | "All") => void;
  onStatusChange: (value: ProgramStatus | "All") => void;
}

const ProgramsFilterBar = ({
  searchTerm,
  selectedType,
  selectedStatus,
  onSearchChange,
  onTypeChange,
  onStatusChange,
}: ProgramsFilterBarProps) => {
  return (
    <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal
          size={18}
          className="text-gray-500 dark:text-gray-400"
        />

        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Filter Programs
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {/* Search */}
        <div className="relative xl:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search programs..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        {/* Program Type */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value as ProgramType | "All")}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="All">All Program Types</option>
          <option value="Vocational Bible Studies">
            Vocational Bible Studies
          </option>
          <option value="Teachers Seminars">Teachers Seminars</option>
          <option value="Teachers Bondings">Teachers Bondings</option>
        </select>

        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) =>
            onStatusChange(e.target.value as ProgramStatus | "All")
          }
          className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default ProgramsFilterBar;
