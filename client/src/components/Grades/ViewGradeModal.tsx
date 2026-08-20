import { BookOpen, GraduationCap, Users, X } from "lucide-react";
import type { Grade } from "../../data/gradesData";

interface ViewGradeModalProps {
  grade: Grade | null;
  onClose: () => void;
}

const ViewGradeModal = ({ grade, onClose }: ViewGradeModalProps) => {
  if (!grade) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Grade Details
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View information about this grade.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            title="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 p-6">
          {/* Grade Name */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#365452]/10 dark:bg-[#8eb0ac]/10">
              <BookOpen
                size={19}
                className="text-[#365452] dark:text-[#8eb0ac]"
              />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Grade
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {grade.name}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Description
            </p>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {grade.description || "No description provided."}
            </p>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Teacher */}
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
              <div className="flex items-center gap-2">
                <GraduationCap
                  size={17}
                  className="text-[#365452] dark:text-[#8eb0ac]"
                />

                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Teacher
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {grade.teacher || "Not Assigned"}
              </p>
            </div>

            {/* Age Range */}
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Age Range
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {grade.ageRange}
              </p>
            </div>

            {/* Members */}
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
              <div className="flex items-center gap-2">
                <Users
                  size={17}
                  className="text-[#365452] dark:text-[#8eb0ac]"
                />

                <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Members
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {grade.members}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                  grade.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {grade.status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] dark:bg-[#8eb0ac] dark:text-gray-900 dark:hover:bg-[#789c98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewGradeModal;
