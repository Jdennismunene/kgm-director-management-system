import { useEffect, useState } from "react";
import { FileUp, Save, X } from "lucide-react";
import type { DocumentRecord } from "./Documents";

interface EditDocumentModalProps {
  isOpen: boolean;
  document: DocumentRecord | null;
  onClose: () => void;
  onSave: (document: DocumentRecord) => void;
}

const EditDocumentModal = ({
  isOpen,
  document,
  onClose,
  onSave,
}: EditDocumentModalProps) => {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [name, setName] = useState("");

  const [category, setCategory] = useState<DocumentRecord["category"]>("Other");

  const [fileName, setFileName] = useState("");

  const [fileType, setFileType] = useState<DocumentRecord["type"]>("PDF");

  const [fileSize, setFileSize] = useState("");

  // =====================================================
  // LOAD SELECTED DOCUMENT
  // =====================================================

  useEffect(() => {
    if (!document) return;

    setName(document.name);
    setCategory(document.category);
    setFileName(document.fileName);
    setFileType(document.type);
    setFileSize(document.size);
  }, [document]);

  // =====================================================
  // FILE CHANGE
  // =====================================================

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const extension = file.name.split(".").pop()?.toUpperCase();

    if (extension === "PDF" || extension === "JPG" || extension === "PNG") {
      setFileType(extension as DocumentRecord["type"]);
    }

    const sizeInKB = file.size / 1024;

    if (sizeInKB >= 1024) {
      setFileSize(`${(sizeInKB / 1024).toFixed(1)} MB`);
    } else {
      setFileSize(`${Math.round(sizeInKB)} KB`);
    }
  };

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSubmit = () => {
    if (!document) return;

    if (!name.trim() || !fileName || !fileSize) {
      return;
    }

    const updatedDocument: DocumentRecord = {
      ...document,

      // Keep the original ID
      id: document.id,

      name: name.trim(),
      category,
      fileName,
      type: fileType,
      size: fileSize,
    };

    onSave(updatedDocument);
  };

  // =====================================================
  // DON'T RENDER WHEN CLOSED
  // =====================================================

  if (!isOpen || !document) {
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
              Edit Document
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Update the information for this document.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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

          {/* Current File */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Current File
            </label>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-700/50">
              <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                {fileName}
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <span>{fileType}</span>
                <span>•</span>
                <span>{fileSize}</span>
              </div>
            </div>
          </div>

          {/* Replace File */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Replace File
              <span className="ml-1 font-normal text-gray-400">(Optional)</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-blue-900/10">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <FileUp
                  size={19}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Choose a new file
                </p>

                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                  PDF, JPG or PNG • Maximum 10 MB
                </p>
              </div>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDocumentModal;
