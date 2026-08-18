import { Mail, Phone, UserRound } from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface TeacherPersonalInformationProps {
  teacher: Teacher;
}

const TeacherPersonalInformation = ({
  teacher,
}: TeacherPersonalInformationProps) => {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Basic information and contact details for this teacher.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          {/* Full Name */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
              <UserRound
                size={18}
                className="text-gray-500 dark:text-gray-300"
              />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Full Name
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {teacher.name}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
              <Mail size={18} className="text-gray-500 dark:text-gray-300" />
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
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
              <Phone size={18} className="text-gray-500 dark:text-gray-300" />
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

          {/* Teacher ID */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-300">
                #
              </span>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Teacher ID
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                #{String(teacher.id).padStart(4, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account / Employment Information */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Employment Information
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Current employment details for this teacher.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          {/* Status */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  teacher.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              />

              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {teacher.status}
              </span>
            </div>
          </div>

          {/* Joined Date */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Joined Date
            </p>

            <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              {teacher.joinedDate}
            </p>
          </div>

          {/* Assigned Grades */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Assigned Grades
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {teacher.grade.map((grade) => (
                <span
                  key={grade}
                  className="rounded-md bg-[#365452]/10 px-2.5 py-1 text-xs font-medium text-[#365452] dark:bg-[#8eb0ac]/10 dark:text-[#8eb0ac]"
                >
                  {grade}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPersonalInformation;
