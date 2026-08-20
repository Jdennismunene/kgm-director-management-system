import { AlertTriangle, Trash2, X } from "lucide-react";

import type { PhotoResource } from "../../../data/photosData";

interface DeletePhotoModalProps {
  isOpen: boolean;
  photo: PhotoResource | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeletePhotoModal = ({
  isOpen,
  photo,
  onClose,
  onDelete,
}: DeletePhotoModalProps) => {
  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <Trash2 size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Delete Photo
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
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Warning */}
          <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-900/10">
            <div className="mt-0.5 shrink-0 text-red-500 dark:text-red-400">
              <AlertTriangle size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                Are you sure you want to delete this photo?
              </p>

              <p className="mt-1 text-xs leading-5 text-red-600 dark:text-red-400">
                The photo will be permanently removed from the church media
                library.
              </p>
            </div>
          </div>

          {/* Photo Information */}
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                <Trash2 size={18} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {photo.title}
                </p>

                <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                  {photo.fileName}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {photo.category}
                  </span>

                  <span className="text-gray-300 dark:text-gray-600">•</span>

                  <span className="text-xs text-gray-400">{photo.event}</span>
                </div>
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
            Delete Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePhotoModal;
