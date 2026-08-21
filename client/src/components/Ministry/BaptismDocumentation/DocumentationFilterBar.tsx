import { Filter, RotateCcw, Search } from "lucide-react";

interface DocumentationFilterBarProps {
  searchTerm: string;
  selectedDocumentType: string;
  selectedBranch: string;
  selectedYear: string;
  selectedStatus: string;

  onSearchChange: (value: string) => void;
  onDocumentTypeChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

const DocumentationFilterBar = ({
  searchTerm,
  selectedDocumentType,
  selectedBranch,
  selectedYear,
  selectedStatus,
  onSearchChange,
  onDocumentTypeChange,
  onBranchChange,
  onYearChange,
  onStatusChange,
  onReset,
}: DocumentationFilterBarProps) => {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center gap-2">
        <Filter size={18} className="text-gray-600 dark:text-gray-300" />

        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Filter Documents
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
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
            placeholder="Search documents..."
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Document Type */}
        <select
          value={selectedDocumentType}
          onChange={(e) => onDocumentTypeChange(e.target.value)}
          className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Document Type</option>
          <option value="Certificate">Certificate</option>
          <option value="Consent Form">Consent Form</option>
          <option value="Registration Form">Registration Form</option>
          <option value="Other">Other</option>
        </select>

        {/* Branch */}
        <select
          value={selectedBranch}
          onChange={(e) => onBranchChange(e.target.value)}
          className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Branches</option>
          <option value="Main Church">Main Church</option>
          <option value="Shiloh Worship Centre">Shiloh Worship Centre</option>
          <option value="Ukombozi Restoration Center">
            Ukombozi Restoration Center
          </option>
        </select>

        {/* Year */}
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-48"
        >
          <option value="">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Missing">Missing</option>
        </select>

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default DocumentationFilterBar;
