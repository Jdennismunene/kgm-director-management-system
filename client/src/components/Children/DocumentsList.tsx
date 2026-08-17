import {
  Download,
  Edit3,
  File,
  FileImage,
  FileText,
  FolderOpen,
  Trash2,
} from "lucide-react";

import type { DocumentRecord } from "./Documents";

interface DocumentsListProps {
  documents: DocumentRecord[];
  onEdit: (document: DocumentRecord) => void;
  onDelete: (id: number) => void;
  onView: (document: DocumentRecord) => void;
  onDownload: (document: DocumentRecord) => void;
}

const DocumentsList = ({
  documents,
  onEdit,
  onDelete,
  onView,
  onDownload,
}: DocumentsListProps) => {
  // =====================================================
  // GET FILE ICON
  // =====================================================

  const getFileIcon = (type: DocumentRecord["type"]) => {
    switch (type) {
      case "PDF":
        return FileText;

      case "JPG":
      case "PNG":
        return FileImage;

      default:
        return File;
    }
  };

  // =====================================================
  // GET FILE ICON STYLES
  // =====================================================

  const getFileIconStyles = (type: DocumentRecord["type"]) => {
    switch (type) {
      case "PDF":
        return "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400";

      case "JPG":
      case "PNG":
        return "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";

      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}

        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <FolderOpen
              size={17}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Child Documents
            </h3>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Files and records stored for this child
            </p>
          </div>
        </div>

        {/* Empty State */}

        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <FolderOpen
              size={22}
              className="text-gray-400 dark:text-gray-300"
            />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            No documents yet
          </h4>

          <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500 dark:text-gray-400">
            There are currently no documents stored for this child.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // DOCUMENT LIST
  // =====================================================

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <FolderOpen
              size={17}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Child Documents
            </h3>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Files and records stored for this child
            </p>
          </div>
        </div>

        <span className="text-xs text-gray-400 dark:text-gray-500">
          {documents.length} {documents.length === 1 ? "document" : "documents"}
        </span>
      </div>

      {/* =================================================
          DOCUMENTS
      ================================================= */}

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {documents.map((document) => {
          const Icon = getFileIcon(document.type);

          return (
            <div
              key={document.id}
              className="p-5 transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* =================================================
                    FILE ICON
                ================================================= */}

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${getFileIconStyles(
                    document.type,
                  )}`}
                >
                  <Icon size={21} />
                </div>

                {/* =================================================
                    DOCUMENT INFORMATION
                ================================================= */}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {document.name}
                    </h4>

                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {document.type}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs text-gray-400 dark:text-gray-500">
                    {document.fileName}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{document.category}</span>

                    <span>•</span>

                    <span>{document.size}</span>

                    <span>•</span>

                    <span>{document.date}</span>
                  </div>
                </div>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="flex flex-wrap items-center gap-2">
                  {/* View */}

                  <button
                    type="button"
                    onClick={() => onView(document)}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    View
                  </button>

                  {/* Download */}

                  <button
                    type="button"
                    onClick={() => onDownload(document)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Download size={14} />
                    Download
                  </button>

                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() => onEdit(document)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>

                  {/* Delete */}

                  <button
                    type="button"
                    onClick={() => onDelete(document.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="border-t border-gray-100 px-5 py-3 dark:border-gray-700">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Showing all {documents.length}{" "}
          {documents.length === 1 ? "document" : "documents"}
        </p>
      </div>
    </div>
  );
};

export default DocumentsList;
