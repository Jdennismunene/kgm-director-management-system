import {
  BookOpen,
  CalendarDays,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

import type { TeachingManual } from "../../../data/teachingManualsData";

interface ManualsGridProps {
  manuals: TeachingManual[];
  onView?: (manual: TeachingManual) => void;
  onEdit?: (manual: TeachingManual) => void;
  onDelete?: (manual: TeachingManual) => void;
}

const ManualsGrid = ({
  manuals,
  onView,
  onEdit,
  onDelete,
}: ManualsGridProps) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  if (manuals.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
            <BookOpen size={26} />
          </div>

          <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
            No manuals found
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {manuals.map((manual) => (
        <div
          key={manual.id}
          className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          {/* Top Section */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              {/* Manual Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                <BookOpen size={21} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                  {manual.title}
                </h3>

                <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                  {manual.provider}
                </p>
              </div>
            </div>

            {/* More Menu */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu(openMenu === manual.id ? null : manual.id)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                <MoreVertical size={18} />
              </button>

              {openMenu === manual.id && (
                <div className="absolute right-0 top-9 z-20 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <button
                    type="button"
                    onClick={() => {
                      onView?.(manual);
                      setOpenMenu(null);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onEdit?.(manual);
                      setOpenMenu(null);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onDelete?.(manual);
                      setOpenMenu(null);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            {manual.description}
          </p>

          {/* Category */}
          <div className="mt-4">
            <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              {manual.category}
            </span>
          </div>

          {/* Information */}
          <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-700">
            {/* Audience */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <UsersRound size={15} />

                <span className="text-xs">Audience</span>
              </div>

              <span className="text-right text-xs font-medium text-gray-700 dark:text-gray-300">
                {manual.audience}
              </span>
            </div>

            {/* Age Group */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <BookOpen size={15} />

                <span className="text-xs">Age Group</span>
              </div>

              <span className="text-right text-xs font-medium text-gray-700 dark:text-gray-300">
                {manual.ageGroup}
              </span>
            </div>

            {/* Lessons */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <BookOpen size={15} />

                <span className="text-xs">Lessons</span>
              </div>

              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {manual.lessonsCount}
              </span>
            </div>

            {/* Date Added */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <CalendarDays size={15} />

                <span className="text-xs">Added</span>
              </div>

              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {manual.dateAdded}
              </span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
            {/* Status */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                manual.status === "Active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  manual.status === "Active" ? "bg-green-500" : "bg-gray-400"
                }`}
              />

              {manual.status}
            </span>

            {/* View Button */}
            <button
              type="button"
              onClick={() => onView?.(manual)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            >
              <Eye size={16} />
              View Manual
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManualsGrid;
