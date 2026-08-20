import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
  Edit,
  GraduationCap,
  Trash2,
  UsersRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  bibleLessonsData,
  type BibleLesson,
} from "../../data/bibleLessonsData";
import { useState } from "react";
import EditBibleLessonModal from "../../components/Ministry/BibleLessons/EditBibleLessonModal";
import DeleteBibleLessonModal from "../../components/Ministry/BibleLessons/DeleteBibleLessonModal";

const BibleLessonRecords = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentLesson, setCurrentLesson] = useState<BibleLesson | undefined>(
    () => bibleLessonsData.find((item) => item.id === Number(id)),
  );

  const lesson = currentLesson;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showSuccessNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleEdit = (updatedLesson: BibleLesson) => {
    setCurrentLesson(updatedLesson);
    setShowEditModal(false);

    showSuccessNotification("Bible lesson updated successfully.");
  };

  const handleDelete = () => {
    setShowDeleteModal(false);

    showSuccessNotification("Bible lesson deleted successfully.");

    setTimeout(() => {
      navigate("/ministry/lessons/bible");
    }, 1200);
  };

  // Lesson not found
  if (!lesson) {
    return (
      <div className="mx-4 mt-3 pb-3">
        {notification && (
          <div className="fixed right-5 top-5 z-60 rounded-xl border border-green-200 bg-white px-5 py-3 shadow-lg dark:border-green-900/50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                ✓
              </div>

              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {notification}
              </p>
            </div>
          </div>
        )}
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
            <BookOpen size={26} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
            Lesson Not Found
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The Bible lesson you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/ministry/lessons/bible")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <ArrowLeft size={17} />
            Back to Bible Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 mt-3 space-y-6 pb-3">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/ministry/lessons/bible")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
      >
        <ArrowLeft size={17} />
        Back to Bible Lessons
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <BookOpen size={30} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {lesson.title}
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {lesson.bibleReference}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                lesson.status === "Active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  lesson.status === "Active" ? "bg-green-500" : "bg-gray-400"
                }`}
              />

              {lesson.status}
            </span>

            {/* Edit */}
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Edit size={16} />
              Edit Lesson
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Topic */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <BookOpen size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Topic</p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {lesson.topic}
              </p>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <GraduationCap size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Category
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {lesson.category}
              </p>
            </div>
          </div>
        </div>

        {/* Age Group */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <UsersRound size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Age Group
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {lesson.ageGroup}
              </p>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Duration
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {lesson.duration} minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Lesson Description */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            About This Lesson
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
            {lesson.description}
          </p>
        </div>

        {/* Lesson Information */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Lesson Information
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Bible Reference
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {lesson.bibleReference}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manual</p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {lesson.manual}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Category
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {lesson.category}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Date Added
              </p>

              <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                <CalendarDays size={15} className="text-gray-400" />
                {lesson.dateAdded}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Verse */}
      <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6 shadow-sm dark:border-teal-900/40 dark:bg-teal-900/10">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
            <BookOpen size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Memory Verse
            </h2>

            <p className="mt-3 text-base italic leading-7 text-gray-700 dark:text-gray-300">
              “{lesson.memoryVerse}”
            </p>

            <p className="mt-2 text-xs font-semibold text-teal-700 dark:text-teal-400">
              {lesson.bibleReference}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Lesson Content
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Lesson teaching material and activities will appear here.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-8 text-center dark:border-gray-700">
          <BookOpen
            size={25}
            className="mx-auto text-gray-400 dark:text-gray-500"
          />

          <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Lesson content is not yet available
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Teaching activities, objectives, discussion questions, and other
            lesson materials can be added later.
          </p>
        </div>
      </div>
      {showEditModal && (
  <EditBibleLessonModal
    lesson={lesson}
    onClose={() => setShowEditModal(false)}
    onSave={handleEdit}
  />
)}

{showDeleteModal && (
  <DeleteBibleLessonModal
    lesson={lesson}
    onClose={() => setShowDeleteModal(false)}
    onConfirm={handleDelete}
  />
)}
    </div>
  );
};

export default BibleLessonRecords;
