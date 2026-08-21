import { AlertTriangle, Trash2, X } from "lucide-react";

import type { CalendarEvent } from "../../../data/calendarEventsData";

interface DeleteCalendarEventModalProps {
  isOpen: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteCalendarEventModal = ({
  isOpen,
  event,
  onClose,
  onConfirm,
}: DeleteCalendarEventModalProps) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30">
              <Trash2 size={20} className="text-red-600 dark:text-red-400" />
            </div>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Event
            </h2>
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
        <div className="p-6">
          <div className="flex gap-3 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
            />

            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Are you sure you want to delete this event?
              </p>

              <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Event */}
          <div className="mt-5 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {event.title}
            </p>

            <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
              <p>
                <span className="font-medium">Type:</span> {event.type}
              </p>

              <p>
                <span className="font-medium">Date:</span> {event.startDate}
                {event.endDate !== event.startDate && ` - ${event.endDate}`}
              </p>

              {event.location && (
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {event.location}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <Trash2 size={17} />
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCalendarEventModal;
