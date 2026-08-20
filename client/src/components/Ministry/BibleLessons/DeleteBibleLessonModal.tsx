import { AlertTriangle, Trash2, X } from "lucide-react";

import type { BibleLesson } from "../../../data/bibleLessonsData";

interface DeleteBibleLessonModalProps {
  lesson: BibleLesson;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteBibleLessonModal = ({
  lesson,
  onClose,
  onConfirm,
}: DeleteBibleLessonModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Delete Bible Lesson
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
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <AlertTriangle size={26} />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Are you sure?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              You are about to delete{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {lesson.title}
              </span>
              . This action cannot be undone.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBibleLessonModal;
