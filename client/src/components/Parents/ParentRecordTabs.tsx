import {
  ClipboardCheck,
  FileText,
  History,
  MessageSquare,
  UserRound,
  Users,
} from "lucide-react";

interface ParentRecordTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ParentRecordTabs = ({
  activeTab,
  onTabChange,
}: ParentRecordTabsProps) => {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: UserRound,
    },
    {
      id: "children",
      label: "Children",
      icon: Users,
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: ClipboardCheck,
    },
    {
      id: "communication",
      label: "Communication",
      icon: MessageSquare,
    },
    {
      id: "notes",
      label: "Notes",
      icon: FileText,
    },
    {
      id: "history",
      label: "History",
      icon: History,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-4 text-sm font-medium transition ${
                isActive
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Icon size={17} />
              {tab.label}

              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ParentRecordTabs;
