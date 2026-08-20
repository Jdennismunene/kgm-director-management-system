import { ArrowLeft, Edit, Mail, Phone, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Teacher } from "../../data/teachersData";
import { useTeachers } from "../../context/TeachersContext";
import EditTeacherModal from "./EditTeacherModal";

interface TeacherRecordHeaderProps {
  teacher: Teacher;
  onUpdated?: () => void;
}

const TeacherRecordHeader = ({
  teacher,
  onUpdated,
}: TeacherRecordHeaderProps) => {
  const navigate = useNavigate();

  const { updateTeacher } = useTeachers();

  const [showEditModal, setShowEditModal] = useState(false);

  const initials = teacher.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSave = (updatedTeacher: Teacher) => {
    updateTeacher(updatedTeacher);
    setShowEditModal(false);
    onUpdated?.();
  };

  return (
    <>
      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Top Section */}
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <button
              onClick={() => navigate("/teachers")}
              className="flex items-center gap-1.5 transition hover:text-[#365452] dark:hover:text-[#8eb0ac]"
            >
              <ArrowLeft size={16} />
              Teachers
            </button>

            <span>/</span>

            <span className="text-gray-700 dark:text-gray-300">
              Teacher Record
            </span>
          </div>

          {/* Profile */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#365452] text-xl font-bold text-white dark:bg-[#466b68]">
                {initials}
              </div>

              {/* Teacher Information */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {teacher.name}
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      teacher.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {teacher.status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Teacher ID: #{String(teacher.id).padStart(4, "0")}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-gray-400" />
                    <span>{teacher.email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-gray-400" />
                    <span>{teacher.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit */}
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-[#8eb0ac]"
            >
              <Edit size={17} />
              Edit Teacher
            </button>
          </div>
        </div>

        {/* Quick Information */}
        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* Grades */}
          <div className="px-6 py-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              <UserRound size={15} />
              Assigned Grades
            </div>

            <div className="flex flex-wrap gap-1.5">
              {teacher.grade.length > 0 ? (
                teacher.grade.map((grade) => (
                  <span
                    key={grade}
                    className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {grade}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">
                  No grades assigned
                </span>
              )}
            </div>
          </div>

          {/* Joined Date */}
          <div className="px-6 py-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Joined On
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {teacher.joinedDate}
            </p>
          </div>

          {/* Status */}
          <div className="px-6 py-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Current Status
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {teacher.status === "Active"
                ? "Currently Active"
                : "Currently Inactive"}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditTeacherModal
          teacher={teacher}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default TeacherRecordHeader;
