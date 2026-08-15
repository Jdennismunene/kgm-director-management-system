import { Edit, User } from "lucide-react";
import { useState } from "react";
import EditPersonalInformationModal from "./EditPersonalInformationModal";
import type { ChildPersonalInfo } from "../../data/childPersonalInfo";

interface PersonalInformationProps {
  info: ChildPersonalInfo;
  onUpdate: (updatedInfo: ChildPersonalInfo) => void;
}

const PersonalInformation = ({ info, onUpdate }: PersonalInformationProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = (updatedInfo: ChildPersonalInfo) => {
    onUpdate(updatedInfo);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <User size={17} className="text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Personal Information
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
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 p-5 md:grid-cols-3">
          {/* Full Name */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Full Name
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.fullName}
            </p>
          </div>

          {/* Gender */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Gender
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.gender}
            </p>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Date of Birth
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.dateOfBirth}
            </p>
          </div>

          {/* Age */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Age
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.age} years
            </p>
          </div>

          {/* Blood Group */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Blood Group
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.bloodGroup}
            </p>
          </div>

          {/* Language */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Language
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.language}
            </p>
          </div>

          {/* Address */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Address
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.address}
            </p>
          </div>

          {/* Nationality */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Nationality
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.nationality}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditPersonalInformationModal
          info={info}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default PersonalInformation;
