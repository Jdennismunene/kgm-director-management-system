import { AlertTriangle, Trash2, X } from "lucide-react";
import type { Grade } from "../../data/gradesData";

interface DeleteGradeModalProps {
  grade: Grade | null;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const DeleteGradeModal = ({
  grade,
  onClose,
  onDelete,
}: DeleteGradeModalProps) => {
  if (!grade) {
    return null;
  }

  const handleDelete = () => {
    onDelete(grade.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Grade
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            title="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle
                size={21}
                className="text-red-600 dark:text-red-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Are you sure you want to delete this grade?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                You are about to delete{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {grade.name}
                </span>
                .
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                This action will remove the grade from the grade list. Make sure
                you really want to continue.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={17} />
            Delete Grade
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteGradeModal;
