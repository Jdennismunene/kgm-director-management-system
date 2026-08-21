import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { BaptismDocument } from "../../../data/baptismDocumentationData";
import { baptismRecordsData } from "../../../data/baptismRecordsData";

interface DocumentationTableProps {
  documents: BaptismDocument[];
  onViewDocument: (document: BaptismDocument) => void;
  onEditDocument: (document: BaptismDocument) => void;
  onDeleteDocument: (document: BaptismDocument) => void;
}

const DocumentationTable = ({
  documents,
  onViewDocument,
  onEditDocument,
  onDeleteDocument,
}: DocumentationTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const getBaptismRecord = (recordId: number) => {
    return baptismRecordsData.find((record) => record.id === recordId);
  };

  const handleView = (document: BaptismDocument) => {
    setOpenMenuId(null);
    onViewDocument(document);
  };

  const handleEdit = (document: BaptismDocument) => {
    setOpenMenuId(null);
    onEditDocument(document);
  };

  const handleDelete = (document: BaptismDocument) => {
    setOpenMenuId(null);
    onDeleteDocument(document);
  };

  if (documents.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-700">
            <Eye size={28} className="text-gray-400 dark:text-gray-300" />
          </div>

          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            No documents found
          </h3>

          <p className="mt-1 max-w-md text-sm text-gray-500 dark:text-gray-400">
            No baptism documents match the current search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-250 text-left">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Document
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Person
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Baptism No.
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Type
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Date
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {documents.map((document) => {
              const baptismRecord = getBaptismRecord(document.recordId);

              return (
                <tr
                  key={document.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-700/40"
                >
                  {/* Document */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {document.documentName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {document.fileName}
                      </p>
                    </div>
                  </td>

                  {/* Person */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {baptismRecord?.personName ?? "Unknown"}
                    </span>
                  </td>

                  {/* Baptism Number */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {baptismRecord?.baptismNumber ?? "—"}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                      {document.documentType}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {document.uploadedDate
                        ? new Date(document.uploadedDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "—"}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        document.status === "Available"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {document.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="relative flex items-center justify-end gap-1">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onViewDocument(document)}
                        title="View document"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-teal-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-teal-400"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEditDocument(document)}
                        title="Edit document"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                      >
                        <Pencil size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDeleteDocument(document)}
                        title="Delete document"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400"
                      >
                        <Trash2 size={17} />
                      </button>

                      {/* More */}
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === document.id ? null : document.id,
                          )
                        }
                        title="More actions"
                        className={`rounded-lg p-2 transition ${
                          openMenuId === document.id
                            ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                            : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                        }`}
                      >
                        <MoreVertical size={17} />
                      </button>

                      {/* Dropdown */}
                      {openMenuId === document.id && (
                        <div className="absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                          {/* View */}
                          <button
                            type="button"
                            onClick={() => handleView(document)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            <Eye
                              size={16}
                              className="text-teal-600 dark:text-teal-400"
                            />
                            <span>View</span>
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => handleEdit(document)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            <Pencil
                              size={16}
                              className="text-blue-600 dark:text-blue-400"
                            />
                            <span>Edit</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(document)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
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

export default DocumentationTable;
