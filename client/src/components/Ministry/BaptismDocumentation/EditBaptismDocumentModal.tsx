import { FilePenLine, FileText, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { BaptismDocument } from "../../../data/baptismDocumentationData";

interface EditBaptismDocumentModalProps {
  isOpen: boolean;
  document: BaptismDocument | null;
  onClose: () => void;
  onSave: (document: BaptismDocument) => void;
}

const EditBaptismDocumentModal = ({
  isOpen,
  document,
  onClose,
  onSave,
}: EditBaptismDocumentModalProps) => {
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState<
    BaptismDocument["documentType"]
  >("Baptism Certificate");

  const [fileName, setFileName] = useState("");

  const [status, setStatus] = useState<BaptismDocument["status"]>("Available");

  const [notes, setNotes] = useState("");

  const [fileError, setFileError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /*
   * Populate form when a document is selected
   */
  useEffect(() => {
    if (document) {
      setDocumentName(document.documentName);
      setDocumentType(document.documentType);
      setFileName(document.fileName);
      setStatus(document.status);
      setNotes(document.notes);
      setFileError("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [document]);

  if (!isOpen || !document) {
    return null;
  }

  /*
   * Handle file selection
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setFileError("");

    // Maximum file size: 10 MB
    const maxFileSize = 10 * 1024 * 1024;

    if (file.size > maxFileSize) {
      setFileError("File size must not exceed 10 MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    // Allowed file types
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PDF, JPG, and PNG files are allowed.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    /*
     * For now we store the selected file name.
     * Actual file storage will be handled by the backend later.
     */
    setFileName(file.name);

    // A newly selected file is available
    setStatus("Available");
  };

  /*
   * Remove current/selected file
   */
  const handleRemoveFile = () => {
    setFileName("");
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /*
   * Submit changes
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentName || !documentType) {
      return;
    }

    const fileWasChanged = fileInputRef.current?.files?.length;

    const updatedDocument: BaptismDocument = {
      ...document,

      documentName,

      documentType,

      fileName,

      status,

      notes,

      /*
       * If a new file was selected, update the upload date.
       *
       * If the document has no file, keep uploadedDate empty.
       *
       * Otherwise preserve the original upload date.
       */
      uploadedDate:
        fileWasChanged && fileName
          ? new Date().toISOString()
          : fileName
            ? document.uploadedDate
            : "",
    };

    onSave(updatedDocument);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
              <FilePenLine
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Baptism Document
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update document information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Document Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Document Name
            </label>

            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="e.g. Baptism Certificate"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              required
            />
          </div>

          {/* Document Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Document Type
            </label>

            <select
              value={documentType}
              onChange={(e) =>
                setDocumentType(
                  e.target.value as BaptismDocument["documentType"],
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="Baptism Certificate">Baptism Certificate</option>

              <option value="Consent Form">Consent Form</option>

              <option value="Registration Form">Registration Form</option>

              <option value="Other">Other</option>
            </select>
          </div>

          {/* Upload / Replace Document */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Document File
            </label>

            {fileName ? (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                    <FileText
                      size={20}
                      className="text-teal-600 dark:text-teal-400"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                      {fileName}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Current document file
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                    title="Remove file"
                  >
                    <X size={17} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Upload size={16} />
                  Replace File
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-teal-500 hover:bg-teal-50/50 dark:border-gray-600 dark:bg-gray-700/40 dark:hover:border-teal-500 dark:hover:bg-teal-900/10"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30">
                  <Upload
                    size={22}
                    className="text-teal-600 dark:text-teal-400"
                  />
                </div>

                <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Upload a document
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  PDF, JPG or PNG • Maximum 10 MB
                </p>
              </button>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File error */}
            {fileError && (
              <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                {fileError}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as BaptismDocument["status"])
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="Available">Available</option>

              <option value="Pending">Pending</option>

              <option value="Missing">Missing</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add notes about this document..."
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBaptismDocumentModal;
