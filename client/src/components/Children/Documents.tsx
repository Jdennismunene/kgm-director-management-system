import { useMemo, useState } from "react";
import { File, FileImage, FileText, FolderOpen, Upload } from "lucide-react";

import AddDocumentModal from "./AddDocumentModal";
import EditDocumentModal from "./EditDocumentModal";
import DocumentsList from "./DocumentsList";

export interface DocumentRecord {
  id: number;
  name: string;
  type: "PDF" | "JPG" | "PNG";
  category:
    | "Identification"
    | "Consent"
    | "Photo"
    | "Medical"
    | "Education"
    | "Other";
  size: string;
  date: string;
  fileName: string;
}

const Documents = () => {
  // =====================================================
  // DOCUMENT DATA
  // =====================================================

  const [documents, setDocuments] = useState<DocumentRecord[]>([
    {
      id: 1,
      name: "Birth Certificate",
      type: "PDF",
      category: "Identification",
      size: "1.2 MB",
      date: "May 12, 2024",
      fileName: "birth-certificate.pdf",
    },
    {
      id: 2,
      name: "Parent Consent Form",
      type: "PDF",
      category: "Consent",
      size: "845 KB",
      date: "May 15, 2024",
      fileName: "parent-consent-form.pdf",
    },
    {
      id: 3,
      name: "Child Profile Photo",
      type: "JPG",
      category: "Photo",
      size: "2.4 MB",
      date: "May 12, 2024",
      fileName: "child-profile-photo.jpg",
    },
    {
      id: 4,
      name: "Medical Information Form",
      type: "PDF",
      category: "Medical",
      size: "980 KB",
      date: "May 16, 2024",
      fileName: "medical-information-form.pdf",
    },
    {
      id: 5,
      name: "School Report",
      type: "PDF",
      category: "Education",
      size: "1.7 MB",
      date: "July 20, 2026",
      fileName: "school-report.pdf",
    },
  ]);

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingDocument, setEditingDocument] = useState<DocumentRecord | null>(
    null,
  );

  // =====================================================
  // SUMMARY DATA
  // =====================================================

  const totalDocuments = documents.length;

  const pdfDocuments = useMemo(
    () => documents.filter((document) => document.type === "PDF").length,
    [documents],
  );

  const imageDocuments = useMemo(
    () =>
      documents.filter(
        (document) => document.type === "JPG" || document.type === "PNG",
      ).length,
    [documents],
  );

  /*
    Convert the stored sizes into MB so that the storage
    card can be calculated automatically.
  */
  const storageUsed = useMemo(() => {
    let totalMB = 0;

    documents.forEach((document) => {
      const value = parseFloat(document.size);

      if (document.size.includes("GB")) {
        totalMB += value * 1024;
      } else if (document.size.includes("KB")) {
        totalMB += value / 1024;
      } else {
        totalMB += value;
      }
    });

    return totalMB.toFixed(1);
  }, [documents]);

  // =====================================================
  // ADD DOCUMENT
  // =====================================================

  const handleAddDocument = (newDocument: DocumentRecord) => {
    setDocuments((currentDocuments) => [newDocument, ...currentDocuments]);

    setShowAddModal(false);
  };

  // =====================================================
  // EDIT DOCUMENT
  // =====================================================

  const handleOpenEdit = (document: DocumentRecord) => {
    setEditingDocument(document);
    setShowEditModal(true);
  };

  const handleEditDocument = (updatedDocument: DocumentRecord) => {
    setDocuments((currentDocuments) =>
      currentDocuments.map((document) =>
        document.id === updatedDocument.id ? updatedDocument : document,
      ),
    );

    setEditingDocument(null);
    setShowEditModal(false);
  };

  // =====================================================
  // DELETE DOCUMENT
  // =====================================================

  const handleDeleteDocument = (id: number) => {
    const document = documents.find((item) => item.id === id);

    if (!document) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${document.name}"?`,
    );

    if (!confirmed) return;

    setDocuments((currentDocuments) =>
      currentDocuments.filter((item) => item.id !== id),
    );
  };

  // =====================================================
  // VIEW DOCUMENT
  // =====================================================

  const handleViewDocument = (document: DocumentRecord) => {
    /*
      For now, documents are dummy records, so there is
      no real uploaded file to open.

      Later, when the backend/file storage is connected,
      this function can open the actual file URL.
    */

    window.alert(`Viewing: ${document.fileName}`);
  };

  // =====================================================
  // DOWNLOAD DOCUMENT
  // =====================================================

  const handleDownloadDocument = (document: DocumentRecord) => {
    /*
      Actual downloading will be connected when the
      application has real file storage.

      For now we simply show which file would be
      downloaded.
    */

    window.alert(`Downloading: ${document.fileName}`);
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
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Upload size={17} />
            Upload Document
          </button>
        </div>

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

          {/* PDFs */}

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
            onClick={() => setShowAddModal(true)}
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

        <DocumentsList
          documents={documents}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteDocument}
          onView={handleViewDocument}
          onDownload={handleDownloadDocument}
        />
      </div>

      {/* =================================================
          ADD DOCUMENT MODAL
      ================================================= */}

      <AddDocumentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddDocument}
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
