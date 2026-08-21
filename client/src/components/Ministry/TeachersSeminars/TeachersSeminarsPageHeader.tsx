import { Download, Plus, UsersRound } from "lucide-react";

interface TeachersSeminarsPageHeaderProps {
  onAdd: () => void;
  onExport: () => void;
}

const TeachersSeminarsPageHeader = ({
  onAdd,
  onExport,
}: TeachersSeminarsPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Title */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30">
          <UsersRound size={22} className="text-teal-600 dark:text-teal-400" />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Teachers Seminars
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track teachers seminars conducted across successive
            years.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <Download size={17} />
          Export
        </button>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
        >
          <Plus size={17} />
          Add Seminar
        </button>
      </div>
    </div>
  );
};

export default TeachersSeminarsPageHeader;
