import { Plus, ChevronRight, CheckCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ChildrenSummaryCards from "../../components/Children/ChildrenSummaryCards";
import ChildrenFilterBar from "../../components/Children/ChildrenFilterBar";
import ChildrenTable from "../../components/Children/ChildrenTable";
import ChildrenPagination from "../../components/Children/ChildrenPagination";

import ChildDetailsModal from "../../components/Children/ChildDetailsModal";
import EditChildModal from "../../components/Children/EditChildModal";
import DeleteChildModal from "../../components/Children/DeleteChildModal";


import {
  getChildren,
  updateChild,
  deleteChild,
  updateChildStatus,
  type Child,
} from "../../services/childService";

const AllChildren = () => {
  const navigate = useNavigate();

  // =========================
  // Filters & pagination
  // =========================
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // =========================
  // Children
  // =========================
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Modals
  // =========================
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const [editingChild, setEditingChild] = useState<Child | null>(null);

  const [deletingChild, setDeletingChild] = useState<Child | null>(null);

  // =========================
  // Notifications
  // =========================
  const [successMessage, setSuccessMessage] = useState("");

  const [operationLoading, setOperationLoading] = useState(false);

  // =========================
  // Load children
  // =========================
  const loadChildren = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getChildren();

      setChildren(data);
    } catch (error) {
      console.error("Failed to load children:", error);

      setError(
        "Failed to load children. Please make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChildren();
  }, []);

  // =========================
  // Success notification
  // =========================
  const showSuccess = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 6000);
  };

  // =========================
  // Filtering
  // =========================
  const filteredChildren = children.filter((child) => {
    const search = searchTerm.toLowerCase().trim();

    // Search
    const matchesSearch =
      !search ||
      child.name.toLowerCase().includes(search) ||
      child.parent.name.toLowerCase().includes(search) ||
      child.parent.phone.toLowerCase().includes(search);

    // Grade / Class
    const matchesClass =
      !selectedClass ||
      child.grade.name.toLowerCase().trim() ===
        selectedClass.toLowerCase().trim();

    // Age
    const matchesAge =
      !selectedAge ||
      (selectedAge === "4-6" && child.age >= 4 && child.age <= 6) ||
      (selectedAge === "7-9" && child.age >= 7 && child.age <= 9) ||
      (selectedAge === "10-12" && child.age >= 10 && child.age <= 12) ||
      (selectedAge === "13+" && child.age >= 13);

    // Status
    const matchesStatus =
      !selectedStatus ||
      child.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesClass && matchesAge && matchesStatus;
  });

  // =========================
  // Pagination
  // =========================
  const totalItems = filteredChildren.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentChildren = filteredChildren.slice(
    startIndex,
    startIndex + itemsPerPage,
  );


  // =========================
  // Edit child
  // =========================
  const handleUpdateChild = async (updatedChild: Child) => {
    try {
      setOperationLoading(true);

      const updated = await updateChild(updatedChild.id, {
        name: updatedChild.name,
        age: updatedChild.age,
        parentId: updatedChild.parentId,
        gradeId: updatedChild.gradeId,
        branchId: updatedChild.branchId,
        status: updatedChild.status,
      });

      setChildren((currentChildren) =>
        currentChildren.map((child) =>
          child.id === updated.id ? updated : child,
        ),
      );

      setEditingChild(null);

      showSuccess("Child updated successfully.");
    } catch (error) {
      console.error("Failed to update child:", error);

      setError("Failed to update child. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  // =========================
  // Delete child
  // =========================
  const handleDeleteChild = async () => {
    if (!deletingChild) return;

    try {
      setOperationLoading(true);

      await deleteChild(deletingChild.id);

      setChildren((currentChildren) =>
        currentChildren.filter((child) => child.id !== deletingChild.id),
      );

      setDeletingChild(null);

      showSuccess("Child deleted successfully.");
    } catch (error) {
      console.error("Failed to delete child:", error);

      setError("Failed to delete child. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  // =========================
  // Deactivate child
  // =========================
  const handleDeactivateChild = async (child: Child) => {
    try {
      setOperationLoading(true);

      const updated = await updateChildStatus(child.id, "INACTIVE");

      setChildren((currentChildren) =>
        currentChildren.map((currentChild) =>
          currentChild.id === updated.id ? updated : currentChild,
        ),
      );

      showSuccess("Child has been deactivated successfully.");
    } catch (error) {
      console.error("Failed to deactivate child:", error);

      setError("Failed to deactivate child. Please try again.");
    } finally {
      setOperationLoading(false);
    }
  };

  // =========================
  // Loading state
  // =========================
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading children...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* =========================
          Success Notification
      ========================== */}
      {successMessage && (
        <div
          className="
            fixed
            top-20
            right-6
            z-60
            w-full
            max-w-md
            bg-white
            dark:bg-gray-900
            border
            border-green-200
            dark:border-green-800
            rounded-xl
            shadow-lg
            px-4
            py-4
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-green-50
              dark:bg-green-950/50
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <CheckCircle
              size={21}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Success
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {successMessage}
            </p>

            <Link
              to="/children"
              className="
                inline-flex
                items-center
                gap-1
                mt-2
                text-sm
                font-medium
                text-blue-600
                dark:text-blue-400
                hover:text-blue-700
                dark:hover:text-blue-300
              "
            >
              View All Children
              <ChevronRight size={15} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            className="
              w-7
              h-7
              rounded-lg
              flex
              items-center
              justify-center
              text-gray-400
              dark:text-gray-500
              hover:bg-gray-100
              dark:hover:bg-gray-800
              hover:text-gray-600
              dark:hover:text-gray-300
              transition
              cursor-pointer
            "
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* =========================
          Error
      ========================== */}
      {error && (
        <div
          className="
            mb-6
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
            dark:border-red-800
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          {error}

          <button
            type="button"
            onClick={() => {
              setError("");
              loadChildren();
            }}
            className="ml-3 font-medium underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* =========================
          Breadcrumb
      ========================== */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Link
          to="/dashboard"
          className="
            text-blue-600
            dark:text-blue-400
            cursor-pointer
            hover:underline
          "
        >
          Dashboard
        </Link>

        <ChevronRight size={16} className="text-gray-400 dark:text-gray-600" />

        <span
          className="
            text-blue-600
            dark:text-blue-400
            cursor-pointer
            hover:underline
          "
        >
          Children
        </span>

        <ChevronRight size={16} className="text-gray-400 dark:text-gray-600" />

        <span className="text-gray-600 dark:text-gray-300">All Children</span>
      </div>

      {/* =========================
          Header
      ========================== */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            All Children
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and keep track of all Sunday School children.
          </p>
        </div>

        <button
          onClick={() => navigate("/children/add")}
          disabled={operationLoading}
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            dark:hover:bg-blue-500
            text-white
            px-5
            py-2.5
            rounded-lg
            text-sm
            font-medium
            transition
            cursor-pointer
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <Plus size={18} />
          Add Child
        </button>
      </div>

      {/* =========================
          Summary Cards
      ========================== */}
      <ChildrenSummaryCards
        children={children}
        onViewAll={() => {
          setSearchTerm("");
          setSelectedClass("");
          setSelectedAge("");
          setSelectedStatus("");
          setCurrentPage(1);
        }}
        onViewActive={() => {
          setSearchTerm("");
          setSelectedClass("");
          setSelectedAge("");
          setSelectedStatus("ACTIVE");
          setCurrentPage(1);
        }}
        onViewInactive={() => {
          setSearchTerm("");
          setSelectedClass("");
          setSelectedAge("");
          setSelectedStatus("INACTIVE");
          setCurrentPage(1);
        }}
        onViewNew={() => {
          setSearchTerm("");
          setSelectedClass("");
          setSelectedAge("");
          setSelectedStatus("");
          setCurrentPage(1);
        }}
      />

      {/* =========================
          Filters
      ========================== */}
      <ChildrenFilterBar
        searchTerm={searchTerm}
        selectedClass={selectedClass}
        selectedAge={selectedAge}
        selectedStatus={selectedStatus}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        onClassChange={(value) => {
          setSelectedClass(value);
          setCurrentPage(1);
        }}
        onAgeChange={(value) => {
          setSelectedAge(value);
          setCurrentPage(1);
        }}
        onStatusChange={(value) => {
          setSelectedStatus(value);
          setCurrentPage(1);
        }}
        onClearFilters={() => {
          setSearchTerm("");
          setSelectedClass("");
          setSelectedAge("");
          setSelectedStatus("");
          setCurrentPage(1);
        }}
      />

      {/* =========================
          Table
      ========================== */}
      <ChildrenTable
        children={currentChildren}
        onViewChild={(child) => navigate(`/children/${child.id}`)}
        onEditChild={(child) => setEditingChild(child)}
        onDeactivateChild={handleDeactivateChild}
        onDeleteChild={(child) => setDeletingChild(child)}
      />

      {/* =========================
          Pagination
      ========================== */}
      <ChildrenPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(items) => {
          setItemsPerPage(items);
          setCurrentPage(1);
        }}
      />

      {/* =========================
          Details Modal
      ========================== */}
      <ChildDetailsModal
        child={selectedChild}
        onClose={() => setSelectedChild(null)}
      />

      {/* =========================
          Edit Child Modal
      ========================== */}
      <EditChildModal
        child={editingChild}
        onClose={() => setEditingChild(null)}
        onSave={handleUpdateChild}
      />

      {/* =========================
          Delete Child Modal
      ========================== */}
      <DeleteChildModal
        child={deletingChild}
        onClose={() => setDeletingChild(null)}
        onConfirm={handleDeleteChild}
      />

      {/* Operation loading */}
      {operationLoading && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/10
            dark:bg-black/30
            pointer-events-none
          "
        />
      )}
    </div>
  );
};

export default AllChildren;
