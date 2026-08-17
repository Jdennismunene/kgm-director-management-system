import {
  Activity,
  CalendarDays,
  CheckCircle2,
  FileText,
  History as HistoryIcon,
  UserRound,
} from "lucide-react";

export interface HistoryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  user: string;
  type:
    | "payment"
    | "lesson"
    | "note"
    | "attendance"
    | "document"
    | "profile"
    | "discipleship";
}

interface HistoryListProps {
  historyItems: HistoryItem[];
  onView: (item: HistoryItem) => void;
}

const HistoryList = ({ historyItems, onView }: HistoryListProps) => {
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

  if (historyItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
          <HistoryIcon size={22} className="text-gray-400 dark:text-gray-300" />
        </div>

        <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
          No activity yet
        </h4>

        <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500 dark:text-gray-400">
          There are currently no activities recorded for this child's account.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="relative">
        {/* Vertical Timeline Line */}

        <div className="absolute bottom-0 left-5 top-0 w-px bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-7">
          {historyItems.map((item) => {
            const Icon = getIcon(item.type);

            return (
              <div key={item.id} className="relative flex gap-4">
                {/* =================================================
                    ICON
                ================================================= */}

                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-blue-50 dark:border-gray-800 dark:bg-blue-900/30">
                  <Icon
                    size={16}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                {/* =================================================
                    ACTIVITY CARD
                ================================================= */}

                <button
                  type="button"
                  onClick={() => onView(item)}
                  className="min-w-0 flex-1 rounded-lg border border-gray-100 bg-gray-50 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/50 dark:border-gray-700 dark:bg-gray-900/30 dark:hover:border-blue-800 dark:hover:bg-blue-900/10"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                      {item.time}
                    </span>
                  </div>

                  {/* =================================================
                      METADATA
                  ================================================= */}

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1.5">
                      <UserRound
                        size={13}
                        className="text-gray-400 dark:text-gray-500"
                      />

                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.user}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <CalendarDays
                        size={13}
                        className="text-gray-400 dark:text-gray-500"
                      />

                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
