import { useState } from "react";
import { FileUp, Save, X } from "lucide-react";
import type { DocumentRecord } from "./Documents";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (document: DocumentRecord) => void;
}

const AddDocumentModal = ({
  isOpen,
  onClose,
  onSave,
}: AddDocumentModalProps) => {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [name, setName] = useState("");

  const [category, setCategory] = useState<DocumentRecord["category"]>("Other");

  const [fileName, setFileName] = useState("");

  const [fileType, setFileType] = useState<DocumentRecord["type"]>("PDF");

  const [fileSize, setFileSize] = useState("");

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setName("");
    setCategory("Other");
    setFileName("");
    setFileType("PDF");
    setFileSize("");
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // =====================================================
  // FILE SELECTION
  // =====================================================

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    // Get file extension
    const extension = file.name.split(".").pop()?.toUpperCase();

    if (extension === "PDF" || extension === "JPG" || extension === "PNG") {
      setFileType(extension as DocumentRecord["type"]);
    }

    // Convert bytes to KB / MB
    const sizeInKB = file.size / 1024;

    if (sizeInKB >= 1024) {
      setFileSize(`${(sizeInKB / 1024).toFixed(1)} MB`);
    } else {
      setFileSize(`${Math.round(sizeInKB)} KB`);
    }

    // Automatically use filename as document name
    if (!name) {
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

      setName(
        fileNameWithoutExtension
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      );
    }
  };

  // =====================================================
  // SAVE DOCUMENT
  // =====================================================

  const handleSubmit = () => {
    if (!name.trim() || !fileName || !fileSize) {
      return;
    }

    const newDocument: DocumentRecord = {
      id: Date.now(),
      name: name.trim(),
      type: fileType,
      category,
      size: fileSize,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      fileName,
    };

    onSave(newDocument);

    resetForm();
  };

  // =====================================================
  // DON'T RENDER WHEN CLOSED
  // =====================================================

  if (!isOpen) {
    return null;
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upload Document
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Add an important document to this child's record.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <div className="space-y-5 p-6">
          {/* Document Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Document Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Birth Certificate"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as DocumentRecord["category"])
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900/30"
            >
              <option value="Identification">Identification</option>

              <option value="Consent">Consent</option>

              <option value="Photo">Photo</option>

              <option value="Medical">Medical</option>

              <option value="Education">Education</option>

              <option value="Other">Other</option>
            </select>
          </div>

          {/* File Upload */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              File
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-8 transition hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-blue-900/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                <FileUp
                  size={21}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                {fileName ? fileName : "Choose a file"}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                PDF, JPG or PNG • Maximum 10 MB
              </p>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* File Information */}

          {fileName && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    File Type
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {fileType}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                    File Size
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {fileSize}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim() || !fileName || !fileSize}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            Save Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;
