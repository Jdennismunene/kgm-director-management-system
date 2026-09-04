import {
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Plus,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import LessonTable from "./LessonTable";
import RecordLessonModal, {
  type LessonRecord as ModalLessonRecord,
} from "./RecordLessonModal";

import {
  createLesson,
  getChildLessons,
  type LessonRecord as ApiLessonRecord,
} from "../../services/lessonService";

type LessonFilter =
  | "all"
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "thisYear";

interface LessonsProps {
  childId: string;
}

const Lessons = ({ childId }: LessonsProps) => {
  // =====================================================
  // STATE
  // =====================================================

  const [lessons, setLessons] = useState<ApiLessonRecord[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [filter, setFilter] = useState<LessonFilter>("thisMonth");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // FETCH LESSONS
  // =====================================================

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getChildLessons(childId);

      setLessons(data);
    } catch (err) {
      console.error("Error loading lessons:", err);

      setError("Failed to load lesson records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!childId) return;

    loadLessons();
  }, [childId]);

  // =====================================================
  // ADD LESSON
  // =====================================================

  const handleAddLesson = async (
    lesson: Omit<ModalLessonRecord, "id">,
  ) => {
    try {
      setSaving(true);
      setError("");

      const newLesson = await createLesson({
        childId,

        title: lesson.title,

        category: lesson.category,

        date: lesson.date,

        progress: lesson.progress,

        status:
          lesson.status === "Completed"
            ? "COMPLETED"
            : "IN_PROGRESS",

        score:
          lesson.status === "Completed" && lesson.score !== "-"
            ? Number(lesson.score.replace("%", ""))
            : null,

        teacher: lesson.teacher,
      });

      setLessons((previousLessons) => [
        newLesson,
        ...previousLessons,
      ]);

      setShowModal(false);
    } catch (err) {
      console.error("Error creating lesson:", err);

      setError("Failed to save lesson. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // FILTER LESSONS
  // =====================================================

  const filteredLessons = useMemo(() => {
    const now = new Date();

    return lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date);

      switch (filter) {
        case "thisMonth":
          return (
            lessonDate.getMonth() === now.getMonth() &&
            lessonDate.getFullYear() === now.getFullYear()
          );

        case "lastMonth": {
          const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1,
          );

          return (
            lessonDate.getMonth() === lastMonth.getMonth() &&
            lessonDate.getFullYear() === lastMonth.getFullYear()
          );
        }

        case "last3Months": {
          const threeMonthsAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 2,
            1,
          );

          return lessonDate >= threeMonthsAgo;
        }

        case "thisYear":
          return (
            lessonDate.getFullYear() === now.getFullYear()
          );

        case "all":
        default:
          return true;
      }
    });
  }, [lessons, filter]);

  // =====================================================
  // SUMMARY STATISTICS
  // =====================================================

  const totalLessons = lessons.length;

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "COMPLETED",
  ).length;

  const inProgressLessons = lessons.filter(
    (lesson) => lesson.status === "IN_PROGRESS",
  ).length;

  const scoredLessons = lessons.filter(
    (lesson) =>
      lesson.status === "COMPLETED" &&
      lesson.score !== null,
  );

  const averageScore =
    scoredLessons.length === 0
      ? 0
      : Math.round(
          scoredLessons.reduce(
            (total, lesson) =>
              total + (lesson.score ?? 0),
            0,
          ) / scoredLessons.length,
        );

  // =====================================================
  // CONVERT API DATA TO TABLE DATA
  // =====================================================

  const tableLessons: ModalLessonRecord[] =
    filteredLessons.map((lesson) => ({
      id: lesson.id,

      title: lesson.title,

      category: lesson.category,

      date: new Date(lesson.date).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      ),

      progress: lesson.progress,

      status:
        lesson.status === "COMPLETED"
          ? "Completed"
          : "In Progress",

      score:
        lesson.score !== null
          ? `${lesson.score}%`
          : "-",

      teacher: lesson.teacher,
    }));

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="mt-5 flex items-center justify-center py-16">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          Loading lessons...
        </div>
      </div>
    );
  }

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
            Track lessons, learning progress, and completed
            activities.
          </p>
        </div>

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
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

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

          <select
            value={filter}
            onChange={(event) =>
              setFilter(
                event.target.value as LessonFilter,
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 outline-none transition focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="thisMonth">
              This Month
            </option>

            <option value="lastMonth">
              Last Month
            </option>

            <option value="last3Months">
              Last 3 Months
            </option>

            <option value="thisYear">
              This Year
            </option>

            <option value="all">
              All Lessons
            </option>
          </select>
        </div>

        {/* =================================================
            LESSON TABLE
        ================================================= */}

        <LessonTable lessons={tableLessons} />
      </div>

      {/* =================================================
          RECORD LESSON MODAL
      ================================================= */}

      {showModal && (
        <RecordLessonModal
          onClose={() => setShowModal(false)}
          onSave={handleAddLesson}
          saving={saving}
        />
      )}
    </div>
  );
};

export default Lessons;