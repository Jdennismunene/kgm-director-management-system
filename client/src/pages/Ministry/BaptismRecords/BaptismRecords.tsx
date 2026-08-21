import { useMemo, useState } from "react";

import {
  baptismRecordsData,
  type BaptismRecord,
  type BaptismRecordStatus,
  type CertificateStatus,
} from "../../../data/baptismRecordsData";
import BaptismRecordsPageHeader from "../../../components/Ministry/BaptismRecords/BaptismRecordsPageHeader";
import BaptismRecordsSummaryCards from "../../../components/Ministry/BaptismRecords/BaptismRecordsSummaryCards";
import BaptismRecordsFilterBar from "../../../components/Ministry/BaptismRecords/BaptismRecordsFilterBar";
import BaptismRecordsTable from "../../../components/Ministry/BaptismRecords/BaptismRecordsTable";
import BaptismRecordsPagination from "../../../components/Ministry/BaptismRecords/BaptismRecordsPagination";
import AddBaptismRecordModal from "../../../components/Ministry/BaptismRecords/AddBaptismRecordModal";
import BaptismRecordDetailsModal from "../../../components/Ministry/BaptismRecords/BaptismRecordDetailsModal";
import EditBaptismRecordModal from "../../../components/Ministry/BaptismRecords/EditBaptismRecordModal";
import DeleteBaptismRecordModal from "../../../components/Ministry/BaptismRecords/DeleteBaptismRecordModal";

