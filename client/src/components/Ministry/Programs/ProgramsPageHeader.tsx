import { Download, Plus } from "lucide-react";

interface ProgramsPageHeaderProps {
  onAddProgram: () => void;
  onExport: () => void;
}

const ProgramsPageHeader = ({
  onAddProgram,
  onExport,
}: ProgramsPageHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Programs
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and track KGM programs across different years.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Download size={18} />
          Export
        </button>

        <button
          type="button"
          onClick={onAddProgram}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
        >
          <Plus size={18} />
          Add Program
        </button>
      </div>
    </div>
  );
};

export default ProgramsPageHeader;
