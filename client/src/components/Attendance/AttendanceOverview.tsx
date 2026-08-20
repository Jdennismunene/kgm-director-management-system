import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo } from "react";
import { childrenData } from "../../data/childrenData";
import {
  useAttendance,
  type AttendanceStatus,
} from "../../context/AttendanceContext";

const AttendanceOverview = () => {
  const { attendanceRecords } = useAttendance();

  /* =====================================================
     LATEST ATTENDANCE DATE
  ===================================================== */

  const latestDate = useMemo(() => {
    if (attendanceRecords.length === 0) {
      return "";
    }

    return attendanceRecords.reduce((latest, record) => {
      return record.date > latest ? record.date : latest;
    }, attendanceRecords[0].date);
  }, [attendanceRecords]);

  /* =====================================================
     LATEST ATTENDANCE RECORDS
  ===================================================== */

  const latestRecords = useMemo(() => {
    if (!latestDate) {
      return [];
    }

    return attendanceRecords.filter((record) => record.date === latestDate);
  }, [attendanceRecords, latestDate]);

  /* =====================================================
     ATTENDANCE COUNTS
  ===================================================== */

  const presentCount = useMemo(() => {
    return latestRecords.filter((record) => record.status === "Present").length;
  }, [latestRecords]);

  const absentCount = useMemo(() => {
    return latestRecords.filter((record) => record.status === "Absent").length;
  }, [latestRecords]);

  const lateCount = useMemo(() => {
    return latestRecords.filter((record) => record.status === "Late").length;
  }, [latestRecords]);

  const totalMarked = latestRecords.length;

  /* =====================================================
     ATTENDANCE RATE
     
     Present + Late are considered attended.
  ===================================================== */

  const attendanceRate =
    totalMarked > 0
      ? Math.round(((presentCount + lateCount) / totalMarked) * 100)
      : 0;

  /* =====================================================
     GRADE SUMMARY
  ===================================================== */

  const gradeSummary = useMemo(() => {
    const grades = [
      ...new Set(latestRecords.map((record) => record.className)),
    ];

    return grades.map((className) => {
      const records = latestRecords.filter(
        (record) => record.className === className,
      );

      const present = records.filter(
        (record) => record.status === "Present",
      ).length;

      const late = records.filter((record) => record.status === "Late").length;

      const absent = records.filter(
        (record) => record.status === "Absent",
      ).length;

      const rate =
        records.length > 0
          ? Math.round(((present + late) / records.length) * 100)
          : 0;

      return {
        className,
        total: records.length,
        present,
        late,
        absent,
        rate,
      };
    });
  }, [latestRecords]);

  /* =====================================================
     RECENT ACTIVITY
  ===================================================== */

  const recentRecords = useMemo(() => {
    return [...attendanceRecords]
      .sort((a, b) => {
        if (a.date !== b.date) {
          return b.date.localeCompare(a.date);
        }

        return b.id - a.id;
      })
      .slice(0, 6);
  }, [attendanceRecords]);

  /* =====================================================
     STATUS BADGE
  ===================================================== */

  const getStatusBadge = (status: AttendanceStatus) => {
    if (status === "Present") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle2 size={13} />
          Present
        </span>
      );
    }

    if (status === "Absent") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
          <XCircle size={13} />
          Absent
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
        <Clock3 size={13} />
        Late
      </span>
    );
  };

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

  return (
    <div className="mt-5 space-y-5">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor Sunday School attendance and recent activity.
          </p>
        </div>

        {latestDate && (
          <div className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <CalendarCheck
              size={15}
              className="text-blue-600 dark:text-blue-400"
            />
            Latest attendance: {formatDate(latestDate)}
          </div>
        )}
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {/* Total Children */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <Users size={20} className="text-blue-600 dark:text-blue-400" />
            </div>

            <span className="text-xs text-gray-400">Registered</span>
          </div>

          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {childrenData.length}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Total Children
          </p>
        </div>

        {/* Present */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/20">
            <CheckCircle2
              size={20}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {presentCount}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Present
          </p>
        </div>

        {/* Late */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
            <Clock3
              size={20}
              className="text-yellow-600 dark:text-yellow-400"
            />
          </div>

          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {lateCount}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Late</p>
        </div>

        {/* Absent */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20">
            <XCircle size={20} className="text-red-600 dark:text-red-400" />
          </div>

          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {absentCount}
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Absent
          </p>
        </div>

        {/* Attendance Rate */}

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
          ATTENDANCE BREAKDOWN + GRADE SUMMARY
      ================================================= */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Attendance Breakdown */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Latest Attendance Breakdown
          </h3>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Summary for{" "}
            {latestDate
              ? formatDate(latestDate)
              : "the latest attendance session"}
            .
          </p>

          {totalMarked > 0 ? (
            <div className="mt-6 space-y-5">
              {/* Present */}

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    Present
                  </div>

                  <span className="font-medium text-gray-900 dark:text-white">
                    {presentCount}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${
                        totalMarked ? (presentCount / totalMarked) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Late */}

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                    Late
                  </div>

                  <span className="font-medium text-gray-900 dark:text-white">
                    {lateCount}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-yellow-500"
                    style={{
                      width: `${
                        totalMarked ? (lateCount / totalMarked) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Absent */}

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    Absent
                  </div>

                  <span className="font-medium text-gray-900 dark:text-white">
                    {absentCount}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: `${
                        totalMarked ? (absentCount / totalMarked) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-10 text-center">
              <CalendarCheck
                size={28}
                className="mx-auto text-gray-400 dark:text-gray-500"
              />

              <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                No attendance recorded yet
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Take attendance to see the breakdown here.
              </p>
            </div>
          )}
        </div>

        {/* Grade Summary */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 xl:col-span-2">
          <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Attendance by Grade
            </h3>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Performance of each grade for the latest attendance session.
            </p>
          </div>

          {gradeSummary.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/40">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Grade
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Total
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Present
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Late
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Absent
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Rate
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {gradeSummary.map((item) => (
                    <tr
                      key={item.className}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30"
                    >
                      <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                        {item.className}
                      </td>

                      <td className="px-5 py-4 text-center text-gray-600 dark:text-gray-300">
                        {item.total}
                      </td>

                      <td className="px-5 py-4 text-center font-medium text-green-600 dark:text-green-400">
                        {item.present}
                      </td>

                      <td className="px-5 py-4 text-center font-medium text-yellow-600 dark:text-yellow-400">
                        {item.late}
                      </td>

                      <td className="px-5 py-4 text-center font-medium text-red-600 dark:text-red-400">
                        {item.absent}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {item.rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <CalendarCheck
                size={28}
                className="mx-auto text-gray-400 dark:text-gray-500"
              />

              <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                No attendance data available
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Attendance information will appear here once records are added.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          RECENT ACTIVITY
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Recent Attendance Activity
          </h3>

          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Latest attendance records across all grades and branches.
          </p>
        </div>

        {recentRecords.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentRecords.map((record) => (
              <div
                key={record.id}
                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-gray-50 dark:hover:bg-gray-700/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    {record.childName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {record.childName}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {record.className} • {record.branch}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {formatDate(record.date)}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                      {record.time}
                    </p>
                  </div>

                  {getStatusBadge(record.status)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <CalendarCheck
              size={28}
              className="mx-auto text-gray-400 dark:text-gray-500"
            />

            <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
              No recent attendance activity
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Recent attendance records will appear here after attendance is
              taken.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceOverview;
