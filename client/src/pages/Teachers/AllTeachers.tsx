import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TeachersPageHeader from "../../components/Teachers/TeachersPageHeader";
import TeacherSummaryCards from "../../components/Teachers/TeacherSummaryCards";
import TeachersFilterBar from "../../components/Teachers/TeachersFilterBar";
import TeachersTable from "../../components/Teachers/TeachersTable";
import TeachersPagination from "../../components/Teachers/TeachersPagination";
import TeacherDetailsModal from "../../components/Teachers/TeacherDetailsModal";
import EditTeacherModal from "../../components/Teachers/EditTeacherModal";
import DeleteTeacherModal from "../../components/Teachers/DeleteTeacherModal";

import type { Teacher } from "../../data/teachersData";
import { useTeachers } from "../../context/TeachersContext";

const AllTeachers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { teachers, updateTeacher, deleteTeacher } = useTeachers();

  // Filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Applied filters
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [appliedClass, setAppliedClass] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [action, setAction] = useState<"view" | "edit" | "delete" | null>(null);

  const [notification, setNotification] = useState<string | null>(null);

  const itemsPerPage = 5;

  /*
   * Handle notifications from other pages
   */
  useEffect(() => {
    const message = location.state?.notification;

    if (message) {
      showNotification(message);

      // Clear navigation state so notification
      // doesn't appear again after refresh
      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location, navigate]);

  /*
   * Notification
   */
  const showNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  /*
   * Handle notifications from other pages
   */
  useEffect(() => {
    const message = location.state?.notification;

    if (message) {
      showNotification(message);

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location, navigate]);

  /*
   * Filter Teachers
   */
  const filteredTeachers = teachers.filter((teacher) => {
    const search = appliedSearchTerm.toLowerCase();

    const matchesSearch =
      teacher.name.toLowerCase().includes(search) ||
      teacher.email.toLowerCase().includes(search) ||
      teacher.phone.toLowerCase().includes(search);

    const matchesClass =
      appliedClass === "" || teacher.grade.includes(appliedClass);

    const matchesStatus =
      appliedStatus === "" || teacher.status === appliedStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  /*
   * Reset page when applied filters change
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedSearchTerm, appliedClass, appliedStatus]);

  /*
   * Pagination
   */
  const totalItems = filteredTeachers.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentTeachers = filteredTeachers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /*
   * Apply Filters
   */
  const handleFilter = () => {
    setAppliedSearchTerm(searchTerm);
    setAppliedClass(selectedClass);
    setAppliedStatus(selectedStatus);
    setCurrentPage(1);
  };

  /*
   * Teacher Actions
   */
  const handleView = (teacher: Teacher) => {
    navigate(`/teachers/${teacher.id}`);
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setAction("edit");
  };

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setAction("delete");
  };

  /*
   * Close Modal
   */
  const handleCloseModal = () => {
    setSelectedTeacher(null);
    setAction(null);
  };

  /*
   * Update Teacher
   */
  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    updateTeacher(updatedTeacher);

    handleCloseModal();

    showNotification("Teacher updated successfully.");
  };

  /*
   * Delete Teacher
   */
  const handleConfirmDelete = (teacher: Teacher) => {
    deleteTeacher(teacher.id);

    setSelectedTeacher(null);
    setAction(null);

    showNotification("Teacher deleted successfully.");
  };
  return (
    <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
      {/* Notification */}
      {notification && (
        <div className="fixed right-6 top-6 z-100">
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-white px-4 py-3 shadow-lg dark:border-green-800 dark:bg-gray-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <span className="text-green-600 dark:text-green-400">✓</span>
            </div>

            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {notification}
            </p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <TeachersPageHeader onAddTeacher={() => navigate("/teachers/add")} />

      {/* Summary Cards */}
      <TeacherSummaryCards teachers={teachers} />

      {/* Filters */}
      <TeachersFilterBar
        searchTerm={searchTerm}
        selectedClass={selectedClass}
        selectedStatus={selectedStatus}
        onSearchChange={setSearchTerm}
        onClassChange={setSelectedClass}
        onStatusChange={setSelectedStatus}
        onFilter={handleFilter}
      />

      {/* Teachers Table + Pagination */}
      <div className="mt-6 overflow-hidden rounded-xl">
        <TeachersTable
          teachers={currentTeachers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <TeachersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Teacher Details Modal */}
      {action === "view" && selectedTeacher && (
        <TeacherDetailsModal
          teacher={selectedTeacher}
          onClose={handleCloseModal}
        />
      )}

      {/* Edit Teacher Modal */}
      {action === "edit" && selectedTeacher && (
        <EditTeacherModal
          teacher={selectedTeacher}
          onClose={handleCloseModal}
          onSave={handleUpdateTeacher}
        />
      )}

      {/* Delete Teacher Modal */}
      {action === "delete" && selectedTeacher && (
        <DeleteTeacherModal
          teacher={selectedTeacher}
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AllTeachers;
