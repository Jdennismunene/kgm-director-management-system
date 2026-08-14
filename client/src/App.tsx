import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Bell, Moon, Sun } from "lucide-react";

import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  // =========================================
  // SIDEBAR STATE
  // =========================================

  const [collapsed, setCollapsed] = useState(false);

  // =========================================
  // DARK MODE STATE
  // =========================================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // =========================================
  // APPLY DARK MODE
  // =========================================

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      {/* =====================================
          MAIN APPLICATION
      ====================================== */}

      <div
        className="
          min-h-screen
          bg-gray-50
          dark:bg-slate-950
          transition-colors
          duration-300
        "
      >
        {/* =====================================
            SIDEBAR
        ====================================== */}

        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* =====================================
            MAIN CONTENT
        ====================================== */}

        <main
          className={`
            min-h-screen
            transition-all
            duration-300
            ease-in-out
            bg-gray-50
            dark:bg-slate-950

            ${collapsed ? "lg:ml-20" : "lg:ml-64"}
          `}
        >
          {/* =====================================
              TOP HEADER
          ====================================== */}

          <header
            className="
    fixed
    top-0
    right-0
    z-40

    h-16

    bg-white
    dark:bg-slate-900

    border-b
    border-gray-200
    dark:border-slate-700

    flex
    items-center
    justify-between

    px-4
    sm:px-6

    transition-all
    duration-300

    left-0
    lg:left-64
    
  "
          >
            {/* =================================
                LEFT SIDE
            ================================== */}

            <div className="pl-12">
              <h2
                className="
                  text-base
                  sm:text-lg
                  font-semibold
                  text-gray-800
                  dark:text-white
                "
              >
                Sunday School Management System
              </h2>

              <p
                className="
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                  hidden
                  sm:block
                "
              >
                Management Dashboard
              </p>
            </div>

            {/* =================================
                RIGHT SIDE
            ================================== */}

            <div className="flex items-center gap-2 sm:gap-3">
              {/* =================================
                  NOTIFICATION BUTTON
              ================================== */}

              <button
                type="button"
                aria-label="Notifications"
                title="Notifications"
                className="
                  relative
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-gray-600
                  dark:text-gray-300
                  hover:bg-teal-50
                  dark:hover:bg-slate-800
                  hover:text-teal-600
                  dark:hover:text-teal-400
                  transition
                  duration-200
                "
              >
                <Bell size={20} />

                {/* Notification count */}
                <span
                  className="
                    absolute
                    -top-0.5
                    -right-0.5
                    w-4
                    h-4
                    rounded-full
                    bg-red-500
                    text-white
                    text-[9px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                >
                  5
                </span>
              </button>

              {/* =================================
                  DARK MODE BUTTON
              ================================== */}

              <button
                type="button"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                title={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                onClick={() => setDarkMode((previous) => !previous)}
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-gray-600
                  dark:text-yellow-400
                  hover:bg-teal-50
                  dark:hover:bg-slate-800
                  hover:text-teal-600
                  dark:hover:text-yellow-300
                  transition
                  duration-200
                  cursor-pointer
                "
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* =================================
                  USER INFORMATION
              ================================== */}

              <div className="hidden sm:block text-right ml-1">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                    dark:text-white
                  "
                >
                  John Director
                </p>

                <p
                  className="
                    text-xs
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  SJD (Director)
                </p>
              </div>

              {/* =================================
                  USER AVATAR
              ================================== */}

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-teal-100
                  dark:bg-teal-900
                  text-teal-700
                  dark:text-teal-300
                  flex
                  items-center
                  justify-center
                  font-bold
                  transition-colors
                  duration-300
                "
              >
                JD
              </div>
            </div>
          </header>

          {/* =====================================
              ROUTES
          ====================================== */}

          <Routes>
            {/* =================================
                DEFAULT ROUTE
            ================================== */}

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* =================================
                DASHBOARD
            ================================== */}

            <Route path="/dashboard" element={<Dashboard />} />

            {/* =================================
                MANAGEMENT
            ================================== */}

            <Route
              path="/children"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Children
                </div>
              }
            />

            <Route
              path="/children/add"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Add Child
                </div>
              }
            />

            <Route
              path="/children/records"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Child Records
                </div>
              }
            />

            <Route
              path="/teachers"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Teachers
                </div>
              }
            />

            <Route
              path="/teachers/add"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Add Teacher
                </div>
              }
            />

            <Route
              path="/teachers/records"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Teacher Records
                </div>
              }
            />

            <Route
              path="/classes"
              element={
                <div className="p-6 text-gray-800 dark:text-white">Classes</div>
              }
            />

            <Route
              path="/classes/add"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Add Class
                </div>
              }
            />

            <Route
              path="/classes/members"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Class Members
                </div>
              }
            />

            <Route
              path="/attendance"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Attendance
                </div>
              }
            />

            <Route
              path="/attendance/records"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Attendance Records
                </div>
              }
            />

            <Route
              path="/attendance/reports"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Attendance Reports
                </div>
              }
            />

            <Route
              path="/parents"
              element={
                <div className="p-6 text-gray-800 dark:text-white">Parents</div>
              }
            />

            <Route
              path="/parents/records"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Parent Records
                </div>
              }
            />

            {/* =================================
                MINISTRY
            ================================== */}

            <Route
              path="/lessons"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Lessons & Manuals
                </div>
              }
            />

            <Route
              path="/lessons/bible"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Bible Lessons
                </div>
              }
            />

            <Route
              path="/lessons/plans"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Lesson Plans
                </div>
              }
            />

            <Route
              path="/resources"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Resources / Library
                </div>
              }
            />

            <Route
              path="/resources/documents"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Documents
                </div>
              }
            />

            <Route
              path="/resources/photos"
              element={
                <div className="p-6 text-gray-800 dark:text-white">Photos</div>
              }
            />

            <Route
              path="/resources/archives"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Archives
                </div>
              }
            />

            <Route
              path="/programs"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Programs
                </div>
              }
            />

            <Route
              path="/programs/vbs"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Vocational Bible Studies
                </div>
              }
            />

            <Route
              path="/programs/seminars"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Teachers Seminars
                </div>
              }
            />

            <Route
              path="/events"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Events & Calendar
                </div>
              }
            />

            <Route
              path="/events/upcoming"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Upcoming Events
                </div>
              }
            />

            <Route
              path="/events/past"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Past Events
                </div>
              }
            />

            <Route
              path="/baptism"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Baptism Records
                </div>
              }
            />

            <Route
              path="/baptism/documents"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Baptism Documentation
                </div>
              }
            />

            {/* =================================
                DEVELOPMENT
            ================================== */}

            <Route
              path="/training"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Training & Certification
                </div>
              }
            />

            <Route
              path="/training/certificates"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Certificates
                </div>
              }
            />

            <Route
              path="/contributions"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Contributions
                </div>
              }
            />

            <Route
              path="/contributions/welfare"
              element={
                <div className="p-6 text-gray-800 dark:text-white">Welfare</div>
              }
            />

            <Route
              path="/contributions/records"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Contribution Records
                </div>
              }
            />

            {/* =================================
                COMMUNICATION
            ================================== */}

            <Route
              path="/communication"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Communication
                </div>
              }
            />

            <Route
              path="/communication/phones"
              element={
                <div className="p-6 text-gray-800 dark:text-white">Phones</div>
              }
            />

            <Route
              path="/announcements"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Announcements
                </div>
              }
            />

            <Route
              path="/announcements/email"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Email Announcements
                </div>
              }
            />

            <Route
              path="/announcements/whatsapp"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  WhatsApp Announcements
                </div>
              }
            />

            {/* =================================
                REPORTS
            ================================== */}

            <Route
              path="/reports"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Reports & Analytics
                </div>
              }
            />

            <Route
              path="/reports/analytics"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  Analytics
                </div>
              }
            />

            {/* =================================
                SYSTEM
            ================================== */}

            <Route
              path="/settings"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  General Settings
                </div>
              }
            />

            <Route
              path="/settings/users"
              element={
                <div className="p-6 text-gray-800 dark:text-white">
                  User Management
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
