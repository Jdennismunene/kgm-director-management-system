import {
  Activity,
  CalendarDays,
  CheckCircle2,
  FileText,
  History as HistoryIcon,
  UserRound,
} from "lucide-react";

const History = () => {
  const historyItems = [
    {
      title: "Payment Recorded",
      description: "Sunday School Term 3 payment was recorded.",
      date: "Aug 9, 2026",
      time: "10:32 AM",
      user: "Sarah Wanjiku",
      type: "payment",
    },
    {
      title: "Lesson Completed",
      description: "Brian completed the lesson 'Knowing God'.",
      date: "Aug 9, 2026",
      time: "09:45 AM",
      user: "David Kamau",
      type: "lesson",
    },
    {
      title: "Note Added",
      description: "A new observation was added to the child's record.",
      date: "Aug 9, 2026",
      time: "09:15 AM",
      user: "Sarah Wanjiku",
      type: "note",
    },
    {
      title: "Attendance Recorded",
      description: "Child was marked present for Sunday School.",
      date: "Aug 9, 2026",
      time: "08:30 AM",
      user: "Mary Njeri",
      type: "attendance",
    },
    {
      title: "Document Uploaded",
      description: "School report was uploaded to the child's documents.",
      date: "Jul 20, 2026",
      time: "02:18 PM",
      user: "David Kamau",
      type: "document",
    },
    {
      title: "Child Profile Updated",
      description: "Child's class information was updated.",
      date: "Jul 15, 2026",
      time: "11:42 AM",
      user: "Sarah Wanjiku",
      type: "profile",
    },
  ];

  const getIcon = (type: string) => {
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

      default:
        return HistoryIcon;
    }
  };

  return (
    <div className="mt-5 space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          History
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View a complete activity history of changes and actions on this
          child's record.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Activities */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Activities
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                48
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <HistoryIcon
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                This Month
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                12
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <Activity
                size={20}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        {/* Last Activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Last Activity
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                Aug 9, 2026
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <CalendarDays
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Activity History */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <HistoryIcon
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Activity History
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Recent actions performed on this child's record
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Filter
          </button>
        </div>

        {/* Timeline */}
        <div className="p-5">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute bottom-0 left-5 top-0 w-px bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-7">
              {historyItems.map((item, index) => {
                const Icon = getIcon(item.type);

                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="relative flex gap-4"
                  >
                    {/* Icon */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-blue-50 dark:border-gray-800 dark:bg-blue-900/30">
                      <Icon
                        size={16}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>

                    {/* Activity */}
                    <div className="min-w-0 flex-1 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/30">
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

                      {/* Metadata */}
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
