import {
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

import AttendanceTable from "./AttendanceTable";
import RecordAttendanceModal, {
  type AttendanceRecord,
} from "./RecordAttendanceModal";

type AttendanceFilter =
  | "all"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "thisYear";

const Attendance = () => {
  // =====================================================
  // ATTENDANCE RECORDS
  // =====================================================

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([
    {
      id: 1,
      date: "Aug 9, 2026",
      program: "Sunday School",
      status: "Present",
      time: "9:00 AM",
    },
    {
      id: 2,
      date: "Aug 2, 2026",
      program: "Sunday School",
      status: "Present",
      time: "9:05 AM",
    },
    {
      id: 3,
      date: "Jul 26, 2026",
      program: "Sunday School",
      status: "Absent",
      time: "-",
    },
    {
      id: 4,
      date: "Jul 19, 2026",
      program: "Sunday School",
      status: "Present",
      time: "9:02 AM",
    },
    {
      id: 5,
      date: "Jul 12, 2026",
      program: "Sunday School",
      status: "Late",
      time: "9:25 AM",
    },
  ]);

  // =====================================================
  // STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [filter, setFilter] = useState<AttendanceFilter>("thisMonth");

  // =====================================================
  // ADD ATTENDANCE RECORD
  // =====================================================

  const handleAddAttendance = (record: Omit<AttendanceRecord, "id">) => {
    const newRecord: AttendanceRecord = {
      id: Date.now(),
      ...record,
    };

    setAttendanceRecords((previousRecords) => [newRecord, ...previousRecords]);

    setShowModal(false);
  };

  // =====================================================
  // FILTER ATTENDANCE
  // =====================================================

  const filteredRecords = useMemo(() => {
    switch (filter) {
      case "thisMonth":
        return attendanceRecords.filter((record) =>
          record.date.includes("Aug 2026"),
        );

      case "lastMonth":
        return attendanceRecords.filter((record) =>
          record.date.includes("Jul 2026"),
        );

      case "last3Months":
        return attendanceRecords.filter((record) =>
          ["Aug 2026", "Jul 2026", "Jun 2026"].some((month) =>
            record.date.includes(month),
          ),
        );

      case "thisYear":
        return attendanceRecords.filter((record) =>
          record.date.includes("2026"),
        );

      case "all":
      default:
        return attendanceRecords;
    }
  }, [attendanceRecords, filter]);

  // =====================================================
  // ATTENDANCE STATISTICS
  // =====================================================

  const totalSessions = attendanceRecords.length;

  const presentCount = attendanceRecords.filter(
    (record) => record.status === "Present",
  ).length;

  const absentCount = attendanceRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  const lateCount = attendanceRecords.filter(
    (record) => record.status === "Late",
  ).length;

  const attendanceRate =
    totalSessions === 0 ? 0 : Math.round((presentCount / totalSessions) * 100);

  // =====================================================
  // FILTER LABEL
  // =====================================================

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="mt-5 space-y-5">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Attendance
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and track attendance records for this child.
          </p>
        </div>

        {/* Record Attendance Button */}

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus size={17} />
          Record Attendance
        </button>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Attendance Rate */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Attendance Rate
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {attendanceRate}%
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {presentCount} of {totalSessions} sessions
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <CalendarCheck
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Present */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Present
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {presentCount}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Sessions attended
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <CheckCircle2
                size={20}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        {/* Absent */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Absent
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {absentCount}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Sessions missed
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30">
              <XCircle size={20} className="text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Late */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Late
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {lateCount}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Late arrivals
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
              <Clock3
                size={20}
                className="text-yellow-600 dark:text-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          ATTENDANCE HISTORY
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}

        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <CalendarDays
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Attendance History
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Recent attendance records
              </p>
            </div>
          </div>

          {/* Filter */}

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value as AttendanceFilter)
            }
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="thisMonth">This Month</option>

            <option value="lastMonth">Last Month</option>

            <option value="last3Months">Last 3 Months</option>

            <option value="thisYear">This Year</option>

            <option value="all">All Time</option>
          </select>
        </div>

        {/* =================================================
            ATTENDANCE TABLE
        ================================================= */}

        <AttendanceTable records={filteredRecords} />
      </div>

      {/* =================================================
          RECORD ATTENDANCE MODAL
      ================================================= */}

      {showModal && (
        <RecordAttendanceModal
          onClose={() => setShowModal(false)}
          onSave={handleAddAttendance}
        />
      )}
    </div>
  );
};

export default Attendance;
