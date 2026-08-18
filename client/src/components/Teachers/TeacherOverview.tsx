import {
  BookOpen,
  CalendarDays,
  Clock3,
  Mail,
  Phone,
  UserRound,
  Users,
} from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface TeacherOverviewProps {
  teacher: Teacher;
}

const TeacherOverview = ({ teacher }: TeacherOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Quick Information */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Status */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
            <UserRound
              size={19}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Current Status
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            {teacher.status}
          </p>
        </div>

        {/* Assigned Grades */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <BookOpen size={19} className="text-blue-600 dark:text-blue-400" />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Assigned Grades
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            {teacher.grade.length}
          </p>
        </div>

        {/* Joined Date */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <CalendarDays
              size={19}
              className="text-purple-600 dark:text-purple-400"
            />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">Joined On</p>

          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            {teacher.joinedDate}
          </p>
        </div>

        {/* Teacher ID */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
            <Users size={19} className="text-orange-600 dark:text-orange-400" />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">Teacher ID</p>

          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            #{String(teacher.id).padStart(4, "0")}
          </p>
        </div>
      </div>

      {/* Main Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Contact Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Teacher's primary contact details.
            </p>
          </div>

          <div className="space-y-5 p-6">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <Mail size={17} className="text-gray-500 dark:text-gray-300" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Email Address
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <Phone size={17} className="text-gray-500 dark:text-gray-300" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Phone Number
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.phone}
                </p>
              </div>
            </div>

            {/* Joined */}
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <Clock3
                  size={17}
                  className="text-gray-500 dark:text-gray-300"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Joined Date
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.joinedDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Information */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Teaching Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Current teaching responsibilities.
            </p>
          </div>

          <div className="p-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Assigned Grades
            </p>

            {teacher.grade.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {teacher.grade.map((grade) => (
                  <span
                    key={grade}
                    className="rounded-lg bg-[#365452]/10 px-3 py-2 text-sm font-medium text-[#365452] dark:bg-[#8eb0ac]/10 dark:text-[#8eb0ac]"
                  >
                    {grade}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500">
                No grades assigned.
              </p>
            )}

            {/* Status */}
            <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-700">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Teaching Status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    teacher.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                />

                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.status === "Active"
                    ? "Currently teaching"
                    : "Not currently teaching"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Recent activity associated with this teacher.
          </p>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <BookOpen
                size={17}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Teaching assignment updated
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Assigned grades were updated.
              </p>
            </div>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              Recently
            </span>
          </div>

          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <UserRound
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Teacher profile created
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Teacher profile was added to the system.
              </p>
            </div>

            <span className="text-xs text-gray-400 dark:text-gray-500">
              {teacher.joinedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
