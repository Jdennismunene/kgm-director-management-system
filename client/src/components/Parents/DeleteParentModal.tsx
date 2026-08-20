import { AlertTriangle, Trash2, X } from "lucide-react";
import type { Parent } from "../../data/parentsData";

interface DeleteParentModalProps {
  parent: Parent;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteParentModal = ({
  parent,
  onClose,
  onConfirm,
}: DeleteParentModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Parent
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <AlertTriangle size={26} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
              Delete {parent.name}?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this parent record? This action
              cannot be undone.
            </p>

            {parent.childrenIds.length > 0 && (
              <div className="mt-4 w-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left dark:border-amber-900/40 dark:bg-amber-900/20">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                  This parent currently has {parent.childrenIds.length} linked{" "}
                  {parent.childrenIds.length === 1 ? "child" : "children"}.
                </p>

                <p className="mt-1 text-xs text-amber-600 dark:text-amber-500">
                  Deleting the parent record will not delete the children's
                  records.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Trash2 size={17} />
            Delete Parent
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteParentModal;
