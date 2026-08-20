import { useMemo, useState } from "react";

import DocumentsPageHeader from "../../../components/Ministry/Documents/DocumentsPageHeader";
import DocumentsSummaryCards from "../../../components/Ministry/Documents/DocumentsSummaryCards";
import DocumentsFilterBar from "../../../components/Ministry/Documents/DocumentsFilterBar";
import DocumentsTable from "../../../components/Ministry/Documents/DocumentsTable";
import DocumentsPagination from "../../../components/Ministry/Documents/DocumentsPagination";
import AddDocumentModal from "../../../components/Ministry/Documents/AddDocumentModal";
import ViewDocumentModal from "../../../components/Ministry/Documents/ViewDocumentModal";
import EditDocumentModal from "../../../components/Ministry/Documents/EditDocumentModal";
import DeleteDocumentModal from "../../../components/Ministry/Documents/DeleteDocumentModal";

import {
  documentsData,
  type DocumentResource,
} from "../../../data/documentsData";

const Documents = () => {
  // --------------------------------------------------
  // Documents
  // --------------------------------------------------

  const [documents, setDocuments] = useState<DocumentResource[]>(documentsData);

  // --------------------------------------------------
  // Modal State
  // --------------------------------------------------

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDocument, setEditingDocument] =
    useState<DocumentResource | null>(null);

  const [deletingDocument, setDeletingDocument] =
    useState<DocumentResource | null>(null);

  const [viewingDocument, setViewingDocument] =
    useState<DocumentResource | null>(null);

  // --------------------------------------------------
  // Success Notification
  // --------------------------------------------------

  const [successMessage, setSuccessMessage] = useState("");

  // --------------------------------------------------
  // Filters
  // --------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [selectedType, setSelectedType] = useState("All Types");

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  // --------------------------------------------------
  // Filter Documents
  // --------------------------------------------------

  const filteredDocuments = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return documents.filter((document) => {
      const matchesSearch =
        !search ||
        document.title.toLowerCase().includes(search) ||
        document.description.toLowerCase().includes(search) ||
        document.category.toLowerCase().includes(search) ||
        document.documentType.toLowerCase().includes(search) ||
        document.fileName.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        document.category === selectedCategory;

      const matchesType =
        selectedType === "All Types" || document.documentType === selectedType;

      const matchesStatus =
        selectedStatus === "All Status" || document.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }, [documents, searchTerm, selectedCategory, selectedType, selectedStatus]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalItems = filteredDocuments.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // --------------------------------------------------
  // Filter Handlers
  // --------------------------------------------------

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedType("All Types");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  // --------------------------------------------------
  // Actions
  // --------------------------------------------------

  // View Document
  //
  // IMPORTANT:
  // We are NOT navigating to another page.
  // The document will open inside a modal.
  const handleView = (document: DocumentResource) => {
    setViewingDocument(document);
  };

  // Edit Document
  const handleEdit = (document: DocumentResource) => {
    setEditingDocument(document);
  };

  // Save Edited Document
  const handleUpdateDocument = (updatedDocument: DocumentResource) => {
    setDocuments((prev) =>
      prev.map((document) =>
        document.id === updatedDocument.id ? updatedDocument : document,
      ),
    );

    setEditingDocument(null);

    setSuccessMessage(
      `"${updatedDocument.title}" has been updated successfully.`,
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Delete Document
  const handleDelete = (document: DocumentResource) => {
    setDeletingDocument(document);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingDocument) return;

    const deletedTitle = deletingDocument.title;

    setDocuments((prev) =>
      prev.filter((document) => document.id !== deletingDocument.id),
    );

    setDeletingDocument(null);

    setSuccessMessage(`"${deletedTitle}" has been deleted successfully.`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddDocument = (document: DocumentResource) => {
    setDocuments((prev) => [...prev, document]);

    setShowAddModal(false);

    setSuccessMessage(`"${document.title}" has been added successfully.`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="relative mx-4 mt-3 space-y-6 pb-3">
      {/* Page Header */}
      <DocumentsPageHeader onAddDocument={() => setShowAddModal(true)} />

      {/* Summary Cards */}
      <DocumentsSummaryCards documents={documents} />

      {/* Filters */}
      <DocumentsFilterBar
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
        onReset={handleResetFilters}
      />

      {/* Documents Table */}
      <DocumentsTable
        documents={currentDocuments}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <DocumentsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      {/* -------------------------------------------- */}
      {/* View Document Modal */}
      {/* -------------------------------------------- */}
      <ViewDocumentModal
        isOpen={Boolean(viewingDocument)}
        document={viewingDocument}
        onClose={() => setViewingDocument(null)}
      />

      {/* -------------------------------------------- */}
      {/* Edit Document Modal */}
      {/* -------------------------------------------- */}
      <EditDocumentModal
        isOpen={Boolean(editingDocument)}
        document={editingDocument}
        onClose={() => setEditingDocument(null)}
        onSave={handleUpdateDocument}
      />

      {/* -------------------------------------------- */}
      {/* Delete Document Modal */}
      {/* -------------------------------------------- */}

      <DeleteDocumentModal
        isOpen={Boolean(deletingDocument)}
        document={deletingDocument}
        onClose={() => setDeletingDocument(null)}
        onDelete={handleConfirmDelete}
      />

      <AddDocumentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddDocument}
      />
      {/* -------------------------------------------- */}
      {/* Success Notification */}
      {/* -------------------------------------------- */}

      {successMessage && (
        <div className="fixed right-6 top-6 z-50 flex w-90 items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 shadow-lg dark:border-green-900/50 dark:bg-gray-800">
          {/* Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            ✓
          </div>

          {/* Message */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Success
            </p>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {successMessage}
            </p>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            className="text-lg leading-none text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Documents;
