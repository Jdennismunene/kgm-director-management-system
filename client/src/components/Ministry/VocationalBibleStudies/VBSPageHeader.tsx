import { Download, Plus } from "lucide-react";

interface VBSPageHeaderProps {
  onAddVBS: () => void;
  onExport: () => void;
}

const VBSPageHeader = ({ onAddVBS, onExport }: VBSPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Vocational Bible Studies
          </h1>

          <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
            Ministry
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and track Vocational Bible Studies conducted across different
          years and church locations.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <Download size={18} />
          Export
        </button>

        <button
          type="button"
          onClick={onAddVBS}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
        >
          <Plus size={18} />
          Add VBS
        </button>
      </div>
    </div>
  );
};

export default VBSPageHeader;
