import { RotateCcw, Search } from "lucide-react";

import type {
  BaptismRecordStatus,
  CertificateStatus,
} from "../../../data/baptismRecordsData";

interface BaptismRecordsFilterBarProps {
  searchTerm: string;
  selectedStatus: BaptismRecordStatus | "All";
  selectedBranch: string;
  selectedYear: string;
  selectedCertificateStatus: CertificateStatus | "All";
  branches: string[];
  years: string[];

  onSearchChange: (value: string) => void;
  onStatusChange: (status: BaptismRecordStatus | "All") => void;
  onBranchChange: (branch: string) => void;
  onYearChange: (year: string) => void;
  onCertificateStatusChange: (status: CertificateStatus | "All") => void;
  onReset: () => void;
}

const BaptismRecordsFilterBar = ({
  searchTerm,
  selectedStatus,
  selectedBranch,
  selectedYear,
  selectedCertificateStatus,
  branches,
  years,
  onSearchChange,
  onStatusChange,
  onBranchChange,
  onYearChange,
  onCertificateStatusChange,
  onReset,
}: BaptismRecordsFilterBarProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {/* Search */}
        <div className="xl:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search Records
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
              placeholder="Search by name, parent, phone..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>

          <select
            value={selectedStatus}
            onChange={(e) =>
              onStatusChange(e.target.value as BaptismRecordStatus | "All")
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Baptized">Baptized</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Branch */}
        <div>
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

        {/* Baptism Year */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Baptism Year
          </label>

          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Years</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Certificate Status */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Certificate
          </label>

          <select
            value={selectedCertificateStatus}
            onChange={(e) =>
              onCertificateStatusChange(
                e.target.value as CertificateStatus | "All",
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Certificates</option>
            <option value="Issued">Issued</option>
            <option value="Pending">Pending</option>
            <option value="Not Required">Not Required</option>
          </select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaptismRecordsFilterBar;
