import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Edit,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditManualModal from "../../components/Ministry/Manuals/EditManualModal";

import {
  teachingManualsData,
  type TeachingManual,
} from "../../data/teachingManualsData";

const ManualRecords = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialManual: TeachingManual | undefined = teachingManualsData.find(
    (item) => item.id === Number(id),
  );

  const [manual, setManual] = useState<TeachingManual | undefined>(
    initialManual,
  );

  const [showEditModal, setShowEditModal] = useState(false);

  // Manual not found
  if (!manual) {
    return (
      <div className="mx-4 mt-3 pb-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
            <BookOpen size={26} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
            Manual Not Found
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The teaching manual you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/ministry/manuals")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <ArrowLeft size={17} />
            Back to Teaching Manuals
          </button>
        </div>
      </div>
    );
  }

  const handleEditManual = (updatedManual: TeachingManual) => {
    setManual(updatedManual);
    setShowEditModal(false);
  };

  return (
    <div className="mx-4 mt-3 space-y-6 pb-3">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/ministry/manuals")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
      >
        <ArrowLeft size={17} />
        Back to Teaching Manuals
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Manual Identity */}
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <BookOpen size={30} />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {manual.title}
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {manual.provider}
              </p>
            </div>
          </div>

          {/* Status + Edit */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status */}
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
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

            {/* Edit Manual */}
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <Edit size={17} />
              Edit Manual
            </button>
          </div>
        </div>
      </div>

      {/* Manual Overview */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Category */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <BookOpen size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Category
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {manual.category}
              </p>
            </div>
          </div>
        </div>

        {/* Audience */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <UsersRound size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Audience
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {manual.audience}
              </p>
            </div>
          </div>
        </div>

        {/* Age Group */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <GraduationCap size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Age Group
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {manual.ageGroup}
              </p>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <BookOpen size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Lessons
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {manual.lessonsCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Description */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            About This Manual
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
            {manual.description}
          </p>
        </div>

        {/* Manual Information */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Manual Information
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Provider
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {manual.provider}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Category
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {manual.category}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Audience
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {manual.audience}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Date Added
              </p>

              <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                <CalendarDays size={15} className="text-gray-400" />
                {manual.dateAdded}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Lessons
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Lessons available in this teaching manual.
            </p>
          </div>

          <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
            {manual.lessonsCount} Lessons
          </span>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-8 text-center dark:border-gray-700">
          <BookOpen
            size={25}
            className="mx-auto text-gray-400 dark:text-gray-500"
          />

          <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Lesson content will appear here
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Individual lessons can be connected when the Bible Lessons section
            is implemented.
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditManualModal
          manual={manual}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditManual}
        />
      )}
    </div>
  );
};

export default ManualRecords;
