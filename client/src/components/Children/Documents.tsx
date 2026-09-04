import { useEffect, useMemo, useState } from "react";
import { File, FileImage, FileText, FolderOpen, Upload } from "lucide-react";

import AddDocumentModal from "./AddDocumentModal";
import EditDocumentModal from "./EditDocumentModal";
import DocumentsList from "./DocumentsList";

import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  type DocumentRecord,
  type DocumentCategory,
} from "../../services/documentService";

interface DocumentsProps {
  childId: string;
}

const Documents = ({ childId }: DocumentsProps) => {
  // =====================================================
  // DOCUMENT STATE
  // =====================================================

  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingDocument, setEditingDocument] = useState<DocumentRecord | null>(
    null,
  );

  // =====================================================
  // LOAD DOCUMENTS
  // =====================================================

  const loadDocuments = async () => {
    if (!childId) {
      setDocuments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getDocuments(childId);

      setDocuments(data);
    } catch (err) {
      console.error("Failed to load documents:", err);

      setError(
        err instanceof Error ? err.message : "Failed to load documents.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [childId]);

  // =====================================================
  // SUMMARY DATA
  // =====================================================

  const totalDocuments = documents.length;

  const pdfDocuments = useMemo(() => {
    return documents.filter((document) => document.type === "PDF").length;
  }, [documents]);

  const imageDocuments = useMemo(() => {
    return documents.filter(
      (document) => document.type === "JPG" || document.type === "PNG",
    ).length;
  }, [documents]);

  // =====================================================
  // STORAGE USED
  // =====================================================

  const storageUsed = useMemo(() => {
    const totalBytes = documents.reduce(
      (total, document) => total + document.size,
      0,
    );

    if (totalBytes === 0) {
      return "0.0";
    }

    const totalMB = totalBytes / (1024 * 1024);

    return totalMB.toFixed(1);
  }, [documents]);

  // =====================================================
  // ADD DOCUMENT
  // =====================================================

  const handleAddDocument = async (
    name: string,
    category: DocumentCategory,
    file: File,
  ) => {
    try {
      setError(null);

      // Service expects an object.
      const newDocument = await createDocument(childId, {
        name,
        category,
        file,
      });

      setDocuments((currentDocuments) => [newDocument, ...currentDocuments]);

      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to upload document:", err);

      throw err;
    }
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleOpenEdit = (document: DocumentRecord) => {
    setEditingDocument(document);
    setShowEditModal(true);
  };

  // =====================================================
  // EDIT DOCUMENT
  // =====================================================

  const handleEditDocument = async (
    name: string,
    category: DocumentCategory,
    file?: File,
  ) => {
    if (!editingDocument) {
      return;
    }

    try {
      setError(null);

      const updatedDocument = await updateDocument(editingDocument.id, {
        name,
        category,
        file,
      });

      setDocuments((currentDocuments) =>
        currentDocuments.map((document) =>
          document.id === updatedDocument.id ? updatedDocument : document,
        ),
      );

      setEditingDocument(null);
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update document:", err);

      throw err;
    }
  };

  // =====================================================
  // DELETE DOCUMENT
  // =====================================================

  const handleDeleteDocument = async (id: string) => {
    const document = documents.find((item) => item.id === id);

    if (!document) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${document.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError(null);

      await deleteDocument(id);

      setDocuments((currentDocuments) =>
        currentDocuments.filter((item) => item.id !== id),
      );
    } catch (err) {
      console.error("Failed to delete document:", err);

      setError(
        err instanceof Error ? err.message : "Failed to delete document.",
      );
    }
  };

  // =====================================================
  // VIEW DOCUMENT
  // =====================================================

  const handleViewDocument = (document: DocumentRecord) => {
    if (!document.fileUrl) {
      setError("Document file URL is not available.");
      return;
    }

    window.open(document.fileUrl, "_blank", "noopener,noreferrer");
  };

  // =====================================================
  // DOWNLOAD DOCUMENT
  // =====================================================

  const handleDownloadDocument = (document: DocumentRecord) => {
    if (!document.fileUrl) {
      setError("Document file URL is not available.");
      return;
    }

    const link = window.document.createElement("a");

    link.href = document.fileUrl;

    link.download = document.originalName || document.fileName || document.name;

    link.target = "_blank";
    link.rel = "noopener noreferrer";

    window.document.body.appendChild(link);

    link.click();

    window.document.body.removeChild(link);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <div className="mt-5 space-y-5">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Documents
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage documents and files associated with this child.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setError(null);
              setShowAddModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Upload size={17} />
            Upload Document
          </button>
        </div>

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-4 font-medium hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Documents */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Total Documents
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {totalDocuments}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <FolderOpen
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>

          {/* PDF Documents */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  PDF Documents
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {pdfDocuments}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30">
                <FileText
                  size={20}
                  className="text-red-600 dark:text-red-400"
                />
              </div>
            </div>
          </div>

          {/* Images */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Images
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {imageDocuments}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
                <FileImage
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
            </div>
          </div>

          {/* Storage */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Storage Used
                </p>

                <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {storageUsed} MB
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                <File
                  size={20}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            UPLOAD AREA
        ================================================= */}

        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm dark:border-gray-600 dark:bg-gray-800">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
            <Upload size={22} className="text-blue-600 dark:text-blue-400" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            Upload a new document
          </h3>

          <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-gray-500 dark:text-gray-400">
            Upload birth certificates, consent forms, medical records, school
            documents, or other important files.
          </p>

          <button
            type="button"
            onClick={() => {
              setError(null);
              setShowAddModal(true);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Upload size={15} />
            Choose File
          </button>

          <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500">
            Supported formats: PDF, JPG, PNG • Maximum size: 10 MB
          </p>
        </div>

        {/* =================================================
            DOCUMENT LIST
        ================================================= */}

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Loading documents...
            </p>
          </div>
        ) : (
          <DocumentsList
            documents={documents}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteDocument}
            onView={handleViewDocument}
            onDownload={handleDownloadDocument}
          />
        )}
      </div>

      {/* =================================================
          ADD DOCUMENT MODAL
      ================================================= */}

      <AddDocumentModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
        }}
        onSave={() => {
          // Kept for compatibility with the modal props.
          // Actual upload is handled by onUpload.
        }}
        onUpload={handleAddDocument}
      />

      {/* =================================================
          EDIT DOCUMENT MODAL
      ================================================= */}

      <EditDocumentModal
        isOpen={showEditModal}
        document={editingDocument}
        onClose={() => {
          setEditingDocument(null);
          setShowEditModal(false);
        }}
        onSave={handleEditDocument}
      />
    </>
  );
};

export default Documents;
