import { FilePlus2, FileText, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

import { baptismRecordsData } from "../../../data/baptismRecordsData";
import type { BaptismDocument } from "../../../data/baptismDocumentationData";

interface AddBaptismDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (document: BaptismDocument) => void;
}

const AddBaptismDocumentModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddBaptismDocumentModalProps) => {
  const [recordId, setRecordId] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState<
    BaptismDocument["documentType"] | ""
  >("");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [status, setStatus] = useState<BaptismDocument["status"]>("Available");
  const [notes, setNotes] = useState("");

  const [fileError, setFileError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) {
    return null;
  }

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

    // Supported file types
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PDF, JPG, and PNG files are allowed.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setFileName(file.name);
    setFileUrl(URL.createObjectURL(file));

    // Automatically mark the document as available
    setStatus("Available");

    // Automatically mark the document as available
    setStatus("Available");
  };

  const handleRemoveFile = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    setFileName("");
    setFileUrl("");
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recordId || !documentName || !documentType) {
      return;
    }

    const newDocument: BaptismDocument = {
      id: Date.now(),

      recordId: Number(recordId),

      documentName,

      documentType,

      uploadedDate:
        fileName && status === "Available" ? new Date().toISOString() : "",

      status,

      fileName,
      fileUrl,

      notes,
    };

    onAdd(newDocument);

    // Reset form
    setRecordId("");
    setDocumentName("");
    setDocumentType("");
    setFileName("");
    setFileUrl("");
    setStatus("Available");
    setNotes("");
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-teal-100 p-2 dark:bg-teal-900/30">
              <FilePlus2
                size={20}
                className="text-teal-600 dark:text-teal-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Baptism Document
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add a document to a baptism record
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
          {/* Baptism Record */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Baptism Record
            </label>

            <select
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select baptism record</option>

              {baptismRecordsData.map((record) => (
                <option key={record.id} value={record.id}>
                  {record.personName} — {record.baptismNumber}
                </option>
              ))}
            </select>
          </div>

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
              <option value="">Select document type</option>

              <option value="Baptism Certificate">Baptism Certificate</option>

              <option value="Consent Form">Consent Form</option>

              <option value="Registration Form">Registration Form</option>

              <option value="Other">Other</option>
            </select>
          </div>

          {/* Upload Document */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Upload Document
            </label>

            {!fileName ? (
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
                  Click to browse for a document
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  PDF, JPG or PNG • Maximum 10 MB
                </p>
              </button>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/40">
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

                  <p className="text-xs text-green-600 dark:text-green-400">
                    File selected successfully
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
              placeholder="Add any notes about this document..."
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
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBaptismDocumentModal;
