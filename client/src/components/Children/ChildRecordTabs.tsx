import { useState } from "react";
import {
  User,
  CalendarCheck,
  BookOpen,
  Star,
  CreditCard,
  FileText,
  FolderOpen,
  History,
} from "lucide-react";

interface ChildRecordTabsProps {
  onTabChange: (tab: string) => void;
}

const ChildRecordTabs = ({ onTabChange }: ChildRecordTabsProps) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    {
      name: "Overview",
      icon: User,
    },
    {
      name: "Attendance",
      icon: CalendarCheck,
    },
    {
      name: "Lessons",
      icon: BookOpen,
    },
    {
      name: "Discipleship",
      icon: Star,
    },
    {
      name: "Payments",
      icon: CreditCard,
    },
    {
      name: "Notes",
      icon: FileText,
    },
    {
      name: "Documents",
      icon: FolderOpen,
    },
    {
      name: "History",
      icon: History,
    },
  ];

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.name;

          return (
            <button
              key={tab.name}
              type="button"
              onClick={() => handleTabClick(tab.name)}
              className={`flex items-center gap-2 whitespace-nowrap px-5 py-4 text-sm font-medium cursor-pointer transition ${
                isActive
                  ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Icon size={17} />
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChildRecordTabs;
