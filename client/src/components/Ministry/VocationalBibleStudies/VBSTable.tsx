import {
  CalendarDays,
  Eye,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

import type { VocationalBibleStudy } from "../../../data/vocationalBibleStudiesData";

interface VBSTableProps {
  studies: VocationalBibleStudy[];
  onView: (study: VocationalBibleStudy) => void;
  onEdit: (study: VocationalBibleStudy) => void;
  onDelete: (study: VocationalBibleStudy) => void;
}

const VBSTable = ({ studies, onView, onEdit, onDelete }: VBSTableProps) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClasses = (status: string) => {
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

  if (studies.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
          <CalendarDays
            size={22}
            className="text-gray-400 dark:text-gray-500"
          />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
          No VBS records found
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try changing your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Table Header */}
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Vocational Bible Studies
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Records of vocational Bible studies by year.
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/40">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                VBS
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Location
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Facilitator
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Participants
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {studies.map((study) => (
              <tr
                key={study.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                {/* VBS */}
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {study.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {study.theme}
                    </p>
                  </div>
                </td>

                {/* Date */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      className="shrink-0 text-gray-400"
                    />

                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {formatDate(study.startDate)}
                      </p>

                      {study.endDate !== study.startDate && (
                        <p className="text-xs text-gray-400">
                          to {formatDate(study.endDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="shrink-0 text-gray-400" />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {study.location}
                    </span>
                  </div>
                </td>

                {/* Facilitator */}
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {study.facilitator}
                  </p>
                </td>

                {/* Participants */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />

                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {study.participants}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      study.status,
                    )}`}
                  >
                    {study.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onView(study)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-teal-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-teal-400"
                      title="View"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(study)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                      title="Edit"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(study)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 size={17} />
                    </button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(openMenu === study.id ? null : study.id)
                        }
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        title="More"
                      >
                        <MoreVertical size={17} />
                      </button>

                      {openMenu === study.id && (
                        <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-600 dark:bg-gray-800">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenu(null);
                              onView(study);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenu(null);
                              onEdit(study);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Pencil size={15} />
                            Edit VBS
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenu(null);
                              onDelete(study);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 size={15} />
                            Delete VBS
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-gray-200 md:hidden dark:divide-gray-700">
        {studies.map((study) => (
          <div key={study.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {study.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {study.theme}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                  study.status,
                )}`}
              >
                {study.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <CalendarDays size={15} className="text-gray-400" />
                {formatDate(study.startDate)}
                {study.endDate !== study.startDate &&
                  ` - ${formatDate(study.endDate)}`}
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin size={15} className="text-gray-400" />
                {study.location}
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Users size={15} className="text-gray-400" />
                {study.participants} participants
              </div>

              <p className="text-gray-600 dark:text-gray-300">
                <span className="text-gray-400">Facilitator:</span>{" "}
                {study.facilitator}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
              <button
                type="button"
                onClick={() => onView(study)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Eye size={16} />
                View
              </button>

              <button
                type="button"
                onClick={() => onEdit(study)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(study)}
                className="flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VBSTable;
