import { useEffect, useMemo, useState } from "react";

import ArchivesPageHeader from "../../../components/Ministry/Archives/ArchivesPageHeader";
import ArchivesSummaryCards from "../../../components/Ministry/Archives/ArchivesSummaryCards";
import ArchivesFilterBar from "../../../components/Ministry/Archives/ArchivesFilterBar";
import ArchivesTable from "../../../components/Ministry/Archives/ArchivesTable";
import ArchivesPagination from "../../../components/Ministry/Archives/ArchivesPagination";

import RestoreArchiveModal from "../../../components/Ministry/Archives/RestoreArchiveModal";
import DeleteArchiveModal from "../../../components/Ministry/Archives/DeleteArchiveModal";
import ViewArchiveModal from "../../../components/Ministry/Archives/ViewArchiveModal";
import ArchiveResourceModal from "../../../components/Ministry/Archives/ArchiveResourceModal";

import { archivesData, type ArchiveResource } from "../../../data/archivesData";

const Archives = () => {
  // --------------------------------------------------
  // Archives
  // --------------------------------------------------

  const [archives, setArchives] = useState<ArchiveResource[]>(archivesData);

  // --------------------------------------------------
  // Modal State
  // --------------------------------------------------
  const [viewingArchive, setViewingArchive] = useState<ArchiveResource | null>(
    null,
  );
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [restoringArchive, setRestoringArchive] =
    useState<ArchiveResource | null>(null);

  const [deletingArchive, setDeletingArchive] =
    useState<ArchiveResource | null>(null);

  // --------------------------------------------------
  // Success Notification
  // --------------------------------------------------

  const [successMessage, setSuccessMessage] = useState("");

  // --------------------------------------------------
  // Filters
  // --------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] = useState("All Types");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [selectedDate, setSelectedDate] = useState("");

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  // --------------------------------------------------
  // Filter Archives
  // --------------------------------------------------

  const filteredArchives = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return archives.filter((archive) => {
      const matchesSearch =
        !search ||
        archive.title.toLowerCase().includes(search) ||
        archive.description.toLowerCase().includes(search) ||
        archive.type.toLowerCase().includes(search) ||
        archive.category.toLowerCase().includes(search) ||
        archive.fileName.toLowerCase().includes(search) ||
        archive.originalSection.toLowerCase().includes(search);

      const matchesType =
        selectedType === "All Types" || archive.type === selectedType;

      const matchesCategory =
        selectedCategory === "All Categories" ||
        archive.category === selectedCategory;

      /*
       * archivedDate is stored in the format:
       * "Jan 12, 2026"
       *
       * Convert it to a comparable date string.
       */
      const matchesDate =
        !selectedDate ||
        new Date(archive.archivedDate).toDateString() ===
          new Date(selectedDate).toDateString();

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [archives, searchTerm, selectedType, selectedCategory, selectedDate]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalItems = filteredArchives.length;

  const totalPages =
    totalItems === 0 ? 0 : Math.ceil(totalItems / itemsPerPage);

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage;

  const currentArchives = filteredArchives.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // --------------------------------------------------
  // Keep Current Page Valid
  // --------------------------------------------------

  useEffect(() => {
    if (totalPages === 0) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // --------------------------------------------------
  // Success Message Helper
  // --------------------------------------------------

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // --------------------------------------------------
  // Filter Handlers
  // --------------------------------------------------

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedType("All Types");
    setSelectedCategory("All Categories");
    setSelectedDate("");
    setCurrentPage(1);
  };

  const handleArchiveResource = (archive: ArchiveResource) => {
    setArchives((prev) => [...prev, archive]);

    setShowArchiveModal(false);
    setCurrentPage(1);

    showSuccessMessage(`"${archive.title}" has been archived successfully.`);
  };
  // --------------------------------------------------
  // View Archive
  // --------------------------------------------------

  const handleView = (archive: ArchiveResource) => {
    setViewingArchive(archive);
  };

  // --------------------------------------------------
  // Restore Archive
  // --------------------------------------------------

  const handleRestore = (archive: ArchiveResource) => {
    setRestoringArchive(archive);
  };

  // --------------------------------------------------
  // Confirm Restore
  // --------------------------------------------------

  const handleConfirmRestore = () => {
    if (!restoringArchive) return;

    const restoredTitle = restoringArchive.title;

    setArchives((prev) =>
      prev.filter((archive) => archive.id !== restoringArchive.id),
    );

    setRestoringArchive(null);

    showSuccessMessage(`"${restoredTitle}" has been restored successfully.`);
  };

  // --------------------------------------------------
  // Delete Archive
  // --------------------------------------------------

  const handleDelete = (archive: ArchiveResource) => {
    setDeletingArchive(archive);
  };

  // --------------------------------------------------
  // Confirm Delete
  // --------------------------------------------------

  const handleConfirmDelete = () => {
    if (!deletingArchive) return;

    const deletedTitle = deletingArchive.title;

    setArchives((prev) =>
      prev.filter((archive) => archive.id !== deletingArchive.id),
    );

    setDeletingArchive(null);

    showSuccessMessage(`"${deletedTitle}" has been permanently deleted.`);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="relative mx-4 mt-3 space-y-6 pb-3">
      {/* Page Header */}
      <ArchivesPageHeader onArchiveResource={() => setShowArchiveModal(true)} />

      {/* Summary Cards */}
      <ArchivesSummaryCards archives={archives} />

      {/* Filters */}
      <ArchivesFilterBar
        searchTerm={searchTerm}
        selectedType={selectedType}
        selectedCategory={selectedCategory}
        selectedDate={selectedDate}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onCategoryChange={handleCategoryChange}
        onDateChange={handleDateChange}
        onReset={handleReset}
      />

      {/* Archived Resources */}
      <ArchivesTable
        archives={currentArchives}
        onView={handleView}
        onRestore={handleRestore}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <ArchivesPagination
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
      {/* Archive Resource Modal */}
      {/* -------------------------------------------- */}

      <ArchiveResourceModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        onArchive={handleArchiveResource}
      />

      {/* -------------------------------------------- */}
      {/* View Archive Modal */}
      {/* -------------------------------------------- */}

      <ViewArchiveModal
        isOpen={Boolean(viewingArchive)}
        archive={viewingArchive}
        onClose={() => setViewingArchive(null)}
        onRestore={() => {
          if (!viewingArchive) return;

          setRestoringArchive(viewingArchive);
          setViewingArchive(null);
        }}
      />

      {/* -------------------------------------------- */}
      {/* Restore Archive Modal */}
      {/* -------------------------------------------- */}

      <RestoreArchiveModal
        isOpen={Boolean(restoringArchive)}
        archive={restoringArchive}
        onClose={() => setRestoringArchive(null)}
        onRestore={handleConfirmRestore}
      />

      {/* -------------------------------------------- */}
      {/* Delete Archive Modal */}
      {/* -------------------------------------------- */}

      <DeleteArchiveModal
        isOpen={Boolean(deletingArchive)}
        archive={deletingArchive}
        onClose={() => setDeletingArchive(null)}
        onDelete={handleConfirmDelete}
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
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Archives;
