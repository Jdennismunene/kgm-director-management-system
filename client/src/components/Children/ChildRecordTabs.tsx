import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FileText,
  History,
  NotebookPen,
  UserRound,
} from "lucide-react";

interface ChildRecordTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ChildRecordTabs = ({ activeTab, onTabChange }: ChildRecordTabsProps) => {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: UserRound,
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: CalendarCheck,
    },
    {
      id: "lessons",
      label: "Lessons",
      icon: BookOpen,
    },
    {
      id: "discipleship",
      label: "Discipleship",
      icon: ClipboardList,
    },
    {
      id: "payments",
      label: "Payments",
      icon: FileText,
    },
    {
      id: "notes",
      label: "Notes",
      icon: NotebookPen,
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
    },
    {
      id: "history",
      label: "History",
      icon: History,
    },
  ];

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex min-w-max border-b border-gray-200 px-2 dark:border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-medium transition ${
                isActive
                  ? "border-[#365452] text-[#365452] dark:border-[#8eb0ac] dark:text-[#8eb0ac]"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChildRecordTabs;
