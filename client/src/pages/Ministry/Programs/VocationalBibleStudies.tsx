import { useMemo, useState } from "react";

import VBSPageHeader from "../../../components/Ministry/VocationalBibleStudies/VBSPageHeader";
import VBSSummaryCards from "../../../components/Ministry/VocationalBibleStudies/VBSSummaryCards";
import VBSYearFilter from "../../../components/Ministry/VocationalBibleStudies/VBSYearFilter";
import VBSFilterBar from "../../../components/Ministry/VocationalBibleStudies/VBSFilterBar";
import VBSTable from "../../../components/Ministry/VocationalBibleStudies/VBSTable";
import VBSPagination from "../../../components/Ministry/VocationalBibleStudies/VBSPagination";
import AddVBSModal from "../../../components/Ministry/VocationalBibleStudies/AddVBSModal";
import EditVBSModal from "../../../components/Ministry/VocationalBibleStudies/EditVBSModal";
import VBSDetailsModal from "../../../components/Ministry/VocationalBibleStudies/VBSDetailsModal";
import DeleteVBSModal from "../../../components/Ministry/VocationalBibleStudies/DeleteVBSModal";

import {
  vocationalBibleStudiesData,
  type VBSLocation,
  type VBSStatus,
  type VocationalBibleStudy,
} from "../../../data/vocationalBibleStudiesData";

