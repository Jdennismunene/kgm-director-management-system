import { useMemo, useState } from "react";

import UpcomingEventsPageHeader from "../../../components/Ministry/UpcomingEvents/UpcomingEventsPageHeader";
import UpcomingEventsSummaryCards from "../../../components/Ministry/UpcomingEvents/UpcomingEventsSummaryCards";
import UpcomingEventsFilterBar from "../../../components/Ministry/UpcomingEvents/UpcomingEventsFilterBar";
import UpcomingEventsTable from "../../../components/Ministry/UpcomingEvents/UpcomingEventsTable";
import UpcomingEventsPagination from "../../../components/Ministry/UpcomingEvents/UpcomingEventsPagination";

import CalendarEventDetailsModal from "../../../components/Ministry/EventsCalendar/CalendarEventDetailsModal";
import EditCalendarEventModal from "../../../components/Ministry/EventsCalendar/EditCalendarEventModal";
import DeleteCalendarEventModal from "../../../components/Ministry/EventsCalendar/DeleteCalendarEventModal";

import {
  calendarEventsData,
  type CalendarEvent,
  type CalendarEventStatus,
  type CalendarEventType,
} from "../../../data/calendarEventsData";
import AddCalendarEventModal from "../../../components/Ministry/EventsCalendar/AddCalendarEventModal";

const UpcomingEvents = () => {
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
  const [itemsPerPage] = useState(10);

  /* =========================
     Modals
  ========================= */

  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null);

  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(
    null,
  );

  const [showAddModal, setShowAddModal] = useState(false);

  /* =========================
     Notification
  ========================= */

  const [notification, setNotification] = useState("");

  /* =========================
     Current Date
  ========================= */

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  /* =========================
     Branch Options
  ========================= */

  const branches = useMemo(() => {
    return Array.from(new Set(events.map((event) => event.branch))).sort();
  }, [events]);

  /* =========================
     Upcoming Events
  ========================= */

  const upcomingEvents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      const isUpcoming =
        event.endDate >= todayString &&
        event.status !== "Cancelled" &&
        event.status !== "Completed";

      if (!isUpcoming) {
        return false;
      }

      const matchesSearch =
        !search ||
        event.title.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search) ||
        event.organizer.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search);

      const matchesType = selectedType === "All" || event.type === selectedType;

      const matchesStatus =
        selectedStatus === "All" || event.status === selectedStatus;

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

  const totalUpcoming = upcomingEvents.length;

  const thisMonth = upcomingEvents.filter((event) => {
    const startDate = new Date(`${event.startDate}T00:00:00`);

    return (
      startDate.getFullYear() === today.getFullYear() &&
      startDate.getMonth() === today.getMonth()
    );
  }).length;

  const thisWeek = upcomingEvents.filter((event) => {
    const eventDate = new Date(`${event.startDate}T00:00:00`);

    const currentDay = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return eventDate >= startOfWeek && eventDate <= endOfWeek;
  }).length;

  const totalParticipants = upcomingEvents.reduce(
    (total, event) => total + event.expectedParticipants,
    0,
  );

  /* =========================
     Pagination
  ========================= */

  const totalItems = upcomingEvents.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const paginatedEvents = upcomingEvents.slice(
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
    if (!deletingEvent) {
      return;
    }

    setEvents((prev) => prev.filter((event) => event.id !== deletingEvent.id));

    setDeletingEvent(null);
    setViewingEvent(null);

    showNotification("Calendar event deleted successfully.");
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

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents((prev) => [newEvent, ...prev]);

    setShowAddModal(false);

    showNotification("Calendar event added successfully.");
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
      <UpcomingEventsPageHeader onAdd={() => setShowAddModal(true)} />

      {/* Summary Cards */}
      <UpcomingEventsSummaryCards
        totalUpcoming={totalUpcoming}
        thisMonth={thisMonth}
        thisWeek={thisWeek}
        totalParticipants={totalParticipants}
      />

      {/* Filters */}
      <UpcomingEventsFilterBar
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

      {/* Events Table */}
      <UpcomingEventsTable
        events={paginatedEvents}
        onView={setViewingEvent}
        onEdit={setEditingEvent}
        onDelete={setDeletingEvent}
      />

      {/* Pagination */}
      <UpcomingEventsPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Event Details */}
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

      {/* Add Event */}
      <AddCalendarEventModal
        isOpen={showAddModal}
        selectedDate={null}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddEvent}
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

export default UpcomingEvents;
