import { AlertTriangle, X } from "lucide-react";
import type { Child } from "../../data/childrenData";

interface DeleteChildModalProps {
  child: Child | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteChildModal = ({
  child,
  onClose,
  onConfirm,
}: DeleteChildModalProps) => {
  if (!child) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl dark:shadow-black/40 overflow-hidden transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Delete Child
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              w-8
              h-8
              rounded-lg
              flex
              items-center
              justify-center
              text-gray-500
              dark:text-gray-400
              hover:bg-gray-100
              dark:hover:bg-gray-800
              hover:text-gray-700
              dark:hover:text-gray-200
              transition
              cursor-pointer
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            {/* Warning Icon */}
            <div
              className="
                w-11
                h-11
                rounded-full
                bg-red-50
                dark:bg-red-950/40
                text-red-600
                dark:text-red-400
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <AlertTriangle size={22} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Are you sure?
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-6">
                You are about to permanently delete{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {child.name}
                </span>
                .
              </p>

              <p className="mt-2 text-xs text-red-500 dark:text-red-400">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800/70 border-t border-gray-200 dark:border-gray-700">
          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="
              px-4
              py-2
              rounded-lg
              border
              border-gray-300
              dark:border-gray-700
              bg-white
              dark:bg-gray-900
              text-sm
              font-medium
              text-gray-700
              dark:text-gray-200
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition
              cursor-pointer
            "
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={onConfirm}
            className="
              px-4
              py-2
              rounded-lg
              bg-red-600
              hover:bg-red-700
              dark:hover:bg-red-500
              text-white
              text-sm
              font-medium
              transition
              cursor-pointer
            "
          >
            Delete Child
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChildModal;
