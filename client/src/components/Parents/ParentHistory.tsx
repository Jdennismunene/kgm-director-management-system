import {
  Activity,
  CheckCircle2,
  Clock3,
  Edit3,
  UserPlus,
  UserRound,
} from "lucide-react";

import type { Parent } from "../../data/parentsData";

interface ParentHistoryProps {
  parent: Parent;
}

interface HistoryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "registration" | "update" | "child" | "status";
}

const ParentHistory = ({ parent }: ParentHistoryProps) => {
  const history: HistoryItem[] = [
    {
      id: 1,
      title: "Parent Registered",
      description: `${parent.name} was registered in the system.`,
      date: parent.joinedDate,
      time: "10:30 AM",
      type: "registration",
    },
    {
      id: 2,
      title: "Child Linked",
      description: `${parent.childrenIds.length} ${
        parent.childrenIds.length === 1 ? "child was" : "children were"
      } linked to this parent account.`,
      date: "Aug 12, 2026",
      time: "02:15 PM",
      type: "child",
    },
    {
      id: 3,
      title: "Contact Information Updated",
      description: "Parent phone number and email information were updated.",
      date: "Aug 15, 2026",
      time: "09:45 AM",
      type: "update",
    },
    {
      id: 4,
      title: `Status ${parent.status}`,
      description: `Parent account status was set to ${parent.status}.`,
      date: "Aug 18, 2026",
      time: "11:20 AM",
      type: "status",
    },
  ];

  const getIcon = (type: HistoryItem["type"]) => {
    switch (type) {
      case "registration":
        return <UserPlus size={17} />;

      case "child":
        return <UserRound size={17} />;

      case "update":
        return <Edit3 size={17} />;

      case "status":
        return <CheckCircle2 size={17} />;

      default:
        return <Activity size={17} />;
    }
  };

  const getIconStyle = (type: HistoryItem["type"]) => {
    switch (type) {
      case "registration":
        return "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400";

      case "child":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";

      case "update":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";

      case "status":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";

      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          History
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track important activities and changes made to this parent record.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-teal-100 p-3 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <Activity size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total Activities
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {history.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Clock3 size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Latest Activity
              </p>

              <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                {history[history.length - 1]?.date || "No activity"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Current Status
              </p>

              <p className="mt-1 text-sm font-bold text-green-600 dark:text-green-400">
                {parent.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Activity Timeline
          </h3>
        </div>

        <div className="p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute bottom-0 left-5 top-0 w-px bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-8">
              {history.map((item) => (
                <div key={item.id} className="relative flex gap-4">
                  {/* Timeline Icon */}
                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-800 ${getIconStyle(
                      item.type,
                    )}`}
                  >
                    {getIcon(item.type)}
                  </div>

                  {/* Timeline Content */}
                  <div className="min-w-0 flex-1 pb-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentHistory;
