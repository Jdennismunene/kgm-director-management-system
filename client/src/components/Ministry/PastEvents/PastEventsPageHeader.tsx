import { History } from "lucide-react";

const PastEventsPageHeader = () => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Information */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
          <History size={22} className="text-gray-600 dark:text-gray-300" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Past Events
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and review completed church events and activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PastEventsPageHeader;
