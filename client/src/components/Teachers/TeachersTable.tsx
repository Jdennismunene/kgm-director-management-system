import {
  CheckCircle2,
  Edit,
  Eye,
  MoreVertical,
  Trash2,
  UserRoundX,
} from "lucide-react";
import { useState } from "react";
import type { Teacher } from "../../data/teachersData";

interface TeachersTableProps {
  teachers: Teacher[];
  onView: (teacher: Teacher) => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
}

const TeachersTable = ({
  teachers,
  onView,
  onEdit,
  onDelete,
}: TeachersTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Table Header */}
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Teachers
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and view all registered teachers.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-250">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Teacher
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Class(es)
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Phone
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Email
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Joined On
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/40"
                >
                  {/* Teacher */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#365452] text-sm font-semibold text-white dark:bg-[#466b68]">
                        {teacher.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {teacher.name}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          Teacher ID: #{String(teacher.id).padStart(4, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Classes */}
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {teacher.grade.map((className) => (
                        <span
                          key={className}
                          className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {className}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {teacher.phone}
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {teacher.email}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {teacher.joinedDate}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {/* View */}
                      <button
                        onClick={() => onView(teacher)}
                        title="View teacher"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#365452] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(teacher)}
                        title="Edit teacher"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                      >
                        <Edit size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(teacher)}
                        title="Delete teacher"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400"
                      >
                        <Trash2 size={17} />
                      </button>

                      {/* More Options */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === teacher.id ? null : teacher.id,
                            )
                          }
                          title="More options"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                          <MoreVertical size={17} />
                        </button>

                        {/* Dropdown */}
                        {openMenuId === teacher.id && (
                          <div className="absolute right-0 top-full z-30 mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            {/* View */}
                            <button
                              onClick={() => {
                                onView(teacher);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              <Eye size={16} />
                              View Teacher
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => {
                                onEdit(teacher);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              <Edit size={16} />
                              Edit Teacher
                            </button>

                            <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

                            {/* Activate / Deactivate */}
                            {teacher.status === "Active" ? (
                              <button
                                onClick={() => {
                                  console.log("Deactivate teacher:", teacher);
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                              >
                                <UserRoundX size={16} />
                                Deactivate
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  console.log("Activate teacher:", teacher);
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                              >
                                <CheckCircle2 size={16} />
                                Activate
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => {
                                onDelete(teacher);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              <Trash2 size={16} />
                              Delete Teacher
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    No teachers found
                  </p>

                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Try changing your search or filter options.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersTable;
