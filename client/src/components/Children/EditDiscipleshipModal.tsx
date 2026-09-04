import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

import type {
  DiscipleshipRecord,
  UpdateDiscipleshipData,
} from "../../services/discipleshipService";

interface EditDiscipleshipModalProps {
  isOpen: boolean;
  milestone: DiscipleshipRecord | null;
  onClose: () => void;
  onSave: (updatedMilestone: DiscipleshipRecord) => void;
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

  const [recordType, setRecordType] = useState("");
  const [recordTitle, setRecordTitle] = useState("");
  const [recordDescription, setRecordDescription] = useState("");
  const [recordDate, setRecordDate] = useState("");
  const [recordStatus, setRecordStatus] = useState("In Progress");
  const [recordMentor, setRecordMentor] = useState("");
  const [recordNotes, setRecordNotes] = useState("");

  // =====================================================
  // LOAD RECORD INTO FORM
  // =====================================================

  useEffect(() => {
    if (!milestone) return;

    setRecordType(milestone.type);
    setRecordTitle(milestone.title);
    setRecordDescription(milestone.description);

    if (milestone.date) {
      setRecordDate(new Date(milestone.date).toISOString().split("T")[0]);
    } else {
      setRecordDate("");
    }

    setRecordStatus(milestone.completed ? "Completed" : "In Progress");

    setRecordMentor(milestone.mentor);
    setRecordNotes(milestone.notes || "");
  }, [milestone]);

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    onClose();
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = () => {
    if (
      !milestone ||
      !recordTitle.trim() ||
      !recordDescription.trim() ||
      !recordMentor.trim()
    ) {
      return;
    }

    const data: UpdateDiscipleshipData = {
      type: recordType,
      title: recordTitle.trim(),
      description: recordDescription.trim(),
      date: recordDate || null,
      completed: recordStatus === "Completed",
      mentor: recordMentor.trim(),
      notes: recordNotes.trim(),
    };

    const updatedRecord: DiscipleshipRecord = {
      ...milestone,
      ...data,
      date: recordDate || null,
      completed: recordStatus === "Completed",
      updatedAt: new Date().toISOString(),
    };

    onSave(updatedRecord);
  };

  // =====================================================
  // DON'T RENDER
  // =====================================================

  if (!isOpen || !milestone) {
    return null;
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Discipleship Record
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Update this child's discipleship record.
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

        {/* FORM */}

        <div className="space-y-5 p-6">
          {/* Record Type */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Record Type
            </label>

            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* DATE + STATUS */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Date
              </label>

              <input
                type="date"
                value={recordDate}
                onChange={(e) => setRecordDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Status
              </label>

              <select
                value={recordStatus}
                onChange={(e) => setRecordStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Completed">Completed</option>

                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>

          {/* MENTOR */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Mentor
            </label>

            <select
              value={recordMentor}
              onChange={(e) => setRecordMentor(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="David Kamau">David Kamau</option>

              <option value="Sarah Wanjiku">Sarah Wanjiku</option>

              <option value="Peter Mwangi">Peter Mwangi</option>
            </select>
          </div>

          {/* NOTES */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Notes
            </label>

            <textarea
              value={recordNotes}
              onChange={(e) => setRecordNotes(e.target.value)}
              rows={3}
              placeholder="Add any additional notes..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* FOOTER */}

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
            disabled={
              !recordTitle.trim() ||
              !recordDescription.trim() ||
              !recordMentor.trim()
            }
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
