import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Program } from "../../../data/programsData";

interface ProgramsTableProps {
  programs: Program[];
  onView: (program: Program) => void;
  onEdit: (program: Program) => void;
  onDelete: (program: Program) => void;
}

const ProgramsTable = ({
  programs,
  onView,
  onEdit,
  onDelete,
}: ProgramsTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const getStatusClasses = (status: Program["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      case "Upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

      case "Ongoing":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getTypeClasses = (type: Program["type"]) => {
    switch (type) {
      case "Vocational Bible Studies":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";

      case "Teachers Seminars":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";

      case "Teachers Bondings":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (programs.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          No programs found
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try changing your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-275 text-left">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Program
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Type
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Year
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Venue
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Participants
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {programs.map((program) => (
              <tr
                key={program.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {program.name}
                    </p>

                    <p className="mt-1 max-w-xs truncate text-xs text-gray-500 dark:text-gray-400">
                      {program.description}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getTypeClasses(
                      program.type,
                    )}`}
                  >
                    {program.type}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {program.year}
                </td>

                <td className="px-5 py-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {formatDate(program.startDate)}
                  </div>

                  {program.endDate !== program.startDate && (
                    <div className="mt-1 text-xs text-gray-400">
                      to {formatDate(program.endDate)}
                    </div>
                  )}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {program.venue}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {program.participants}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      program.status,
                    )}`}
                  >
                    {program.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="relative flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(program)}
                      title="View program"
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-teal-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-teal-400"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(program)}
                      title="Edit program"
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(program)}
                      title="Delete program"
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === program.id ? null : program.id,
                        )
                      }
                      title="More actions"
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenuId === program.id && (
                      <div className="absolute right-0 top-11 z-20 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-600 dark:bg-gray-800">
                        <button
                          type="button"
                          onClick={() => {
                            onView(program);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <Eye size={16} />
                          View Details
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onEdit(program);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <Pencil size={16} />
                          Edit Program
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onDelete(program);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={16} />
                          Delete Program
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
    </div>
  );
};

export default ProgramsTable;
