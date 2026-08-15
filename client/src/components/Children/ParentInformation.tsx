import { Edit, Users } from "lucide-react";
import { useState } from "react";
import EditParentInformationModal from "./EditParentInformationModal";
import type { ChildParentInfo } from "../../data/childParentInfo";

interface ParentInformationProps {
  info: ChildParentInfo;
  onUpdate: (updatedInfo: ChildParentInfo) => void;
}

const ParentInformation = ({ info, onUpdate }: ParentInformationProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = (updatedInfo: ChildParentInfo) => {
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
              <Users size={17} className="text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Parent / Guardian Information
            </h2>
          </div>

          {/* Edit */}
          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 "
          >
            <Edit size={15} />
            Edit
          </button>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 p-5 md:grid-cols-3">
          {/* Parent / Guardian */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Parent / Guardian
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.parentName}
            </p>
          </div>

          {/* Phone */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Phone
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.phone}
            </p>
          </div>

          {/* Occupation */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Occupation
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.occupation}
            </p>
          </div>

          {/* Relationship */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Relationship
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.relationship}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Email
            </p>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {info.email}
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
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditParentInformationModal
          info={info}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ParentInformation;
