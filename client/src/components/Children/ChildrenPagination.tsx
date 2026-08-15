import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface ChildrenPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const ChildrenPagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: ChildrenPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4">
      {/* Results information */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
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
        children
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="
            w-10
            h-10
            rounded-lg
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-900
            text-gray-700
            dark:text-gray-300
            flex
            items-center
            justify-center
            transition
            disabled:opacity-40
            disabled:cursor-not-allowed
            hover:bg-gray-50
            dark:hover:bg-gray-800
          "
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
              w-10
              h-10
              rounded-lg
              text-sm
              font-medium
              flex
              items-center
              justify-center
              transition
              cursor-pointer

              ${
                currentPage === page
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }
            `}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="
            w-10
            h-10
            rounded-lg
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-900
            text-gray-700
            dark:text-gray-300
            flex
            items-center
            justify-center
            transition
            disabled:opacity-40
            disabled:cursor-not-allowed
            hover:bg-gray-50
            dark:hover:bg-gray-800
            cursor-pointer
          "
        >
          <ChevronRight size={18} />
        </button>

        {/* Items per page */}
        <div className="relative ml-4">
          <select
            value={itemsPerPage}
            onChange={(event) =>
              onItemsPerPageChange(Number(event.target.value))
            }
            className="
              appearance-none
              h-10
              w-36
              pl-4
              pr-9
              rounded-lg
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-900
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
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>

          <ChevronDown
            size={17}
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
      </div>
    </div>
  );
};

export default ChildrenPagination;
