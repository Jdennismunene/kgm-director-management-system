import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import type {
  SeminarLocation,
  SeminarStatus,
} from "../../../data/teachersSeminarsData";

interface TeachersSeminarsFilterBarProps {
  searchTerm: string;
  selectedLocation: SeminarLocation | "All";
  selectedStatus: SeminarStatus | "All";
  selectedFacilitator: string;
  facilitators: string[];

  onSearchChange: (value: string) => void;
  onLocationChange: (location: SeminarLocation | "All") => void;
  onStatusChange: (status: SeminarStatus | "All") => void;
  onFacilitatorChange: (facilitator: string) => void;
  onReset: () => void;
}

const TeachersSeminarsFilterBar = ({
  searchTerm,
  selectedLocation,
  selectedStatus,
  selectedFacilitator,
  facilitators,
  onSearchChange,
  onLocationChange,
  onStatusChange,
  onFacilitatorChange,
  onReset,
}: TeachersSeminarsFilterBarProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={18}
            className="text-teal-600 dark:text-teal-400"
          />

          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Filter Seminars
          </h3>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
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
            placeholder="Search seminars..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        {/* Location */}
        <select
          value={selectedLocation}
          onChange={(e) =>
            onLocationChange(e.target.value as SeminarLocation | "All")
          }
          className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="All">All Locations</option>
          <option value="Main Church">Main Church</option>
          <option value="Shiloh Worship Centre">Shiloh Worship Centre</option>
          <option value="Ukombozi Restoration Center">
            Ukombozi Restoration Center
          </option>
          <option value="Other">Other</option>
        </select>

        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) =>
            onStatusChange(e.target.value as SeminarStatus | "All")
          }
          className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Facilitator */}
        <select
          value={selectedFacilitator}
          onChange={(e) => onFacilitatorChange(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="All">All Facilitators</option>

          {facilitators.map((facilitator) => (
            <option key={facilitator} value={facilitator}>
              {facilitator}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeachersSeminarsFilterBar;
