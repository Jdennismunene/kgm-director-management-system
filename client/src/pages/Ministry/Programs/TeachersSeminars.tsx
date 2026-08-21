import { useMemo, useState } from "react";

import TeachersSeminarsPageHeader from "../../../components/Ministry/TeachersSeminars/TeachersSeminarsPageHeader";
import TeachersSeminarsSummaryCards from "../../../components/Ministry/TeachersSeminars/TeachersSeminarsSummaryCards";
import TeachersSeminarsYearFilter from "../../../components/Ministry/TeachersSeminars/TeachersSeminarsYearFilter";
import TeachersSeminarsFilterBar from "../../../components/Ministry/TeachersSeminars/TeachersSeminarsFilterBar";
import TeachersSeminarsTable from "../../../components/Ministry/TeachersSeminars/TeachersSeminarsTable";
import TeachersSeminarsPagination from "../../../components/Ministry/TeachersSeminars/TeachersSeminarsPagination";

import AddTeachersSeminarModal from "../../../components/Ministry/TeachersSeminars/AddTeachersSeminarModal";
import EditTeachersSeminarModal from "../../../components/Ministry/TeachersSeminars/EditTeachersSeminarModal";
import TeachersSeminarDetailsModal from "../../../components/Ministry/TeachersSeminars/TeachersSeminarDetailsModal";
import DeleteTeachersSeminarModal from "../../../components/Ministry/TeachersSeminars/DeleteTeachersSeminarModal";

import {
  teachersSeminarsData,
  type TeacherSeminar,
  type SeminarLocation,
  type SeminarStatus,
} from "../../../data/teachersSeminarsData";

