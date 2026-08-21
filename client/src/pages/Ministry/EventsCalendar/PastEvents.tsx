import { useMemo, useState } from "react";

import PastEventsPageHeader from "../../../components/Ministry/PastEvents/PastEventsPageHeader";
import PastEventsSummaryCards from "../../../components/Ministry/PastEvents/PastEventsSummaryCards";
import PastEventsFilterBar from "../../../components/Ministry/PastEvents/PastEventsFilterBar";
import PastEventsTable from "../../../components/Ministry/PastEvents/PastEventsTable";
import PastEventsPagination from "../../../components/Ministry/PastEvents/PastEventsPagination";

import CalendarEventDetailsModal from "../../../components/Ministry/EventsCalendar/CalendarEventDetailsModal";
import EditCalendarEventModal from "../../../components/Ministry/EventsCalendar/EditCalendarEventModal";
import DeleteCalendarEventModal from "../../../components/Ministry/EventsCalendar/DeleteCalendarEventModal";

import {
  calendarEventsData,
  type CalendarEvent,
  type CalendarEventStatus,
  type CalendarEventType,
} from "../../../data/calendarEventsData";

const PastEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(calendarEventsData);

  /* =========================
     Filters
  ========================= */

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] = useState<CalendarEventType | "All">(
    "All",
  );

  const [selectedStatus, setSelectedStatus] = useState<
    CalendarEventStatus | "All"
  >("All");

  const [selectedBranch, setSelectedBranch] = useState<string>("All");

  /* =========================
     Pagination
  ========================= */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /* =========================
     Modals
  ========================= */

  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null);

  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(
    null,
  );

  /* =========================
     Notification
  ========================= */

  const [notification, setNotification] = useState("");

  /* =========================
     Current Date
  ========================= */

  const today = new Date();

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  /* =========================
     Branch Options
  ========================= */

  const branches = useMemo(() => {
    return Array.from(new Set(events.map((event) => event.branch))).sort();
  }, [events]);

  /* =========================
     Filter Past Events
  ========================= */

  const pastEvents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      /*
       * An event is considered past once
       * its end date has already passed.
       */
      const isPast = event.endDate < todayString;

      if (!isPast) {
        return false;
      }

      /* Search */
      const matchesSearch =
        !search ||
        event.title.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search) ||
        event.organizer.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search) ||
        event.branch.toLowerCase().includes(search);

      /* Type */
      const matchesType = selectedType === "All" || event.type === selectedType;

      /* Status */
      const matchesStatus =
        selectedStatus === "All" || event.status === selectedStatus;

      /* Branch */
      const matchesBranch =
        selectedBranch === "All" || event.branch === selectedBranch;

      return matchesSearch && matchesType && matchesStatus && matchesBranch;
    });
  }, [
    events,
    todayString,
    searchTerm,
    selectedType,
    selectedStatus,
    selectedBranch,
  ]);

  /* =========================
     Summary Statistics
  ========================= */

  const totalPastEvents = pastEvents.length;

  const thisMonth = pastEvents.filter((event) => {
    const eventDate = new Date(`${event.endDate}T00:00:00`);

    return (
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate.getMonth() === today.getMonth()
    );
  }).length;

  const thisYear = pastEvents.filter((event) => {
    const eventDate = new Date(`${event.endDate}T00:00:00`);

    return eventDate.getFullYear() === today.getFullYear();
  }).length;

  const totalParticipants = pastEvents.reduce(
    (total, event) => total + event.expectedParticipants,
    0,
  );

  /* =========================
     Pagination
  ========================= */

  const totalItems = pastEvents.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const paginatedEvents = pastEvents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* =========================
     Notification
  ========================= */

  const showNotification = (message: string) => {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  /* =========================
     Edit Event
  ========================= */

  const handleEditEvent = (updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );

    setEditingEvent(null);
    setViewingEvent(null);

    showNotification("Calendar event updated successfully.");
  };

  /* =========================
     Delete Event
  ========================= */

  const handleDeleteEvent = () => {
    if (!deletingEvent) return;

    setEvents((prev) => prev.filter((event) => event.id !== deletingEvent.id));

    setDeletingEvent(null);
    setViewingEvent(null);

    showNotification("Calendar event deleted successfully.");

    /*
     * If the current page becomes empty after deletion,
     * move back to the previous page.
     */
    if (paginatedEvents.length === 1 && safeCurrentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  /* =========================
     Reset Filters
  ========================= */

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedStatus("All");
    setSelectedBranch("All");
    setCurrentPage(1);
  };

  /* =========================
     Filter Handlers
  ========================= */

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: CalendarEventType | "All") => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: CalendarEventStatus | "All") => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
    setCurrentPage(1);
  };

  /* =========================
     Pagination Handlers
  ========================= */

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  /* =========================
     Render
  ========================= */

  return (
    <div className="mx-4 mt-4 space-y-6 pb-4">
      {/* Notification */}
      {notification && (
        <div className="fixed right-6 top-6 z-50 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {notification}
        </div>
      )}

      {/* Page Header */}
      <PastEventsPageHeader />

      {/* Summary Cards */}
      <PastEventsSummaryCards
        totalPastEvents={totalPastEvents}
        thisMonth={thisMonth}
        thisYear={thisYear}
        totalParticipants={totalParticipants}
      />

      {/* Filters */}
      <PastEventsFilterBar
        searchTerm={searchTerm}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        selectedBranch={selectedBranch}
        branches={branches}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
        onBranchChange={handleBranchChange}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <PastEventsTable
        events={paginatedEvents}
        onView={setViewingEvent}
        onEdit={setEditingEvent}
        onDelete={setDeletingEvent}
      />

      {/* Pagination */}
      <PastEventsPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {/* View Event */}
      <CalendarEventDetailsModal
        isOpen={!!viewingEvent}
        event={viewingEvent}
        onClose={() => setViewingEvent(null)}
        onEdit={(event) => {
          setViewingEvent(null);
          setEditingEvent(event);
        }}
        onDelete={(event) => {
          setViewingEvent(null);
          setDeletingEvent(event);
        }}
      />

      {/* Edit Event */}
      <EditCalendarEventModal
        isOpen={!!editingEvent}
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onSave={handleEditEvent}
      />

      {/* Delete Event */}
      <DeleteCalendarEventModal
        isOpen={!!deletingEvent}
        event={deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleDeleteEvent}
      />
    </div>
  );
};

export default PastEvents;