const VocationalBibleStudies = () => {
  const [studies, setStudies] = useState<VocationalBibleStudy[]>(
    vocationalBibleStudiesData,
  );

  const [selectedYear, setSelectedYear] = useState<number | "All">("All");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<VBSLocation | "All">(
    "All",
  );
  const [selectedStatus, setSelectedStatus] = useState<VBSStatus | "All">(
    "All",
  );
  const [selectedFacilitator, setSelectedFacilitator] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudy, setSelectedStudy] =
    useState<VocationalBibleStudy | null>(null);
  const [editingStudy, setEditingStudy] = useState<VocationalBibleStudy | null>(
    null,
  );
  const [deletingStudy, setDeletingStudy] =
    useState<VocationalBibleStudy | null>(null);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const currentYear = new Date().getFullYear();

  // --------------------------------------------------
  // Years
  // --------------------------------------------------

  const years = useMemo(() => {
    return Array.from(new Set(studies.map((study) => study.year))).sort(
      (a, b) => b - a,
    );
  }, [studies]);

  // --------------------------------------------------
  // Facilitators
  // --------------------------------------------------

  const facilitators = useMemo(() => {
    return Array.from(
      new Set(studies.map((study) => study.facilitator)),
    ).sort();
  }, [studies]);

  // --------------------------------------------------
  // Summary statistics
  // --------------------------------------------------

  const totalStudies = studies.length;

  const thisYearStudies = studies.filter(
    (study) => study.year === currentYear,
  ).length;

  const completedStudies = studies.filter(
    (study) => study.status === "Completed",
  ).length;

  const upcomingStudies = studies.filter(
    (study) => study.status === "Upcoming",
  ).length;

  // --------------------------------------------------
  // Filtering
  // --------------------------------------------------

  const filteredStudies = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return studies.filter((study) => {
      const matchesYear = selectedYear === "All" || study.year === selectedYear;

      const matchesLocation =
        selectedLocation === "All" || study.location === selectedLocation;

      const matchesStatus =
        selectedStatus === "All" || study.status === selectedStatus;

      const matchesFacilitator =
        selectedFacilitator === "All" ||
        study.facilitator === selectedFacilitator;

      const matchesSearch =
        !search ||
        study.title.toLowerCase().includes(search) ||
        study.theme.toLowerCase().includes(search) ||
        study.facilitator.toLowerCase().includes(search) ||
        study.location.toLowerCase().includes(search);

      return (
        matchesYear &&
        matchesLocation &&
        matchesStatus &&
        matchesFacilitator &&
        matchesSearch
      );
    });
  }, [
    studies,
    selectedYear,
    selectedLocation,
    selectedStatus,
    selectedFacilitator,
    searchTerm,
  ]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalPages = Math.ceil(filteredStudies.length / itemsPerPage);

  const paginatedStudies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredStudies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudies, currentPage]);

  // --------------------------------------------------
  // Reset page when filters change
  // --------------------------------------------------

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleYearChange = (year: number | "All") => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleLocationChange = (location: VBSLocation | "All") => {
    setSelectedLocation(location);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: VBSStatus | "All") => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleFacilitatorChange = (facilitator: string) => {
    setSelectedFacilitator(facilitator);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedYear("All");
    setSelectedLocation("All");
    setSelectedStatus("All");
    setSelectedFacilitator("All");
    setCurrentPage(1);
  };

  // --------------------------------------------------
  // Notifications
  // --------------------------------------------------

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({
      type,
      message,
    });

    window.setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // --------------------------------------------------
  // Add VBS
  // --------------------------------------------------

  const handleAddVBS = (newStudy: VocationalBibleStudy) => {
    setStudies((prev) => [newStudy, ...prev]);
    setShowAddModal(false);
    setCurrentPage(1);

    showNotification("success", "Vocational Bible Study added successfully.");
  };

  // --------------------------------------------------
  // Edit VBS
  // --------------------------------------------------

  const handleEditVBS = (updatedStudy: VocationalBibleStudy) => {
    setStudies((prev) =>
      prev.map((study) =>
        study.id === updatedStudy.id ? updatedStudy : study,
      ),
    );

    setEditingStudy(null);

    showNotification("success", "Vocational Bible Study updated successfully.");
  };

  // --------------------------------------------------
  // Delete VBS
  // --------------------------------------------------

  const handleDeleteVBS = () => {
    if (!deletingStudy) return;

    setStudies((prev) => prev.filter((study) => study.id !== deletingStudy.id));

    setDeletingStudy(null);

    const newTotalPages = Math.ceil(
      (filteredStudies.length - 1) / itemsPerPage,
    );

    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }

    showNotification("success", "Vocational Bible Study deleted successfully.");
  };

  // --------------------------------------------------
  // Export CSV
  // --------------------------------------------------

  const handleExport = () => {
    if (filteredStudies.length === 0) {
      showNotification("error", "There are no VBS records to export.");
      return;
    }

    const headers = [
      "Title",
      "Year",
      "Start Date",
      "End Date",
      "Location",
      "Facilitator",
      "Participants",
      "Status",
      "Theme",
      "Description",
    ];

    const escapeCSV = (value: string | number) => {
      const stringValue = String(value);

      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    };

    const rows = filteredStudies.map((study) => [
      study.title,
      study.year,
      study.startDate,
      study.endDate,
      study.location,
      study.facilitator,
      study.participants,
      study.status,
      study.theme,
      study.description,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `vocational-bible-studies-${selectedYear === "All" ? "all-years" : selectedYear}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showNotification("success", "VBS records exported successfully.");
  };

  return (
    <div className="space-y-6 mx-4 mt-4 pb-4">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed right-5 top-5 z-100 flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${
            notification.type === "success"
              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          <div className="flex-1 text-sm font-medium">
            {notification.message}
          </div>

          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-current opacity-70 transition hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <VBSPageHeader
        onAddVBS={() => setShowAddModal(true)}
        onExport={handleExport}
      />

      {/* Summary */}
      <VBSSummaryCards
        totalStudies={totalStudies}
        thisYearStudies={thisYearStudies}
        completedStudies={completedStudies}
        upcomingStudies={upcomingStudies}
      />

      {/* Year Filter */}
      <VBSYearFilter
        years={years}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      {/* Filters */}
      <VBSFilterBar
        searchTerm={searchTerm}
        selectedLocation={selectedLocation}
        selectedStatus={selectedStatus}
        selectedFacilitator={selectedFacilitator}
        facilitators={facilitators}
        onSearchChange={handleSearchChange}
        onLocationChange={handleLocationChange}
        onStatusChange={handleStatusChange}
        onFacilitatorChange={handleFacilitatorChange}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <div>
        <VBSTable
          studies={paginatedStudies}
          onView={(study) => setSelectedStudy(study)}
          onEdit={(study) => setEditingStudy(study)}
          onDelete={(study) => setDeletingStudy(study)}
        />

        {/* Pagination */}
        <VBSPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredStudies.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add */}
      <AddVBSModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddVBS}
      />

      {/* Edit */}
      <EditVBSModal
        isOpen={!!editingStudy}
        study={editingStudy}
        onClose={() => setEditingStudy(null)}
        onSave={handleEditVBS}
      />

      {/* Details */}
      <VBSDetailsModal
        isOpen={!!selectedStudy}
        study={selectedStudy}
        onClose={() => setSelectedStudy(null)}
      />

      {/* Delete */}
      <DeleteVBSModal
        isOpen={!!deletingStudy}
        study={deletingStudy}
        onClose={() => setDeletingStudy(null)}
        onConfirm={handleDeleteVBS}
      />
    </div>
  );
};

export default VocationalBibleStudies;
