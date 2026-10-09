import { ChevronLeft, ChevronRight, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { Trainee } from "../../pages/Training/Training";

// =====================================================
// PROPS
// =====================================================

interface TraineeTableProps {
  trainees: Trainee[];
}

// =====================================================
// COMPONENT
// =====================================================

function TraineeTable({ trainees }: TraineeTableProps) {
  // =====================================================
  // STATE
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const traineesPerPage = 5;

  // =====================================================
  // FILTER TRAINEES
  // =====================================================

  const filteredTrainees = trainees.filter((trainee) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      trainee.name.toLowerCase().includes(search) ||
      trainee.id.toLowerCase().includes(search);

    const matchesLevel =
      levelFilter === "All Levels" || trainee.level === levelFilter;

    const matchesStatus =
      statusFilter === "All Status" || trainee.status === statusFilter;

    return matchesSearch && matchesLevel && matchesStatus;
  });

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(filteredTrainees.length / traineesPerPage);

  const startIndex = (currentPage - 1) * traineesPerPage;

  const endIndex = startIndex + traineesPerPage;

  const paginatedTrainees = filteredTrainees.slice(startIndex, endIndex);

  // =====================================================
  // KEEP PAGE VALID WHEN DATA/FILTERS CHANGE
  // =====================================================

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =====================================================
  // HANDLERS
  // =====================================================

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLevelFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  // =====================================================
  // STATUS STYLES
  // =====================================================

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";

      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";

      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  return (
    <section className="mb-6">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Registered Trainees
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and manage all registered training participants
        </p>
      </div>

      {/* =================================================
          TABLE CONTAINER
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />

              <input
                type="text"
                placeholder="Search trainee name or registration number..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500"
              />
            </div>

            {/* Level Filter */}
            <select
              value={levelFilter}
              onChange={handleLevelChange}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option>All Levels</option>
              <option>Level 1</option>
              <option>Level 2</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Registration No.
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Trainee
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Phone
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Level
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Cohort
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Registration Date
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedTrainees.length > 0 ? (
                paginatedTrainees.map((trainee) => (
                  <tr
                    key={trainee.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                  >
                    {/* Registration Number */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-[#5F4A8B] dark:text-purple-400">
                        {trainee.id}
                      </span>
                    </td>

                    {/* Trainee */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                          <Users
                            size={16}
                            className="text-[#5F4A8B] dark:text-purple-400"
                          />
                        </div>

                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {trainee.name}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {trainee.phone}
                    </td>

                    {/* Level */}
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-[#5F4A8B] dark:bg-purple-900/30 dark:text-purple-300">
                        {trainee.level}
                      </span>
                    </td>

                    {/* Cohort */}
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {trainee.cohort}
                    </td>

                    {/* Registration Date */}
                    <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {trainee.registrationDate}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                          trainee.status,
                        )}`}
                      >
                        {trainee.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Users
                        size={32}
                        className="text-gray-300 dark:text-gray-600"
                      />

                      <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        No trainees found
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {filteredTrainees.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {Math.min(endIndex, filteredTrainees.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {filteredTrainees.length}
            </span>{" "}
            trainees
          </p>

          {totalPages > 0 && (
            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#5F4A8B] text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TraineeTable;
