import { AlertTriangle, Trash2, X } from "lucide-react";

import type { BaptismDocument } from "../../../data/baptismDocumentationData";

interface DeleteBaptismDocumentModalProps {
  isOpen: boolean;
  document: BaptismDocument | null;
  onClose: () => void;
  onConfirm: (document: BaptismDocument) => void;
}

const DeleteBaptismDocumentModal = ({
  isOpen,
  document,
  onClose,
  onConfirm,
}: DeleteBaptismDocumentModalProps) => {
  if (!isOpen || !document) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Document
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle
                size={22}
                className="text-red-600 dark:text-red-400"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Are you sure?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                You are about to delete the following baptism document:
              </p>

              <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {document.documentName}
                </p>

                <p className="mt-1 break-all text-xs text-gray-500 dark:text-gray-400">
                  {document.fileName || "No file attached"}
                </p>
              </div>

              <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(document)}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={17} />
            Delete Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBaptismDocumentModal;
