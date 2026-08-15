import { Edit, FileText, Printer, UserX } from "lucide-react";
import { useState } from "react";
import type { Child } from "../../data/childrenData";
import EditChildModal from "./EditChildModal";

interface ChildRecordActionsProps {
  child: Child;
  onUpdateChild: (updatedChild: Child) => void;
}

const ChildRecordActions = ({
  child,
  onUpdateChild,
}: ChildRecordActionsProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = (updatedChild: Child) => {
    onUpdateChild(updatedChild);
    setShowEditModal(false);
  };

  const handleDeactivate = () => {
    const updatedChild: Child = {
      ...child,
      status: "Inactive",
    };

    onUpdateChild(updatedChild);
  };

  const handlePrintProfile = () => {
  window.print();
};

  return (
    <>
      <div className="mt-5 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <FileText size={17} className="text-blue-600 dark:text-blue-400" />
          </div>

          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Actions
          </h2>
        </div>

        {/* Actions */}
        <div className="space-y-3 p-5">
          {/* Edit Child */}
          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            className="flex w-full items-center gap-3 rounded-lg border border-gray-200 
            bg-white px-4 py-3 text-sm font-medium text-gray-700 
            transition hover:bg-gray-50 
            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 
            dark:hover:bg-gray-700 cursor-pointer"
          >
            <Edit size={17} className="text-blue-600 dark:text-blue-400" />

            <span>Edit Child</span>
          </button>

          {/* Print Profile */}
          <button
            type="button"
            onClick={handlePrintProfile}
            className="flex w-full items-center gap-3 rounded-lg border border-gray-200 
            bg-white px-4 py-3 text-sm font-medium text-gray-700 
            transition hover:bg-gray-50 
            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 
            dark:hover:bg-gray-700 cursor-pointer"
          >
            <Printer size={17} className="text-gray-500 dark:text-gray-400" />

            <span>Print Profile</span>
          </button>

          {/* Deactivate */}
          <button
            type="button"
            onClick={handleDeactivate}
            className="flex w-full items-center gap-3 rounded-lg border border-red-200 
            bg-red-50 px-4 py-3 text-sm font-medium text-red-600 
            transition hover:bg-red-100 
            dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 
            dark:hover:bg-red-900/30 cursor-pointer"
          >
            <UserX size={17} />

            <span>Deactivate Child</span>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditChildModal
          child={child}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ChildRecordActions;
