interface ProgramsYearFilterProps {
  years: number[];
  selectedYear: number | "All";
  onYearChange: (year: number | "All") => void;
}

const ProgramsYearFilter = ({
  years,
  selectedYear,
  onYearChange,
}: ProgramsYearFilterProps) => {
  return (
    <div className="mb-5">
      <div className="mb-3">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Programs by Year
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View programs recorded across successive years.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onYearChange("All")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            selectedYear === "All"
              ? "bg-teal-600 text-white"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgramsYearFilter;
