import type { Grade } from "../../data/gradesData";

interface GradeInformationProps {
  grade: Grade;
  memberCount: number;
}

const GradeInformation = ({ grade, memberCount }: GradeInformationProps) => {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        Grade Information
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {/* Teacher */}
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500">Teacher</p>

          <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
            {grade.teacher}
          </p>
        </div>

        {/* Age Range */}
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500">Age Range</p>

          <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
            {grade.ageRange}
          </p>
        </div>

        {/* Members */}
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500">Members</p>

          <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
            {memberCount}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Description
          </p>

          <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
            {grade.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradeInformation;
