import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  title: string;
  action: string;
  to: string;
  iconBg: string;
  iconColor: string;
  actionColor: string;
}

const StatCard = ({
  icon,
  value,
  title,
  action,
  to,
  iconBg,
  iconColor,
  actionColor,
}: StatCardProps) => {
  return (
    <div
      className="
        bg-white
        dark:bg-slate-900

        border
        border-gray-200
        dark:border-slate-700

        rounded-lg

        p-4

        shadow-sm
        dark:shadow-black/20

        hover:shadow-md
        dark:hover:shadow-black/30

        transition-all
        duration-300
      "
    >
      {/* =====================================
          TOP
      ====================================== */}

      <div className="flex items-center">

        {/* Icon */}

        <div
          className={`
            w-11
            h-11
            rounded-lg

            flex
            items-center
            justify-center

            shrink-0

            ${iconBg}
            ${iconColor}
          `}
        >
          {icon}
        </div>


        {/* Number + Title */}

        <div className="ml-3">

          <h3
            className="
              text-2xl
              font-bold
              leading-none

              text-gray-800
              dark:text-white

              transition-colors
              duration-300
            "
          >
            {value}
          </h3>

          <p
            className="
              text-xs
              text-gray-500
              dark:text-gray-400

              mt-1

              transition-colors
              duration-300
            "
          >
            {title}
          </p>

        </div>

      </div>


      {/* =====================================
          ACTION
      ====================================== */}

      <Link
        to={to}
        className="
          mt-4

          flex
          items-center
          justify-between

          group

          rounded-md

          transition-colors
          duration-200
        "
      >

        <span
          className={`
            text-xs
            font-medium

            group-hover:underline

            ${actionColor}
          `}
        >
          {action}
        </span>


        <ArrowRight
          size={15}
          className={`
            ${actionColor}

            group-hover:translate-x-1

            transition-transform
            duration-200
          `}
        />

      </Link>

    </div>
  );
};

export default StatCard;