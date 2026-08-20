import { ArrowLeft, Search, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { parentsData, type Parent } from "../../data/parentsData";

import ParentRecordHeader from "../../components/Parents/ParentRecordHeader";
import ParentRecordTabs from "../../components/Parents/ParentRecordTabs";
import ParentOverview from "../../components/Parents/ParentOverview";
import ParentChildren from "../../components/Parents/ParentChildren";
import ParentAttendance from "../../components/Parents/ParentAttendance";
import ParentCommunication from "../../components/Parents/ParentCommunication";
import ParentNotes from "../../components/Parents/ParentNotes";
import ParentHistory from "../../components/Parents/ParentHistory";

const ParentRecords = () => {
  const navigate = useNavigate();

  // Get parent ID from:
  // /parents/records/:id
  const { id } = useParams<{ id: string }>();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

  const [activeTab, setActiveTab] = useState("overview");

  // --------------------------------------------------
  // Select parent from URL
  // --------------------------------------------------

  useEffect(() => {
    if (!id) {
      setSelectedParent(null);
      return;
    }

    const parent = parentsData.find((parent) => parent.id === Number(id));

    if (parent) {
      setSelectedParent(parent);
    } else {
      setSelectedParent(null);
    }
  }, [id]);

  // --------------------------------------------------
  // Search parents
  // --------------------------------------------------

  const filteredParents = useMemo(() => {
    if (!searchTerm.trim()) {
      return parentsData;
    }

    const search = searchTerm.toLowerCase();

    return parentsData.filter(
      (parent) =>
        parent.name.toLowerCase().includes(search) ||
        parent.phone.toLowerCase().includes(search) ||
        parent.email.toLowerCase().includes(search),
    );
  }, [searchTerm]);

  // --------------------------------------------------
  // Select parent from search
  // --------------------------------------------------

  const handleParentSelect = (parent: Parent) => {
    setSelectedParent(parent);
    setSearchTerm("");
    setActiveTab("overview");

    // Update URL so the selected parent has its own record URL
    navigate(`/parents/records/${parent.id}`);
  };

  // --------------------------------------------------
  // Go back to all parents
  // --------------------------------------------------

  const handleBackToParents = () => {
    navigate("/parents");
  };

  return (
    <div className="mx-3 mt-3 space-y-6 pb-3">
      {/* --------------------------------------------- */}
      {/* Back Button */}
      {/* --------------------------------------------- */}

      <button
        type="button"
        onClick={handleBackToParents}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
      >
        <ArrowLeft size={17} />
        Back to Parents
      </button>

      {/* --------------------------------------------- */}
      {/* Page Header */}
      {/* --------------------------------------------- */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
            <UserRound size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Parent Records
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View and manage detailed parent information.
            </p>
          </div>
        </div>

        {/* ------------------------------------------- */}
        {/* Parent Search */}
        {/* ------------------------------------------- */}

        <div className="relative w-full lg:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search parent..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />

          {/* Search Results */}
          {searchTerm && filteredParents.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              {filteredParents.slice(0, 5).map((parent) => (
                <button
                  key={parent.id}
                  type="button"
                  onClick={() => handleParentSelect(parent)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {/* Avatar */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                    {parent.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {parent.name}
                    </p>

                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {parent.phone}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Search Results */}
          {searchTerm && filteredParents.length === 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-500 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              No parent found.
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* NO PARENT SELECTED */}
      {/* ================================================= */}

      {!selectedParent ? (
        <div className="flex min-h-105 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="max-w-md px-6 py-10 text-center">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <UserRound size={30} />
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
              No Parent Selected
            </h2>

            {/* Description */}
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Select a parent from the search above or go to the All Parents
              page to choose a parent and view their complete record.
            </p>

            {/* Action */}
            <button
              type="button"
              onClick={handleBackToParents}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <ArrowLeft size={16} />
              View All Parents
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ================================================= */}
          {/* SELECTED PARENT */}
          {/* ================================================= */}

          {/* Parent Header */}
          <ParentRecordHeader parent={selectedParent} />

          {/* Parent Tabs */}
          <ParentRecordTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* ================================================= */}
          {/* Tab Content */}
          {/* ================================================= */}

          {activeTab === "overview" && (
            <ParentOverview parent={selectedParent} />
          )}

          {activeTab === "children" && (
            <ParentChildren parent={selectedParent} />
          )}

          {activeTab === "attendance" && (
            <ParentAttendance parent={selectedParent} />
          )}

          {activeTab === "communication" && (
            <ParentCommunication parent={selectedParent} />
          )}

          {activeTab === "notes" && <ParentNotes parent={selectedParent} />}

          {activeTab === "history" && <ParentHistory parent={selectedParent} />}
        </>
      )}
    </div>
  );
};

export default ParentRecords;
