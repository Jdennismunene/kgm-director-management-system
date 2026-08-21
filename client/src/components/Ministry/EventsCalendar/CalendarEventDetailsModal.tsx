import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  UserRound,
  X,
} from "lucide-react";

import type { CalendarEvent } from "../../../data/calendarEventsData";

interface CalendarEventDetailsModalProps {
  isOpen: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (event: CalendarEvent) => void;
}

const CalendarEventDetailsModal = ({
  isOpen,
  event,
  onClose,
  onEdit,
  onDelete,
}: CalendarEventDetailsModalProps) => {
  if (!isOpen || !event) return null;

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    if (!time) return "—";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";

      case "Ongoing":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300";

      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <CalendarDays
                size={21}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {event.title}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  {event.type}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                    event.status,
                  )}`}
                >
                  {event.status}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 p-6">
          {/* Description */}
          {event.description && (
            <div>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                {event.description}
              </p>
            </div>
          )}

          {/* Event Information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Date */}
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <CalendarDays
                  size={18}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Date
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(event.startDate)}
                </p>

                {event.endDate !== event.startDate && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    to {formatDate(event.endDate)}
                  </p>
                )}
              </div>
            </div>

            {/* Time */}
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
                <Clock3
                  size={18}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Time
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {event.startTime
                    ? formatTime(event.startTime)
                    : "Not specified"}
                </p>

                {event.endTime && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    to {formatTime(event.endTime)}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-900/30">
                <MapPin
                  size={18}
                  className="text-orange-600 dark:text-orange-400"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {event.location || "Not specified"}
                </p>
              </div>
            </div>

            {/* Branch */}
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                <MapPin
                  size={18}
                  className="text-green-600 dark:text-green-400"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Branch
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {event.branch}
                </p>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 dark:bg-cyan-900/30">
                <UserRound
                  size={18}
                  className="text-cyan-600 dark:text-cyan-400"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Organizer
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {event.organizer || "Not specified"}
                </p>
              </div>
            </div>

            {/* Participants */}
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-50 dark:bg-pink-900/30">
                <Users size={18} className="text-pink-600 dark:text-pink-400" />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Expected Participants
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                  {event.expectedParticipants}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={() => onDelete(event)}
              className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Delete
            </button>

            <button
              type="button"
              onClick={() => onEdit(event)}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Edit Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarEventDetailsModal;
