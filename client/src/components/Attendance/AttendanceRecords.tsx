import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Search,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  useAttendance,
  type AttendanceStatus,
} from "../../context/AttendanceContext";

const AttendanceRecords = () => {
  const { attendanceRecords } = useAttendance();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  /* =====================================================
     UNIQUE BRANCHES
  ===================================================== */

  const branches = useMemo(() => {
    return [...new Set(attendanceRecords.map((record) => record.branch))];
  }, [attendanceRecords]);

  /* =====================================================
     UNIQUE CLASSES / GRADES
  ===================================================== */

  const classes = useMemo(() => {
    return [...new Set(attendanceRecords.map((record) => record.className))];
  }, [attendanceRecords]);

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (date: string) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* =====================================================
     FILTER RECORDS
  ===================================================== */

  const filteredRecords = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return attendanceRecords.filter((record) => {
      const matchesSearch =
        !search ||
        record.childName.toLowerCase().includes(search) ||
        record.parent.toLowerCase().includes(search);

      const matchesBranch = !selectedBranch || record.branch === selectedBranch;

      const matchesClass = !selectedClass || record.className === selectedClass;

      const matchesStatus = !selectedStatus || record.status === selectedStatus;

      /*
       * Important:
       * Both selectedDate and record.date use YYYY-MM-DD.
       */
      const matchesDate = !selectedDate || record.date === selectedDate;

      return (
        matchesSearch &&
        matchesBranch &&
        matchesClass &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    attendanceRecords,
    searchTerm,
    selectedBranch,
    selectedClass,
    selectedStatus,
    selectedDate,
  ]);

  /* =====================================================
     STATUS BADGE
  ===================================================== */

  const getStatusBadge = (status: AttendanceStatus) => {
    if (status === "Present") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
          <CheckCircle2 size={13} />
          Present
        </span>
      );
    }

    if (status === "Absent") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
          <XCircle size={13} />
          Absent
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-100 bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-400">
        <Clock3 size={13} />
        Late
      </span>
    );
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBranch("");
    setSelectedClass("");
    setSelectedStatus("");
    setSelectedDate("");
  };

  const hasFilters =
    Boolean(searchTerm) ||
    Boolean(selectedBranch) ||
    Boolean(selectedClass) ||
    Boolean(selectedStatus) ||
    Boolean(selectedDate);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="mt-5 space-y-5">
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Attendance Records
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and manage attendance records for all children.
        </p>
      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {/* Search */}

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search child or parent..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            />
          </div>

          {/* Date */}

          <div className="relative">
            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            />
          </div>

          {/* Branch */}

          <select
            value={selectedBranch}
            onChange={(event) => setSelectedBranch(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="">All Branches</option>

            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          {/* Class / Grade */}

          <select
            value={selectedClass}
            onChange={(event) => setSelectedClass(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="">All Grades</option>

            {classes.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>

          {/* Status */}

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </div>

        {/* =================================================
            FILTER SUMMARY
        ================================================= */}

        {hasFilters && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Showing {filteredRecords.length} matching records
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* =================================================
          RECORDS TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Table Header */}

        <div className="flex flex-col gap-2 border-b border-gray-200 px-5 py-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Attendance History
            </h3>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {filteredRecords.length}{" "}
              {filteredRecords.length === 1 ? "record" : "records"} found
            </p>
          </div>

          {attendanceRecords.length > 0 && (
            <p className="text-xs text-gray-400">
              Total records: {attendanceRecords.length}
            </p>
          )}
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/40">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Child
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Grade
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Branch
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Date
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Time
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30"
                  >
                    {/* Child */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          {record.childName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {record.childName}
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {record.parent}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Grade */}

                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {record.className}
                    </td>

                    {/* Branch */}

                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {record.branch}
                    </td>

                    {/* Date */}

                    <td className="px-5 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {formatDate(record.date)}
                    </td>

                    {/* Time */}

                    <td className="px-5 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {record.time}
                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">
                      {getStatusBadge(record.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <Search size={25} className="text-gray-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
              {attendanceRecords.length === 0
                ? "No attendance records yet"
                : "No attendance records found"}
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {attendanceRecords.length === 0
                ? "Attendance records will appear here after you take attendance."
                : "Try adjusting your search or filters."}
            </p>

            {hasFilters && attendanceRecords.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceRecords;
