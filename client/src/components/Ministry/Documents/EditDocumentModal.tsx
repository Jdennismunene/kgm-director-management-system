import { useEffect, useState } from "react";
import {
  FilePenLine,
  FileSpreadsheet,
  FileText,
  Presentation,
  Upload,
  X,
} from "lucide-react";

import type { DocumentResource } from "../../../data/documentsData";

interface EditDocumentModalProps {
  isOpen: boolean;
  document: DocumentResource | null;
  onClose: () => void;
  onSave: (document: DocumentResource) => void;
}

const EditDocumentModal = ({
  isOpen,
  document,
  onClose,
  onSave,
}: EditDocumentModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] =
    useState<DocumentResource["category"]>("General");

  const [documentType, setDocumentType] =
    useState<DocumentResource["documentType"]>("PDF");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [status, setStatus] = useState<DocumentResource["status"]>("Active");

  // --------------------------------------------------
  // Load Document
  // --------------------------------------------------

  useEffect(() => {
    if (!document) return;

    setTitle(document.title);
    setDescription(document.description);
    setCategory(document.category);
    setDocumentType(document.documentType);
    setFileName(document.fileName);
    setFileSize(document.fileSize);
    setStatus(document.status);

    // New file selection should be cleared
    setSelectedFile(null);
  }, [document]);

  if (!isOpen || !document) return null;

  // --------------------------------------------------
  // File Size
  // --------------------------------------------------

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];

    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(
      index === 0 ? 0 : 1,
    )} ${units[index]}`;
  };

  // --------------------------------------------------
  // Accepted File Types
  // --------------------------------------------------

  const getAcceptedFileTypes = () => {
    switch (documentType) {
      case "PDF":
        return ".pdf";

      case "Word":
        return ".doc,.docx";

      case "Excel":
        return ".xls,.xlsx";

      case "PowerPoint":
        return ".ppt,.pptx";

      case "Text":
        return ".txt";

      default:
        return undefined;
    }
  };

  // --------------------------------------------------
  // File Change
  // --------------------------------------------------

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
  };

  // --------------------------------------------------
  // Type Change
  // --------------------------------------------------

  const handleTypeChange = (value: DocumentResource["documentType"]) => {
    setDocumentType(value);

    // Existing file should not automatically be
    // considered valid for a different document type.
    setSelectedFile(null);
  };

  // --------------------------------------------------
  // Icon
  // --------------------------------------------------

  const getDocumentIcon = () => {
    if (selectedFile) {
      switch (documentType) {
        case "PDF":
          return <FileText size={22} />;

        case "Word":
          return <FileText size={22} />;

        case "Excel":
          return <FileSpreadsheet size={22} />;

        case "PowerPoint":
          return <Presentation size={22} />;

        case "Text":
          return <FileText size={22} />;

        default:
          return <Upload size={22} />;
      }
    }

    switch (documentType) {
      case "PDF":
        return <FileText size={22} />;

      case "Word":
        return <FileText size={22} />;

      case "Excel":
        return <FileSpreadsheet size={22} />;

      case "PowerPoint":
        return <Presentation size={22} />;

      case "Text":
        return <FileText size={22} />;

      default:
        return <Upload size={22} />;
    }
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !fileName.trim()) {
      return;
    }

    const updatedDocument: DocumentResource = {
      ...document,

      title: title.trim(),

      description: description.trim(),

      category,

      documentType,

      fileName: fileName.trim(),

      fileSize: fileSize.trim() || "N/A",

      status,
    };

    onSave(updatedDocument);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <FilePenLine size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Edit Document
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Update the document information.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. VBS 2026 Programme"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this document..."
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            {/* Category + Type */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Category */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as DocumentResource["category"])
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                >
                  <option value="Photography">Photography</option>

                  <option value="VBS">VBS</option>

                  <option value="Competition">Competition</option>

                  <option value="Baptism">Baptism</option>

                  <option value="Teaching">Teaching</option>

                  <option value="Administration">Administration</option>

                  <option value="Reports">Reports</option>

                  <option value="General">General</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Document Type
                </label>

                <select
                  value={documentType}
                  onChange={(e) =>
                    handleTypeChange(
                      e.target.value as DocumentResource["documentType"],
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                >
                  <option value="PDF">PDF</option>

                  <option value="Word">Word</option>

                  <option value="Excel">Excel</option>

                  <option value="PowerPoint">PowerPoint</option>

                  <option value="Text">Text</option>
                </select>
              </div>
            </div>

            {/* Current / Replacement File */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Document File
              </label>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept={getAcceptedFileTypes()}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-7 text-center transition hover:border-teal-400 hover:bg-teal-50/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-teal-600 dark:hover:bg-teal-900/10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                    {getDocumentIcon()}
                  </div>

                  {selectedFile ? (
                    <>
                      <p className="mt-3 truncate px-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedFile.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(selectedFile.size)}
                      </p>

                      <p className="mt-2 text-xs font-medium text-teal-600 dark:text-teal-400">
                        Click to replace file
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-3 truncate px-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {fileName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {fileSize}
                      </p>

                      <p className="mt-2 text-xs font-medium text-teal-600 dark:text-teal-400">
                        Click to replace file
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as DocumentResource["status"])
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                <option value="Active">Active</option>

                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDocumentModal;
