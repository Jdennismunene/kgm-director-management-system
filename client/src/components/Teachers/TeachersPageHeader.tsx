import { Plus } from "lucide-react";

interface TeachersPageHeaderProps {
  onAddTeacher: () => void;
}

const TeachersPageHeader = ({ onAddTeacher }: TeachersPageHeaderProps) => {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-2 text-sm">
        <span className="text-gray-500 dark:text-gray-400">Teachers</span>

        <span className="text-gray-400 dark:text-gray-600">/</span>

        <span className="font-medium text-gray-700 dark:text-gray-200">
          All Teachers
        </span>
      </div>

      {/* Header Content */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            All Teachers
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage all Sunday School teachers and their information.
          </p>
        </div>

        {/* Add Teacher Button */}
        <button
          onClick={onAddTeacher}
          className="flex items-center gap-2 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2d4745] dark:bg-[#466b68] dark:hover:bg-[#527b77]"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>
    </div>
  );
};

export default TeachersPageHeader;
