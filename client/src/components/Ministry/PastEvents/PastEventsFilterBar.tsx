import { RotateCcw, Search } from "lucide-react";

import type {
  CalendarEventStatus,
  CalendarEventType,
} from "../../../data/calendarEventsData";

interface PastEventsFilterBarProps {
  searchTerm: string;
  selectedType: CalendarEventType | "All";
  selectedStatus: CalendarEventStatus | "All";
  selectedBranch: string;
  branches: string[];

  onSearchChange: (value: string) => void;
  onTypeChange: (type: CalendarEventType | "All") => void;
  onStatusChange: (status: CalendarEventStatus | "All") => void;
  onBranchChange: (branch: string) => void;
  onReset: () => void;
}

const PastEventsFilterBar = ({
  searchTerm,
  selectedType,
  selectedStatus,
  selectedBranch,
  branches,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onBranchChange,
  onReset,
}: PastEventsFilterBarProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Search */}
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search Events
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, description, location..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Event Type */}
        <div className="w-full lg:w-52">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Event Type
          </label>

          <select
            value={selectedType}
            onChange={(e) =>
              onTypeChange(e.target.value as CalendarEventType | "All")
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Types</option>
            <option value="Church Service">Church Service</option>
            <option value="VBS">VBS</option>
            <option value="Teachers Seminar">Teachers Seminar</option>
            <option value="Teachers Bonding">Teachers Bonding</option>
            <option value="Competition">Competition</option>
            <option value="Meeting">Meeting</option>
            <option value="Training">Training</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Status */}
        <div className="w-full lg:w-48">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>

          <select
            value={selectedStatus}
            onChange={(e) =>
              onStatusChange(e.target.value as CalendarEventStatus | "All")
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Branch */}
        <div className="w-full lg:w-56">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Branch
          </label>

          <select
            value={selectedBranch}
            onChange={(e) => onBranchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Branches</option>

            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default PastEventsFilterBar;
