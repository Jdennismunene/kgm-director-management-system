import {
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";

import LessonTable from "./LessonTable";
import RecordLessonModal, { type LessonRecord } from "./RecordLessonModal";

type LessonFilter =
  | "all"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "thisYear";

const Lessons = () => {
  // =====================================================
  // LESSON RECORDS
  // =====================================================

  const [lessons, setLessons] = useState<LessonRecord[]>([
    {
      id: 1,
      title: "Knowing God",
      category: "Bible Study",
      date: "Aug 9, 2026",
      progress: 100,
      status: "Completed",
      score: "92%",
      teacher: "David Kamau",
    },
    {
      id: 2,
      title: "The Life of Jesus",
      category: "Bible Study",
      date: "Aug 2, 2026",
      progress: 100,
      status: "Completed",
      score: "88%",
      teacher: "Sarah Wanjiku",
    },
    {
      id: 3,
      title: "Prayer and Faith",
      category: "Discipleship",
      date: "Jul 26, 2026",
      progress: 75,
      status: "In Progress",
      score: "-",
      teacher: "David Kamau",
    },
    {
      id: 4,
      title: "Christian Character",
      category: "Discipleship",
      date: "Jul 19, 2026",
      progress: 50,
      status: "In Progress",
      score: "-",
      teacher: "Sarah Wanjiku",
    },
    {
      id: 5,
      title: "Serving Others",
      category: "Christian Living",
      date: "Jul 12, 2026",
      progress: 100,
      status: "Completed",
      score: "95%",
      teacher: "Mary Njeri",
    },
  ]);

  // =====================================================
  // STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [filter, setFilter] = useState<LessonFilter>("thisMonth");

  // =====================================================
  // ADD LESSON
  // =====================================================

  const handleAddLesson = (lesson: Omit<LessonRecord, "id">) => {
    const newLesson: LessonRecord = {
      id: Date.now(),
      ...lesson,
    };

    setLessons((previousLessons) => [newLesson, ...previousLessons]);

    setShowModal(false);
  };

  // =====================================================
  // FILTER LESSONS
  // =====================================================

  const filteredLessons = useMemo(() => {
    switch (filter) {
      case "thisMonth":
        return lessons.filter((lesson) => lesson.date.includes("Aug 2026"));

      case "lastMonth":
        return lessons.filter((lesson) => lesson.date.includes("Jul 2026"));

      case "last3Months":
        return lessons.filter((lesson) =>
          ["Aug 2026", "Jul 2026", "Jun 2026"].some((month) =>
            lesson.date.includes(month),
          ),
        );

      case "thisYear":
        return lessons.filter((lesson) => lesson.date.includes("2026"));

      case "all":
      default:
        return lessons;
    }
  }, [lessons, filter]);

  // =====================================================
  // SUMMARY STATISTICS
  // =====================================================

  const totalLessons = lessons.length;

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "Completed",
  ).length;

  const inProgressLessons = lessons.filter(
    (lesson) => lesson.status === "In Progress",
  ).length;

  // Only completed lessons with an actual score
  const scoredLessons = lessons.filter(
    (lesson) => lesson.status === "Completed" && lesson.score !== "-",
  );

  const averageScore =
    scoredLessons.length === 0
      ? 0
      : Math.round(
          scoredLessons.reduce((total, lesson) => {
            return total + Number(lesson.score.replace("%", ""));
          }, 0) / scoredLessons.length,
        );

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="mt-5 space-y-5">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Lessons
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track lessons, learning progress, and completed activities.
          </p>
        </div>

        {/* Record Lesson */}

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus size={17} />
          Record Lesson
        </button>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Lessons */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Lessons
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {totalLessons}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                All recorded lessons
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <BookOpen
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Completed */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Completed
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {completedLessons}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Lessons completed
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <CheckCircle2
                size={20}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        {/* In Progress */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                In Progress
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {inProgressLessons}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Lessons underway
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
              <Clock3
                size={20}
                className="text-yellow-600 dark:text-yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Average Score */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Average Score
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {averageScore}%
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Completed lessons
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <GraduationCap
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          LESSON HISTORY
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}

        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <BookOpen
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Lesson History
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Recent lessons and learning progress
              </p>
            </div>
          </div>

          {/* Filter */}

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as LessonFilter)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="thisMonth">This Month</option>

            <option value="lastMonth">Last Month</option>

            <option value="last3Months">Last 3 Months</option>

            <option value="thisYear">This Year</option>

            <option value="all">All Lessons</option>
          </select>
        </div>

        {/* =================================================
            LESSON TABLE
        ================================================= */}

        <LessonTable lessons={filteredLessons} />
      </div>

      {/* =================================================
          RECORD LESSON MODAL
      ================================================= */}

      {showModal && (
        <RecordLessonModal
          onClose={() => setShowModal(false)}
          onSave={handleAddLesson}
        />
      )}
    </div>
  );
};

export default Lessons;
