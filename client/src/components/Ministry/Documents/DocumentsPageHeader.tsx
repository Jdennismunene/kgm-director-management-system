import { FileText, Plus } from "lucide-react";

interface DocumentsPageHeaderProps {
  onAddDocument: () => void;
}

const DocumentsPageHeader = ({ onAddDocument }: DocumentsPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
          <FileText size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Documents
          </h1>

          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Manage ministry documents, reports, forms, and official records.
          </p>
        </div>
      </div>

      {/* Add Document */}
      <button
        type="button"
        onClick={onAddDocument}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
      >
        <Plus size={18} />
        Add Document
      </button>
    </div>
  );
};

export default DocumentsPageHeader;
