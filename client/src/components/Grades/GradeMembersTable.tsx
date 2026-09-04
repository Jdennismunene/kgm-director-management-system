import { useState } from "react";
import {
  Eye,
  MoreVertical,
  UserRound,
  Users,
  Pencil,
  UserMinus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Child } from "../../services/childService";

interface GradeMembersTableProps {
  members: Child[];
  gradeName: string;
  onEditChild: (child: Child) => void;
  onRemoveChild: (child: Child) => void;
}

const GradeMembersTable = ({
  members,
  gradeName,
  onEditChild,
  onRemoveChild,
}: GradeMembersTableProps) => {
  const navigate = useNavigate();

  // Child IDs from Prisma are strings (cuid)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleMenuToggle = (id: string) => {
    setOpenMenuId((current) => (current === id ? null : id));
  };

  /*
   * View Child
   */
  const handleViewChild = (child: Child) => {
    setOpenMenuId(null);
    navigate(`/children/${child.id}`);
  };

  /*
   * Edit Child
   */
  const handleEditChild = (child: Child) => {
    setOpenMenuId(null);
    onEditChild(child);
  };

  /*
   * Remove Child From Grade
   */
  const handleRemoveChild = (child: Child) => {
    setOpenMenuId(null);
    onRemoveChild(child);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Members
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Children currently assigned to {gradeName}.
        </p>
      </div>

      {/* Empty State */}
      {members.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <Users
            size={28}
            className="mx-auto text-gray-400 dark:text-gray-500"
          />

          <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
            No members found
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            There are currently no children assigned to this grade.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Child
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Age
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Parent
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Phone
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Branch
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Status
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {members.map((child) => (
                <tr
                  key={child.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
                >
                  {/* Child */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#365452] text-xs font-semibold text-white dark:bg-[#466b68]">
                        {child.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {child.name}
                      </p>
                    </div>
                  </td>

                  {/* Age */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <UserRound size={14} />
                      {child.age}
                    </span>
                  </td>

                  {/* Parent */}
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                    {child.parent?.name ?? "—"}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {child.parent?.phone ?? "—"}
                  </td>

                  {/* Branch */}
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {child.branch?.name ?? "—"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        child.status === "ACTIVE"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {child.status === "ACTIVE" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="relative flex items-center justify-end gap-1">
                      {/* View Child */}
                      <button
                        type="button"
                        title="View child"
                        onClick={() => handleViewChild(child)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#365452] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
                      >
                        <Eye size={17} />
                      </button>

                      {/* More Options */}
                      <button
                        type="button"
                        title="More options"
                        onClick={() => handleMenuToggle(child.id)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#365452] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
                      >
                        <MoreVertical size={17} />
                      </button>

                      {/* Dropdown */}
                      {openMenuId === child.id && (
                        <div className="absolute right-0 top-10 z-30 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                          {/* View Child */}
                          <button
                            type="button"
                            onClick={() => handleViewChild(child)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            <Eye size={16} />
                            View Child
                          </button>

                          {/* Edit Child */}
                          <button
                            type="button"
                            onClick={() => handleEditChild(child)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            <Pencil size={16} />
                            Edit Child
                          </button>

                          <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

                          {/* Remove From Grade */}
                          <button
                            type="button"
                            onClick={() => handleRemoveChild(child)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <UserMinus size={16} />
                            Remove from Grade
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GradeMembersTable;
