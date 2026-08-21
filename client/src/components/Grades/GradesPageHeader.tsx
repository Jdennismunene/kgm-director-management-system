import { Plus } from "lucide-react";

interface GradesPageHeaderProps {
  onAddClass?: () => void;
}

const GradesPageHeader = ({ onAddClass }: GradesPageHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Classes
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage classes, teachers, and members in your church.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddClass}
        className="flex items-center justify-center gap-2 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543]"
      >
        <Plus size={17} />
        Add Class
      </button>
    </div>
  );
};

export default GradesPageHeader;
