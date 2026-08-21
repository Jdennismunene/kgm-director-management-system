import { Droplets, Plus } from "lucide-react";

interface BaptismRecordsPageHeaderProps {
  onAdd: () => void;
}

const BaptismRecordsPageHeader = ({ onAdd }: BaptismRecordsPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Information */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
          <Droplets size={22} className="text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Baptism Records
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage baptism records, baptism details, and baptism status.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Baptism Record
        </button>
      </div>
    </div>
  );
};

export default BaptismRecordsPageHeader;
