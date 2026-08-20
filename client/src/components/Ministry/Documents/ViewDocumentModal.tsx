import {
  CalendarDays,
  Download,
  FileSpreadsheet,
  FileText,
  Presentation,
  X,
} from "lucide-react";

import type { DocumentResource } from "../../../data/documentsData";

interface ViewDocumentModalProps {
  isOpen: boolean;
  document: DocumentResource | null;
  onClose: () => void;
}

const ViewDocumentModal = ({
  isOpen,
  document,
  onClose,
}: ViewDocumentModalProps) => {
  if (!isOpen || !document) return null;

  const getDocumentIcon = () => {
    switch (document.documentType) {
      case "PDF":
        return <FileText size={30} />;

      case "Word":
        return <FileText size={30} />;

      case "Excel":
        return <FileSpreadsheet size={30} />;

      case "PowerPoint":
        return <Presentation size={30} />;

      case "Text":
        return <FileText size={30} />;

      default:
        return <FileText size={30} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              {getDocumentIcon()}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                {document.title}
              </h2>

              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {document.fileName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6">
          {/* Document information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Type */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Document Type
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {document.documentType}
              </p>
            </div>

            {/* Category */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Category
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {document.category}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>

              <span
                className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  document.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    document.status === "Active"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />

                {document.status}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Description
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">
              {document.description}
            </p>
          </div>

          {/* File information */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              File Information
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  File Name
                </p>

                <p className="mt-1 break-all text-sm font-medium text-gray-900 dark:text-white">
                  {document.fileName}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  File Size
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {document.fileSize}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Date Added
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                  <CalendarDays size={15} className="text-gray-400" />

                  {document.dateAdded}
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Document Preview
            </h3>

            <div className="mt-3 flex min-h-70 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 text-center dark:border-gray-700 dark:bg-gray-900">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                {getDocumentIcon()}
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {document.fileName}
              </p>

              <p className="mt-1 max-w-md text-xs leading-5 text-gray-500 dark:text-gray-400">
                Document preview will be available when the actual uploaded file
                is connected to the system.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Close
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentModal;
