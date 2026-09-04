import { Activity, CalendarDays, History as HistoryIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import HistoryList from "./HistoryList";
import HistoryDetailsModal from "./HistoryDetailsModal";
import type { HistoryItem } from "./HistoryList";

import {
  getHistory,
  type HistoryRecord,
  type HistoryType,
} from "../../services/historyService";

interface HistoryProps {
  childId: string;
}

const History = ({ childId }: HistoryProps) => {
  // =====================================================
  // STATE
  // =====================================================

  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [filter, setFilter] = useState<"all" | HistoryItem["type"]>("all");

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  useEffect(() => {
    const loadHistory = async () => {
      if (!childId) {
        setHistoryRecords([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await getHistory(childId);

        setHistoryRecords(data);
      } catch (err) {
        console.error("Failed to load child history:", err);

        setError("Failed to load activity history.");
        setHistoryRecords([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [childId]);

  // =====================================================
  // CONVERT BACKEND TYPE TO UI TYPE
  // =====================================================

  const convertHistoryType = (type: HistoryType): HistoryItem["type"] => {
    switch (type) {
      case "PAYMENT":
        return "payment";

      case "LESSON":
        return "lesson";

      case "NOTE":
        return "note";

      case "ATTENDANCE":
        return "attendance";

      case "DOCUMENT":
        return "document";

      case "PROFILE":
        return "profile";

      case "DISCIPLESHIP":
        return "discipleship";

      default:
        return "profile";
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // CONVERT API DATA TO HISTORY LIST DATA
  // =====================================================

  const historyItems = useMemo<HistoryItem[]>(() => {
    return historyRecords.map((record) => ({
      id: record.id,
      title: record.title,
      description: record.description,
      date: formatDate(record.createdAt),
      time: formatTime(record.createdAt),
      user: record.user,
      type: convertHistoryType(record.type),
    }));
  }, [historyRecords]);

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

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonth = historyRecords.filter((record) => {
    const date = new Date(record.createdAt);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  }).length;

  const lastActivity =
    historyRecords.length > 0
      ? formatDate(historyRecords[0].createdAt)
      : "No activity";

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

  // =====================================================
  // RENDER
  // =====================================================

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
            LOADING
        ================================================= */}

        {isLoading && (
          <div className="flex items-center justify-center px-5 py-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading activity history...
            </p>
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!isLoading && error && (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!isLoading && !error && filteredHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
            <HistoryIcon
              size={32}
              className="text-gray-300 dark:text-gray-600"
            />

            <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              No activity found
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              There are no recorded activities for this child yet.
            </p>
          </div>
        )}

        {/* =================================================
            HISTORY LIST
        ================================================= */}

        {!isLoading && !error && filteredHistory.length > 0 && (
          <HistoryList
            historyItems={filteredHistory}
            onView={handleViewDetails}
          />
        )}
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