const BaptismRecords = () => {
  /* --------------------------------
     Records
  -------------------------------- */

  const [records, setRecords] = useState<BaptismRecord[]>(baptismRecordsData);

  /* --------------------------------
     Filters
  -------------------------------- */

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStatus, setSelectedStatus] = useState<
    BaptismRecordStatus | "All"
  >("All");

  const [selectedBranch, setSelectedBranch] = useState("All");

  const [selectedYear, setSelectedYear] = useState("All");

  const [selectedCertificateStatus, setSelectedCertificateStatus] = useState<
    CertificateStatus | "All"
  >("All");

  /* --------------------------------
     Pagination
  -------------------------------- */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  /* --------------------------------
     Modals
  -------------------------------- */

  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<BaptismRecord | null>(
    null,
  );

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [editingRecord, setEditingRecord] = useState<BaptismRecord | null>(
    null,
  );

  const [deletingRecord, setDeletingRecord] = useState<BaptismRecord | null>(
    null,
  );

  /* --------------------------------
     Filter Options
  -------------------------------- */

  const branches = useMemo(() => {
    return Array.from(new Set(records.map((record) => record.branch))).sort();
  }, [records]);

  const years = useMemo(() => {
    return Array.from(
      new Set(
        records
          .map((record) => record.baptismDate?.slice(0, 4))
          .filter(Boolean),
      ),
    ).sort((a, b) => Number(b) - Number(a));
  }, [records]);

  /* --------------------------------
     Filtering
  -------------------------------- */

  const filteredRecords = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !search ||
        record.personName.toLowerCase().includes(search) ||
        record.parentGuardian.toLowerCase().includes(search) ||
        record.phone.toLowerCase().includes(search) ||
        record.email.toLowerCase().includes(search) ||
        record.baptismNumber.toLowerCase().includes(search);

      const matchesStatus =
        selectedStatus === "All" || record.status === selectedStatus;

      const matchesBranch =
        selectedBranch === "All" || record.branch === selectedBranch;

      const matchesYear =
        selectedYear === "All" || record.baptismDate.startsWith(selectedYear);

      const matchesCertificate =
        selectedCertificateStatus === "All" ||
        record.certificateStatus === selectedCertificateStatus;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesBranch &&
        matchesYear &&
        matchesCertificate
      );
    });
  }, [
    records,
    searchTerm,
    selectedStatus,
    selectedBranch,
    selectedYear,
    selectedCertificateStatus,
  ]);

  /* --------------------------------
     Pagination
  -------------------------------- */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / itemsPerPage),
  );

  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredRecords.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  /* --------------------------------
     Summary Statistics
  -------------------------------- */

  const currentYear = new Date().getFullYear().toString();

  const totalRecords = records.length;

  const thisYear = records.filter((record) =>
    record.baptismDate.startsWith(currentYear),
  ).length;

  const pending = records.filter(
    (record) => record.status === "Pending" || record.status === "Scheduled",
  ).length;

  const certificatesIssued = records.filter(
    (record) => record.certificateStatus === "Issued",
  ).length;

  /* --------------------------------
     Filter Handlers
  -------------------------------- */

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: BaptismRecordStatus | "All") => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleBranchChange = (branch: string) => {
    setSelectedBranch(branch);
    setCurrentPage(1);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleCertificateStatusChange = (status: CertificateStatus | "All") => {
    setSelectedCertificateStatus(status);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("All");
    setSelectedBranch("All");
    setSelectedYear("All");
    setSelectedCertificateStatus("All");
    setCurrentPage(1);
  };

  /* --------------------------------
     Add Record
  -------------------------------- */

  const handleAddRecord = (newRecord: BaptismRecord) => {
    setRecords((currentRecords) => [newRecord, ...currentRecords]);

    setShowAddModal(false);
    setCurrentPage(1);
  };

  /* --------------------------------
     View Record
  -------------------------------- */

  const handleViewRecord = (record: BaptismRecord) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedRecord(null);
  };

  /* --------------------------------
     Edit Record
  -------------------------------- */

  const handleEditRecord = (record: BaptismRecord) => {
    setEditingRecord(record);
    setShowDetailsModal(false);
    setSelectedRecord(null);
  };

  const handleSaveRecord = (updatedRecord: BaptismRecord) => {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record,
      ),
    );

    setEditingRecord(null);
  };

  /* --------------------------------
     Delete Record
  -------------------------------- */

  const handleDeleteRecord = (record: BaptismRecord) => {
    setDeletingRecord(record);
    setShowDetailsModal(false);
    setSelectedRecord(null);
  };

  const handleConfirmDelete = (record: BaptismRecord) => {
    setRecords((currentRecords) =>
      currentRecords.filter((currentRecord) => currentRecord.id !== record.id),
    );

    setDeletingRecord(null);

    const remainingRecords = filteredRecords.filter(
      (currentRecord) => currentRecord.id !== record.id,
    );

    const newTotalPages = Math.max(
      1,
      Math.ceil(remainingRecords.length / itemsPerPage),
    );

    setCurrentPage((page) => Math.min(page, newTotalPages));
  };

  /* --------------------------------
     Items Per Page
  -------------------------------- */

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  /* --------------------------------
     Render
  -------------------------------- */

  return (
    <div className="space-y-6 mt-4 mx-4 pb-4">
      {/* Page Header */}
      <BaptismRecordsPageHeader onAdd={() => setShowAddModal(true)} />

      {/* Summary Cards */}
      <BaptismRecordsSummaryCards
        totalRecords={totalRecords}
        thisYear={thisYear}
        pending={pending}
        certificatesIssued={certificatesIssued}
      />

      {/* Filters */}
      <BaptismRecordsFilterBar
        searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        selectedBranch={selectedBranch}
        selectedYear={selectedYear}
        selectedCertificateStatus={selectedCertificateStatus}
        branches={branches}
        years={years}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onBranchChange={handleBranchChange}
        onYearChange={handleYearChange}
        onCertificateStatusChange={handleCertificateStatusChange}
        onReset={handleReset}
      />

      {/* Table */}
      <BaptismRecordsTable
        records={paginatedRecords}
        onView={handleViewRecord}
        onEdit={handleEditRecord}
        onDelete={handleDeleteRecord}
      />

      {/* Pagination */}
      <BaptismRecordsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredRecords.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {/* Add Modal */}
      <AddBaptismRecordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddRecord}
      />

      {/* Details Modal */}
      <BaptismRecordDetailsModal
        isOpen={showDetailsModal}
        record={selectedRecord}
        onClose={handleCloseDetails}
        onEdit={handleEditRecord}
        onDelete={handleDeleteRecord}
      />

      {/* Edit Modal */}
      <EditBaptismRecordModal
        isOpen={Boolean(editingRecord)}
        record={editingRecord}
        onClose={() => setEditingRecord(null)}
        onSave={handleSaveRecord}
      />

      {/* Delete Modal */}
      <DeleteBaptismRecordModal
        isOpen={Boolean(deletingRecord)}
        record={deletingRecord}
        onClose={() => setDeletingRecord(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BaptismRecords;
