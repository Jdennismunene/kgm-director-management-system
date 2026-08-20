interface GradeMembersSummaryProps {
  total: number;
  active: number;
  inactive: number;
}

const GradeMembersSummary = ({
  total,
  active,
  inactive,
}: GradeMembersSummaryProps) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Total */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Members
        </p>

        <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          {total}
        </p>
      </div>

      {/* Active */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>

        <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
          {active}
        </p>
      </div>

      {/* Inactive */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">Inactive</p>

        <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
          {inactive}
        </p>
      </div>
    </div>
  );
};

export default GradeMembersSummary;
