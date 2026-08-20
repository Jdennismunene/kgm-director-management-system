import {
  Archive,
  Eye,
  FileAudio,
  FileImage,
  FileText,
  FileVideo,
  MoreVertical,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import type { ArchiveResource } from "../../../data/archivesData";

interface ArchivesTableProps {
  archives: ArchiveResource[];
  onView: (archive: ArchiveResource) => void;
  onRestore: (archive: ArchiveResource) => void;
  onDelete: (archive: ArchiveResource) => void;
}

const ArchivesTable = ({
  archives,
  onView,
  onRestore,
  onDelete,
}: ArchivesTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // --------------------------------------------------
  // Empty State
  // --------------------------------------------------

  if (archives.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
          <Archive size={26} />
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          No Archived Resources Found
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          No archived resources match your current search or filters.
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Resource Icon
  // --------------------------------------------------

  const getResourceIcon = (type: ArchiveResource["type"]) => {
    switch (type) {
      case "Document":
        return <FileText size={18} />;

      case "Photo Collection":
        return <FileImage size={18} />;

      case "Video":
        return <FileVideo size={18} />;

      case "Audio":
        return <FileAudio size={18} />;

      default:
        return <Archive size={18} />;
    }
  };

  // --------------------------------------------------
  // Resource Icon Background
  // --------------------------------------------------

  const getResourceIconStyle = (type: ArchiveResource["type"]) => {
    switch (type) {
      case "Document":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";

      case "Photo Collection":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";

      case "Video":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";

      case "Audio":
        return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";

      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Archived Resources
            </h2>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Resources that are no longer actively in use.
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {archives.length} {archives.length === 1 ? "Resource" : "Resources"}
          </span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-250">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Resource
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Type
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Category
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Archived Date
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Original Date
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {archives.map((archive) => (
              <tr
                key={archive.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-900/40"
              >
                {/* Resource */}
                <td className="px-5 py-4">
                  <div className="flex min-w-55 items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getResourceIconStyle(
                        archive.type,
                      )}`}
                    >
                      {getResourceIcon(archive.type)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {archive.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-gray-400 dark:text-gray-500">
                        {archive.fileName} · {archive.fileSize}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {archive.type}
                  </span>
                </td>

                {/* Category */}
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                    {archive.category}
                  </span>
                </td>

                {/* Archived Date */}
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {archive.archivedDate}
                  </p>
                </td>

                {/* Original Date */}
                <td className="px-4 py-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {archive.originalDate}
                  </p>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* View */}
                    <button
                      type="button"
                      onClick={() => onView(archive)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                      title="View resource"
                    >
                      <Eye size={15} />
                    </button>

                    {/* Restore */}
                    <button
                      type="button"
                      onClick={() => onRestore(archive)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 text-teal-600 transition hover:bg-teal-50 dark:border-teal-900/50 dark:text-teal-400 dark:hover:bg-teal-900/20"
                      title="Restore resource"
                    >
                      <RotateCcw size={15} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(archive)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
                      title="Delete permanently"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-gray-100 md:hidden dark:divide-gray-700">
        {archives.map((archive) => (
          <div key={archive.id} className="p-4">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getResourceIconStyle(
                  archive.type,
                )}`}
              >
                {getResourceIcon(archive.type)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {archive.title}
                </p>

                <p className="mt-1 truncate text-xs text-gray-400 dark:text-gray-500">
                  {archive.fileName}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {archive.type}
                  </span>

                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                    {archive.category}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      Archived:
                    </span>{" "}
                    {archive.archivedDate}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      Original:
                    </span>{" "}
                    {archive.originalDate}
                  </p>
                </div>
              </div>

              {/* Mobile Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenuId(openMenuId === archive.id ? null : archive.id)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  title="Actions"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenuId === archive.id && (
                  <div className="absolute right-0 top-10 z-20 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenuId(null);
                        onView(archive);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Eye size={14} />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenuId(null);
                        onRestore(archive);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-900/20"
                    >
                      <RotateCcw size={14} />
                      Restore
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenuId(null);
                        onDelete(archive);
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivesTable;
