import { CalendarDays, CircleCheck, Clock3, Info } from "lucide-react";

import type { Child } from "../../services/childService";

interface QuickInfoProps {
  child: Child;
}

const QuickInfo = ({ child }: QuickInfoProps) => {
  const status = child.status === "ACTIVE" ? "Active" : "Inactive";

  const dateAdded = child.createdAt
    ? new Date(child.createdAt).toLocaleDateString()
    : "Not provided";

  const lastUpdated = child.updatedAt
    ? new Date(child.updatedAt).toLocaleDateString()
    : "Not provided";

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
          <Info size={17} className="text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Quick Info
        </h2>
      </div>

      <div className="space-y-5 px-5 pb-5">
        {/* Status */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CircleCheck size={16} className="text-green-500" />

            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Status
            </span>
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              status === "Active"
                ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Date Added */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarDays
              size={16}
              className="text-gray-400 dark:text-gray-500"
            />

            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Date Added
            </span>
          </div>

          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
            {dateAdded}
          </span>
        </div>

        {/* Last Updated */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock3 size={16} className="text-gray-400 dark:text-gray-500" />

            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Last Updated
            </span>
          </div>

          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
            {lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickInfo;
