import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import GradesPageHeader from "../../components/Grades/GradesPageHeader";
import GradesSummaryCards from "../../components/Grades/GradesSummaryCards";
import GradesFilterBar from "../../components/Grades/GradesFilterBar";
import GradesTable from "../../components/Grades/GradesTable";
import GradesPagination from "../../components/Grades/GradesPagination";
import ViewGradeModal from "../../components/Grades/ViewGradeModal";
import EditGradeModal from "../../components/Grades/EditGradeModal";
import DeleteGradeModal from "../../components/Grades/DeleteGradeModal";

import { useGrades } from "../../context/GradesContext";
import type { Grade } from "../../data/gradesData";

const AllGrades = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { grades, updateGrade, deleteGrade } = useGrades();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [showSuccess, setShowSuccess] = useState(false);

  // Table actions
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [deletingGrade, setDeletingGrade] = useState<Grade | null>(null);

  // Show success notification when returning from Add Grade page
  useEffect(() => {
    if (location.state?.gradeAdded) {
      setShowSuccess(true);

      // Clear navigation state so refresh doesn't show
      // the notification again.
      navigate(location.pathname, {
        replace: true,
        state: {},
      });

      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  // Filter grades
  const filteredGrades = useMemo(() => {
    return grades.filter((grade) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        grade.name.toLowerCase().includes(search) ||
        grade.teacher.toLowerCase().includes(search) ||
        grade.description.toLowerCase().includes(search);

      const matchesStatus =
        selectedStatus === "All" || grade.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [grades, searchTerm, selectedStatus]);

  // Pagination
  const totalItems = filteredGrades.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const currentGrades = filteredGrades.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Search
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Status filter
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  // Items per page
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-5 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400">
          <span>Grade added successfully.</span>

          <button
            type="button"
            onClick={() => setShowSuccess(false)}
            className="ml-4 font-medium hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page Header */}
      <GradesPageHeader onAddGrade={() => navigate("/grade/add")} />

      {/* Summary Cards */}
      <GradesSummaryCards grades={grades} />

      {/* Filters */}
      <GradesFilterBar
        searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {/* Grades Table */}
      <GradesTable
        grades={currentGrades}
        onView={(grade) => {
          navigate(`/grades/${grade.id}/members`);
        }}
        onEdit={(grade) => {
          setEditingGrade(grade);
        }}
        onDelete={(grade) => {
          setDeletingGrade(grade);
        }}
        onMembers={(grade) => {
          navigate(`/grades/${grade.id}/members`);
        }}
      />

      {/* Pagination */}
      <GradesPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {/* View Grade Modal */}
      {selectedGrade && (
        <ViewGradeModal
          grade={selectedGrade}
          onClose={() => setSelectedGrade(null)}
        />
      )}

      {/* Edit Grade Modal */}
      {editingGrade && (
        <EditGradeModal
          grade={editingGrade}
          onClose={() => setEditingGrade(null)}
          onSave={(updatedGrade) => {
            updateGrade(updatedGrade);
            setEditingGrade(null);
          }}
        />
      )}

      {/* Delete Grade Modal */}
      {deletingGrade && (
        <DeleteGradeModal
          grade={deletingGrade}
          onClose={() => setDeletingGrade(null)}
          onDelete={(id) => {
            deleteGrade(id);
            setDeletingGrade(null);
          }}
        />
      )}
    </div>
  );
};

export default AllGrades;
