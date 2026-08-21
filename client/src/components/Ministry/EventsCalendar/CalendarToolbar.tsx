import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface CalendarToolbarProps {
  currentDate: Date;
  searchTerm: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onSearchChange: (value: string) => void;
}

const CalendarToolbar = ({
  currentDate,
  searchTerm,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onSearchChange,
}: CalendarToolbarProps) => {
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Calendar Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreviousMonth}
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={onToday}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Today
          </button>

          <button
            type="button"
            onClick={onNextMonth}
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <ChevronRight size={18} />
          </button>

          <h2 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
            {monthYear}
          </h2>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarToolbar;
