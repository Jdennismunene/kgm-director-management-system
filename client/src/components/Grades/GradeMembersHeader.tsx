import { ArrowLeft, Users } from "lucide-react";
import type { Grade } from "../../data/gradesData";

interface GradeMembersHeaderProps {
  grade: Grade;
  onBack: () => void;
}

const GradeMembersHeader = ({ grade, onBack }: GradeMembersHeaderProps) => {
  return (
    <>
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#365452] dark:text-gray-400 dark:hover:text-[#8eb0ac]"
      >
        <ArrowLeft size={17} />
        Back to Grades
      </button>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#365452]/10 dark:bg-[#8eb0ac]/10">
                <Users
                  size={21}
                  className="text-[#365452] dark:text-[#8eb0ac]"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {grade.name} Members
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  View and manage children assigned to this grade.
                </p>
              </div>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
              grade.status === "Active"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {grade.status}
          </span>
        </div>
      </div>
    </>
  );
};

export default GradeMembersHeader;
