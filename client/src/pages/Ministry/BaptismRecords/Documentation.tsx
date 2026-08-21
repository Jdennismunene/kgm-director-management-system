import { useEffect, useMemo, useState } from "react";

import {
  baptismDocumentationData,
  type BaptismDocument,
} from "../../../data/baptismDocumentationData";

import { baptismRecordsData } from "../../../data/baptismRecordsData";

import { CheckCircle2, X } from "lucide-react";
import BaptismDocumentationPageHeader from "../../../components/Ministry/BaptismDocumentation/BaptismDocumentationPageHeader";
import BaptismDocumentationSummaryCards from "../../../components/Ministry/BaptismDocumentation/BaptismDocumentationSummaryCards";
import DocumentationFilterBar from "../../../components/Ministry/BaptismDocumentation/DocumentationFilterBar";
import DocumentationTable from "../../../components/Ministry/BaptismDocumentation/DocumentationTable";
import DocumentationPagination from "../../../components/Ministry/BaptismDocumentation/DocumentationPagination";
import AddBaptismDocumentModal from "../../../components/Ministry/BaptismDocumentation/AddBaptismDocumentModal";
import BaptismDocumentDetailsModal from "../../../components/Ministry/BaptismDocumentation/BaptismDocumentDetailsModal";
import EditBaptismDocumentModal from "../../../components/Ministry/BaptismDocumentation/EditBaptismDocumentModal";
import DeleteBaptismDocumentModal from "../../../components/Ministry/BaptismDocumentation/DeleteBaptismDocumentModal";

const Documentation = () => {
  const [documents, setDocuments] = useState<BaptismDocument[]>(
    baptismDocumentationData,
  );

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedDocument, setSelectedDocument] =
    useState<BaptismDocument | null>(null);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  /*
   * Show notification
   */
  const showNotification = (message: string) => {
    setNotification(message);
  };

  /*
   * Automatically hide notification
   */
  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  /*
   * Filter documents
   */
  const filteredDocuments = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return documents.filter((document) => {
      const baptismRecord = baptismRecordsData.find(
        (record) => record.id === document.recordId,
      );

      const matchesSearch =
        !search ||
        document.documentName.toLowerCase().includes(search) ||
        document.fileName.toLowerCase().includes(search) ||
        baptismRecord?.personName.toLowerCase().includes(search) ||
        baptismRecord?.baptismNumber.toLowerCase().includes(search);

      const matchesDocumentType =
        !selectedDocumentType || document.documentType === selectedDocumentType;

      const matchesBranch =
        !selectedBranch || baptismRecord?.branch === selectedBranch;

      const matchesYear =
        !selectedYear || document.uploadedDate.startsWith(selectedYear);

      const matchesStatus =
        !selectedStatus || document.status === selectedStatus;

      return (
        matchesSearch &&
        matchesDocumentType &&
        matchesBranch &&
        matchesYear &&
        matchesStatus
      );
    });
  }, [
    documents,
    searchTerm,
    selectedDocumentType,
    selectedBranch,
    selectedYear,
    selectedStatus,
  ]);

  /*
   * Pagination
   */
  const totalItems = filteredDocuments.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /*
   * Reset filters
   */
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedDocumentType("");
    setSelectedBranch("");
    setSelectedYear("");
    setSelectedStatus("");
    setCurrentPage(1);
  };

  /*
   * Add document
   */
  const handleAddDocument = (newDocument: BaptismDocument) => {
    setDocuments((previousDocuments) => [...previousDocuments, newDocument]);

    setCurrentPage(1);
    setIsAddModalOpen(false);

    showNotification("Document added successfully.");
  };

  /*
   * View document
   */
  const handleViewDocument = (document: BaptismDocument) => {
    setSelectedDocument(document);
    setIsDetailsModalOpen(true);
  };

  /*
   * Edit document
   */
  const handleEditDocument = (document: BaptismDocument) => {
    setSelectedDocument(document);
    setIsEditModalOpen(true);
  };

  /*
   * Save edited document
   */
  const handleSaveDocument = (updatedDocument: BaptismDocument) => {
    setDocuments((previousDocuments) =>
      previousDocuments.map((document) =>
        document.id === updatedDocument.id ? updatedDocument : document,
      ),
    );

    setSelectedDocument(null);
    setIsEditModalOpen(false);

    showNotification("Document updated successfully.");
  };

  /*
   * Delete document
   */
  const handleDeleteDocument = (document: BaptismDocument) => {
    setSelectedDocument(document);
    setIsDeleteModalOpen(true);
  };

  /*
   * Confirm delete
   */
  const handleConfirmDelete = (document: BaptismDocument) => {
    setDocuments((previousDocuments) =>
      previousDocuments.filter((item) => item.id !== document.id),
    );

    setSelectedDocument(null);
    setIsDeleteModalOpen(false);

    showNotification("Document deleted successfully.");

    /*
     * If the current page becomes empty after deletion,
     * move back one page.
     */
    const newTotalItems = totalItems - 1;
    const newTotalPages = Math.max(1, Math.ceil(newTotalItems / itemsPerPage));

    setCurrentPage((page) => Math.min(page, newTotalPages));
  };

  /*
   * Page change
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative space-y-6 mx-4 mt-4 pb-4">
      {/* Notification */}
      {notification && (
        <div className="fixed right-6 top-6 z-100 flex min-w-[320px] items-center gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 shadow-lg dark:border-green-900 dark:bg-gray-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2
              size={20}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <p className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            {notification}
          </p>

          <button
            type="button"
            onClick={() => setNotification(null)}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Close notification"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <BaptismDocumentationPageHeader
        onAddDocument={() => setIsAddModalOpen(true)}
      />

      {/* Summary Cards */}
      <BaptismDocumentationSummaryCards documents={documents} />

      {/* Filters */}
      <DocumentationFilterBar
        searchTerm={searchTerm}
        selectedDocumentType={selectedDocumentType}
        selectedBranch={selectedBranch}
        selectedYear={selectedYear}
        selectedStatus={selectedStatus}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        onDocumentTypeChange={(value) => {
          setSelectedDocumentType(value);
          setCurrentPage(1);
        }}
        onBranchChange={(value) => {
          setSelectedBranch(value);
          setCurrentPage(1);
        }}
        onYearChange={(value) => {
          setSelectedYear(value);
          setCurrentPage(1);
        }}
        onStatusChange={(value) => {
          setSelectedStatus(value);
          setCurrentPage(1);
        }}
        onReset={handleResetFilters}
      />

      {/* Documentation Table */}
      <DocumentationTable
        documents={currentDocuments}
        onViewDocument={handleViewDocument}
        onEditDocument={handleEditDocument}
        onDeleteDocument={handleDeleteDocument}
      />

      {/* Pagination */}
      <DocumentationPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      {/* Add Document Modal */}
      <AddBaptismDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDocument}
      />

      {/* Document Details Modal */}
      <BaptismDocumentDetailsModal
        isOpen={isDetailsModalOpen}
        document={selectedDocument}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedDocument(null);
        }}
      />

      {/* Edit Document Modal */}
      <EditBaptismDocumentModal
        isOpen={isEditModalOpen}
        document={selectedDocument}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDocument(null);
        }}
        onSave={handleSaveDocument}
      />

      {/* Delete Document Modal */}
      <DeleteBaptismDocumentModal
        isOpen={isDeleteModalOpen}
        document={selectedDocument}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedDocument(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Documentation;
