import { Download, FileText, X } from "lucide-react";

import type { BaptismDocument } from "../../../data/baptismDocumentationData";
import { baptismRecordsData } from "../../../data/baptismRecordsData";

interface BaptismDocumentDetailsModalProps {
  isOpen: boolean;
  document: BaptismDocument | null;
  onClose: () => void;
}

const BaptismDocumentDetailsModal = ({
  isOpen,
  document,
  onClose,
}: BaptismDocumentDetailsModalProps) => {
  if (!isOpen || !document) {
    return null;
  }

  const baptismRecord = baptismRecordsData.find(
    (record) => record.id === document.recordId,
  );

  const formattedDate = document.uploadedDate
    ? new Date(document.uploadedDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not uploaded";

  const handleDownload = () => {
    if (!document.fileName) {
      return;
    }

    if (!document.fileUrl) {
      alert(
        "This document does not have an actual uploaded file attached yet.",
      );
      return;
    }

    const link = window.document.createElement("a");

    link.href = document.fileUrl;
    link.download = document.fileName;

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-teal-100 p-2 dark:bg-teal-900/30">
              <FileText
                size={21}
                className="text-teal-600 dark:text-teal-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Document Details
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                View baptism document information
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

        {/* Scrollable Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Document Heading */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-700/40">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                  <FileText
                    size={26}
                    className="text-teal-600 dark:text-teal-400"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {document.documentName}
                  </h3>

                  <p className="mt-1 break-all text-sm text-gray-500 dark:text-gray-400">
                    {document.fileName || "No file uploaded"}
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      document.status === "Available"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : document.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {document.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Document Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Document Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Document Type
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {document.documentType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Uploaded Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {formattedDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Document ID
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    DOC-{String(document.id).padStart(3, "0")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Baptism Record
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {baptismRecord?.personName ?? "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            {/* Baptism Record */}
            <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Baptism Record
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Person
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {baptismRecord?.personName ?? "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Baptism Number
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {baptismRecord?.baptismNumber ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Branch
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {baptismRecord?.branch ?? "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
              <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Notes
              </h3>

              <p className="rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300">
                {document.notes || "No notes added for this document."}
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:justify-end">
          {document.fileName && document.status === "Available" && (
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Download size={17} />
              Download
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaptismDocumentDetailsModal;
