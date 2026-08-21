import { ChevronDown, RotateCcw, Search } from "lucide-react";

interface ChildrenFilterBarProps {
  searchTerm: string;
  selectedClass: string;
  selectedAge: string;
  selectedStatus: string;

  onSearchChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClearFilters?: () => void;
}

const ChildrenFilterBar = ({
  searchTerm,
  selectedClass,
  selectedAge,
  selectedStatus,
  onSearchChange,
  onClassChange,
  onAgeChange,
  onStatusChange,
  onClearFilters,
}: ChildrenFilterBarProps) => {
  return (
    <div className="mt-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-colors">
      <div className="flex flex-col xl:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name, parent or phone..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="
              w-full
              h-11
              pl-4
              pr-11
              rounded-lg
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              text-sm
              text-gray-700
              dark:text-gray-200
              placeholder-gray-400
              dark:placeholder-gray-500
              outline-none
              focus:border-blue-500
              dark:focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
              dark:focus:ring-blue-950
              transition
            "
          />

          <Search
            size={19}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-500
              dark:text-gray-400
            "
          />
        </div>

        {/* Class Filter */}
        <div className="relative w-full xl:w-44">
          <select
            value={selectedClass}
            onChange={(event) => onClassChange(event.target.value)}
            className="
              appearance-none
              w-full
              h-11
              px-4
              pr-10
              rounded-lg
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              text-sm
              text-gray-700
              dark:text-gray-200
              outline-none
              focus:border-blue-500
              dark:focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
              dark:focus:ring-blue-950
              cursor-pointer
            "
          >
            <option value="">All Classes</option>
            <option value="PP1">PP1</option>
            <option value="PP2">PP2</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
          </select>

          <ChevronDown
            size={18}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-500
              dark:text-gray-400
              pointer-events-none
            "
          />
        </div>

        {/* Age Filter */}
        <div className="relative w-full xl:w-44">
          <select
            value={selectedAge}
            onChange={(event) => onAgeChange(event.target.value)}
            className="
              appearance-none
              w-full
              h-11
              px-4
              pr-10
              rounded-lg
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              text-sm
              text-gray-700
              dark:text-gray-200
              outline-none
              focus:border-blue-500
              dark:focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
              dark:focus:ring-blue-950
              cursor-pointer
            "
          >
            <option value="">All Ages</option>
            <option value="5-7">5 - 7 years</option>
            <option value="8-10">8 - 10 years</option>
            <option value="11-13">11 - 13 years</option>
            <option value="14-16">14 - 16 years</option>
            <option value="17+">17+ years</option>
          </select>

          <ChevronDown
            size={18}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-500
              dark:text-gray-400
              pointer-events-none
            "
          />
        </div>

        {/* Status Filter */}
        <div className="relative w-full xl:w-44">
          <select
            value={selectedStatus}
            onChange={(event) => onStatusChange(event.target.value)}
            className="
              appearance-none
              w-full
              h-11
              px-4
              pr-10
              rounded-lg
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              text-sm
              text-gray-700
              dark:text-gray-200
              outline-none
              focus:border-blue-500
              dark:focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
              dark:focus:ring-blue-950
              cursor-pointer
            "
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <ChevronDown
            size={18}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-500
              dark:text-gray-400
              pointer-events-none
            "
          />
        </div>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onClearFilters}
          className="
            h-11
            px-5
            rounded-lg
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-800
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-200
            flex
            items-center
            justify-center
            gap-2
            hover:bg-gray-50
            dark:hover:bg-gray-700
            hover:border-gray-300
            dark:hover:border-gray-600
            transition
          "
        >
          <RotateCcw size={16} className="text-gray-600 dark:text-gray-300" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default ChildrenFilterBar;
