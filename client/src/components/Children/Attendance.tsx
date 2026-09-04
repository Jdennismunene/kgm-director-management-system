import {
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Plus,
  XCircle,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import AttendanceTable from "./AttendanceTable";
import RecordAttendanceModal from "./RecordAttendanceModal";

import {
  createAttendance,
  getChildAttendance,
  type AttendanceRecord,
  type CreateAttendanceData,
} from "../../services/attendanceService";

interface AttendanceProps {
  childId: string;
}

type AttendanceFilter =
  | "all"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "thisYear";

const Attendance = ({ childId }: AttendanceProps) => {
  // =====================================================
  // ATTENDANCE RECORDS
  // =====================================================

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(true);

  // =====================================================
  // ERROR
  // =====================================================

  const [error, setError] = useState("");

  // =====================================================
  // MODAL
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  // =====================================================
  // FILTER
  // =====================================================

  const [filter, setFilter] = useState<AttendanceFilter>("thisMonth");

  // =====================================================
  // LOAD ATTENDANCE
  // =====================================================

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const records = await getChildAttendance(childId);

      setAttendanceRecords(records);
    } catch (error) {
      console.error("Failed to load attendance:", error);

      setError(
        "Failed to load attendance records. Please make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (!childId) {
      setError("Child ID is missing.");
      setLoading(false);
      return;
    }

    loadAttendance();
  }, [childId]);

  // =====================================================
  // ADD ATTENDANCE
  // =====================================================

  const handleAddAttendance = async (
    data: CreateAttendanceData,
  ) => {
    try {
      setError("");

      await createAttendance(data);

      // Reload records from database
      await loadAttendance();

      // Close modal
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create attendance:", error);

      throw error;
    }
  };

  // =====================================================
  // FILTER ATTENDANCE
  // =====================================================

  const filteredRecords = useMemo(() => {
    const now = new Date();

    return attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);

      if (Number.isNaN(recordDate.getTime())) {
        return false;
      }

      switch (filter) {
        // ===============================================
        // THIS MONTH
        // ===============================================

        case "thisMonth":
          return (
            recordDate.getMonth() === now.getMonth() &&
            recordDate.getFullYear() === now.getFullYear()
          );

        // ===============================================
        // LAST MONTH
        // ===============================================

        case "lastMonth": {
          const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1,
          );

          return (
            recordDate.getMonth() === lastMonth.getMonth() &&
            recordDate.getFullYear() === lastMonth.getFullYear()
          );
        }

        // ===============================================
        // LAST 3 MONTHS
        // ===============================================

        case "last3Months": {
          const threeMonthsAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 2,
            1,
          );

          return recordDate >= threeMonthsAgo;
        }

        // ===============================================
        // THIS YEAR
        // ===============================================

        case "thisYear":
          return recordDate.getFullYear() === now.getFullYear();

        // ===============================================
        // ALL
        // ===============================================

        case "all":
        default:
          return true;
      }
    });
  }, [attendanceRecords, filter]);

  // =====================================================
  // ATTENDANCE STATISTICS
  // =====================================================

  const totalSessions = attendanceRecords.length;

  const presentCount = attendanceRecords.filter(
    (record) => record.status === "PRESENT",
  ).length;

  const absentCount = attendanceRecords.filter(
    (record) => record.status === "ABSENT",
  ).length;

  const lateCount = attendanceRecords.filter(
    (record) => record.status === "LATE",
  ).length;

  const attendanceRate =
    totalSessions === 0
      ? 0
      : Math.round((presentCount / totalSessions) * 100);

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="mt-5 flex min-h-100 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-center text-center">
          <Loader2
            size={30}
            className="animate-spin text-blue-600 dark:text-blue-400"
          />

          <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-200">
            Loading attendance records...
          </p>
        </div>
      </div>
    );
  }

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

        {/* Record Attendance */}

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
          ERROR
      ================================================= */}

      {error && (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>

          <button
            type="button"
            onClick={loadAttendance}
            className="text-xs font-semibold text-red-700 underline hover:no-underline dark:text-red-300"
          >
            Retry
          </button>
        </div>
      )}

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
              <XCircle
                size={20}
                className="text-red-600 dark:text-red-400"
              />
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
          childId={childId}
          onClose={() => setShowModal(false)}
          onSave={handleAddAttendance}
        />
      )}
    </div>
  );
};

export default Attendance;