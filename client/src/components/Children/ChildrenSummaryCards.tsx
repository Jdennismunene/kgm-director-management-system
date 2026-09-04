import { Users, UserCheck, UserPlus, UserX, ChevronRight } from "lucide-react";

import type { Child } from "../../services/childService";

interface ChildrenSummaryCardsProps {
  children: Child[];
  onViewAll: () => void;
  onViewActive: () => void;
  onViewInactive: () => void;
  onViewNew: () => void;
}

const ChildrenSummaryCards = ({
  children,
  onViewAll,
  onViewActive,
  onViewInactive,
  onViewNew,
}: ChildrenSummaryCardsProps) => {
  // ==========================================
  // TOTAL CHILDREN
  // ==========================================
  const totalChildren = children.length;

  // ==========================================
  // ACTIVE CHILDREN
  // ==========================================
  const activeChildren = children.filter(
    (child) => child.status === "ACTIVE",
  ).length;

  // ==========================================
  // INACTIVE CHILDREN
  // ==========================================
  const inactiveChildren = children.filter(
    (child) => child.status === "INACTIVE",
  ).length;

  // ==========================================
  // NEW CHILDREN THIS MONTH
  // ==========================================
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const newChildren = children.filter((child) => {
    const createdDate = new Date(child.createdAt);

    return (
      createdDate.getMonth() === currentMonth &&
      createdDate.getFullYear() === currentYear
    );
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* ==========================================
          TOTAL CHILDREN
      ========================================== */}
      <div
        className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-xl
          px-4 py-4
          transition-colors
        "
      >
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
            <Users size={20} className="text-blue-600 dark:text-blue-400" />
          </div>

          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            {totalChildren}
          </p>
        </div>

        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-3">
          Total Children
        </p>

        <button
          type="button"
          onClick={onViewAll}
          className="
            flex items-center gap-1
            mt-2
            text-xs font-medium
            text-blue-600 dark:text-blue-400
            hover:text-blue-700 dark:hover:text-blue-300
            transition-colors
            cursor-pointer
          "
        >
          View all children
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ==========================================
          ACTIVE CHILDREN
      ========================================== */}
      <div
        className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-xl
          px-4 py-4
          transition-colors
        "
      >
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-green-50 dark:bg-green-950/50 rounded-lg">
            <UserCheck
              size={20}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {activeChildren}
          </p>
        </div>

        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-3">
          Active Children
        </p>

        <button
          type="button"
          onClick={onViewActive}
          className="
            flex items-center gap-1
            mt-2
            text-xs font-medium
            text-green-600 dark:text-green-400
            hover:text-green-700 dark:hover:text-green-300
            transition-colors
            cursor-pointer
          "
        >
          View active
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ==========================================
          NEW THIS MONTH
      ========================================== */}
      <div
        className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-xl
          px-4 py-4
          transition-colors
        "
      >
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-orange-50 dark:bg-orange-950/50 rounded-lg">
            <UserPlus
              size={20}
              className="text-orange-500 dark:text-orange-400"
            />
          </div>

          <p className="text-2xl font-semibold text-orange-500 dark:text-orange-400">
            {newChildren}
          </p>
        </div>

        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-3">
          New This Month
        </p>

        <button
          type="button"
          onClick={onViewNew}
          className="
            flex items-center gap-1
            mt-2
            text-xs font-medium
            text-orange-500 dark:text-orange-400
            hover:text-orange-600 dark:hover:text-orange-300
            transition-colors
            cursor-pointer
          "
        >
          View new
          <ChevronRight size={14} />
        </button>
      </div>

      {/* ==========================================
          INACTIVE CHILDREN
      ========================================== */}
      <div
        className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-xl
          px-4 py-4
          transition-colors
        "
      >
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-red-50 dark:bg-red-950/50 rounded-lg">
            <UserX size={20} className="text-red-500 dark:text-red-400" />
          </div>

          <p className="text-2xl font-semibold text-red-500 dark:text-red-400">
            {inactiveChildren}
          </p>
        </div>

        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-3">
          Inactive Children
        </p>

        <button
          type="button"
          onClick={onViewInactive}
          className="
            flex items-center gap-1
            mt-2
            text-xs font-medium
            text-red-500 dark:text-red-400
            hover:text-red-600 dark:hover:text-red-300
            transition-colors
            cursor-pointer
          "
        >
          View inactive
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ChildrenSummaryCards;
