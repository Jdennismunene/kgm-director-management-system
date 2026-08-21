import { CalendarDays, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import type { CalendarEvent } from "../../../data/calendarEventsData";

interface UpcomingEventsTableProps {
  events: CalendarEvent[];
  onView: (event: CalendarEvent) => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (event: CalendarEvent) => void;
}

const UpcomingEventsTable = ({
  events,
  onView,
  onEdit,
  onDelete,
}: UpcomingEventsTableProps) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateRange = (event: CalendarEvent) => {
    if (event.startDate === event.endDate) {
      return formatDate(event.startDate);
    }

    return `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`;
  };

  const getTypeStyle = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "Church Service":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

      case "VBS":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";

      case "Teachers Seminar":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

      case "Teachers Bonding":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";

      case "Competition":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300";

      case "Meeting":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";

      case "Training":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusStyle = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

      case "Ongoing":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

      case "Completed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <CalendarDays
          size={40}
          className="mx-auto text-gray-400 dark:text-gray-500"
        />

        <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
          No upcoming events found
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try changing your filters or add a new event.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-262.5">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Event
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Location
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Organizer
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Participants
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {events.map((event) => (
              <tr
                key={event.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                {/* Event */}
                <td className="px-5 py-4">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </p>

                  {event.description && (
                    <p className="mt-1 max-w-55 truncate text-xs text-gray-500 dark:text-gray-400">
                      {event.description}
                    </p>
                  )}
                </td>

                {/* Date */}
                <td className="px-5 py-4">
                  <div className="flex items-start gap-2">
                    <CalendarDays
                      size={16}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />

                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        {formatDateRange(event)}
                      </p>

                      {event.startTime && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {event.startTime}
                          {event.endTime ? ` – ${event.endTime}` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getTypeStyle(
                      event.type,
                    )}`}
                  >
                    {event.type}
                  </span>
                </td>

                {/* Location */}
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {event.location || "—"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {event.branch}
                  </p>
                </td>

                {/* Organizer */}
                <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-200">
                  {event.organizer || "—"}
                </td>

                {/* Participants */}
                <td className="px-5 py-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">
                  {event.expectedParticipants}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                      event.status,
                    )}`}
                  >
                    {event.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="relative px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(openMenu === event.id ? null : event.id)
                    }
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    aria-label={`Actions for ${event.title}`}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === event.id && (
                    <div className="absolute right-5 top-12 z-20 w-40 rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onView(event);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onEdit(event);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onDelete(event);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingEventsTable;
