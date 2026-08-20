import { useEffect, useMemo, useState } from "react";

import PhotosPageHeader from "../../../components/Ministry/Photos/PhotosPageHeader";
import PhotosSummaryCards from "../../../components/Ministry/Photos/PhotosSummaryCards";
import PhotosFilterBar from "../../../components/Ministry/Photos/PhotosFilterBar";
import PhotosGrid from "../../../components/Ministry/Photos/PhotosGrid";
import PhotosPagination from "../../../components/Ministry/Photos/PhotosPagination";

import AddPhotoModal from "../../../components/Ministry/Photos/AddPhotoModal";
import ViewPhotoModal from "../../../components/Ministry/Photos/ViewPhotoModal";
import EditPhotoModal from "../../../components/Ministry/Photos/EditPhotoModal";
import DeletePhotoModal from "../../../components/Ministry/Photos/DeletePhotoModal";

import { photosData, type PhotoResource } from "../../../data/photosData";

const Photos = () => {
  // --------------------------------------------------
  // Photos
  // --------------------------------------------------

  const [photos, setPhotos] = useState<PhotoResource[]>(photosData);

  // --------------------------------------------------
  // Modal State
  // --------------------------------------------------

  const [showAddModal, setShowAddModal] = useState(false);

  const [viewingPhoto, setViewingPhoto] = useState<PhotoResource | null>(null);

  const [editingPhoto, setEditingPhoto] = useState<PhotoResource | null>(null);

  const [deletingPhoto, setDeletingPhoto] = useState<PhotoResource | null>(
    null,
  );

  // --------------------------------------------------
  // Success Notification
  // --------------------------------------------------

  const [successMessage, setSuccessMessage] = useState("");

  // --------------------------------------------------
  // Filters
  // --------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedEvent, setSelectedEvent] = useState("All Events");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [selectedDate, setSelectedDate] = useState("");

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(9);

  // --------------------------------------------------
  // Filter Photos
  // --------------------------------------------------

  const filteredPhotos = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return photos.filter((photo) => {
      // Search
      const matchesSearch =
        !search ||
        photo.title.toLowerCase().includes(search) ||
        photo.description.toLowerCase().includes(search) ||
        photo.category.toLowerCase().includes(search) ||
        photo.event.toLowerCase().includes(search) ||
        photo.fileName.toLowerCase().includes(search) ||
        photo.location.toLowerCase().includes(search) ||
        photo.photographer.toLowerCase().includes(search);

      // Event
      const matchesEvent =
        selectedEvent === "All Events" || photo.event === selectedEvent;

      // Category
      const matchesCategory =
        selectedCategory === "All Categories" ||
        photo.category === selectedCategory;

      // Date
      const matchesDate =
        !selectedDate ||
        photo.eventDate === selectedDate ||
        photo.dateAdded === selectedDate;

      return matchesSearch && matchesEvent && matchesCategory && matchesDate;
    });
  }, [photos, searchTerm, selectedEvent, selectedCategory, selectedDate]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalItems = filteredPhotos.length;

  const totalPages =
    totalItems === 0 ? 0 : Math.ceil(totalItems / itemsPerPage);

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage;

  const currentPhotos = filteredPhotos.slice(
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

  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
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
    setSelectedEvent("All Events");
    setSelectedCategory("All Categories");
    setSelectedDate("");
    setCurrentPage(1);
  };

  // --------------------------------------------------
  // View Photo
  // --------------------------------------------------

  const handleView = (photo: PhotoResource) => {
    setViewingPhoto(photo);
  };

  // --------------------------------------------------
  // Edit Photo
  // --------------------------------------------------

  const handleEdit = (photo: PhotoResource) => {
    setEditingPhoto(photo);
  };

  // --------------------------------------------------
  // Save Edited Photo
  // --------------------------------------------------

  const handleUpdatePhoto = (updatedPhoto: PhotoResource) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === updatedPhoto.id ? updatedPhoto : photo,
      ),
    );

    setEditingPhoto(null);

    showSuccessMessage(
      `"${updatedPhoto.title}" has been updated successfully.`,
    );
  };

  // --------------------------------------------------
  // Delete Photo
  // --------------------------------------------------

  const handleDelete = (photo: PhotoResource) => {
    setDeletingPhoto(photo);
  };

  // --------------------------------------------------
  // Confirm Delete
  // --------------------------------------------------

  const handleConfirmDelete = () => {
    if (!deletingPhoto) return;

    const deletedTitle = deletingPhoto.title;

    setPhotos((prev) => prev.filter((photo) => photo.id !== deletingPhoto.id));

    setDeletingPhoto(null);

    showSuccessMessage(`"${deletedTitle}" has been deleted successfully.`);
  };

  // --------------------------------------------------
  // Add Photo
  // --------------------------------------------------

  const handleAddPhoto = (photo: PhotoResource) => {
    setPhotos((prev) => [...prev, photo]);

    setShowAddModal(false);

    setCurrentPage(1);

    showSuccessMessage(`"${photo.title}" has been added successfully.`);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="relative mx-4 mt-3 space-y-6 pb-3">
      {/* Page Header */}
      <PhotosPageHeader onAddPhoto={() => setShowAddModal(true)} />

      {/* Summary Cards */}
      <PhotosSummaryCards photos={photos} />

      {/* Filters */}
      <PhotosFilterBar
        searchTerm={searchTerm}
        selectedEvent={selectedEvent}
        selectedCategory={selectedCategory}
        selectedDate={selectedDate}
        onSearchChange={handleSearchChange}
        onEventChange={handleEventChange}
        onCategoryChange={handleCategoryChange}
        onDateChange={handleDateChange}
        onReset={handleReset}
      />

      {/* Photo Gallery */}
      <PhotosGrid
        photos={currentPhotos}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <PhotosPagination
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

      {/* Add Photo Modal */}
      <AddPhotoModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddPhoto}
      />

      {/* View Photo Modal */}
      <ViewPhotoModal
        isOpen={Boolean(viewingPhoto)}
        photo={viewingPhoto}
        onClose={() => setViewingPhoto(null)}
      />

      {/* Edit Photo Modal */}
      <EditPhotoModal
        isOpen={Boolean(editingPhoto)}
        photo={editingPhoto}
        onClose={() => setEditingPhoto(null)}
        onSave={handleUpdatePhoto}
      />

      {/* Delete Photo Modal */}
      <DeletePhotoModal
        isOpen={Boolean(deletingPhoto)}
        photo={deletingPhoto}
        onClose={() => setDeletingPhoto(null)}
        onDelete={handleConfirmDelete}
      />

      {/* Success Notification */}
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

export default Photos;
