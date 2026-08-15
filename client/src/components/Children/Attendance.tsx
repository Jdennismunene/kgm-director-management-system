import {
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const Attendance = () => {
  const attendanceRecords = [
    {
      date: "Aug 9, 2026",
      program: "Sunday School",
      status: "Present",
      time: "9:00 AM",
    },
    {
      date: "Aug 2, 2026",
      program: "Sunday School",
      status: "Present",
      time: "9:05 AM",
    },
    {
      date: "Jul 26, 2026",
      program: "Sunday School",
      status: "Absent",
      time: "-",
    },
    {
      date: "Jul 19, 2026",
      program: "Sunday School",
      status: "Present",
      time: "9:02 AM",
    },
    {
      date: "Jul 12, 2026",
      program: "Sunday School",
      status: "Late",
      time: "9:25 AM",
    },
  ];

  return (
    <div className="mt-5 space-y-5">
      {/* Page Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Attendance
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and track attendance records for this child.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Attendance Rate */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Attendance Rate
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                85%
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
                17
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
                2
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
                1
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

      {/* Attendance History */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
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
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            This Month
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
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

            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr
                  key={`${record.date}-${index}`}
                  className="border-b border-gray-100 last:border-b-0 dark:border-gray-700"
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {record.date}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {record.program}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {record.time}
                  </td>

                  <td className="px-5 py-4">
                    {record.status === "Present" && (
                      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        Present
                      </span>
                    )}

                    {record.status === "Absent" && (
                      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        Absent
                      </span>
                    )}

                    {record.status === "Late" && (
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
      </div>
    </div>
  );
};

export default Attendance;
