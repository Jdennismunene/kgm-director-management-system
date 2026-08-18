import { AlertTriangle, Trash2, X } from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface DeleteTeacherModalProps {
  teacher: Teacher;
  onClose: () => void;
  onDelete: (teacher: Teacher) => void;
}

const DeleteTeacherModal = ({
  teacher,
  onClose,
  onDelete,
}: DeleteTeacherModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Teacher
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle
                size={24}
                className="text-red-600 dark:text-red-400"
              />
            </div>
          </div>

          <h3 className="text-center text-base font-semibold text-gray-900 dark:text-white">
            Are you sure you want to delete this teacher?
          </h3>

          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            You are about to delete{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {teacher.name}
            </span>
            . This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 p-5 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onDelete(teacher)}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
          >
            <Trash2 size={17} />
            Delete Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeacherModal;
