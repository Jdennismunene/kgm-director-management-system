import { Plus, ChevronRight, CheckCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ChildrenSummaryCards from "../../components/Children/ChildrenSummaryCards";
import ChildrenFilterBar from "../../components/Children/ChildrenFilterBar";
import ChildrenTable from "../../components/Children/ChildrenTable";
import ChildrenPagination from "../../components/Children/ChildrenPagination";
import { childrenData, type Child } from "../../data/childrenData";
import ChildDetailsModal from "../../components/Children/ChildDetailsModal";
import EditChildModal from "../../components/Children/EditChildModal";
import DeleteChildModal from "../../components/Children/DeleteChildModal";
import AddChildModal from "../../components/Children/AddChildModal";
import { useState } from "react";

const AllChildren = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [children, setChildren] = useState<Child[]>(childrenData);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [deletingChild, setDeletingChild] = useState<Child | null>(null);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const filteredChildren = children.filter((child) => {
    const search = searchTerm.toLowerCase().trim();

    // Search
    const matchesSearch =
      !search ||
      child.name.toLowerCase().includes(search) ||
      child.parent.toLowerCase().includes(search) ||
      child.phone.toLowerCase().includes(search);

    // Class
    const matchesClass =
      !selectedClass ||
      child.className.toLowerCase().trim() ===
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

  const totalItems = filteredChildren.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentChildren = filteredChildren.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="p-6">
      {/* Success Notification */}
      {showSuccessNotification && (
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
          {/* Success Icon */}
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

          {/* Message */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Child registered successfully
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              The child has been added to the Sunday School records.
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

          {/* Close Notification */}
          <button
            type="button"
            onClick={() => setShowSuccessNotification(false)}
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

      {/* Breadcrumb */}
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

      {/* Page Header */}
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
          onClick={() => setShowAddChildModal(true)}
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
    "
        >
          <Plus size={18} />
          Add Child
        </button>
      </div>

      {/* Summary Cards */}
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
          setSelectedStatus("active");
          setCurrentPage(1);
        }}
        onViewInactive={() => {
          setSearchTerm("");
          setSelectedClass("");
          setSelectedAge("");
          setSelectedStatus("inactive");
          setCurrentPage(1);
        }}
        onViewNew={() => {
          // We'll handle this properly below
          setSearchTerm("");
          setSelectedClass("");
          setSelectedAge("");
          setSelectedStatus("");
          setCurrentPage(1);
        }}
      />
      {/* Search & Filters */}
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

      {/* Children Table */}
      <ChildrenTable
        children={currentChildren}
        onViewChild={(child) => navigate(`/children/${child.id}`)}
        onEditChild={(child) => setEditingChild(child)}
        onDeactivateChild={(child) => setDeletingChild(child)}
        onDeleteChild={(child) => setDeletingChild(child)}
      />

      {/* Pagination */}
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

      <ChildDetailsModal
        child={selectedChild}
        onClose={() => setSelectedChild(null)}
      />

      {showAddChildModal && (
        <AddChildModal
          onClose={() => setShowAddChildModal(false)}
          onSave={(newChild) => {
            // Add the new child to the list
            setChildren((currentChildren) => [...currentChildren, newChild]);

            // Close modal
            setShowAddChildModal(false);

            // Reset filters so the newly added child can be seen
            setSearchTerm("");
            setSelectedClass("");
            setSelectedAge("");
            setSelectedStatus("");
            setCurrentPage(1);

            // Show success notification
            setShowSuccessNotification(true);

            // Automatically hide notification after 6 seconds
            setTimeout(() => {
              setShowSuccessNotification(false);
            }, 6000);
          }}
        />
      )}

      <EditChildModal
        child={editingChild}
        onClose={() => setEditingChild(null)}
        onSave={(updatedChild) => {
          setChildren((currentChildren) =>
            currentChildren.map((child) =>
              child.id === updatedChild.id ? updatedChild : child,
            ),
          );

          setEditingChild(null);
        }}
      />

      <DeleteChildModal
        child={deletingChild}
        onClose={() => setDeletingChild(null)}
        onConfirm={() => {
          if (!deletingChild) return;

          setChildren((currentChildren) =>
            currentChildren.filter((child) => child.id !== deletingChild.id),
          );

          setDeletingChild(null);
        }}
      />
    </div>
  );
};

export default AllChildren;
