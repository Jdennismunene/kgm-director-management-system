import { CalendarDays } from "lucide-react";

import type { AttendanceRecord } from "../../services/attendanceService";

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

const AttendanceTable = ({ records }: AttendanceTableProps) => {
  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (time?: string | null) => {
    if (!time) {
      return "-";
    }

    return time;
  };

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
          <CalendarDays
            size={22}
            className="text-gray-400 dark:text-gray-300"
          />
        </div>

        <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
          No attendance records
        </h4>

        <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500 dark:text-gray-400">
          There are no attendance records for the selected period.
        </p>
      </div>
    );
  }

  // =====================================================
  // TABLE
  // =====================================================

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-162.5 text-left">
        {/* =================================================
            TABLE HEADER
        ================================================= */}

        <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
          <tr>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
              Date
            </th>

            <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
              Program
            </th>

            <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
              Time
            </th>

            <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
              Status
            </th>
          </tr>
        </thead>

        {/* =================================================
            TABLE BODY
        ================================================= */}

        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className="border-b border-gray-100 last:border-b-0 dark:border-gray-700"
            >
              {/* Date */}

              <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">
                {formatDate(record.date)}
              </td>

              {/* Program */}

              <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                {record.program}
              </td>

              {/* Time */}

              <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                {formatTime(record.time)}
              </td>

              {/* Status */}

              <td className="px-5 py-4">
                {record.status === "PRESENT" && (
                  <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    Present
                  </span>
                )}

                {record.status === "ABSENT" && (
                  <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    Absent
                  </span>
                )}

                {record.status === "LATE" && (
                  <span className="inline-flex rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Late
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
