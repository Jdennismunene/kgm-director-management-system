import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import CalendarPageHeader from "../../../components/Ministry/EventsCalendar/CalendarPageHeader";
import CalendarSummaryCards from "../../../components/Ministry/EventsCalendar/CalendarSummaryCards";
import CalendarFilters from "../../../components/Ministry/EventsCalendar/CalendarFilters";
import CalendarGrid from "../../../components/Ministry/EventsCalendar/CalendarGrid";

import AddCalendarEventModal from "../../../components/Ministry/EventsCalendar/AddCalendarEventModal";
import EditCalendarEventModal from "../../../components/Ministry/EventsCalendar/EditCalendarEventModal";
import CalendarEventDetailsModal from "../../../components/Ministry/EventsCalendar/CalendarEventDetailsModal";
import DeleteCalendarEventModal from "../../../components/Ministry/EventsCalendar/DeleteCalendarEventModal";

import {
  calendarEventsData,
  type CalendarEvent,
  type CalendarEventStatus,
  type CalendarEventType,
} from "../../../data/calendarEventsData";

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(calendarEventsData);

  /* =========================
     Calendar Date
  ========================= */

  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  /* =========================
     Filters
  ========================= */

  const [selectedType, setSelectedType] = useState<CalendarEventType | "All">(
    "All",
  );

  const [selectedStatus, setSelectedStatus] = useState<
    CalendarEventStatus | "All"
  >("All");

  const [selectedBranch, setSelectedBranch] = useState<string>("All");

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
     Calendar Navigation
  ========================= */

  const goToPreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthYearLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  /* =========================
     Filter Options
  ========================= */

  const branches = useMemo(() => {
    return Array.from(new Set(events.map((event) => event.branch))).sort();
  }, [events]);

  /* =========================
     Filter Events
  ========================= */

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesType = selectedType === "All" || event.type === selectedType;

      const matchesStatus =
        selectedStatus === "All" || event.status === selectedStatus;

      const matchesBranch =
        selectedBranch === "All" || event.branch === selectedBranch;

      return matchesType && matchesStatus && matchesBranch;
    });
  }, [events, selectedType, selectedStatus, selectedBranch]);

  /* =========================
   Summary Statistics
========================= */

  const today = new Date();

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const thisMonthEvents = events.filter((event) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    return (
      (startDate.getFullYear() === today.getFullYear() &&
        startDate.getMonth() === today.getMonth()) ||
      (endDate.getFullYear() === today.getFullYear() &&
        endDate.getMonth() === today.getMonth())
    );
  }).length;

  const upcomingEvents = events.filter(
    (event) =>
      event.startDate > todayString &&
      event.status !== "Cancelled" &&
      event.status !== "Completed",
  ).length;

  const todayEvents = events.filter(
    (event) =>
      todayString >= event.startDate &&
      todayString <= event.endDate &&
      event.status !== "Cancelled",
  ).length;

  const totalEvents = events.length;

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
     Add Event
  ========================= */

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents((prev) => [newEvent, ...prev]);

    setShowAddModal(false);
    setSelectedDate(null);

    showNotification("Calendar event added successfully.");
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
  };

  /* =========================
     Reset Filters
  ========================= */

  const handleResetFilters = () => {
    setSelectedType("All");
    setSelectedStatus("All");
    setSelectedBranch("All");
  };

  /* =========================
     Open Add Modal
  ========================= */

  const handleAddFromHeader = () => {
    setSelectedDate(null);
    setShowAddModal(true);
  };

  /* =========================
     Date Selection
  ========================= */

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowAddModal(true);
  };

  /* =========================
     Event Selection
  ========================= */

  const handleEventClick = (event: CalendarEvent) => {
    setViewingEvent(event);
  };

  return (
    <div className="mx-4 mt-4 space-y-6 pb-4">
      {/* =========================
          Notification
      ========================= */}

      {notification && (
        <div className="fixed right-6 top-6 z-100 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {notification}
        </div>
      )}

      {/* =========================
          Page Header
      ========================= */}

      <CalendarPageHeader onAdd={handleAddFromHeader} onToday={goToToday} />

      {/* =========================
          Summary Cards
      ========================= */}

      <CalendarSummaryCards
        totalEvents={totalEvents}
        thisMonthEvents={thisMonthEvents}
        upcomingEvents={upcomingEvents}
        todayEvents={todayEvents}
      />

      {/* =========================
          Filters
      ========================= */}

      <CalendarFilters
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        selectedBranch={selectedBranch}
        branches={branches}
        onTypeChange={setSelectedType}
        onStatusChange={setSelectedStatus}
        onBranchChange={setSelectedBranch}
        onReset={handleResetFilters}
      />

      {/* =========================
          Calendar Navigation
      ========================= */}

      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-gray-700 dark:bg-gray-800">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthYearLabel}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and view church events
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="rounded-lg border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={goToNextMonth}
            className="rounded-lg border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* =========================
          Calendar
      ========================= */}

      <CalendarGrid
        currentDate={currentDate}
        events={filteredEvents}
        onDateSelect={handleDateSelect}
        onEventClick={handleEventClick}
      />

      {/* =========================
          Add Event Modal
      ========================= */}

      <AddCalendarEventModal
        isOpen={showAddModal}
        selectedDate={selectedDate}
        onClose={() => {
          setShowAddModal(false);
          setSelectedDate(null);
        }}
        onAdd={handleAddEvent}
      />

      {/* =========================
          Event Details Modal
      ========================= */}

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

      {/* =========================
          Edit Event Modal
      ========================= */}

      <EditCalendarEventModal
        isOpen={!!editingEvent}
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onSave={handleEditEvent}
      />

      {/* =========================
          Delete Event Modal
      ========================= */}

      <DeleteCalendarEventModal
        isOpen={!!deletingEvent}
        event={deletingEvent}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleDeleteEvent}
      />
    </div>
  );
};

export default Calendar;
