import {
  CalendarDays,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

import type { TeacherSeminar } from "../../../data/teachersSeminarsData";

interface TeachersSeminarsTableProps {
  seminars: TeacherSeminar[];
  onView: (seminar: TeacherSeminar) => void;
  onEdit: (seminar: TeacherSeminar) => void;
  onDelete: (seminar: TeacherSeminar) => void;
}

const TeachersSeminarsTable = ({
  seminars,
  onView,
  onEdit,
  onDelete,
}: TeachersSeminarsTableProps) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClasses = (status: TeacherSeminar["status"]) => {
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

  if (seminars.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
          <CalendarDays
            size={22}
            className="text-gray-400 dark:text-gray-500"
          />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
          No seminars found
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          No teachers seminars match the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Teachers Seminars
          </h3>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Recorded seminars by year
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Users size={14} />
          {seminars.length} record{seminars.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-237.5 text-left">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Seminar
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Year
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Date
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Location
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Facilitator
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-400">
                Participants
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {seminars.map((seminar) => (
              <tr
                key={seminar.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-700/40"
              >
                {/* Seminar */}
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {seminar.title}
                    </p>

                    <p className="mt-1 max-w-55 truncate text-xs text-gray-500 dark:text-gray-400">
                      {seminar.theme}
                    </p>
                  </div>
                </td>

                {/* Year */}
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {seminar.year}
                  </span>
                </td>

                {/* Date */}
                <td className="px-5 py-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {formatDate(seminar.startDate)}
                  </div>

                  {seminar.endDate !== seminar.startDate && (
                    <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      to {formatDate(seminar.endDate)}
                    </div>
                  )}
                </td>

                {/* Location */}
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {seminar.location}
                  </span>
                </td>

                {/* Facilitator */}
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {seminar.facilitator}
                  </span>
                </td>

                {/* Participants */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Users
                      size={15}
                      className="text-gray-400 dark:text-gray-500"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {seminar.participants}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      seminar.status,
                    )}`}
                  >
                    {seminar.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="relative px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(openMenu === seminar.id ? null : seminar.id)
                    }
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === seminar.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenu(null)}
                      />

                      <div className="absolute right-5 top-12 z-20 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onView(seminar);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <Eye size={16} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onEdit(seminar);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onDelete(seminar);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </>
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

export default TeachersSeminarsTable;
