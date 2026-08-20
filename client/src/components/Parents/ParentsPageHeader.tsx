import { Plus, UsersRound } from "lucide-react";

interface ParentsPageHeaderProps {
  onAddParent: () => void;
}

const ParentsPageHeader = ({ onAddParent }: ParentsPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Heading */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
          <UsersRound size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Parents
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and keep track of parents and guardians.
          </p>
        </div>
      </div>

      {/* Add Parent Button */}
      <button
        type="button"
        onClick={onAddParent}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        <Plus size={18} />
        Add Parent
      </button>
    </div>
  );
};

export default ParentsPageHeader;
