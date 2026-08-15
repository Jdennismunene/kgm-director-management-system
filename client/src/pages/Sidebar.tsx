import { useState } from "react";
import { NavLink } from "react-router-dom";
import {Home,Users,UserRound,BookOpen,CalendarCheck,Heart,BookMarked,FolderOpen,CalendarDays,Droplets,GraduationCap,HandCoins,MessageCircle,Megaphone,BarChart3,Settings,ChevronRight,ChevronDown,ChevronLeft,Menu,X,FileText,Camera,Phone,Mail,MessageSquare,} from "lucide-react";
import logo from '../assets/logo-kgm.png'

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // =========================================
  // TOGGLE SIDEBAR MENU
  // =========================================

  const toggleMenu = (menu: string) => {
    setOpenMenus((previous) =>
      previous.includes(menu)
        ? previous.filter((item) => item !== menu)
        : [...previous, menu],
    );
  };

  // =========================================
  // CHECK IF MENU IS OPEN
  // =========================================

  const isMenuOpen = (menu: string) => {
    return openMenus.includes(menu);
  };

  return (
    <>
      {/* =====================================
          MOBILE MENU BUTTON
      ====================================== */}

      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar"
          className="
            fixed
            top-4
            left-4
            z-60
            lg:hidden

            w-8
            h-8

            rounded-lg

            bg-[#0f766e]
            dark:bg-teal-700

            text-white

            flex
            items-center
            justify-center

            shadow-lg

            hover:bg-teal-600
            dark:hover:bg-teal-600

            transition-all
            duration-200

            cursor-pointer
          "
        >
          <Menu size={22} />
        </button>
      )}

      {/* =====================================
          MOBILE OVERLAY
      ====================================== */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            fixed
            inset-0

            bg-black/40
            dark:bg-black/60

            z-40
            lg:hidden
          "
        />
      )}

      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50

          h-screen

          ${collapsed ? "w-20" : "w-64"}

          ${mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }

          bg-[#344C4B]
          dark:bg-slate-950

          text-white

          border-r
          border-white/10
          dark:border-slate-800

          shadow-xl

          transition-all
          duration-300
          ease-in-out
        `}
      >
        {/* =====================================
            HEADER / LOGO
        ====================================== */}

        <div
          className=" h-20 flex items-center px-4 border-b border-white/10 dark:border-slate-800 relative">
          {/* =================================
              EXPANDED LOGO
          ================================== */}

          {!collapsed && (
            <div className="flex items-center gap-3 flex-1">

              {/* Logo box */}
              <div
                className=" w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center transition-colors duration-300 ">
                <img src={logo} alt="logo" />
              </div>

              {/* Logo text */}
              <div>
                <h1
                  className=" font-bold text-xl text-white">
                  KGM
                </h1>
                <p
                  className=" text-[14px] text-white/70 dark:text-slate-400">
                  Sunday School
                </p>

                <p
                  className=" text-[11px] text-white/50 dark:text-slate-500 ">
                  Management System
                </p>
              </div>

            </div>
          )}

          {/* =================================
              COLLAPSED LOGO
          ================================== */}

          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center transition-colors duration-300 ">
              <img src={logo} alt="logo" />
            </div>
          )}

          {/* =================================
              DESKTOP COLLAPSE BUTTON
          ================================== */}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            className="
              hidden
              lg:flex

              absolute

              -right-3
              top-7

              w-7
              h-7

              rounded-full

              bg-[#344C4B]
              dark:bg-slate-950

              border-2
              border-white
              dark:border-slate-700

              items-center
              justify-center

              text-white

              hover:bg-[#0f766e]
              dark:hover:bg-teal-700

              transition-all
              duration-200

              z-50

              cursor-pointer
            "
          >
            {collapsed ? (
              <ChevronRight size={15} />
            ) : (
              <ChevronLeft size={15} />
            )}
          </button>

          {/* =================================
              MOBILE CLOSE BUTTON
          ================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="
              lg:hidden

              w-8
              h-8

              flex
              items-center
              justify-center

              rounded-lg

              hover:bg-[#0f766e]
              dark:hover:bg-teal-700

              transition-colors
              duration-200
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* =====================================
            SIDEBAR CONTENT
        ====================================== */}

        <div
          className="
            h-[calc(100vh-76px)]

            overflow-y-auto

            px-3
            py-4

            scrollbar-thin
          "
        >

          {/* =====================================
              DASHBOARD
          ====================================== */}

          <NavLink
            to="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `
                flex
                items-center

                ${collapsed ? "justify-center" : "gap-3"}

                px-3
                py-2.5

                rounded-lg

                transition-all
                duration-200

                ${
                  isActive
                    ? `
                      bg-[#DFE0C3]/30
                      dark:bg-teal-700/50

                      text-white

                      shadow-sm
                    `
                    : `
                      text-white/85
                      dark:text-slate-300

                      hover:bg-[#0f766e]
                      dark:hover:bg-teal-700

                      hover:text-white
                    `
                }
              `
            }
          >
            <Home size={19} />

            {!collapsed && (
              <span className="text-sm font-medium">
                Dashboard
              </span>
            )}
          </NavLink>


          {/* =====================================
              MANAGEMENT
          ====================================== */}

          {!collapsed && (
            <SectionTitle title="MANAGEMENT" />
          )}

          {/* Children */}

          <ExpandableMenu
            title="Children"
            icon={<Users size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("children")}
            onClick={() => toggleMenu("children")}
          />

          {!collapsed && isMenuOpen("children") && (
            <SubMenu>

              <SubLink
                to="/children"
                icon={<Users size={15} />}
                text="All Children"
              />

              <SubLink
                to="/children/add"
                icon={<UserRound size={15} />}
                text="Add Child"
              />

              <SubLink
                to="/children/records"
                icon={<FileText size={15} />}
                text="Child Records"
              />

            </SubMenu>
          )}


          {/* Teachers */}

          <ExpandableMenu
            title="Teachers"
            icon={<UserRound size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("teachers")}
            onClick={() => toggleMenu("teachers")}
          />

          {!collapsed && isMenuOpen("teachers") && (
            <SubMenu>

              <SubLink
                to="/teachers"
                icon={<Users size={15} />}
                text="All Teachers"
              />

              <SubLink
                to="/teachers/add"
                icon={<UserRound size={15} />}
                text="Add Teacher"
              />

              <SubLink
                to="/teachers/records"
                icon={<FileText size={15} />}
                text="Teacher Records"
              />

            </SubMenu>
          )}


          {/* Classes */}

          <ExpandableMenu
            title="Classes"
            icon={<BookOpen size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("classes")}
            onClick={() => toggleMenu("classes")}
          />

          {!collapsed && isMenuOpen("classes") && (
            <SubMenu>

              <SubLink
                to="/classes"
                icon={<BookOpen size={15} />}
                text="All Classes"
              />

              <SubLink
                to="/classes/add"
                icon={<BookOpen size={15} />}
                text="Add Class"
              />

              <SubLink
                to="/classes/members"
                icon={<Users size={15} />}
                text="Class Members"
              />

            </SubMenu>
          )}


          {/* Attendance */}

          <ExpandableMenu
            title="Attendance"
            icon={<CalendarCheck size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("attendance")}
            onClick={() => toggleMenu("attendance")}
          />

          {!collapsed && isMenuOpen("attendance") && (
            <SubMenu>

              <SubLink
                to="/attendance"
                icon={<CalendarCheck size={15} />}
                text="Take Attendance"
              />

              <SubLink
                to="/attendance/records"
                icon={<FileText size={15} />}
                text="Attendance Records"
              />

              <SubLink
                to="/attendance/reports"
                icon={<BarChart3 size={15} />}
                text="Attendance Reports"
              />

            </SubMenu>
          )}


          {/* Parents */}

          <ExpandableMenu
            title="Parents"
            icon={<Heart size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("parents")}
            onClick={() => toggleMenu("parents")}
          />

          {!collapsed && isMenuOpen("parents") && (
            <SubMenu>

              <SubLink
                to="/parents"
                icon={<Users size={15} />}
                text="All Parents"
              />

              <SubLink
                to="/parents/records"
                icon={<FileText size={15} />}
                text="Parent Records"
              />

            </SubMenu>
          )}


          {/* =====================================
              MINISTRY
          ====================================== */}

          {!collapsed && (
            <SectionTitle title="MINISTRY" />
          )}


          {/* Lessons */}

          <ExpandableMenu
            title="Lessons & Manuals"
            icon={<BookMarked size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("lessons")}
            onClick={() => toggleMenu("lessons")}
          />

          {!collapsed && isMenuOpen("lessons") && (
            <SubMenu>

              <SubLink
                to="/lessons"
                icon={<BookOpen size={15} />}
                text="Teaching Manuals"
              />

              <SubLink
                to="/lessons/bible"
                icon={<BookMarked size={15} />}
                text="Bible Lessons"
              />

              <SubLink
                to="/lessons/plans"
                icon={<FileText size={15} />}
                text="Lesson Plans"
              />

            </SubMenu>
          )}


          {/* Resources */}

          <ExpandableMenu
            title="Resources / Library"
            icon={<FolderOpen size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("resources")}
            onClick={() => toggleMenu("resources")}
          />

          {!collapsed && isMenuOpen("resources") && (
            <SubMenu>

              <SubLink
                to="/resources"
                icon={<FolderOpen size={15} />}
                text="Library"
              />

              <SubLink
                to="/resources/documents"
                icon={<FileText size={15} />}
                text="Documents"
              />

              <SubLink
                to="/resources/photos"
                icon={<Camera size={15} />}
                text="Photos"
              />

              <SubLink
                to="/resources/archives"
                icon={<FolderOpen size={15} />}
                text="Archives"
              />

            </SubMenu>
          )}


          {/* Programs */}

          <ExpandableMenu
            title="Programs (By Year)"
            icon={<GraduationCap size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("programs")}
            onClick={() => toggleMenu("programs")}
          />

          {!collapsed && isMenuOpen("programs") && (
            <SubMenu>

              <SubLink
                to="/programs"
                icon={<GraduationCap size={15} />}
                text="Programs"
              />

              <SubLink
                to="/programs/vbs"
                icon={<BookOpen size={15} />}
                text="Vocational Bible Studies"
              />

              <SubLink
                to="/programs/seminars"
                icon={<GraduationCap size={15} />}
                text="Teachers Seminars"
              />

            </SubMenu>
          )}


          {/* Events */}

          <ExpandableMenu
            title="Events & Calendar"
            icon={<CalendarDays size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("events")}
            onClick={() => toggleMenu("events")}
          />

          {!collapsed && isMenuOpen("events") && (
            <SubMenu>

              <SubLink
                to="/events"
                icon={<CalendarDays size={15} />}
                text="Calendar"
              />

              <SubLink
                to="/events/upcoming"
                icon={<CalendarCheck size={15} />}
                text="Upcoming Events"
              />

              <SubLink
                to="/events/past"
                icon={<CalendarDays size={15} />}
                text="Past Events"
              />

            </SubMenu>
          )}


          {/* Baptism */}

          <ExpandableMenu
            title="Baptism & Records"
            icon={<Droplets size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("baptism")}
            onClick={() => toggleMenu("baptism")}
          />

          {!collapsed && isMenuOpen("baptism") && (
            <SubMenu>

              <SubLink
                to="/baptism"
                icon={<Droplets size={15} />}
                text="Baptism Records"
              />

              <SubLink
                to="/baptism/documents"
                icon={<FileText size={15} />}
                text="Documentation"
              />

            </SubMenu>
          )}


          {/* =====================================
              DEVELOPMENT
          ====================================== */}

          {!collapsed && (
            <SectionTitle title="DEVELOPMENT" />
          )}


          {/* Training */}

          <ExpandableMenu
            title="Training & Certification"
            icon={<GraduationCap size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("training")}
            onClick={() => toggleMenu("training")}
          />

          {!collapsed && isMenuOpen("training") && (
            <SubMenu>

              <SubLink
                to="/training"
                icon={<GraduationCap size={15} />}
                text="Training"
              />

              <SubLink
                to="/training/certificates"
                icon={<FileText size={15} />}
                text="Certificates"
              />

            </SubMenu>
          )}


          {/* Contributions */}

          <ExpandableMenu
            title="Contributions & Welfare"
            icon={<HandCoins size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("contributions")}
            onClick={() => toggleMenu("contributions")}
          />

          {!collapsed && isMenuOpen("contributions") && (
            <SubMenu>

              <SubLink
                to="/contributions"
                icon={<HandCoins size={15} />}
                text="Contributions"
              />

              <SubLink
                to="/contributions/welfare"
                icon={<Heart size={15} />}
                text="Welfare"
              />

              <SubLink
                to="/contributions/records"
                icon={<FileText size={15} />}
                text="Records"
              />

            </SubMenu>
          )}


          {/* =====================================
              COMMUNICATION
          ====================================== */}

          {!collapsed && (
            <SectionTitle title="COMMUNICATION" />
          )}


          {/* Communication */}

          <ExpandableMenu
            title="Communication"
            icon={<MessageCircle size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("communication")}
            onClick={() => toggleMenu("communication")}
          />

          {!collapsed && isMenuOpen("communication") && (
            <SubMenu>

              <SubLink
                to="/communication"
                icon={<MessageCircle size={15} />}
                text="Messages"
              />

              <SubLink
                to="/communication/phones"
                icon={<Phone size={15} />}
                text="Phones"
              />

            </SubMenu>
          )}


          {/* Announcements */}

          <ExpandableMenu
            title="Announcements"
            icon={<Megaphone size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("announcements")}
            onClick={() => toggleMenu("announcements")}
          />

          {!collapsed && isMenuOpen("announcements") && (
            <SubMenu>

              <SubLink
                to="/announcements"
                icon={<Megaphone size={15} />}
                text="All Announcements"
              />

              <SubLink
                to="/announcements/email"
                icon={<Mail size={15} />}
                text="Email"
              />

              <SubLink
                to="/announcements/whatsapp"
                icon={<MessageSquare size={15} />}
                text="WhatsApp"
              />

            </SubMenu>
          )}


          {/* =====================================
              REPORTS
          ====================================== */}

          {!collapsed && (
            <SectionTitle title="REPORTS" />
          )}


          <ExpandableMenu
            title="Reports & Analytics"
            icon={<BarChart3 size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("reports")}
            onClick={() => toggleMenu("reports")}
          />

          {!collapsed && isMenuOpen("reports") && (
            <SubMenu>

              <SubLink
                to="/reports"
                icon={<FileText size={15} />}
                text="Reports"
              />

              <SubLink
                to="/reports/analytics"
                icon={<BarChart3 size={15} />}
                text="Analytics"
              />

            </SubMenu>
          )}


          {/* =====================================
              SYSTEM
          ====================================== */}

          {!collapsed && (
            <SectionTitle title="SYSTEM" />
          )}


          <ExpandableMenu
            title="Settings"
            icon={<Settings size={18} />}
            collapsed={collapsed}
            open={isMenuOpen("settings")}
            onClick={() => toggleMenu("settings")}
          />

          {!collapsed && isMenuOpen("settings") && (
            <SubMenu>

              <SubLink
                to="/settings"
                icon={<Settings size={15} />}
                text="General Settings"
              />

              <SubLink
                to="/settings/users"
                icon={<Users size={15} />}
                text="User Management"
              />

            </SubMenu>
          )}

        </div>
      </aside>
    </>
  );
};


/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({
  title,
}: {
  title: string;
}) => {
  return (
    <div className="px-3 mt-6 mb-2">

      <p
        className="
          text-[10px]
          font-semibold
          tracking-wide

          text-white/50
          dark:text-slate-500

          transition-colors
          duration-200
        "
      >
        {title}
      </p>

    </div>
  );
};


/* =========================================================
   EXPANDABLE MENU
========================================================= */

interface ExpandableMenuProps {
  title: string;
  icon: React.ReactNode;
  collapsed: boolean;
  open: boolean;
  onClick: () => void;
}

const ExpandableMenu = ({
  title,
  icon,
  collapsed,
  open,
  onClick,
}: ExpandableMenuProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={collapsed ? title : ""}
      className={`
        w-full

        flex
        items-center

        ${collapsed ? "justify-center" : "justify-between"}

        gap-3

        px-3
        py-2.5

        rounded-lg

        text-white/85
        dark:text-slate-300

        hover:bg-[#0f766e]
        dark:hover:bg-teal-700

        hover:text-white

        transition-all
        duration-200

        mb-1
      `}
    >

      {/* Icon + title */}

      <div className="flex items-center gap-3 min-w-0">

        <span className="shrink-0">
          {icon}
        </span>

        {!collapsed && (
          <span className="text-sm truncate">
            {title}
          </span>
        )}

      </div>


      {/* Arrow */}

      {!collapsed && (
        <>
          {open ? (
            <ChevronDown
              size={16}
              className="shrink-0"
            />
          ) : (
            <ChevronRight
              size={16}
              className="shrink-0"
            />
          )}
        </>
      )}

    </button>
  );
};


/* =========================================================
   SUBMENU CONTAINER
========================================================= */

const SubMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="
        ml-5
        pl-3

        border-l
        border-white/15
        dark:border-slate-700

        mb-1

        space-y-1
      "
    >
      {children}
    </div>
  );
};


/* =========================================================
   SUBMENU LINK
========================================================= */

interface SubLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SubLink = ({
  to,
  icon,
  text,
}: SubLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
          flex
          items-center
          gap-2

          px-3
          py-2

          rounded-md

          text-xs

          transition-all
          duration-200

          ${
            isActive
              ? `
                bg-[#DFE0C3]/30
                dark:bg-teal-700/50

                text-white
              `
              : `
                text-white/70
                dark:text-slate-400

                hover:bg-[#0f766e]
                dark:hover:bg-teal-700

                hover:text-white
              `
          }
        `
      }
    >
      {icon}

      <span>
        {text}
      </span>
    </NavLink>
  );
};


export default Sidebar;