import { Search, ChevronLeft, ChevronRight, User } from "lucide-react";

import type { Child } from "../../services/childService";

interface ChildRecordHeaderProps {
  selectedChild: Child;
  onSelectChild: (child: Child) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredChildren: Child[];
}

const ChildRecordHeader = ({
  selectedChild,
  onSelectChild,
  searchTerm,
  onSearchChange,
  filteredChildren,
}: ChildRecordHeaderProps) => {
  const currentIndex = filteredChildren.findIndex(
    (child) => child.id === selectedChild.id,
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onSelectChild(filteredChildren[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredChildren.length - 1) {
      onSelectChild(filteredChildren[currentIndex + 1]);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between p-5">
        {/* Search Child */}
        <div className="relative w-[35%]">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Child
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search child..."
              className="
                w-full rounded-lg border border-gray-200
                bg-white py-2.5 pl-10 pr-4
                text-sm text-gray-900 outline-none
                placeholder:text-gray-400
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                dark:border-gray-600 dark:bg-gray-800
                dark:text-white dark:placeholder:text-gray-500
                dark:focus:border-blue-400
              "
            />
          </div>

          {/* Search Results */}
          {searchTerm.trim() !== "" && (
            <div className="absolute left-0 right-0 top-18 z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
              {filteredChildren.length > 0 ? (
                filteredChildren.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => {
                      onSelectChild(child);
                      onSearchChange("");
                    }}
                    className="
                      flex w-full items-center gap-3 px-4 py-3
                      text-left hover:bg-gray-50
                      dark:hover:bg-gray-700
                    "
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                      <User
                        size={18}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {child.name}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {child.grade.name} • {child.branch.name}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  No child found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Child */}
        <div className="flex flex-1 items-center gap-4 pl-10">
          {/* Avatar */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
            <User size={28} className="text-blue-600 dark:text-blue-400" />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedChild.name}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  selectedChild.status === "ACTIVE"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {selectedChild.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {selectedChild.grade.name} • {selectedChild.branch.name}
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Age: {selectedChild.age} years
            </p>
          </div>
        </div>

        {/* Previous / Next */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex <= 0}
            className="
              cursor-pointer rounded-lg border border-gray-200
              p-2.5 text-gray-600 transition
              hover:bg-gray-50
              disabled:cursor-not-allowed disabled:opacity-40
              dark:border-gray-600 dark:text-gray-300
              dark:hover:bg-gray-700
            "
            title="Previous child"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= filteredChildren.length - 1}
            className="
              cursor-pointer rounded-lg border border-gray-200
              p-2.5 text-gray-600 transition
              hover:bg-gray-50
              disabled:cursor-not-allowed disabled:opacity-40
              dark:border-gray-600 dark:text-gray-300
              dark:hover:bg-gray-700
            "
            title="Next child"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildRecordHeader;
