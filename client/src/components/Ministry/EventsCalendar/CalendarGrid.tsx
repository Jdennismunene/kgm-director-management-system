import { CalendarPlus } from "lucide-react";

import type { CalendarEvent } from "../../../data/calendarEventsData";

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const CalendarGrid = ({
  currentDate,
  events,
  onEventClick,
  onDateSelect,
}: CalendarGridProps) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstDay = firstDayOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const previousMonthDays = new Date(year, month, 0).getDate();

  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const days = Array.from({ length: totalCells }, (_, index) => {
    const dayOffset = index - firstDay + 1;

    // Previous month
    if (dayOffset < 1) {
      return {
        date: new Date(year, month - 1, previousMonthDays + dayOffset),
        currentMonth: false,
      };
    }

    // Next month
    if (dayOffset > daysInMonth) {
      return {
        date: new Date(year, month + 1, dayOffset - daysInMonth),
        currentMonth: false,
      };
    }

    // Current month
    return {
      date: new Date(year, month, dayOffset),
      currentMonth: true,
    };
  });

  const formatDate = (date: Date) => {
    const dateYear = date.getFullYear();
    const dateMonth = String(date.getMonth() + 1).padStart(2, "0");
    const dateDay = String(date.getDate()).padStart(2, "0");

    return `${dateYear}-${dateMonth}-${dateDay}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();

    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };

  const getEventsForDate = (date: Date) => {
    const dateString = formatDate(date);

    return events.filter(
      (event) => dateString >= event.startDate && dateString <= event.endDate,
    );
  };

  const getEventStyle = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "Church Service":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";

      case "VBS":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";

      case "Teachers Seminar":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

      case "Teachers Bonding":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300";

      case "Competition":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300";

      case "Meeting":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";

      case "Training":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {weekDays.map((day) => (
          <div
            key={day}
            className="border-r border-gray-200 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 last:border-r-0 dark:border-gray-700 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7">
        {days.map(({ date, currentMonth }, index) => {
          const dateString = formatDate(date);
          const dayEvents = getEventsForDate(date);

          return (
            <div
              key={`${dateString}-${index}`}
              onClick={() => currentMonth && onDateSelect(dateString)}
              className={`group relative min-h-32.5 border-b border-r border-gray-200 p-2 transition last:border-r-0 dark:border-gray-700 ${
                currentMonth
                  ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40"
                  : "bg-gray-50/70 dark:bg-gray-900/30"
              }`}
            >
              {/* Date Number */}
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                    isToday(date)
                      ? "bg-blue-600 text-white"
                      : currentMonth
                        ? "text-gray-700 dark:text-gray-200"
                        : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {date.getDate()}
                </span>

                {/* Add Event Icon */}
                {currentMonth && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDateSelect(dateString);
                    }}
                    aria-label={`Add event on ${dateString}`}
                    className="hidden rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-blue-600 group-hover:block dark:hover:bg-gray-700 dark:hover:text-blue-400"
                  >
                    <CalendarPlus size={15} />
                  </button>
                )}
              </div>

              {/* Events */}
              <div className="mt-2 space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`w-full truncate rounded-md px-2 py-1 text-left text-xs font-medium transition hover:opacity-80 ${getEventStyle(
                      event.type,
                    )}`}
                    title={event.title}
                  >
                    {event.title}
                  </button>
                ))}

                {/* More Events */}
                {dayEvents.length > 3 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(dayEvents[3]);
                    }}
                    className="px-2 text-xs font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    +{dayEvents.length - 3} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
