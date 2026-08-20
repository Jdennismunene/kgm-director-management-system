import { AlertTriangle, FileText, Trash2, X } from "lucide-react";

import type { DocumentResource } from "../../../data/documentsData";

interface DeleteDocumentModalProps {
  isOpen: boolean;
  document: DocumentResource | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteDocumentModal = ({
  isOpen,
  document,
  onClose,
  onDelete,
}: DeleteDocumentModalProps) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <Trash2 size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Delete Document
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Warning */}
          <div className="flex items-start gap-4 rounded-xl border border-red-100 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-900/10">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
            />

            <div>
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                Are you sure you want to delete this document?
              </p>

              <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                This will permanently remove the document from the ministry
                records.
              </p>
            </div>
          </div>

          {/* Document Information */}
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                <FileText size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Document
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {document.title}
                </p>

                <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                  {document.fileName}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Category
                </p>

                <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {document.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  File Size
                </p>

                <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {document.fileSize}
                </p>
              </div>
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
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDocumentModal;
