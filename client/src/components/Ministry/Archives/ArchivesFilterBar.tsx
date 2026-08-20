import { CalendarDays, RotateCcw, Search } from "lucide-react";

interface ArchivesFilterBarProps {
  searchTerm: string;
  selectedType: string;
  selectedCategory: string;
  selectedDate: string;

  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;

  onReset: () => void;
}

const ArchivesFilterBar = ({
  searchTerm,
  selectedType,
  selectedCategory,
  selectedDate,
  onSearchChange,
  onTypeChange,
  onCategoryChange,
  onDateChange,
  onReset,
}: ArchivesFilterBarProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search archived resources..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* Resource Type */}
        <div className="w-full xl:w-52">
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="All Types">All Types</option>
            <option value="Document">Document</option>
            <option value="Photo Collection">Photo Collection</option>
            <option value="Video">Video</option>
            <option value="Audio">Audio</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Category */}
        <div className="w-full xl:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="All Categories">All Categories</option>
            <option value="VBS">VBS</option>
            <option value="Competition">Competition</option>
            <option value="Baptism">Baptism</option>
            <option value="Church Events">Church Events</option>
            <option value="Ministry">Ministry</option>
            <option value="Administration">Administration</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Archived Date */}
        <div className="relative w-full xl:w-48">
          <CalendarDays
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          />
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default ArchivesFilterBar;
