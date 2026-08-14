import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface QuickActionProps {
  icon: ReactNode;
  title: string;
  bgColor: string;
  hoverColor: string;
  to: string;
}

const QuickAction = ({
  icon,
  title,
  bgColor,
  hoverColor,
  to,
}: QuickActionProps) => {
  return (
    <Link
      to={to}
      className={`
        ${bgColor}
        ${hoverColor}

        text-white

        flex
        items-center
        justify-center
        gap-2

        w-full

        px-4
        py-2.5

        rounded-md

        text-sm
        font-medium

        transition-all
        duration-200

        shadow-sm
        hover:shadow-md

        dark:shadow-black/20
        dark:hover:shadow-black/40

        hover:-translate-y-0.5

        focus:outline-none
        focus:ring-2
        focus:ring-teal-500
        focus:ring-offset-2
        dark:focus:ring-offset-slate-900
      `}
    >
      {/* Icon */}
      {icon}

      {/* Title */}
      <span>
        {title}
      </span>

    </Link>
  );
};

export default QuickAction;