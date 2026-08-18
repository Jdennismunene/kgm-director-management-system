import {
  Mail,
  Phone,
  X,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface TeacherDetailsModalProps {
  teacher: Teacher | null;
  onClose: () => void;
}

const TeacherDetailsModal = ({
  teacher,
  onClose,
}: TeacherDetailsModalProps) => {
  if (!teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Teacher Details
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View complete information about this teacher.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Teacher Profile */}
        <div className="p-6">
          <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
            {/* Avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#365654] text-lg font-semibold text-white">
              {teacher.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {teacher.name}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Teacher ID: #{teacher.id}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                teacher.status === "Active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {teacher.status}
            </span>
          </div>

          {/* Information */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Phone */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Phone Number
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {teacher.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Mail size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email Address
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-gray-900 dark:text-white">
                    {teacher.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Classes */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <BookOpen size={19} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Classes Assigned
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {teacher.grade.map((className) => (
                      <span
                        key={className}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Joined Date */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Joined On
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {teacher.joinedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end border-t border-gray-200 pt-5 dark:border-gray-700">
            <button
              onClick={onClose}
              className="rounded-lg bg-[#365654] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2d4846]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsModal;
