import {
  Users,
  UserRound,
  UserPlus,
  BookOpen,
  CheckCircle,
  Droplets,
  CalendarDays,
  FolderOpen,
  Flag,
  Camera,
  Trophy,
  GraduationCap,
  HandCoins,
  MessageCircle,
  BarChart3,
  Megaphone,
  Mail,
  Phone,
  MessageSquare,
  BookMarked,
  Send,
} from "lucide-react";

import StatCard from "../components/StatCard";
import DashboardSection from "../components/DashboardSection";
import DashboardItem from "../components/DashboardItem";
import QuickAction from "../components/QuickAction";

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-5 lg:p-6 mt-14">
      {/* =========================================
          STATISTICS CARDS
      ========================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-6
          gap-3
        "
      >
        <StatCard
          icon={<Users size={23} />}
          value="423"
          title="Total Children"
          action="View all"
          to="/children"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          actionColor="text-blue-600"
        />

        <StatCard
          icon={<UserRound size={23} />}
          value="36"
          title="Teachers"
          action="View all"
          to="/teachers"
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          actionColor="text-emerald-600"
        />

        <StatCard
          icon={<BookOpen size={23} />}
          value="9"
          title="Classes"
          action="View all"
          to="/classes"
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          actionColor="text-purple-600"
        />

        <StatCard
          icon={<CheckCircle size={23} />}
          value="391"
          title="Today's Attendance"
          action="View report"
          to="/attendance/reports"
          iconBg="bg-orange-100"
          iconColor="text-orange-500"
          actionColor="text-orange-500"
        />

        <StatCard
          icon={<Droplets size={23} />}
          value="198"
          title="Baptized"
          action="View records"
          to="/baptism"
          iconBg="bg-cyan-100"
          iconColor="text-cyan-600"
          actionColor="text-cyan-600"
        />

        <StatCard
          icon={<CalendarDays size={23} />}
          value="6"
          title="Upcoming Events"
          action="View calendar"
          to="/events"
          iconBg="bg-pink-100"
          iconColor="text-pink-600"
          actionColor="text-pink-600"
        />
      </div>

      {/* =========================================
          DASHBOARD SECTIONS
      ========================================== */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          xl:grid-cols-3
          gap-3
          mt-5
        "
      >
        {/* =====================================
            LESSON
        ====================================== */}

        <DashboardSection
          title="Lesson"
          icon={<BookOpen size={20} />}
          iconColor="text-blue-600"
        >
          <DashboardItem
            icon={<BookMarked size={20} />}
            title="Books / Teaching Manuals"
            description="CCL, Scripture Union, Deliverance Church"
            iconColor="text-blue-500"
            to="/lessons"
          />
        </DashboardSection>

        {/* =====================================
            RESOURCES / ARCHIVES / LIBRARY
        ====================================== */}

        <DashboardSection
          title="Resources / Archives / Library"
          icon={<FolderOpen size={20} />}
          iconColor="text-emerald-600"
        >
          <DashboardItem
            icon={<Camera size={19} />}
            title="Photography"
            iconColor="text-blue-500"
            to="/resources/photos"
          />

          <DashboardItem
            icon={<FolderOpen size={19} />}
            title="Vocational Bible School Documentaries"
            iconColor="text-purple-600"
            to="/resources/archives"
          />

          <DashboardItem
            icon={<Trophy size={19} />}
            title="Competition Done"
            iconColor="text-orange-500"
            to="/resources"
          />

          <DashboardItem
            icon={<Droplets size={19} />}
            title="Baptism & Documentation"
            iconColor="text-cyan-500"
            to="/baptism/documents"
          />
        </DashboardSection>

        {/* =====================================
            PROGRAMS
        ====================================== */}

        <DashboardSection
          title="Programs (Each Successive Years)"
          icon={<Flag size={20} />}
          iconColor="text-purple-600"
        >
          <DashboardItem
            icon={<BookOpen size={19} />}
            title="Vocational Bible Studies"
            iconColor="text-purple-600"
            to="/programs/vbs"
          />

          <DashboardItem
            icon={<Users size={19} />}
            title="Teachers Seminars"
            iconColor="text-purple-600"
            to="/programs/seminars"
          />

          <DashboardItem
            icon={<Users size={19} />}
            title="Teachers Bonding's"
            iconColor="text-purple-600"
            to="/programs"
          />
        </DashboardSection>

        {/* =====================================
            EVENTS & CALENDAR
        ====================================== */}

        <DashboardSection
          title="Events & Calendar"
          icon={<CalendarDays size={20} />}
          iconColor="text-rose-500"
        >
          <DashboardItem
            icon={<CalendarDays size={19} />}
            title="View Calendar"
            description="All Church Events"
            iconColor="text-rose-500"
            to="/events"
          />
        </DashboardSection>

        {/* =====================================
            TRAINING & RESOURCES
        ====================================== */}

        <DashboardSection
          title="Training & Resources"
          icon={<GraduationCap size={20} />}
          iconColor="text-cyan-600"
        >
          <DashboardItem
            icon={<GraduationCap size={19} />}
            title="Level 1 Training"
            description="Manuals, Trainees, Cohort, Certificates"
            iconColor="text-blue-500"
            to="/training"
          />

          <DashboardItem
            icon={<GraduationCap size={19} />}
            title="Level 2 Training"
            description="Manuals, Trainees, Cohort, Certificates"
            iconColor="text-blue-500"
            to="/training"
          />
        </DashboardSection>

        {/* =====================================
            CONTRIBUTION & WELFARE
        ====================================== */}

        <DashboardSection
          title="Contribution & Welfare"
          icon={<HandCoins size={20} />}
          iconColor="text-orange-500"
        >
          <DashboardItem
            icon={<HandCoins size={19} />}
            title="Registration"
            iconColor="text-rose-500"
            to="/contributions"
          />

          <DashboardItem
            icon={<HandCoins size={19} />}
            title="Monthly Kitty"
            iconColor="text-orange-500"
            to="/contributions/welfare"
          />
        </DashboardSection>

        {/* =====================================
            COMMUNICATION
        ====================================== */}

        <DashboardSection
          title="Communication"
          icon={<MessageCircle size={20} />}
          iconColor="text-emerald-600"
        >
          <DashboardItem
            icon={<MessageCircle size={19} />}
            title="Line Pastor"
            iconColor="text-emerald-500"
            to="/communication"
          />

          <DashboardItem
            icon={<MessageCircle size={19} />}
            title="SJD (Sunday School Director)"
            iconColor="text-emerald-500"
            to="/communication"
          />
        </DashboardSection>

        {/* =====================================
            REPORTS
        ====================================== */}

        <DashboardSection
          title="Reports"
          icon={<BarChart3 size={20} />}
          iconColor="text-blue-600"
        >
          <DashboardItem
            icon={<BarChart3 size={19} />}
            title="Sunday School Reports"
            description="Per Class, Cumulative, Monthly, Quarterly, Annually"
            iconColor="text-purple-600"
            to="/reports"
          />

          <DashboardItem
            icon={<BarChart3 size={19} />}
            title="Graphs & Charts"
            description="Pie Charts, Bar Graphs, Line Graphs etc."
            iconColor="text-purple-600"
            to="/reports/analytics"
          />
        </DashboardSection>

        {/* =====================================
            COMMUNICATION & ANNOUNCEMENT
        ====================================== */}

        <DashboardSection
          title="Communication & Announcement"
          icon={<Megaphone size={20} />}
          iconColor="text-purple-600"
        >
          <DashboardItem
            icon={<Mail size={19} />}
            title="Emails"
            iconColor="text-gray-500"
            to="/announcements/email"
          />

          <DashboardItem
            icon={<Phone size={19} />}
            title="Phones – Text & Calls"
            iconColor="text-blue-500"
            to="/communication/phones"
          />

          <DashboardItem
            icon={<MessageSquare size={19} />}
            title="WhatsApp"
            iconColor="text-green-500"
            to="/announcements/whatsapp"
          />
        </DashboardSection>
      </div>

      {/* =========================================
    QUICK ACTIONS
========================================== */}

      <div
        className="
    mt-5

    bg-white
    dark:bg-slate-900

    border
    border-gray-200
    dark:border-slate-700

    rounded-lg

    shadow-sm
    dark:shadow-black/20

    p-4

    transition-all
    duration-300
  "
      >
        {/* Header */}
        <div className="mb-3">
          <h2
            className="
        text-xs
        font-semibold
        uppercase

        text-gray-700
        dark:text-gray-200

        transition-colors
        duration-300
      "
          >
            Quick Actions
          </h2>
        </div>

        {/* Buttons */}
        <div
          className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-5
      gap-3
    "
        >
          {/* Add Child */}
          <QuickAction
            icon={<UserPlus size={18} />}
            title="Add Child"
            bgColor="bg-blue-600"
            hoverColor="hover:bg-blue-700"
            to="/children/add"
          />

          {/* Take Attendance */}
          <QuickAction
            icon={<CheckCircle size={18} />}
            title="Take Attendance"
            bgColor="bg-emerald-600"
            hoverColor="hover:bg-emerald-700"
            to="/attendance"
          />

          {/* Add Event */}
          <QuickAction
            icon={<CalendarDays size={18} />}
            title="Add Event"
            bgColor="bg-purple-600"
            hoverColor="hover:bg-purple-700"
            to="/events"
          />

          {/* Send Announcement */}
          <QuickAction
            icon={<Send size={18} />}
            title="Send Announcement"
            bgColor="bg-orange-500"
            hoverColor="hover:bg-orange-600"
            to="/announcements"
          />

          {/* Generate Report */}
          <QuickAction
            icon={<BarChart3 size={18} />}
            title="Generate Report"
            bgColor="bg-cyan-600"
            hoverColor="hover:bg-cyan-700"
            to="/reports"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
