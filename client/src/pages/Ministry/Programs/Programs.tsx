import { useMemo, useState } from "react";

import ProgramsPageHeader from "../../../components/Ministry/Programs/ProgramsPageHeader";
import ProgramsSummaryCards from "../../../components/Ministry/Programs/ProgramsSummaryCards";
import ProgramsYearFilter from "../../../components/Ministry/Programs/ProgramsYearFilter";
import ProgramsFilterBar from "../../../components/Ministry/Programs/ProgramsFilterBar";
import ProgramsTable from "../../../components/Ministry/Programs/ProgramsTable";
import ProgramsPagination from "../../../components/Ministry/Programs/ProgramsPagination";
import AddProgramModal from "../../../components/Ministry/Programs/AddProgramModal";
import EditProgramModal from "../../../components/Ministry/Programs/EditProgramModal";
import ProgramDetailsModal from "../../../components/Ministry/Programs/ProgramDetailsModal";
import DeleteProgramModal from "../../../components/Ministry/Programs/DeleteProgramModal";

import {
  programsData,
  type Program,
  type ProgramStatus,
  type ProgramType,
} from "../../../data/programsData";
import { CheckCircle2, X } from "lucide-react";

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>(programsData);

  const [selectedYear, setSelectedYear] = useState<number | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<ProgramType | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<ProgramStatus | "All">(
    "All",
  );

  const [showAddProgramModal, setShowAddProgramModal] = useState(false);

  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const [viewingProgram, setViewingProgram] = useState<Program | null>(null);

  const [deletingProgram, setDeletingProgram] = useState<Program | null>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const showSuccessNotification = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const currentYear = new Date().getFullYear();

  /* --------------------------------
     Available Years
  --------------------------------- */
  const years = useMemo(() => {
    return Array.from(new Set(programs.map((program) => program.year))).sort(
      (a, b) => b - a,
    );
  }, [programs]);

  /* --------------------------------
     Summary Statistics
  --------------------------------- */
  const totalPrograms = programs.length;

  const thisYearPrograms = programs.filter(
    (program) => program.year === currentYear,
  ).length;

  const completedPrograms = programs.filter(
    (program) => program.status === "Completed",
  ).length;

  const upcomingPrograms = programs.filter(
    (program) => program.status === "Upcoming",
  ).length;

  /* --------------------------------
     Filtering
  --------------------------------- */
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesYear =
        selectedYear === "All" || program.year === selectedYear;

      const matchesType =
        selectedType === "All" || program.type === selectedType;

      const matchesStatus =
        selectedStatus === "All" || program.status === selectedStatus;

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        search === "" ||
        program.name.toLowerCase().includes(search) ||
        program.type.toLowerCase().includes(search) ||
        program.venue.toLowerCase().includes(search) ||
        program.coordinator.toLowerCase().includes(search);

      return matchesYear && matchesType && matchesStatus && matchesSearch;
    });
  }, [programs, selectedYear, selectedType, selectedStatus, searchTerm]);

  /* --------------------------------
     Pagination
  --------------------------------- */
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);

  const paginatedPrograms = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredPrograms.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPrograms, currentPage]);

  /* --------------------------------
     Reset page when filters change
  --------------------------------- */
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleYearChange = (year: number | "All") => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: ProgramType | "All") => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: ProgramStatus | "All") => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  /* --------------------------------
     Actions
  --------------------------------- */
  const handleAddProgram = () => {
    setShowAddProgramModal(true);
  };

  const handleExport = () => {
    if (filteredPrograms.length === 0) {
      alert("There are no programs to export.");
      return;
    }

    const headers = [
      "Program",
      "Type",
      "Year",
      "Start Date",
      "End Date",
      "Venue",
      "Participants",
      "Status",
      "Coordinator",
      "Description",
    ];

    const rows = filteredPrograms.map((program) => [
      program.name,
      program.type,
      program.year,
      program.startDate,
      program.endDate,
      program.venue,
      program.participants,
      program.status,
      program.coordinator,
      program.description,
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
    link.download = `KGM-Programs-${selectedYear === "All" ? "All-Years" : selectedYear}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleViewProgram = (program: Program) => {
    setViewingProgram(program);
  };

  const handleEditProgram = (program: Program) => {
    setEditingProgram(program);
  };

  const handleDeleteProgram = (program: Program) => {
    setDeletingProgram(program);
  };

  const handleConfirmDelete = (program: Program) => {
    setPrograms((currentPrograms) =>
      currentPrograms.filter((item) => item.id !== program.id),
    );

    setDeletingProgram(null);
    setCurrentPage(1);

    showSuccessNotification(`"${program.name}" was deleted successfully.`);
  };

  const handleAddProgramSubmit = (newProgram: Program) => {
    setPrograms((currentPrograms) => [newProgram, ...currentPrograms]);
    setCurrentPage(1);

    showSuccessNotification(`"${newProgram.name}" was added successfully.`);
  };

  const handleSaveProgram = (updatedProgram: Program) => {
    setPrograms((currentPrograms) =>
      currentPrograms.map((program) =>
        program.id === updatedProgram.id ? updatedProgram : program,
      ),
    );

    showSuccessNotification(
      `"${updatedProgram.name}" was updated successfully.`,
    );
  };

  return (
    <div className="space-y-6 mx-4 mt-4 pb-4">
      {showSuccess && (
        <div className="fixed right-5 top-5 z-100 w-[calc(100%-2.5rem)] max-w-sm">
          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-white p-4 shadow-lg dark:border-green-800 dark:bg-gray-800">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2
                size={20}
                className="text-green-600 dark:text-green-400"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Success
              </p>

              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {successMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <X size={17} />
            </button>
          </div>
        </div>
      )}
      <ProgramsPageHeader
        onAddProgram={handleAddProgram}
        onExport={handleExport}
      />

      <ProgramsSummaryCards
        totalPrograms={totalPrograms}
        thisYearPrograms={thisYearPrograms}
        completedPrograms={completedPrograms}
        upcomingPrograms={upcomingPrograms}
      />

      <ProgramsYearFilter
        years={years}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <ProgramsFilterBar
        searchTerm={searchTerm}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
      />

      <ProgramsTable
        programs={paginatedPrograms}
        onView={handleViewProgram}
        onEdit={handleEditProgram}
        onDelete={handleDeleteProgram}
      />

      <ProgramsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredPrograms.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <AddProgramModal
        isOpen={showAddProgramModal}
        onClose={() => setShowAddProgramModal(false)}
        onAdd={handleAddProgramSubmit}
      />

      <EditProgramModal
        isOpen={editingProgram !== null}
        program={editingProgram}
        onClose={() => setEditingProgram(null)}
        onSave={handleSaveProgram}
      />

      <ProgramDetailsModal
        isOpen={viewingProgram !== null}
        program={viewingProgram}
        onClose={() => setViewingProgram(null)}
      />

      <DeleteProgramModal
        isOpen={deletingProgram !== null}
        program={deletingProgram}
        onClose={() => setDeletingProgram(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Programs;
