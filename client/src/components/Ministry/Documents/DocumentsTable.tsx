import {
  Archive,
  Eye,
  FileSpreadsheet,
  FileText,
  FileType,
  MoreVertical,
  Pencil,
  Presentation,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import type { DocumentResource } from "../../../data/documentsData";

interface DocumentsTableProps {
  documents: DocumentResource[];
  onView: (document: DocumentResource) => void;
  onEdit: (document: DocumentResource) => void;
  onDelete: (document: DocumentResource) => void;
}

const DocumentsTable = ({
  documents,
  onView,
  onEdit,
  onDelete,
}: DocumentsTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const getDocumentIcon = (type: DocumentResource["documentType"]) => {
    switch (type) {
      case "PDF":
        return FileText;

      case "Word":
        return FileType;

      case "Excel":
        return FileSpreadsheet;

      case "PowerPoint":
        return Presentation;

      case "Text":
        return FileText;

      default:
        return FileText;
    }
  };

  if (documents.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
          <Archive size={26} />
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          No Documents Found
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          No documents match your current search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          Documents
        </h2>

        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
          Manage ministry documents and official records.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-237.5">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Document
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Category
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Size
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Date Added
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {documents.map((document) => {
              const DocumentIcon = getDocumentIcon(document.documentType);

              return (
                <tr
                  key={document.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-900/40"
                >
                  {/* Document */}
                  <td className="px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                        <DocumentIcon size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                          {document.title}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                          {document.fileName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                      {document.category}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {document.documentType}
                    </span>
                  </td>

                  {/* Size */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {document.fileSize}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {document.dateAdded}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        document.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          document.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />

                      {document.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="relative flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === document.id ? null : document.id,
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId === document.id && (
                        <div className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                          {/* View */}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              onView(document);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Eye size={16} />
                            View Document
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              onEdit(document);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Pencil size={16} />
                            Edit Document
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              onDelete(document);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 size={16} />
                            Delete Document
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsTable;
