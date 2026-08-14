import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface DashboardItemProps {
  icon: ReactNode;
  title: string;
  description?: string;
  iconColor?: string;
  to: string;
}

const DashboardItem = ({
  icon,
  title,
  description,
  iconColor = "text-gray-600",
  to,
}: DashboardItemProps) => {
  return (
    <Link
      to={to}
      className="
        flex
        items-center
        gap-3

        px-4
        py-3

        cursor-pointer

        bg-white
        dark:bg-slate-900

        hover:bg-teal-50
        dark:hover:bg-teal-950/40

        transition
        duration-200

        group
      "
    >
      {/* =====================================
          ICON
      ====================================== */}

      <div
        className={`
          w-8
          h-8

          flex
          items-center
          justify-center

          shrink-0

          ${iconColor}
        `}
      >
        {icon}
      </div>


      {/* =====================================
          TEXT
      ====================================== */}

      <div className="flex-1 min-w-0">

        <p
          className="
            text-sm
            font-medium

            text-gray-800
            dark:text-gray-100

            truncate

            transition-colors
            duration-200
          "
        >
          {title}
        </p>


        {description && (
          <p
            className="
              text-xs

              text-gray-400
              dark:text-gray-500

              mt-0.5

              truncate

              transition-colors
              duration-200
            "
          >
            {description}
          </p>
        )}

      </div>


      {/* =====================================
          ARROW
      ====================================== */}

      <ChevronRight
        size={17}
        className="
          text-gray-400
          dark:text-gray-500

          group-hover:text-teal-600
          dark:group-hover:text-teal-400

          group-hover:translate-x-1

          transition
          duration-200

          shrink-0
        "
      />

    </Link>
  );
};

export default DashboardItem;