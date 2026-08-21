import {
  BookOpen,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  UserRound,
  X,
} from "lucide-react";

import type { VocationalBibleStudy } from "../../../data/vocationalBibleStudiesData";

interface VBSDetailsModalProps {
  isOpen: boolean;
  study: VocationalBibleStudy | null;
  onClose: () => void;
}

const VBSDetailsModal = ({ isOpen, study, onClose }: VBSDetailsModalProps) => {
  if (!isOpen || !study) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClasses = () => {
    switch (study.status) {
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
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30">
              <BookOpen
                size={21}
                className="text-teal-600 dark:text-teal-400"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {study.title}
                </h2>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses()}`}
                >
                  {study.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Vocational Bible Study • {study.year}
              </p>
            </div>
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
          {/* Theme */}
          <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-4 dark:border-teal-900/40 dark:bg-teal-900/10">
            <p className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
              Study Theme
            </p>

            <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
              {study.theme}
            </p>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Date */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={18}
                  className="text-teal-600 dark:text-teal-400"
                />

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {formatDate(study.startDate)}
              </p>

              {study.endDate !== study.startDate && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  to {formatDate(study.endDate)}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-teal-600 dark:text-teal-400"
                />

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Location
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {study.location}
              </p>
            </div>

            {/* Facilitator */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <UserRound
                  size={18}
                  className="text-teal-600 dark:text-teal-400"
                />

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Facilitator
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {study.facilitator}
              </p>
            </div>

            {/* Participants */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-teal-600 dark:text-teal-400" />

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Participants
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {study.participants} participants
              </p>
            </div>

            {/* Year */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Clock3
                  size={18}
                  className="text-teal-600 dark:text-teal-400"
                />

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Program Year
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {study.year}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <BookOpen
                  size={18}
                  className="text-teal-600 dark:text-teal-400"
                />

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </p>
              </div>

              <span
                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses()}`}
              >
                {study.status}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Description
            </h3>

            <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/30">
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                {study.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VBSDetailsModal;
