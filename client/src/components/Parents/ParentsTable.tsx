import { Eye, MoreVertical, Pencil, Trash2, Users } from "lucide-react";
import { useState } from "react";

import type { Parent } from "../../data/parentsData";

interface ParentsTableProps {
  parents: Parent[];
  onView: (parent: Parent) => void;
  onEdit: (parent: Parent) => void;
  onDelete: (parent: Parent) => void;
}

const ParentsTable = ({
  parents,
  onView,
  onEdit,
  onDelete,
}: ParentsTableProps) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  if (parents.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex min-h-70 flex-col items-center justify-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
            <Users size={25} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
            No parents found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
            No parents match your current search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Table Header */}
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Parents & Guardians
          </h2>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            View and manage registered parents and guardians.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-250">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/40">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Parent / Guardian
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Phone
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Email
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Children
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Branch
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {parents.map((parent) => (
              <tr
                key={parent.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                {/* Parent */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                      {getInitials(parent.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {parent.name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        {parent.relationship}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {parent.phone}
                </td>

                {/* Email */}
                <td className="px-5 py-4">
                  <p className="max-w-55 truncate text-sm text-gray-600 dark:text-gray-300">
                    {parent.email}
                  </p>
                </td>

                {/* Children */}
                <td className="px-5 py-4 text-center">
                  <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {parent.childrenIds.length}
                  </span>
                </td>

                {/* Branch */}
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {parent.branch}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                      parent.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    <span
                      className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        parent.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                    {parent.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="relative px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(openMenu === parent.id ? null : parent.id)
                    }
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    aria-label={`Actions for ${parent.name}`}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === parent.id && (
                    <div className="absolute right-5 top-12 z-20 w-40 rounded-xl border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-600 dark:bg-gray-800">
                      <button
                        type="button"
                        onClick={() => {
                          onView(parent);
                          setOpenMenu(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Eye size={16} />
                        View Record
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onEdit(parent);
                          setOpenMenu(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Pencil size={16} />
                        Edit Parent
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onDelete(parent);
                          setOpenMenu(null);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                        Delete Parent
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentsTable;