const TeachersSeminars = () => {
  const [seminars, setSeminars] =
    useState<TeacherSeminar[]>(teachersSeminarsData);

  const [selectedYear, setSelectedYear] = useState<number | "All">("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedLocation, setSelectedLocation] = useState<
    SeminarLocation | "All"
  >("All");

  const [selectedStatus, setSelectedStatus] = useState<SeminarStatus | "All">(
    "All",
  );

  const [selectedFacilitator, setSelectedFacilitator] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const [editingSeminar, setEditingSeminar] = useState<TeacherSeminar | null>(
    null,
  );

  const [deletingSeminar, setDeletingSeminar] = useState<TeacherSeminar | null>(
    null,
  );

  const [viewingSeminar, setViewingSeminar] = useState<TeacherSeminar | null>(
    null,
  );

  const [showAddModal, setShowAddModal] = useState(false);

  const [notification, setNotification] = useState("");

  /* =========================
     Years
  ========================= */

  const years = useMemo(() => {
    return Array.from(new Set(seminars.map((seminar) => seminar.year))).sort(
      (a, b) => b - a,
    );
  }, [seminars]);

  /* =========================
     Facilitators
  ========================= */

  const facilitators = useMemo(() => {
    return Array.from(
      new Set(seminars.map((seminar) => seminar.facilitator)),
    ).sort();
  }, [seminars]);

  /* =========================
     Filtering
  ========================= */

  const filteredSeminars = useMemo(() => {
    return seminars.filter((seminar) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        seminar.title.toLowerCase().includes(search) ||
        seminar.theme.toLowerCase().includes(search) ||
        seminar.facilitator.toLowerCase().includes(search) ||
        seminar.location.toLowerCase().includes(search);

      const matchesYear =
        selectedYear === "All" || seminar.year === selectedYear;

      const matchesLocation =
        selectedLocation === "All" || seminar.location === selectedLocation;

      const matchesStatus =
        selectedStatus === "All" || seminar.status === selectedStatus;

      const matchesFacilitator =
        selectedFacilitator === "All" ||
        seminar.facilitator === selectedFacilitator;

      return (
        matchesSearch &&
        matchesYear &&
        matchesLocation &&
        matchesStatus &&
        matchesFacilitator
      );
    });
  }, [
    seminars,
    searchTerm,
    selectedYear,
    selectedLocation,
    selectedStatus,
    selectedFacilitator,
  ]);

  /* =========================
     Pagination
  ========================= */

  const totalItems = filteredSeminars.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const currentSeminars = filteredSeminars.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* =========================
     Filter Handlers
  ========================= */

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleYearChange = (year: number | "All") => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleLocationChange = (location: SeminarLocation | "All") => {
    setSelectedLocation(location);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: SeminarStatus | "All") => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleFacilitatorChange = (facilitator: string) => {
    setSelectedFacilitator(facilitator);
    setCurrentPage(1);
  };

  /* =========================
   Summary Statistics
========================= */

  const currentYear = new Date().getFullYear();

  const totalSeminars = seminars.length;

  const thisYearSeminars = seminars.filter(
    (seminar) => seminar.year === currentYear,
  ).length;

  const completedSeminars = seminars.filter(
    (seminar) => seminar.status === "Completed",
  ).length;

  const totalParticipants = seminars.reduce(
    (total, seminar) => total + seminar.participants,
    0,
  );

  /* =========================
     Reset Filters
  ========================= */

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedYear("All");
    setSelectedLocation("All");
    setSelectedStatus("All");
    setSelectedFacilitator("All");
    setCurrentPage(1);
  };

  /* =========================
     Notification
  ========================= */

  const showNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  /* =========================
     Add Seminar
  ========================= */

  const handleAddSeminar = (newSeminar: TeacherSeminar) => {
    setSeminars((prev) => [newSeminar, ...prev]);

    setShowAddModal(false);
    setCurrentPage(1);

    showNotification("Teachers seminar added successfully.");
  };

  /* =========================
     Edit Seminar
  ========================= */

  const handleEditSeminar = (updatedSeminar: TeacherSeminar) => {
    setSeminars((prev) =>
      prev.map((seminar) =>
        seminar.id === updatedSeminar.id ? updatedSeminar : seminar,
      ),
    );

    setEditingSeminar(null);

    showNotification("Teachers seminar updated successfully.");
  };

  /* =========================
     Delete Seminar
  ========================= */

  const handleDeleteSeminar = () => {
    if (!deletingSeminar) return;

    setSeminars((prev) =>
      prev.filter((seminar) => seminar.id !== deletingSeminar.id),
    );

    setDeletingSeminar(null);

    showNotification("Teachers seminar deleted successfully.");
  };

  /* =========================
     Export Seminars
  ========================= */

  const handleExport = () => {
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
    ];

    const rows = filteredSeminars.map((seminar) => [
      seminar.title,
      seminar.year,
      seminar.startDate,
      seminar.endDate,
      seminar.location,
      seminar.facilitator,
      seminar.participants,
      seminar.status,
      seminar.theme,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "teachers-seminars.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showNotification("Teachers seminars exported successfully.");
  };

  return (
    <div className="mx-4 mt-4 space-y-6 pb-4">
      {/* Notification */}
      {notification && (
        <div className="fixed right-6 top-6 z-100 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {notification}
        </div>
      )}

      {/* Page Header */}
      <TeachersSeminarsPageHeader
        onAdd={() => setShowAddModal(true)}
        onExport={handleExport}
      />

      {/* =========================
    Summary Cards
========================= */}
      <TeachersSeminarsSummaryCards
        totalSeminars={totalSeminars}
        thisYearSeminars={thisYearSeminars}
        completedSeminars={completedSeminars}
        totalParticipants={totalParticipants}
      />

      {/* Year Filter */}
      <TeachersSeminarsYearFilter
        years={years}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      {/* Filters */}
      <TeachersSeminarsFilterBar
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
      <TeachersSeminarsTable
        seminars={currentSeminars}
        onView={(seminar) => {
          setViewingSeminar(seminar);
        }}
        onEdit={(seminar) => {
          setEditingSeminar(seminar);
        }}
        onDelete={(seminar) => {
          setDeletingSeminar(seminar);
        }}
      />

      {/* Pagination */}
      <TeachersSeminarsPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Add Modal */}
      <AddTeachersSeminarModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSeminar}
      />

      {/* Edit Modal */}
      <EditTeachersSeminarModal
        isOpen={!!editingSeminar}
        seminar={editingSeminar}
        onClose={() => setEditingSeminar(null)}
        onSave={handleEditSeminar}
      />

      {/* View Modal */}
      <TeachersSeminarDetailsModal
        isOpen={!!viewingSeminar}
        seminar={viewingSeminar}
        onClose={() => setViewingSeminar(null)}
      />

      {/* Delete Modal */}
      <DeleteTeachersSeminarModal
        isOpen={!!deletingSeminar}
        seminar={deletingSeminar}
        onClose={() => setDeletingSeminar(null)}
        onConfirm={handleDeleteSeminar}
      />
    </div>
  );
};

export default TeachersSeminars;
