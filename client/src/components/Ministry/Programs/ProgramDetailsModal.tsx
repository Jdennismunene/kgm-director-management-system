import { CalendarDays, MapPin, Users, UserRound, X } from "lucide-react";
import type { Program } from "../../../data/programsData";

interface ProgramDetailsModalProps {
  isOpen: boolean;
  program: Program | null;
  onClose: () => void;
}

const ProgramDetailsModal = ({
  isOpen,
  program,
  onClose,
}: ProgramDetailsModalProps) => {
  if (!isOpen || !program) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClasses = () => {
    switch (program.status) {
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
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                {program.type}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses()}`}
              >
                {program.status}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {program.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Program Year: {program.year}
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

        {/* Information */}
        <div className="space-y-6 p-6">
          {/* Quick Information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-teal-50 p-2 dark:bg-teal-900/30">
                  <CalendarDays
                    size={19}
                    className="text-teal-600 dark:text-teal-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {formatDate(program.startDate)}
                  </p>

                  {program.endDate !== program.startDate && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      to {formatDate(program.endDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30">
                  <MapPin
                    size={19}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Venue
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {program.venue}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/30">
                  <Users
                    size={19}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Participants
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {program.participants}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/30">
                  <UserRound
                    size={19}
                    className="text-orange-600 dark:text-orange-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Coordinator
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {program.coordinator || "Not assigned"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
              Description
            </h3>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/40">
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                {program.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Program Information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Program Information
            </h3>

            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 dark:divide-gray-700">
                <div className="p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Program Type
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {program.type}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Program Year
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {program.year}
                  </p>
                </div>
              </div>
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

export default ProgramDetailsModal;
