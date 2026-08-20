import { useState } from "react";
import { Edit, Eye, MoreVertical, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Grade } from "../../data/gradesData";

interface GradesTableProps {
  grades: Grade[];
  onView?: (grade: Grade) => void;
  onEdit?: (grade: Grade) => void;
  onDelete?: (grade: Grade) => void;
  onMembers?: (grade: Grade) => void;
}

const GradesTable = ({
  grades,
  onView,
  onEdit,
  onDelete,
  onMembers,
}: GradesTableProps) => {
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleMenuToggle = (id: number) => {
    setOpenMenuId((current) => (current === id ? null : id));
  };

  const handleAction = (action: () => void) => {
    action();
    setOpenMenuId(null);
  };

  /*
   * View a specific grade
   *
   * Route:
   * /grades/:id
   */
  const handleViewGrade = (grade: Grade) => {
    setOpenMenuId(null);
    navigate(`/grade/${grade.id}`);
  };

  /*
   * View members of a specific grade
   *
   * Route:
   * /grades/:id
   */
  const handleViewMembers = (grade: Grade) => {
    setOpenMenuId(null);
    navigate(`/grade/${grade.id}`);
  };

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          All Grades
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and manage all grades in your church.
        </p>
      </div>

      {/* Empty State */}
      {grades.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <Users size={22} className="text-gray-400 dark:text-gray-500" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            No grades found
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Grade
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Teacher
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Age Range
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Members
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
                {grades.map((grade) => (
                  <tr
                    key={grade.id}
                    className="transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    {/* Grade */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {grade.name}
                        </p>

                        <p className="mt-1 max-w-xs truncate text-xs text-gray-500 dark:text-gray-400">
                          {grade.description}
                        </p>
                      </div>
                    </td>

                    {/* Teacher */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {grade.teacher}
                      </p>
                    </td>

                    {/* Age Range */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {grade.ageRange}
                      </span>
                    </td>

                    {/* Members */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleViewMembers(grade)}
                        className="flex items-center gap-2 text-sm font-medium text-[#365452] transition hover:underline dark:text-[#8eb0ac]"
                      >
                        <Users size={16} />
                        {grade.members}
                      </button>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          grade.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {grade.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="relative flex items-center justify-end gap-1">
                        {/* View */}
                        <button
                          type="button"
                          title="View grade"
                          onClick={() => handleViewGrade(grade)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#365452] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
                        >
                          <Eye size={17} />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          title="Edit grade"
                          onClick={() => onEdit?.(grade)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#365452] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
                        >
                          <Edit size={17} />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          title="Delete grade"
                          onClick={() => onDelete?.(grade)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        >
                          <Trash2 size={17} />
                        </button>

                        {/* More */}
                        <button
                          type="button"
                          title="More options"
                          onClick={() => handleMenuToggle(grade.id)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        >
                          <MoreVertical size={17} />
                        </button>

                        {/* Dropdown */}
                        {openMenuId === grade.id && (
                          <div className="absolute right-0 top-10 z-30 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            {/* View Grade */}
                            <button
                              type="button"
                              onClick={() =>
                                handleAction(() => handleViewGrade(grade))
                              }
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              <Eye size={16} />
                              View Grade
                            </button>

                            {/* Edit Grade */}
                            <button
                              type="button"
                              onClick={() =>
                                handleAction(() => onEdit?.(grade))
                              }
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              <Edit size={16} />
                              Edit Grade
                            </button>

                            {/* View Members */}
                            <button
                              type="button"
                              onClick={() =>
                                handleAction(() => handleViewMembers(grade))
                              }
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              <Users size={16} />
                              View Members
                            </button>

                            <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

                            {/* Delete Grade */}
                            <button
                              type="button"
                              onClick={() =>
                                handleAction(() => onDelete?.(grade))
                              }
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              <Trash2 size={16} />
                              Delete Grade
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

          {/* Mobile Cards */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700 md:hidden">
            {grades.map((grade) => (
              <div
                key={grade.id}
                className="p-5 transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {grade.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {grade.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      grade.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {grade.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Teacher
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {grade.teacher}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Age Range
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {grade.ageRange}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Members
                    </p>

                    <button
                      type="button"
                      onClick={() => handleViewMembers(grade)}
                      className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#365452] dark:text-[#8eb0ac]"
                    >
                      <Users size={15} />
                      {grade.members}
                    </button>
                  </div>
                </div>

                <div className="relative mt-4 flex items-center justify-end gap-1 border-t border-gray-100 pt-3 dark:border-gray-700">
                  {/* View */}
                  <button
                    type="button"
                    title="View grade"
                    onClick={() => handleViewGrade(grade)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#365452] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
                  >
                    <Eye size={17} />
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    title="Edit grade"
                    onClick={() => onEdit?.(grade)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <Edit size={17} />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    title="Delete grade"
                    onClick={() => onDelete?.(grade)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  >
                    <Trash2 size={17} />
                  </button>

                  {/* More */}
                  <button
                    type="button"
                    title="More options"
                    onClick={() => handleMenuToggle(grade.id)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <MoreVertical size={17} />
                  </button>

                  {/* Mobile Dropdown */}
                  {openMenuId === grade.id && (
                    <div className="absolute bottom-12 right-0 z-30 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      {/* View Grade */}
                      <button
                        type="button"
                        onClick={() =>
                          handleAction(() => handleViewGrade(grade))
                        }
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Eye size={16} />
                        View Grade
                      </button>

                      {/* Edit Grade */}
                      <button
                        type="button"
                        onClick={() => handleAction(() => onEdit?.(grade))}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Edit size={16} />
                        Edit Grade
                      </button>

                      {/* View Members */}
                      <button
                        type="button"
                        onClick={() =>
                          handleAction(() => handleViewMembers(grade))
                        }
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Users size={16} />
                        View Members
                      </button>

                      <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

                      {/* Delete Grade */}
                      <button
                        type="button"
                        onClick={() => handleAction(() => onDelete?.(grade))}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                        Delete Grade
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GradesTable;
