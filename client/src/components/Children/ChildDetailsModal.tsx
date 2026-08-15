import { X, User, Phone, BookOpen, UserRound } from "lucide-react";

import type { Child } from "../../data/childrenData";

interface ChildDetailsModalProps {
  child: Child | null;
  onClose: () => void;
}

const ChildDetailsModal = ({ child, onClose }: ChildDetailsModalProps) => {
  // If no child is selected, don't show anything
  if (!child) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 px-4">
      {/* Modal */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-black/40 overflow-hidden transition-colors">
        {/* =========================
            HEADER
        ========================== */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Child Details
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View information about this child.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="
              w-9
              h-9
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
            <X size={20} />
          </button>
        </div>

        {/* =========================
            CHILD PROFILE
        ========================== */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div
              className="
                w-16
                h-16
                rounded-full
                bg-blue-100
                dark:bg-blue-950/50
                text-blue-600
                dark:text-blue-400
                flex
                items-center
                justify-center
                text-lg
                font-semibold
              "
            >
              {child.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)}
            </div>

            {/* Name */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {child.name}
              </h3>

              <div className="flex items-center gap-2 mt-1">
                {/* Active */}
                {child.status === "Active" ? (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      px-2.5
                      py-1
                      rounded-full
                      bg-green-50
                      dark:bg-green-950/40
                      text-green-700
                      dark:text-green-400
                      border
                      border-green-100
                      dark:border-green-900
                      text-xs
                      font-medium
                    "
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Active
                  </span>
                ) : (
                  /* Inactive */
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      px-2.5
                      py-1
                      rounded-full
                      bg-red-50
                      dark:bg-red-950/40
                      text-red-600
                      dark:text-red-400
                      border
                      border-red-100
                      dark:border-red-900
                      text-xs
                      font-medium
                    "
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* =========================
              INFORMATION
          ========================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                <User size={19} className="text-blue-600 dark:text-blue-400" />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {child.age} years
                </p>
              </div>
            </div>

            {/* Class */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center">
                <BookOpen
                  size={19}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Class
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {child.className}
                </p>
              </div>
            </div>

            {/* Parent */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center">
                <UserRound
                  size={19}
                  className="text-orange-500 dark:text-orange-400"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Parent / Guardian
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {child.parent}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/40 flex items-center justify-center">
                <Phone
                  size={19}
                  className="text-green-600 dark:text-green-400"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Phone
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {child.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            FOOTER
        ========================== */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70">
          <button
            type="button"
            onClick={onClose}
            className="
              px-4
              py-2
              rounded-lg
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-900
              text-gray-700
              dark:text-gray-200
              text-sm
              font-medium
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition
              cursor-pointer
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildDetailsModal;
