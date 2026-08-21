import { AlertTriangle, Trash2, X } from "lucide-react";

import type { TeacherSeminar } from "../../../data/teachersSeminarsData";

interface DeleteTeachersSeminarModalProps {
  isOpen: boolean;
  seminar: TeacherSeminar | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteTeachersSeminarModal = ({
  isOpen,
  seminar,
  onClose,
  onConfirm,
}: DeleteTeachersSeminarModalProps) => {
  if (!isOpen || !seminar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Teachers Seminar
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
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
                Delete this seminar?
              </h3>

              <p className="mt-2 text-sm leading-5 text-gray-500 dark:text-gray-400">
                You are about to delete:
              </p>

              <p className="mt-2 font-medium text-gray-900 dark:text-white">
                {seminar.title}
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {seminar.year} • {seminar.location}
              </p>

              <p className="mt-4 text-sm leading-5 text-gray-500 dark:text-gray-400">
                This action cannot be undone. The seminar record will be
                permanently removed from the current records.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={17} />
            Delete Seminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeachersSeminarModal;
