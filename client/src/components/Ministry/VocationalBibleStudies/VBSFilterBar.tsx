import { RotateCcw, Search } from "lucide-react";
import type {
  VBSLocation,
  VBSStatus,
} from "../../../data/vocationalBibleStudiesData";

interface VBSFilterBarProps {
  searchTerm: string;
  selectedLocation: VBSLocation | "All";
  selectedStatus: VBSStatus | "All";
  selectedFacilitator: string;
  facilitators: string[];

  onSearchChange: (value: string) => void;
  onLocationChange: (value: VBSLocation | "All") => void;
  onStatusChange: (value: VBSStatus | "All") => void;
  onFacilitatorChange: (value: string) => void;
  onReset: () => void;
}

const VBSFilterBar = ({
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
}: VBSFilterBarProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search VBS by title, theme, facilitator..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Location */}
          <select
            value={selectedLocation}
            onChange={(e) =>
              onLocationChange(e.target.value as VBSLocation | "All")
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
              onStatusChange(e.target.value as VBSStatus | "All")
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

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <RotateCcw size={17} />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default VBSFilterBar;
