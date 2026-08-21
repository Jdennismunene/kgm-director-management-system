import { FilePlus2, FileText } from "lucide-react";

interface BaptismDocumentationPageHeaderProps {
  onAddDocument: () => void;
}

const BaptismDocumentationPageHeader = ({
  onAddDocument,
}: BaptismDocumentationPageHeaderProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30">
          <FileText size={22} className="text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Baptism Documentation
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage baptism certificates, consent forms, registration forms, and
            other related documents.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddDocument}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        <FilePlus2 size={18} />
        Add Document
      </button>
    </div>
  );
};

export default BaptismDocumentationPageHeader;
