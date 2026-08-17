import { Activity, CalendarDays, History as HistoryIcon } from "lucide-react";
import { useMemo, useState } from "react";

import HistoryList from "./HistoryList";
import HistoryDetailsModal from "./HistoryDetailsModal";
import type { HistoryItem } from "./HistoryList";

const History = () => {
  // =====================================================
  // HISTORY DATA
  // =====================================================

  const [historyItems] = useState<HistoryItem[]>([
    {
      id: 1,
      title: "Payment Recorded",
      description: "Sunday School Term 3 payment was recorded.",
      date: "Aug 9, 2026",
      time: "10:32 AM",
      user: "Sarah Wanjiku",
      type: "payment",
    },
    {
      id: 2,
      title: "Lesson Completed",
      description: "Brian completed the lesson 'Knowing God'.",
      date: "Aug 9, 2026",
      time: "09:45 AM",
      user: "David Kamau",
      type: "lesson",
    },
    {
      id: 3,
      title: "Note Added",
      description: "A new observation was added to the child's record.",
      date: "Aug 9, 2026",
      time: "09:15 AM",
      user: "Sarah Wanjiku",
      type: "note",
    },
    {
      id: 4,
      title: "Attendance Recorded",
      description: "Child was marked present for Sunday School.",
      date: "Aug 9, 2026",
      time: "08:30 AM",
      user: "Mary Njeri",
      type: "attendance",
    },
    {
      id: 5,
      title: "Document Uploaded",
      description: "School report was uploaded to the child's documents.",
      date: "Jul 20, 2026",
      time: "02:18 PM",
      user: "David Kamau",
      type: "document",
    },
    {
      id: 6,
      title: "Child Profile Updated",
      description: "Child's class information was updated.",
      date: "Jul 15, 2026",
      time: "11:42 AM",
      user: "Sarah Wanjiku",
      type: "profile",
    },
    {
      id: 7,
      title: "Discipleship Track Updated",
      description: "Child's discipleship progress was updated.",
      date: "Jul 10, 2026",
      time: "03:25 PM",
      user: "David Kamau",
      type: "discipleship",
    },
  ]);

  // =====================================================
  // STATE
  // =====================================================

  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [filter, setFilter] = useState<"all" | HistoryItem["type"]>("all");

  // =====================================================
  // FILTER HISTORY
  // =====================================================

  const filteredHistory = useMemo(() => {
    if (filter === "all") {
      return historyItems;
    }

    return historyItems.filter((item) => item.type === filter);
  }, [historyItems, filter]);

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalActivities = historyItems.length;

  const thisMonth = historyItems.filter((item) =>
    item.date.includes("Aug 2026"),
  ).length;

  const lastActivity =
    historyItems.length > 0 ? historyItems[0].date : "No activity";

  // =====================================================
  // OPEN DETAILS
  // =====================================================

  const handleViewDetails = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  // =====================================================
  // CLOSE DETAILS
  // =====================================================

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="mt-5 space-y-5">
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          History
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View a complete activity history of changes and actions on this
          child's record.
        </p>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Activities */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Activities
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {totalActivities}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <HistoryIcon
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        {/* This Month */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                This Month
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {thisMonth}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <Activity
                size={20}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        {/* Last Activity */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Last Activity
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {lastActivity}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <CalendarDays
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          ACTIVITY HISTORY
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Section Header */}

        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <HistoryIcon
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Activity History
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Recent actions performed on this child's record
              </p>
            </div>
          </div>

          {/* Filter */}

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | HistoryItem["type"])
            }
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="all">All Activities</option>

            <option value="payment">Payments</option>

            <option value="lesson">Lessons</option>

            <option value="note">Notes</option>

            <option value="attendance">Attendance</option>

            <option value="document">Documents</option>

            <option value="profile">Profile</option>

            <option value="discipleship">Discipleship</option>
          </select>
        </div>

        {/* =================================================
            HISTORY LIST
        ================================================= */}

        <HistoryList
          historyItems={filteredHistory}
          onView={handleViewDetails}
        />
      </div>

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      <HistoryDetailsModal
        isOpen={isDetailsOpen}
        item={selectedItem}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default History;
