import {
  CalendarDays,
  Edit,
  FileText,
  UserPlus,
  UserRoundX,
} from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface TeacherHistoryProps {
  teacher: Teacher;
}

const TeacherHistory = ({ teacher }: TeacherHistoryProps) => {
  const history = [
    {
      id: 1,
      title: "Teacher Profile Created",
      description: `${teacher.name}'s teacher profile was created.`,
      date: teacher.joinedDate,
      icon: UserPlus,
    },
    {
      id: 2,
      title: "Teaching Assignment Updated",
      description:
        teacher.grade.length > 0
          ? `Assigned grades: ${teacher.grade.join(", ")}.`
          : "No grades are currently assigned to this teacher.",
      date: "Aug 12, 2026",
      icon: Edit,
    },
    {
      id: 3,
      title: "Teacher Information Updated",
      description: `Contact information for ${teacher.name} was updated.`,
      date: "Aug 14, 2026",
      icon: FileText,
    },
    {
      id: 4,
      title:
        teacher.status === "Active"
          ? "Teacher Activated"
          : "Teacher Deactivated",
      description:
        teacher.status === "Active"
          ? `${teacher.name} is currently active and teaching.`
          : `${teacher.name} is currently inactive.`,
      date: "Aug 16, 2026",
      icon: teacher.status === "Active" ? CalendarDays : UserRoundX,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Teacher History
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            A record of important activities and changes made to this teacher
            profile.
          </p>
        </div>

        {/* Timeline */}
        <div className="p-6">
          {history.length > 0 ? (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute bottom-5 left-5 top-5 w-px bg-gray-200 dark:bg-gray-700" />

              <div className="space-y-7">
                {history.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.id} className="relative flex gap-4">
                      {/* Icon */}
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Icon
                          size={17}
                          className="text-[#365452] dark:text-[#8eb0ac]"
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 pt-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>

                          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                            <CalendarDays size={13} />
                            {item.date}
                          </span>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <CalendarDays
                size={32}
                className="mx-auto text-gray-400 dark:text-gray-500"
              />

              <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                No history available
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                There are no recorded activities for this teacher yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Current Record */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Current Record
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Status */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  teacher.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              />

              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {teacher.status}
              </p>
            </div>
          </div>

          {/* Grades */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Grades
            </p>

            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
              {teacher.grade.length}
            </p>
          </div>

          {/* Joined */}
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Joined
            </p>

            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
              {teacher.joinedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHistory;
