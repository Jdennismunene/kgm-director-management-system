import { CalendarDays, CheckCircle2, CircleX, Clock3, Save, Users, RotateCcw, Check,} from "lucide-react";
import { useMemo, useState } from "react";
import { childrenData } from "../../data/childrenData";
import { useAttendance } from "../../context/AttendanceContext";

type AttendanceStatus = "Present" | "Absent" | "Late";

interface AttendanceMark {
  childId: number;
  status: AttendanceStatus;
}

const TakeAttendance = () => {
  const { addAttendanceSession } = useAttendance();
  const [date, setDate] = useState("2026-08-19");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [attendance, setAttendance] = useState<AttendanceMark[]>([]);

  const [showSuccess, setShowSuccess] = useState(false);

  /* =====================================================
     GET UNIQUE BRANCHES
  ===================================================== */

  const branches = useMemo(() => {
    return [...new Set(childrenData.map((child) => child.branch))];
  }, []);

  /* =====================================================
     GET UNIQUE CLASSES
  ===================================================== */

  const classes = useMemo(() => {
    return [...new Set(childrenData.map((child) => child.className))];
  }, []);

  /* =====================================================
     FILTER CHILDREN
  ===================================================== */

  const filteredChildren = useMemo(() => {
    return childrenData.filter((child) => {
      const matchesBranch = !selectedBranch || child.branch === selectedBranch;

      const matchesClass = !selectedClass || child.className === selectedClass;

      return matchesBranch && matchesClass;
    });
  }, [selectedBranch, selectedClass]);

  /* =====================================================
     GET STATUS FOR CHILD
  ===================================================== */

  const getStatus = (childId: number): AttendanceStatus | undefined => {
    return attendance.find((item) => item.childId === childId)?.status;
  };

  /* =====================================================
     MARK ATTENDANCE
  ===================================================== */

  const markAttendance = (childId: number, status: AttendanceStatus) => {
    setAttendance((current) => {
      const existing = current.find((item) => item.childId === childId);

      if (existing) {
        return current.map((item) =>
          item.childId === childId ? { ...item, status } : item,
        );
      }

      return [
        ...current,
        {
          childId,
          status,
        },
      ];
    });
  };

  /* =====================================================
     MARK ALL PRESENT
  ===================================================== */

  const markAllPresent = () => {
    setAttendance((current) => {
      const updated = [...current];

      filteredChildren.forEach((child) => {
        const existingIndex = updated.findIndex(
          (item) => item.childId === child.id,
        );

        if (existingIndex >= 0) {
          updated[existingIndex] = {
            childId: child.id,
            status: "Present",
          };
        } else {
          updated.push({
            childId: child.id,
            status: "Present",
          });
        }
      });

      return updated;
    });
  };

  /* =====================================================
     CLEAR ATTENDANCE
  ===================================================== */

  const clearAttendance = () => {
    setAttendance((current) =>
      current.filter(
        (item) => !filteredChildren.some((child) => child.id === item.childId),
      ),
    );
  };

  /* =====================================================
     ATTENDANCE COUNTS
  ===================================================== */

  const markedCount = filteredChildren.filter((child) =>
    getStatus(child.id),
  ).length;

  const presentCount = filteredChildren.filter(
    (child) => getStatus(child.id) === "Present",
  ).length;

  const lateCount = filteredChildren.filter(
    (child) => getStatus(child.id) === "Late",
  ).length;

  const absentCount = filteredChildren.filter(
    (child) => getStatus(child.id) === "Absent",
  ).length;

  const allMarked =
    filteredChildren.length > 0 && markedCount === filteredChildren.length;

  /* =====================================================
     SAVE ATTENDANCE
  ===================================================== */

  const handleSave = () => {
    if (!date) {
      return;
    }

    if (filteredChildren.length === 0) {
      return;
    }

    if (!allMarked) {
      return;
    }

    const sessionRecords = filteredChildren.map((child) => ({
      childId: child.id,
      childName: child.name,
      parent: child.parent,
      branch: child.branch,
      className: child.className,
      status: getStatus(child.id)!,
    }));

    addAttendanceSession(sessionRecords, date);

    setShowSuccess(true);

    setAttendance([]);

    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const resetFilters = () => {
    setSelectedBranch("");
    setSelectedClass("");
  };

  return (
    <div className="mt-5 space-y-5">
      {/* =================================================
          SUCCESS NOTIFICATION
      ================================================= */}

      {showSuccess && (
        <div className="fixed right-6 top-6 z-50 flex w-full max-w-sm items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-4 shadow-lg dark:border-green-800 dark:bg-gray-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2
              size={19}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Attendance saved successfully
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Attendance has been recorded for the selected children.
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <CalendarDays
              size={20}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Take Attendance
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select a date, branch and class, then mark each child's
              attendance.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Date */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Attendance Date
            </label>

            <div className="relative">
              <CalendarDays
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
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
              onChange={(event) => {
                setSelectedBranch(event.target.value);
                setAttendance([]);
              }}
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

          {/* Class */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Class / Grade
            </label>

            <select
              value={selectedClass}
              onChange={(event) => {
                setSelectedClass(event.target.value);
                setAttendance([]);
              }}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
            >
              <option value="">All Classes</option>

              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Actions */}

        {(selectedBranch || selectedClass) && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <RotateCcw size={14} />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* =================================================
          ATTENDANCE CARD
      ================================================= */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}

        <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <Users size={18} className="text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Children
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                {filteredChildren.length} children found
              </p>
            </div>
          </div>

          {filteredChildren.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {/* Mark All */}

              <button
                type="button"
                onClick={markAllPresent}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
              >
                <CheckCircle2 size={15} />
                Mark All Present
              </button>

              {/* Clear */}

              {markedCount > 0 && (
                <button
                  type="button"
                  onClick={clearAttendance}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <RotateCcw size={14} />
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        {filteredChildren.length > 0 && (
          <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-700 sm:grid-cols-4">
            <div className="border-r border-gray-200 px-5 py-4 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">Marked</p>

              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {markedCount}
                <span className="text-sm font-normal text-gray-400">
                  {" "}
                  / {filteredChildren.length}
                </span>
              </p>
            </div>

            <div className="border-r border-gray-200 px-5 py-4 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Present
              </p>

              <p className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">
                {presentCount}
              </p>
            </div>

            <div className="border-r border-gray-200 px-5 py-4 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">Late</p>

              <p className="mt-1 text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                {lateCount}
              </p>
            </div>

            <div className="px-5 py-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Absent</p>

              <p className="mt-1 text-lg font-semibold text-red-600 dark:text-red-400">
                {absentCount}
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            TABLE
        ================================================= */}

        {filteredChildren.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/40">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Child
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Class
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Parent / Guardian
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Attendance
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredChildren.map((child) => {
                  const status = getStatus(child.id);

                  return (
                    <tr
                      key={child.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/30"
                    >
                      {/* Child */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            {child.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {child.name}
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Age {child.age}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Class */}

                      <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {child.className}
                      </td>

                      {/* Parent */}

                      <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                        {child.parent}
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          {/* Present */}

                          <button
                            type="button"
                            onClick={() => markAttendance(child.id, "Present")}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                              status === "Present"
                                ? "bg-green-600 text-white"
                                : "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                            }`}
                          >
                            <CheckCircle2 size={14} />
                            Present
                          </button>

                          {/* Late */}

                          <button
                            type="button"
                            onClick={() => markAttendance(child.id, "Late")}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                              status === "Late"
                                ? "bg-yellow-500 text-white"
                                : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                            }`}
                          >
                            <Clock3 size={14} />
                            Late
                          </button>

                          {/* Absent */}

                          <button
                            type="button"
                            onClick={() => markAttendance(child.id, "Absent")}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                              status === "Absent"
                                ? "bg-red-600 text-white"
                                : "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                            }`}
                          >
                            <CircleX size={14} />
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <Users
              size={28}
              className="mx-auto text-gray-400 dark:text-gray-500"
            />

            <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
              No children found
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try changing the branch or class filter.
            </p>
          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        {filteredChildren.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/70 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {markedCount} of {filteredChildren.length} children marked
              </p>

              {!allMarked && (
                <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-400">
                  Please mark all children before saving.
                </p>
              )}

              {allMarked && (
                <p className="mt-1 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <Check size={13} />
                  Everyone has been marked.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={!allMarked}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition ${
                allMarked
                  ? "cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  : "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <Save size={17} />
              Save Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeAttendance;
