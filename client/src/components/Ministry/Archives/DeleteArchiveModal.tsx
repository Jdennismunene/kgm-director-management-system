import { AlertTriangle, Trash2, X } from "lucide-react";

import type { ArchiveResource } from "../../../data/archivesData";

interface DeleteArchiveModalProps {
  isOpen: boolean;
  archive: ArchiveResource | null;
  onClose: () => void;
  onDelete: (archive: ArchiveResource) => void;
}

const DeleteArchiveModal = ({
  isOpen,
  archive,
  onClose,
  onDelete,
}: DeleteArchiveModalProps) => {
  if (!isOpen || !archive) return null;

  const handleDelete = () => {
    onDelete(archive);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <Trash2 size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Delete Archive
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Permanently remove this archived resource.
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
          {/* Warning */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-900/10">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm dark:bg-gray-800 dark:text-red-400">
                <AlertTriangle size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                  Permanent deletion
                </p>

                <p className="mt-1 text-xs leading-5 text-red-600/80 dark:text-red-400/80">
                  This action cannot be undone. The archived resource will be
                  permanently removed from the system.
                </p>
              </div>
            </div>
          </div>

          {/* Resource */}
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <p className="text-xs font-medium text-gray-400">
              Archived Resource
            </p>

            <p className="mt-1 wrap-break-word text-sm font-bold text-gray-900 dark:text-white">
              {archive.title}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {archive.type}
              </span>

              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {archive.category}
              </span>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              "{archive.title}"
            </span>
            ?
          </p>
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
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteArchiveModal;
