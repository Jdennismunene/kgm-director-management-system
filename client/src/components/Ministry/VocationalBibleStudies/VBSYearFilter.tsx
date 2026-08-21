import { CalendarDays } from "lucide-react";

interface VBSYearFilterProps {
  years: number[];
  selectedYear: number | "All";
  onYearChange: (year: number | "All") => void;
}

const VBSYearFilter = ({
  years,
  selectedYear,
  onYearChange,
}: VBSYearFilterProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30">
            <CalendarDays
              size={18}
              className="text-teal-600 dark:text-teal-400"
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              VBS by Year
            </h2>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              View Bible studies from a specific year
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onYearChange("All")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              selectedYear === "All"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All Years
          </button>

          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => onYearChange(year)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                selectedYear === year
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VBSYearFilter;
