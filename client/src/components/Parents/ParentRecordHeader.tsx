import { Mail, MapPin, Phone } from "lucide-react";
import type { Parent } from "../../data/parentsData";

interface ParentRecordHeaderProps {
  parent: Parent;
}

const ParentRecordHeader = ({ parent }: ParentRecordHeaderProps) => {
  const initials = parent.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Parent identity */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
            {initials}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {parent.name}
              </h2>

              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                  parent.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                <span
                  className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                    parent.status === "Active" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />

                {parent.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {parent.relationship}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Phone size={14} />
                {parent.phone}
              </div>

              {parent.email && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Mail size={14} />
                  {parent.email}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={14} />
                {parent.branch}
              </div>
            </div>
          </div>
        </div>

        {/* Quick information */}
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400">Children</p>

            <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              {parent.childrenIds.length}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>

            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              {parent.joinedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentRecordHeader;
