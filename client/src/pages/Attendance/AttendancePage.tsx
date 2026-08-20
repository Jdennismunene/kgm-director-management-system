import {
  CalendarCheck,
  ClipboardCheck,
  FileBarChart,
  History,
} from "lucide-react";
import { useState } from "react";

import AttendanceOverview from "../../components/Attendance/AttendanceOverview";
import TakeAttendance from "../../components/Attendance/TakeAttendance";
import AttendanceRecords from "../../components/Attendance/AttendanceRecords";
import AttendanceReports from "../../components/Attendance/AttendanceReports";

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: CalendarCheck,
    },
    {
      id: "take",
      label: "Take Attendance",
      icon: ClipboardCheck,
    },
    {
      id: "records",
      label: "Attendance Records",
      icon: History,
    },
    {
      id: "reports",
      label: "Attendance Reports",
      icon: FileBarChart,
    },
  ];

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="text-blue-600 dark:text-blue-400">
          Dashboard
        </span>

        <span>/</span>

        <span className="text-gray-700 dark:text-gray-200">
          Attendance
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track, manage and monitor Sunday School attendance.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex min-w-max gap-1 rounded-xl border border-gray-200 bg-white p-1.5 dark:border-gray-700 dark:bg-gray-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-lg
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm dark:bg-blue-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  }
                `}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <AttendanceOverview />}

      {activeTab === "take" && <TakeAttendance />}

      {activeTab === "records" && <AttendanceRecords />}

      {activeTab === "reports" && <AttendanceReports />}
    </div>
  );
};

export default AttendancePage;