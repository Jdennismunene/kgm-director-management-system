import { BookOpen, CalendarDays, UserRound } from "lucide-react";

import type { LessonRecord } from "./RecordLessonModal";

interface LessonTableProps {
  lessons: LessonRecord[];
}

const LessonTable = ({ lessons }: LessonTableProps) => {
  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
          <BookOpen size={22} className="text-gray-400 dark:text-gray-300" />
        </div>

        <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
          No lessons found
        </h4>

        <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500 dark:text-gray-400">
          There are no lessons recorded for the selected period.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="p-5 transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* =================================================
                LESSON INFORMATION
            ================================================= */}

            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <BookOpen
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {lesson.title}
                </h4>

                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>{lesson.category}</span>

                  <span>•</span>

                  <div className="flex items-center gap-1">
                    <CalendarDays size={12} />

                    <span>{lesson.date}</span>
                  </div>

                  <span>•</span>

                  <div className="flex items-center gap-1">
                    <UserRound size={12} />

                    <span>{lesson.teacher}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                PROGRESS
            ================================================= */}

            <div className="w-full lg:max-w-xs">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Progress
                </span>

                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  {lesson.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500"
                  style={{
                    width: `${lesson.progress}%`,
                  }}
                />
              </div>
            </div>

            {/* =================================================
                STATUS + SCORE
            ================================================= */}

            <div className="flex shrink-0 items-center gap-4">
              {lesson.status === "Completed" ? (
                <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  Completed
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                  In Progress
                </span>
              )}

              <div className="min-w-11.25 text-right">
                {lesson.score !== "-" ? (
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                    {lesson.score}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    —
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonTable;
