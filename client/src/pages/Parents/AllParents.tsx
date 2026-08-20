import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ParentsPageHeader from "../../components/Parents/ParentsPageHeader";
import ParentsSummaryCards from "../../components/Parents/ParentsSummaryCards";
import ParentsFilterBar from "../../components/Parents/ParentsFilterBar";
import ParentsTable from "../../components/Parents/ParentsTable";
import ParentsPagination from "../../components/Parents/ParentsPagination";
import AddParentModal from "../../components/Parents/AddParentModal";
import EditParentModal from "../../components/Parents/EditParentModal";
import DeleteParentModal from "../../components/Parents/DeleteParentModal";

import { parentsData, type Parent } from "../../data/parentsData";

const AllParents = () => {
  const navigate = useNavigate();

  const [parents, setParents] = useState<Parent[]>(parentsData);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showAddParentModal, setShowAddParentModal] = useState(false);

  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [deletingParent, setDeletingParent] = useState<Parent | null>(null);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  // Automatically hide notification
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  // Filter parents
  const filteredParents = useMemo(() => {
    return parents.filter((parent) => {
      const matchesSearch =
        parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBranch =
        selectedBranch === "All Branches" || parent.branch === selectedBranch;

      const matchesStatus =
        selectedStatus === "All Status" || parent.status === selectedStatus;

      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [parents, searchTerm, selectedBranch, selectedStatus]);

  // Pagination
  const totalItems = filteredParents.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentParents = filteredParents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Add parent
  const handleAddParent = (newParent: Parent) => {
    setParents((prev) => [...prev, newParent]);

    setShowAddParentModal(false);

    setNotification(`${newParent.name} has been added successfully.`);
  };

  // Edit parent
  const handleEditParent = (updatedParent: Parent) => {
    setParents((prev) =>
      prev.map((parent) =>
        parent.id === updatedParent.id ? updatedParent : parent,
      ),
    );

    setEditingParent(null);

    setNotification(
      `${updatedParent.name}'s information has been updated successfully.`,
    );
  };

  // Delete parent
  const handleDeleteParent = () => {
    if (!deletingParent) return;

    const deletedParentName = deletingParent.name;

    setParents((prev) =>
      prev.filter((parent) => parent.id !== deletingParent.id),
    );

    setDeletingParent(null);

    setNotification(`${deletedParentName} has been deleted successfully.`);
  };

  // Reset pagination when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  return (
    <div className="relative mx-4 mt-3 space-y-6 pb-3">
      {/* Success Notification */}
      {notification && (
        <div className="fixed right-6 top-6 z-100 w-[calc(100%-3rem)] max-w-sm">
          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-white p-4 shadow-lg dark:border-green-900/50 dark:bg-gray-800">
            {/* Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 size={19} />
            </div>

            {/* Message */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Success
              </p>

              <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
                {notification}
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <ParentsPageHeader onAddParent={() => setShowAddParentModal(true)} />

      {/* Summary Cards */}
      <ParentsSummaryCards parents={parents} />

      {/* Filters */}
      <ParentsFilterBar
        searchTerm={searchTerm}
        selectedBranch={selectedBranch}
        selectedStatus={selectedStatus}
        onSearchChange={handleSearchChange}
        onBranchChange={handleBranchChange}
        onStatusChange={handleStatusChange}
      />

      {/* Parents Table */}
      <ParentsTable
        parents={currentParents}
        onView={(parent) => navigate(`/parents/records/${parent.id}`)}
        onEdit={(parent) => setEditingParent(parent)}
        onDelete={(parent) => setDeletingParent(parent)}
      />

      {/* Pagination */}
      <ParentsPagination
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

      {/* Add Parent Modal */}
      {showAddParentModal && (
        <AddParentModal
          onClose={() => setShowAddParentModal(false)}
          onSave={handleAddParent}
        />
      )}

      {/* Edit Parent Modal */}
      {editingParent && (
        <EditParentModal
          parent={editingParent}
          onClose={() => setEditingParent(null)}
          onSave={handleEditParent}
        />
      )}

      {/* Delete Parent Modal */}
      {deletingParent && (
        <DeleteParentModal
          parent={deletingParent}
          onClose={() => setDeletingParent(null)}
          onConfirm={handleDeleteParent}
        />
      )}
    </div>
  );
};

export default AllParents;
