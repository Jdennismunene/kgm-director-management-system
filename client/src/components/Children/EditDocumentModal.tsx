import { useEffect, useState } from "react";
import { FileUp, Save, X } from "lucide-react";

import type {
  DocumentCategory,
  DocumentRecord,
} from "../../services/documentService";

interface EditDocumentModalProps {
  isOpen: boolean;
  document: DocumentRecord | null;
  onClose: () => void;
  onSave: (
    name: string,
    category: DocumentCategory,
    file?: File,
  ) => Promise<void>;
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

  const [category, setCategory] = useState<DocumentCategory>("OTHER");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [fileName, setFileName] = useState("");

  const [fileType, setFileType] = useState<"PDF" | "JPG" | "PNG">("PDF");

  const [fileSize, setFileSize] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // LOAD SELECTED DOCUMENT
  // =====================================================

  useEffect(() => {
    if (!document) {
      setName("");
      setCategory("OTHER");
      setSelectedFile(null);
      setFileName("");
      setFileType("PDF");
      setFileSize("");
      setError("");
      return;
    }

    setName(document.name);
    setCategory(document.category);
    setSelectedFile(null);
    setFileName(document.originalName || document.fileName);
    setFileType(document.type);
    setFileSize(formatFileSize(document.size));
    setError("");
  }, [document]);

  // =====================================================
  // FORMAT FILE SIZE
  // =====================================================

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${Math.round(kb)} KB`;
    }

    const mb = kb / 1024;

    return `${mb.toFixed(1)} MB`;
  };

  // =====================================================
  // FILE CHANGE
  // =====================================================

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    // -----------------------------------------------------
    // Validate size
    // -----------------------------------------------------

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("File size cannot exceed 10 MB.");
      event.target.value = "";
      return;
    }

    // -----------------------------------------------------
    // Validate MIME type
    // -----------------------------------------------------

    const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedMimeTypes.includes(file.type)) {
      setError("Only PDF, JPG, and PNG files are allowed.");
      event.target.value = "";
      return;
    }

    // -----------------------------------------------------
    // Store actual File object
    // -----------------------------------------------------

    setSelectedFile(file);

    setFileName(file.name);

    // -----------------------------------------------------
    // Determine type
    // -----------------------------------------------------

    if (file.type === "application/pdf") {
      setFileType("PDF");
    } else if (file.type === "image/jpeg") {
      setFileType("JPG");
    } else if (file.type === "image/png") {
      setFileType("PNG");
    }

    // -----------------------------------------------------
    // Determine size
    // -----------------------------------------------------

    setFileSize(formatFileSize(file.size));
  };

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSubmit = async () => {
    if (!document) return;

    if (!name.trim()) {
      setError("Document name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await onSave(name.trim(), category, selectedFile || undefined);

      setIsSaving(false);
    } catch (error) {
      console.error("Document update error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to update document.",
      );

      setIsSaving(false);
    }
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
            disabled={isSaving}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-200"
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
              disabled={isSaving}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DocumentCategory)}
              disabled={isSaving}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900/30"
            >
              <option value="IDENTIFICATION">Identification</option>

              <option value="CONSENT">Consent</option>

              <option value="PHOTO">Photo</option>

              <option value="MEDICAL">Medical</option>

              <option value="EDUCATION">Education</option>

              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* =================================================
              CURRENT FILE
          ================================================= */}

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

          {/* =================================================
              REPLACE FILE
          ================================================= */}

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

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                  {selectedFile ? selectedFile.name : "Choose a new file"}
                </p>

                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                  {selectedFile
                    ? `${fileType} • ${fileSize}`
                    : "PDF, JPG or PNG • Maximum 10 MB"}
                </p>
              </div>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                disabled={isSaving}
                className="hidden"
              />
            </label>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving || !name.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />

            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDocumentModal;
