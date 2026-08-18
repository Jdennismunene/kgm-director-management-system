import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Users,
} from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface TeacherTeachingProps {
  teacher: Teacher;
}

const TeacherTeaching = ({ teacher }: TeacherTeachingProps) => {
  const teachingStats = [
    {
      label: "Assigned Grades",
      value: teacher.grade.length,
      icon: GraduationCap,
    },
    {
      label: "Classes",
      value: teacher.grade.length,
      icon: BookOpen,
    },
    {
      label: "Students",
      value: 42,
      icon: Users,
    },
    {
      label: "Status",
      value: teacher.status,
      icon: CheckCircle2,
    },
  ];

  const schedule = [
    {
      day: "Sunday",
      time: "8:00 AM - 10:00 AM",
      className: teacher.grade[0] || "Not Assigned",
      subject: "Bible Study",
    },
    {
      day: "Sunday",
      time: "10:30 AM - 12:00 PM",
      className: teacher.grade[1] || teacher.grade[0] || "Not Assigned",
      subject: "Sunday School",
    },
    {
      day: "Wednesday",
      time: "4:00 PM - 5:30 PM",
      className: teacher.grade[0] || "Not Assigned",
      subject: "Bible Lesson",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Teaching Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {teachingStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#365452]/10 dark:bg-[#8eb0ac]/10">
                  <Icon
                    size={19}
                    className="text-[#365452] dark:text-[#8eb0ac]"
                  />
                </div>

                <span className="text-xs font-medium text-gray-400">
                  Current
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Assigned Grades */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Assigned Grades
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Grades currently assigned to this teacher.
          </p>
        </div>

        <div className="p-6">
          {teacher.grade.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {teacher.grade.map((grade) => (
                <div
                  key={grade}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-700/50"
                >
                  <BookOpen
                    size={17}
                    className="text-[#365452] dark:text-[#8eb0ac]"
                  />

                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {grade}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No grades assigned.
            </p>
          )}
        </div>
      </div>

      {/* Teaching Schedule */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#365452]/10 dark:bg-[#8eb0ac]/10">
              <CalendarDays
                size={18}
                className="text-[#365452] dark:text-[#8eb0ac]"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Teaching Schedule
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Current teaching responsibilities and schedule.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 px-6 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-gray-700/30"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.day}
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {item.time}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.className}
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {item.subject}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherTeaching;
