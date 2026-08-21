import { AlertTriangle, X } from "lucide-react";
import type { Program } from "../../../data/programsData";

interface DeleteProgramModalProps {
  isOpen: boolean;
  program: Program | null;
  onClose: () => void;
  onConfirm: (program: Program) => void;
}

const DeleteProgramModal = ({
  isOpen,
  program,
  onClose,
  onConfirm,
}: DeleteProgramModalProps) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Program
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
        <div className="px-6 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle
                size={24}
                className="text-red-600 dark:text-red-400"
              />
            </div>

            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Delete this program?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                "{program.name}"
              </span>
              ?
            </p>

            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Actions */}
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
            onClick={() => onConfirm(program)}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete Program
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProgramModal;
