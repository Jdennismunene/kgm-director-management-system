import { ArchiveRestore, RotateCcw, X } from "lucide-react";

import type { ArchiveResource } from "../../../data/archivesData";

interface RestoreArchiveModalProps {
  isOpen: boolean;
  archive: ArchiveResource | null;
  onClose: () => void;
  onRestore: (archive: ArchiveResource) => void;
}

const RestoreArchiveModal = ({
  isOpen,
  archive,
  onClose,
  onRestore,
}: RestoreArchiveModalProps) => {
  if (!isOpen || !archive) return null;

  const handleRestore = () => {
    onRestore(archive);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <ArchiveRestore size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Restore Resource
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Move this resource back to active resources.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="rounded-xl border border-teal-100 bg-teal-50 p-4 dark:border-teal-900/40 dark:bg-teal-900/10">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-teal-600 shadow-sm dark:bg-gray-800 dark:text-teal-400">
                <ArchiveRestore size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-teal-600 dark:text-teal-400">
                  Archived Resource
                </p>

                <p className="mt-1 wrap-break-word text-sm font-bold text-gray-900 dark:text-white">
                  {archive.title}
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {archive.type} • {archive.category}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
            Are you sure you want to restore{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{archive.title}"
            </span>
            ? This resource will be moved out of Archives and returned to active
            resource management.
          </p>

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Archived Date
              </span>

              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                {archive.archivedDate}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Original Date
              </span>

              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                {archive.originalDate}
              </span>
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
            onClick={handleRestore}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <RotateCcw size={16} />
            Restore Resource
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreArchiveModal;
