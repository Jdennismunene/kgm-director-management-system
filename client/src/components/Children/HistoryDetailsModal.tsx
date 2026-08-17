import {
  Activity,
  CalendarDays,
  CheckCircle2,
  FileText,
  History as HistoryIcon,
  UserRound,
  X,
} from "lucide-react";

import type { HistoryItem } from "./HistoryList";

interface HistoryDetailsModalProps {
  isOpen: boolean;
  item: HistoryItem | null;
  onClose: () => void;
}

const HistoryDetailsModal = ({
  isOpen,
  item,
  onClose,
}: HistoryDetailsModalProps) => {
  if (!isOpen || !item) {
    return null;
  }

  const getIcon = (type: HistoryItem["type"]) => {
    switch (type) {
      case "payment":
        return CheckCircle2;

      case "lesson":
        return Activity;

      case "note":
        return FileText;

      case "attendance":
        return CalendarDays;

      case "document":
        return FileText;

      case "profile":
        return UserRound;

      case "discipleship":
        return Activity;

      default:
        return HistoryIcon;
    }
  };

  const Icon = getIcon(item.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <HistoryIcon
                size={18}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Activity Details
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                View details of this activity
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="space-y-5 p-6">
          {/* Activity Icon + Title */}

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
              <Icon size={21} className="text-blue-600 dark:text-blue-400" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </div>

          {/* =================================================
              DETAILS
          ================================================= */}

          <div className="rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/30">
            {/* Performed By */}

            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
              <UserRound
                size={16}
                className="text-gray-400 dark:text-gray-500"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Performed By
                </p>

                <p className="mt-0.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.user}
                </p>
              </div>
            </div>

            {/* Date */}

            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
              <CalendarDays
                size={16}
                className="text-gray-400 dark:text-gray-500"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Date
                </p>

                <p className="mt-0.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.date}
                </p>
              </div>
            </div>

            {/* Time */}

            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
              <Activity
                size={16}
                className="text-gray-400 dark:text-gray-500"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Time
                </p>

                <p className="mt-0.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.time}
                </p>
              </div>
            </div>

            {/* Activity Type */}

            <div className="flex items-center gap-3 px-4 py-3">
              <HistoryIcon
                size={16}
                className="text-gray-400 dark:text-gray-500"
              />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Activity Type
                </p>

                <p className="mt-0.5 text-sm font-medium capitalize text-gray-700 dark:text-gray-200">
                  {item.type}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailsModal;
