import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

import type { Parent } from "../../data/parentsData";

interface ParentOverviewProps {
  parent: Parent;
}

const ParentOverview = ({ parent }: ParentOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Parent Information */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Parent Information
          </h3>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Basic contact and registration information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Full Name */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-teal-50 p-2 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <Users size={17} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Full Name
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {parent.name}
              </p>
            </div>
          </div>

          {/* Relationship */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <ShieldCheck size={17} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Relationship
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {parent.relationship}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <Phone size={17} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Phone Number
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {parent.phone}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Mail size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Email Address
              </p>

              <p className="mt-1 truncate text-sm font-medium text-gray-900 dark:text-white">
                {parent.email || "Not provided"}
              </p>
            </div>
          </div>

          {/* Branch */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <MapPin size={17} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Branch</p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {parent.branch}
              </p>
            </div>
          </div>

          {/* Joined Date */}
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <CalendarDays size={17} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Joined Date
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {parent.joinedDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Children */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Children
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {parent.childrenIds.length}
              </p>
            </div>

            <div className="rounded-xl bg-teal-100 p-3 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <Users size={22} />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Account Status
              </p>

              <p
                className={`mt-2 text-lg font-bold ${
                  parent.status === "Active"
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {parent.status}
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <ShieldCheck size={22} />
            </div>
          </div>
        </div>

        {/* Branch */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Registered Branch
              </p>

              <p className="mt-2 truncate text-sm font-bold text-gray-900 dark:text-white">
                {parent.branch}
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <MapPin size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentOverview;
