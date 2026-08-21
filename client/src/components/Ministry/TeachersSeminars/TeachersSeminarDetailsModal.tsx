import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Users,
  X,
} from "lucide-react";

import type { TeacherSeminar } from "../../../data/teachersSeminarsData";

interface TeachersSeminarDetailsModalProps {
  isOpen: boolean;
  seminar: TeacherSeminar | null;
  onClose: () => void;
}

const TeachersSeminarDetailsModal = ({
  isOpen,
  seminar,
  onClose,
}: TeachersSeminarDetailsModalProps) => {
  if (!isOpen || !seminar) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClasses = () => {
    switch (seminar.status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      case "Upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

      case "Ongoing":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
              {seminar.year} Teachers Seminar
            </p>

            <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              {seminar.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {seminar.theme}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Status */}
          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-700/50">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Seminar Status
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses()}`}
            >
              {seminar.status}
            </span>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Date */}
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={18}
                  className="text-teal-600 dark:text-teal-400"
                />

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Dates
                </p>
              </div>

              <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
                {formatDate(seminar.startDate)}
              </p>

              {seminar.endDate !== seminar.startDate && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  to {formatDate(seminar.endDate)}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-teal-600 dark:text-teal-400"
                />

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Location
                </p>
              </div>

              <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
                {seminar.location}
              </p>
            </div>

            {/* Facilitator */}
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <UserRound
                  size={18}
                  className="text-teal-600 dark:text-teal-400"
                />

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Facilitator
                </p>
              </div>

              <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
                {seminar.facilitator}
              </p>
            </div>

            {/* Participants */}
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-teal-600 dark:text-teal-400" />

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Participants
                </p>
              </div>

              <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
                {seminar.participants} teachers
              </p>
            </div>
          </div>

          {/* Theme */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Seminar Theme
            </h3>

            <div className="mt-2 rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
              <p className="text-sm leading-6 text-teal-800 dark:text-teal-300">
                {seminar.theme}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Description
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {seminar.description || "No description provided."}
            </p>
          </div>

          {/* Quick Summary */}
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Clock3 size={17} className="text-gray-500 dark:text-gray-400" />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Seminar Summary
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This seminar was conducted in {seminar.year} at {seminar.location}
              , facilitated by {seminar.facilitator}, with{" "}
              {seminar.participants} participating teachers.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeachersSeminarDetailsModal;
