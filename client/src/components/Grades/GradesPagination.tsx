import { ChevronLeft, ChevronRight } from "lucide-react";

interface GradesPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

const GradesPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: GradesPaginationProps) => {
  const safeTotalPages = Math.max(totalPages, 1);

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);

  const startItem =
    totalItems === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(safeCurrentPage * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 0) {
      return [];
    }

    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (safeCurrentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, safeCurrentPage - 1);
    const end = Math.min(totalPages - 1, safeCurrentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (safeCurrentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const handlePrevious = () => {
    if (safeCurrentPage > 1) {
      onPageChange(safeCurrentPage - 1);
    }
  };

  const handleNext = () => {
    if (safeCurrentPage < totalPages) {
      onPageChange(safeCurrentPage + 1);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    onItemsPerPageChange(value);
    onPageChange(1);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-gray-700 dark:bg-gray-800">
      {/* Results Information */}
      <div className="flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center dark:text-gray-400">
        <span>
          Showing{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {startItem}
          </span>{" "}
          to{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {endItem}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {totalItems}
          </span>{" "}
          grades
        </span>

        {/* Items Per Page */}
        <div className="flex items-center gap-2">
          <span>Show</span>

          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-[#8eb0ac]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <span>per page</span>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={totalPages === 0 || safeCurrentPage === 1}
          onClick={handlePrevious}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#365452] disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
          title="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-gray-400 dark:text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                safeCurrentPage === page
                  ? "bg-[#365452] text-white dark:bg-[#8eb0ac] dark:text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          disabled={totalPages === 0 || safeCurrentPage === totalPages}
          onClick={handleNext}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#365452] disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
          title="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default GradesPagination;
