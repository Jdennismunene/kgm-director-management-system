import { Edit, MapPin } from "lucide-react";
import { useState } from "react";
import EditHealthInformationModal from "./EditHealthInformationModal";
import type { HealthInformation as HealthInfoType } from "../../data/healthInformation";

interface HealthInformationProps {
  info: HealthInfoType;
  onUpdate: (updatedInfo: HealthInfoType) => void;
}

const HealthInformation = ({ info, onUpdate }: HealthInformationProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = (updatedInfo: HealthInfoType) => {
    onUpdate(updatedInfo);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="mt-5 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <MapPin size={17} className="text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Health Information
            </h2>
          </div>

          {/* Edit Button */}
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
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 p-5 md:grid-cols-4">
          {/* Allergies */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Allergies
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.allergies}
            </p>
          </div>

          {/* Medical Conditions */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Medical Conditions
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.medicalConditions}
            </p>
          </div>

          {/* Emergency Contact */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Emergency Contact
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.emergencyContact}
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {info.emergencyPhone}
            </p>
          </div>

          {/* Notes */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Notes
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.notes}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditHealthInformationModal
          info={info}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default HealthInformation;
