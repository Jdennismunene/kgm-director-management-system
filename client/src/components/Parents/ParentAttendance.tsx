import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  CircleX,
  TrendingUp,
} from "lucide-react";

import type { Parent } from "../../data/parentsData";
import { childrenData } from "../../data/childrenData";

interface ParentAttendanceProps {
  parent: Parent;
}

const ParentAttendance = ({ parent }: ParentAttendanceProps) => {
  const linkedChildren = childrenData.filter((child) =>
    parent.childrenIds.includes(child.id),
  );

  // Dummy attendance data for now.
  // Later this will come from the attendance system/database.
  const attendanceData = linkedChildren.map((child, index) => {
    const present = 18 + index;
    const late = index + 1;
    const absent = index;
    const total = present + late + absent;

    const attendanceRate = Math.round((present / total) * 100);

    return {
      child,
      present,
      late,
      absent,
      total,
      attendanceRate,
    };
  });

  const totalPresent = attendanceData.reduce(
    (sum, item) => sum + item.present,
    0,
  );

  const totalLate = attendanceData.reduce((sum, item) => sum + item.late, 0);

  const totalAbsent = attendanceData.reduce(
    (sum, item) => sum + item.absent,
    0,
  );

  const totalAttendance = totalPresent + totalLate + totalAbsent;

  const overallRate =
    totalAttendance > 0
      ? Math.round((totalPresent / totalAttendance) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Children Attendance
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Attendance summary for {parent.name}'s children.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Overall Rate */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Overall Rate
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {overallRate}%
              </p>
            </div>

            <div className="rounded-xl bg-teal-100 p-3 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        {/* Present */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Present
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                {totalPresent}
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 size={22} />
            </div>
          </div>
        </div>

        {/* Late */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Late</p>

              <p className="mt-2 text-2xl font-bold text-orange-600 dark:text-orange-400">
                {totalLate}
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <Clock3 size={22} />
            </div>
          </div>
        </div>

        {/* Absent */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Absent</p>

              <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
                {totalAbsent}
              </p>
            </div>

            <div className="rounded-xl bg-red-100 p-3 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <CircleX size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Child Attendance */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <CalendarCheck
              size={18}
              className="text-teal-600 dark:text-teal-400"
            />

            <h3 className="font-semibold text-gray-900 dark:text-white">
              Attendance by Child
            </h3>
          </div>
        </div>

        {attendanceData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-175">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Child
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Present
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Late
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Absent
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Attendance Rate
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((item) => (
                  <tr
                    key={item.child.id}
                    className="border-b border-gray-100 last:border-0 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                          {item.child.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.child.name}
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.child.className}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
                      {item.present}
                    </td>

                    <td className="px-6 py-4 text-center text-sm font-medium text-orange-600 dark:text-orange-400">
                      {item.late}
                    </td>

                    <td className="px-6 py-4 text-center text-sm font-medium text-red-600 dark:text-red-400">
                      {item.absent}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-teal-500"
                            style={{
                              width: `${item.attendanceRate}%`,
                            }}
                          />
                        </div>

                        <span className="w-10 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {item.attendanceRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <CalendarCheck
              size={32}
              className="mx-auto text-gray-300 dark:text-gray-600"
            />

            <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              No children linked
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Attendance information will appear here once children are linked
              to this parent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentAttendance;
