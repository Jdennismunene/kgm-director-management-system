import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import type { Milestone } from "./Discipleship";

interface EditDiscipleshipModalProps {
  isOpen: boolean;
  milestone: Milestone | null;
  onClose: () => void;
  onSave: (updatedMilestone: Milestone) => void;
}

const EditDiscipleshipModal = ({
  isOpen,
  milestone,
  onClose,
  onSave,
}: EditDiscipleshipModalProps) => {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [recordType, setRecordType] = useState("Milestone");

  const [recordTitle, setRecordTitle] = useState("");

  const [recordDescription, setRecordDescription] = useState("");

  const [recordStatus, setRecordStatus] = useState("In Progress");

  const [recordMentor, setRecordMentor] = useState("David Kamau");

  const [recordNotes, setRecordNotes] = useState("");

  // =====================================================
  // LOAD SELECTED MILESTONE
  // =====================================================

  useEffect(() => {
    if (!milestone) return;

    setRecordType(milestone.type);
    setRecordTitle(milestone.title);
    setRecordDescription(milestone.description);
    setRecordStatus(milestone.completed ? "Completed" : "In Progress");
    setRecordMentor(milestone.mentor);
    setRecordNotes(milestone.notes);
  }, [milestone]);

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    onClose();
  };

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSubmit = () => {
    if (!milestone || !recordTitle.trim()) {
      return;
    }

    const updatedMilestone: Milestone = {
      ...milestone,
      title: recordTitle.trim(),
      description: recordDescription.trim() || "No description provided.",
      completed: recordStatus === "Completed",
      type: recordType,
      mentor: recordMentor,
      notes: recordNotes.trim(),
    };

    onSave(updatedMilestone);
  };

  // =====================================================
  // DON'T RENDER WHEN CLOSED
  // =====================================================

  if (!isOpen || !milestone) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Discipleship Record
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Update the selected discipleship record.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <div className="space-y-5 p-6">
          {/* Record Type */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Record Type
            </label>

            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900/30"
            >
              <option value="Milestone">Milestone</option>

              <option value="Bible Lesson">Bible Lesson</option>

              <option value="Spiritual Growth">Spiritual Growth</option>

              <option value="Memory Verse">Memory Verse</option>

              <option value="Prayer">Prayer</option>

              <option value="Service">Service / Serving Others</option>

              <option value="Other">Other</option>
            </select>
          </div>

          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>

            <input
              type="text"
              value={recordTitle}
              onChange={(e) => setRecordTitle(e.target.value)}
              placeholder="e.g. Understanding Prayer"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>

            <textarea
              value={recordDescription}
              onChange={(e) => setRecordDescription(e.target.value)}
              rows={3}
              placeholder="Describe the milestone or activity..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </label>

            <select
              value={recordStatus}
              onChange={(e) => setRecordStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900/30"
            >
              <option value="Completed">Completed</option>

              <option value="In Progress">In Progress</option>
            </select>
          </div>

          {/* Mentor */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Mentor
            </label>

            <select
              value={recordMentor}
              onChange={(e) => setRecordMentor(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900/30"
            >
              <option value="David Kamau">David Kamau</option>

              <option value="Sarah Wanjiku">Sarah Wanjiku</option>

              <option value="Peter Mwangi">Peter Mwangi</option>
            </select>
          </div>

          {/* Notes */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Notes
            </label>

            <textarea
              value={recordNotes}
              onChange={(e) => setRecordNotes(e.target.value)}
              rows={3}
              placeholder="Add any additional notes..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!recordTitle.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDiscipleshipModal;
