import { Edit, GraduationCap } from "lucide-react";
import { useState } from "react";

import EditAcademicInformationModal from "./EditAcademicInformationModal";
import type { Child } from "../../services/childService";

interface AcademicInformationProps {
  child: Child;
  onUpdate: (updatedChild: Child) => void;
}

const AcademicInformation = ({
  child,
  onUpdate,
}: AcademicInformationProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = (updatedChild: Child) => {
    onUpdate(updatedChild);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="mt-5 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <GraduationCap
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Academic Information
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Edit size={15} />
            Edit
          </button>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 p-5 md:grid-cols-5">
          {/* Class */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Class
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {child.grade?.name ?? "Not assigned"}
            </p>
          </div>

          {/* Branch */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Branch
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {child.branch?.name ?? "Not assigned"}
            </p>
          </div>

          {/* Date Joined */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Date Joined
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {child.createdAt
                ? new Date(child.createdAt).toLocaleDateString()
                : "Not available"}
            </p>
          </div>

          {/* Baptized */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Baptized
            </p>

            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Not available
            </span>
          </div>

          {/* Baptism Date */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Baptism Date
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Not available
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditAcademicInformationModal
          child={child}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default AcademicInformation;