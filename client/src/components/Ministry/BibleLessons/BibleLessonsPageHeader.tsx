import { BookOpen, Plus } from "lucide-react";

interface BibleLessonsPageHeaderProps {
  onAddLesson?: () => void;
}

const BibleLessonsPageHeader = ({
  onAddLesson,
}: BibleLessonsPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
          <BookOpen size={24} />
        </div>

        {/* Title & Description */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bible Lessons
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage Bible lessons, Scripture topics, and teaching content for
            ministry learners.
          </p>
        </div>
      </div>

      {/* Add Lesson Button */}
      <button
        type="button"
        onClick={onAddLesson}
        className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        <Plus size={18} />
        Add Lesson
      </button>
    </div>
  );
};

export default BibleLessonsPageHeader;
