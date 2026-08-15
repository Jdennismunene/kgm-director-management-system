import {
  Activity,
  CalendarCheck,
  FileText,
  UserPlus,
  UserRoundPen,
} from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      title: "Profile Updated",
      description: "Personal information was updated.",
      date: "Today, 10:32 AM",
      icon: UserRoundPen,
    },
    {
      title: "Attendance Recorded",
      description: "Marked present for Sunday School.",
      date: "Aug 10, 2026",
      icon: CalendarCheck,
    },
    {
      title: "Note Added",
      description: "A new note was added to the child's record.",
      date: "Aug 8, 2026",
      icon: FileText,
    },
    {
      title: "Child Added",
      description: "Child was registered in the system.",
      date: "May 12, 2024",
      icon: UserPlus,
    },
  ];

  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-700">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
          <Activity size={17} className="text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
      </div>

      {/* Timeline */}
      <div className="px-5 py-5">
        <div className="space-y-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const isLast = index === activities.length - 1;

            return (
              <div
                key={`${activity.title}-${index}`}
                className="relative flex gap-3"
              >
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-[15px] top-8 h-[calc(100%+8px)] w-px bg-gray-200 dark:bg-gray-700" />
                )}

                {/* Icon */}
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                  <Icon
                    size={15}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                {/* Activity Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white">
                      {activity.title}
                    </h3>

                    <span className="whitespace-nowrap text-[10px] text-gray-400 dark:text-gray-500">
                      {activity.date}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
