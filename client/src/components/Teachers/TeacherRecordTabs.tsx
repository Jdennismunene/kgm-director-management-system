import {
  BookOpen,
  FileText,
  History,
  LayoutDashboard,
  UserRound,
} from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface TeacherRecordTabsProps {
  teacher: Teacher;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TeacherRecordTabs = ({
  activeTab,
  onTabChange,
}: TeacherRecordTabsProps) => {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "personal",
      label: "Personal Information",
      icon: UserRound,
    },
    {
      id: "teaching",
      label: "Teaching",
      icon: BookOpen,
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
    <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
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
                  ? "text-[#365452] dark:text-[#8eb0ac]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200"
              }`}
            >
              <Icon size={17} />

              <span>{tab.label}</span>

              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#365452] dark:bg-[#8eb0ac]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherRecordTabs;
