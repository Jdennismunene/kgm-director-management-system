import { Eye, UserRound, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Parent } from "../../data/parentsData";
import { childrenData } from "../../data/childrenData";

interface ParentChildrenProps {
  parent: Parent;
}

const ParentChildren = ({ parent }: ParentChildrenProps) => {
  const navigate = useNavigate();

  const linkedChildren = childrenData.filter((child) =>
    parent.childrenIds.includes(child.id),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Children
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Children linked to {parent.name}.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-2 text-sm font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
          <Users size={17} />
          {linkedChildren.length}{" "}
          {linkedChildren.length === 1 ? "Child" : "Children"}
        </div>
      </div>

      {/* Children Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {linkedChildren.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-187.5">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Child
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Age
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Class
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Branch
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {linkedChildren.map((child) => (
                  <tr
                    key={child.id}
                    className="border-b border-gray-100 last:border-0 dark:border-gray-700"
                  >
                    {/* Child */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                          {child.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {child.name}
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Child ID: #{child.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Age */}
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {child.age} years
                    </td>

                    {/* Class */}
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {child.className}
                    </td>

                    {/* Branch */}
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {child.branch}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          child.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        {child.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => navigate(`/children/${child.id}`)}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-teal-600 transition hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-900/20"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
              <UserRound size={25} />
            </div>

            <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
              No children linked
            </h4>

            <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              There are currently no children linked to this parent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentChildren;
