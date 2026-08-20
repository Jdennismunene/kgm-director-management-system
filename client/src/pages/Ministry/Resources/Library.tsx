import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import LibraryPageHeader from "../../../components/Ministry/Library/LibraryPageHeader";
import LibrarySummaryCards from "../../../components/Ministry/Library/LibrarySummaryCards";
import LibraryFilterBar from "../../../components/Ministry/Library/LibraryFilterBar";
import LibraryGrid from "../../../components/Ministry/Library/LibraryGrid";
import LibraryPagination from "../../../components/Ministry/Library/LibraryPagination";

import AddLibraryResourceModal from "../../../components/Ministry/Library/AddLibraryResourceModal";
import EditLibraryResourceModal from "../../../components/Ministry/Library/EditLibraryResourceModal";
import DeleteLibraryResourceModal from "../../../components/Ministry/Library/DeleteLibraryResourceModal";

import { libraryData, type LibraryResource } from "../../../data/libraryData";

const Library = () => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // Resources
  // --------------------------------------------------

  const [resources, setResources] = useState<LibraryResource[]>(libraryData);

  // --------------------------------------------------
  // Modals
  // --------------------------------------------------

  const [showAddModal, setShowAddModal] = useState(false);

  const [editingResource, setEditingResource] =
    useState<LibraryResource | null>(null);

  const [deletingResource, setDeletingResource] =
    useState<LibraryResource | null>(null);

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

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(6);

  // --------------------------------------------------
  // Filter Resources
  // --------------------------------------------------

  const filteredResources = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return resources.filter((resource) => {
      const matchesSearch =
        !search ||
        resource.title.toLowerCase().includes(search) ||
        resource.description.toLowerCase().includes(search) ||
        resource.category.toLowerCase().includes(search) ||
        resource.type.toLowerCase().includes(search) ||
        resource.fileName.toLowerCase().includes(search);

      const matchesType =
        selectedType === "All Types" || resource.type === selectedType;

      const matchesCategory =
        selectedCategory === "All Categories" ||
        resource.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "All Status" || resource.status === selectedStatus;

      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
  }, [resources, searchTerm, selectedType, selectedCategory, selectedStatus]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalItems = filteredResources.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentResources = filteredResources.slice(
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

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  // --------------------------------------------------
  // Actions
  // --------------------------------------------------

  // View
  const handleView = (resource: LibraryResource) => {
    navigate(`/resources/library-records/${resource.id}`);
  };

  // Add
  const handleAddResource = (resource: LibraryResource) => {
    setResources((prev) => [...prev, resource]);

    setShowAddModal(false);

    setSuccessMessage(`"${resource.title}" has been added successfully.`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Open Edit Modal
  const handleEdit = (resource: LibraryResource) => {
    setEditingResource(resource);
  };

  // Save Edited Resource
  const handleUpdateResource = (updatedResource: LibraryResource) => {
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === updatedResource.id ? updatedResource : resource,
      ),
    );

    setEditingResource(null);

    setSuccessMessage(
      `"${updatedResource.title}" has been updated successfully.`,
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Open Delete Modal
  const handleDelete = (resource: LibraryResource) => {
    setDeletingResource(resource);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingResource) return;

    const deletedTitle = deletingResource.title;

    setResources((prev) =>
      prev.filter((resource) => resource.id !== deletingResource.id),
    );

    setDeletingResource(null);

    setSuccessMessage(`"${deletedTitle}" has been deleted successfully.`);

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
      <LibraryPageHeader onAddResource={() => setShowAddModal(true)} />

      {/* Summary Cards */}
      <LibrarySummaryCards resources={resources} />

      {/* Filters */}
      <LibraryFilterBar
        searchTerm={searchTerm}
        selectedType={selectedType}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
      />

      {/* Resources */}
      <LibraryGrid
        resources={currentResources}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <LibraryPagination
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
      {/* Add Resource Modal */}
      {/* -------------------------------------------- */}

      <AddLibraryResourceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddResource}
      />

      {/* -------------------------------------------- */}
      {/* Edit Resource Modal */}
      {/* -------------------------------------------- */}

      <EditLibraryResourceModal
        resource={editingResource}
        isOpen={Boolean(editingResource)}
        onClose={() => setEditingResource(null)}
        onSave={handleUpdateResource}
      />

      {/* -------------------------------------------- */}
      {/* Delete Resource Modal */}
      {/* -------------------------------------------- */}

      <DeleteLibraryResourceModal
        resource={deletingResource}
        isOpen={Boolean(deletingResource)}
        onClose={() => setDeletingResource(null)}
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
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;
