import type { ReactNode } from "react";

interface DashboardSectionProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  children: ReactNode;
}

const DashboardSection = ({
  title,
  icon,
  iconColor,
  children,
}: DashboardSectionProps) => {
  return (
    <div
      className="
        bg-white
        dark:bg-slate-900

        border
        border-gray-200
        dark:border-slate-700

        rounded-lg

        shadow-sm
        dark:shadow-black/20

        overflow-hidden

        transition-all
        duration-300
      "
    >

      {/* =====================================
          SECTION HEADER
      ====================================== */}

      <div className="px-4 pt-4">

        <div
          className="
            flex
            items-center
            gap-2

            pb-3

            border-b
            border-gray-100
            dark:border-slate-700

            transition-colors
            duration-300
          "
        >

          {/* Section Icon */}

          <div className={iconColor}>
            {icon}
          </div>


          {/* Section Title */}

          <h2
            className={`
              text-sm
              font-semibold
              uppercase

              ${iconColor}
            `}
          >
            {title}
          </h2>

        </div>

      </div>


      {/* =====================================
          SECTION CONTENT
      ====================================== */}

      <div
        className="
          pb-2

          bg-white
          dark:bg-slate-900

          transition-colors
          duration-300
        "
      >
        {children}
      </div>

    </div>
  );
};

export default DashboardSection;