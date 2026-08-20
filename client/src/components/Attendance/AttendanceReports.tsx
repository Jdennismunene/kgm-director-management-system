import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { attendanceData } from "../../data/attendanceData";

const AttendanceReports = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  /* =====================================================
     UNIQUE BRANCHES
  ===================================================== */

  const branches = useMemo(() => {
    return [...new Set(attendanceData.map((record) => record.branch))];
  }, []);

  /* =====================================================
     UNIQUE CLASSES
  ===================================================== */

  const classes = useMemo(() => {
    return [...new Set(attendanceData.map((record) => record.className))];
  }, []);

  /* =====================================================
     FILTER RECORDS
  ===================================================== */

  const filteredRecords = useMemo(() => {
    return attendanceData.filter((record) => {
      const matchesDate = !selectedDate || record.date === selectedDate;

      const matchesBranch = !selectedBranch || record.branch === selectedBranch;

      const matchesClass = !selectedClass || record.className === selectedClass;

      return matchesDate && matchesBranch && matchesClass;
    });
  }, [selectedDate, selectedBranch, selectedClass]);

  /* =====================================================
     SUMMARY
  ===================================================== */

  const totalRecords = filteredRecords.length;

  const presentCount = filteredRecords.filter(
    (record) => record.status === "Present",
  ).length;

  const lateCount = filteredRecords.filter(
    (record) => record.status === "Late",
  ).length;

  const absentCount = filteredRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  const attendanceRate =
    totalRecords > 0
      ? Math.round(((presentCount + lateCount) / totalRecords) * 100)
      : 0;

  /* =====================================================
     GRADE PERFORMANCE
  ===================================================== */

  const classPerformance = useMemo(() => {
    const uniqueClasses = [
      ...new Set(filteredRecords.map((record) => record.className)),
    ];

    return uniqueClasses
      .map((className) => {
        const records = filteredRecords.filter(
          (record) => record.className === className,
        );

        const present = records.filter(
          (record) => record.status === "Present",
        ).length;

        const late = records.filter(
          (record) => record.status === "Late",
        ).length;

        const absent = records.filter(
          (record) => record.status === "Absent",
        ).length;

        const rate =
          records.length > 0
            ? Math.round(((present + late) / records.length) * 100)
            : 0;

        return {
          name: className,
          total: records.length,
          present,
          late,
          absent,
          rate,
        };
      })
      .sort((a, b) => b.rate - a.rate);
  }, [filteredRecords]);

  /* =====================================================
     BRANCH PERFORMANCE
  ===================================================== */

  const branchPerformance = useMemo(() => {
    const uniqueBranches = [
      ...new Set(filteredRecords.map((record) => record.branch)),
    ];

    return uniqueBranches
      .map((branch) => {
        const records = filteredRecords.filter(
          (record) => record.branch === branch,
        );

        const present = records.filter(
          (record) => record.status === "Present",
        ).length;

        const late = records.filter(
          (record) => record.status === "Late",
        ).length;

        const absent = records.filter(
          (record) => record.status === "Absent",
        ).length;

        const rate =
          records.length > 0
            ? Math.round(((present + late) / records.length) * 100)
            : 0;

        return {
          name: branch,
          total: records.length,
          present,
          late,
          absent,
          rate,
        };
      })
      .sort((a, b) => b.rate - a.rate);
  }, [filteredRecords]);

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSelectedDate("");
    setSelectedBranch("");
    setSelectedClass("");
  };

  const hasFilters = selectedDate || selectedBranch || selectedClass;

  return (
    <div className="mt-5 space-y-5">
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <BarChart3 size={20} className="text-blue-600 dark:text-blue-400" />
          Attendance Reports
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Analyze attendance performance across branches and grades.
        </p>
      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Date */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Date
            </label>

            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                placeholder="e.g. Aug 9, 2026"
                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Branch */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Branch
            </label>

            <select
              value={selectedBranch}
              onChange={(event) => setSelectedBranch(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
              <option value="">All Branches</option>

              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Grade */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Grade
            </label>

            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
              <option value="">All Grades</option>

              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasFilters && (
          <div className="mt-4">
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
          SUMMARY CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <Users size={20} className="text-blue-600 dark:text-blue-400" />
          </div>

          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {totalRecords}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Total Records
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/20">
            <CheckCircle2
              size={20}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <p className="mt-4 text-2xl font-semibold text-green-600 dark:text-green-400">
            {presentCount}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Present
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
            <Clock3
              size={20}
              className="text-yellow-600 dark:text-yellow-400"
            />
          </div>

          <p className="mt-4 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            {lateCount}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Late</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20">
            <XCircle size={20} className="text-red-600 dark:text-red-400" />
          </div>

          <p className="mt-4 text-2xl font-semibold text-red-600 dark:text-red-400">
            {absentCount}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Absent
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <TrendingUp
              size={20}
              className="text-purple-600 dark:text-purple-400"
            />
          </div>

          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {attendanceRate}%
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Attendance Rate
          </p>
        </div>
      </div>

      {/* =================================================
          ATTENDANCE DISTRIBUTION
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Attendance Distribution
        </h3>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Breakdown of attendance for the selected records.
        </p>

        <div className="mt-6 space-y-5">
          {/* Present */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Present
              </div>

              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {presentCount}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-green-500"
                style={{
                  width: `${
                    totalRecords ? (presentCount / totalRecords) * 100 : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Late */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                Late
              </div>

              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {lateCount}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-yellow-500"
                style={{
                  width: `${
                    totalRecords ? (lateCount / totalRecords) * 100 : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Absent */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                Absent
              </div>

              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {absentCount}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-red-500"
                style={{
                  width: `${
                    totalRecords ? (absentCount / totalRecords) * 100 : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          PERFORMANCE TABLES
      ================================================= */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Grade Performance */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Grade Performance
            </h3>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Attendance performance by grade.
            </p>
          </div>

          {classPerformance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/40">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Grade
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Records
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Rate
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {classPerformance.map((item) => (
                    <tr
                      key={item.name}
                      className="border-t border-gray-100 dark:border-gray-700"
                    >
                      <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </td>

                      <td className="px-5 py-4 text-center text-gray-600 dark:text-gray-300">
                        {item.total}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-blue-600 dark:text-blue-400">
                        {item.rate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <Users size={28} className="mx-auto text-gray-400" />

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                No grade data available.
              </p>
            </div>
          )}
        </div>

        {/* Branch Performance */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Branch Performance
            </h3>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Attendance performance by branch.
            </p>
          </div>

          {branchPerformance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/40">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Branch
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Records
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Rate
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {branchPerformance.map((item) => (
                    <tr
                      key={item.name}
                      className="border-t border-gray-100 dark:border-gray-700"
                    >
                      <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </td>

                      <td className="px-5 py-4 text-center text-gray-600 dark:text-gray-300">
                        {item.total}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-blue-600 dark:text-blue-400">
                        {item.rate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <Users size={28} className="mx-auto text-gray-400" />

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                No branch data available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;
