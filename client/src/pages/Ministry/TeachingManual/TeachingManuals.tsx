import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManualsPageHeader from "../../../components/Ministry/Manuals/ManualsPageHeader";
import ManualsSummaryCards from "../../../components/Ministry/Manuals/ManualsSummaryCards";
import ManualsFilterBar from "../../../components/Ministry/Manuals/ManualsFilterBar";
import ManualsGrid from "../../../components/Ministry/Manuals/ManualsGrid";
import ManualsPagination from "../../../components/Ministry/Manuals/ManualsPagination";
import AddManualModal from "../../../components/Ministry/Manuals/AddManualModal";
import EditManualModal from "../../../components/Ministry/Manuals/EditManualModal";
import DeleteManualModal from "../../../components/Ministry/Manuals/DeleteManualModal";

import {
  teachingManualsData,
  type TeachingManual,
} from "../../../data/teachingManualsData";

const TeachingManuals = () => {
  const navigate = useNavigate();
  const [manuals, setManuals] = useState<TeachingManual[]>(teachingManualsData);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All Age Groups");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showAddManualModal, setShowAddManualModal] = useState(false);
  const [editingManual, setEditingManual] = useState<TeachingManual | null>(
    null,
  );
  const [deletingManual, setDeletingManual] = useState<TeachingManual | null>(
    null,
  );
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  // --------------------------------------------------
  // Filter manuals
  // --------------------------------------------------

  const filteredManuals = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return manuals.filter((manual) => {
      const matchesSearch =
        !search ||
        manual.title.toLowerCase().includes(search) ||
        manual.provider.toLowerCase().includes(search) ||
        manual.description.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        manual.category === selectedCategory;

      const matchesAgeGroup =
        selectedAgeGroup === "All Age Groups" ||
        manual.ageGroup === selectedAgeGroup;

      const matchesStatus =
        selectedStatus === "All Status" || manual.status === selectedStatus;

      return (
        matchesSearch && matchesCategory && matchesAgeGroup && matchesStatus
      );
    });
  }, [manuals, searchTerm, selectedCategory, selectedAgeGroup, selectedStatus]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalItems = filteredManuals.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentManuals = filteredManuals.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // --------------------------------------------------
  // Filter handlers
  // --------------------------------------------------

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleAgeGroupChange = (value: string) => {
    setSelectedAgeGroup(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleAddManual = (newManual: TeachingManual) => {
    setManuals((prev) => [...prev, newManual]);
    setShowAddManualModal(false);

    setNotification("Teaching manual added successfully.");
  };

  const handleEditManual = (updatedManual: TeachingManual) => {
    setManuals((prev) =>
      prev.map((manual) =>
        manual.id === updatedManual.id ? updatedManual : manual,
      ),
    );

    setEditingManual(null);

    setNotification("Teaching manual updated successfully.");
  };

  const handleDeleteManual = () => {
    if (!deletingManual) return;

    setManuals((prev) =>
      prev.filter((manual) => manual.id !== deletingManual.id),
    );

    setDeletingManual(null);

    setNotification("Teaching manual deleted successfully.");
  };

  return (
    <div className="mx-4 mt-3 space-y-6 pb-3">
      {notification && (
        <div className="fixed right-5 top-5 z-100 flex items-center gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 shadow-lg dark:border-green-900/50 dark:bg-gray-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            ✓
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Success
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              {notification}
            </p>
          </div>
        </div>
      )}
      {/* Page Header */}
      <ManualsPageHeader onAddManual={() => setShowAddManualModal(true)} />

      {/* Summary Cards */}
      <ManualsSummaryCards manuals={manuals} />

      {/* Filters */}
      <ManualsFilterBar
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedAgeGroup={selectedAgeGroup}
        selectedStatus={selectedStatus}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onAgeGroupChange={handleAgeGroupChange}
        onStatusChange={handleStatusChange}
      />

      {/* Manuals */}
      <ManualsGrid
        manuals={currentManuals}
        onView={(manual) => navigate(`/ministry/manuals/${manual.id}`)}
        onEdit={(manual) => setEditingManual(manual)}
        onDelete={(manual) => setDeletingManual(manual)}
      />

      {/* Pagination */}
      <ManualsPagination
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

      {showAddManualModal && (
        <AddManualModal
          onClose={() => setShowAddManualModal(false)}
          onSave={handleAddManual}
        />
      )}

      {editingManual && (
        <EditManualModal
          manual={editingManual}
          onClose={() => setEditingManual(null)}
          onSave={handleEditManual}
        />
      )}

      {deletingManual && (
        <DeleteManualModal
          manual={deletingManual}
          onClose={() => setDeletingManual(null)}
          onConfirm={handleDeleteManual}
        />
      )}
    </div>
  );
};

export default TeachingManuals;
