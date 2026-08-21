import { CalendarDays, Plus } from "lucide-react";

interface CalendarPageHeaderProps {
  onAdd: () => void;
  onToday: () => void;
}

const CalendarPageHeader = ({ onAdd, onToday }: CalendarPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Information */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
          <CalendarDays
            size={22}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Calendar
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage church events and activities.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onToday}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Today
        </button>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>
    </div>
  );
};

export default CalendarPageHeader;
