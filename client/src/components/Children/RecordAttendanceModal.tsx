import { X } from "lucide-react";
import { useState } from "react";

import type {
  AttendanceStatus,
  CreateAttendanceData,
} from "../../services/attendanceService";

interface RecordAttendanceModalProps {
  childId: string;
  onClose: () => void;
  onSave: (data: CreateAttendanceData) => Promise<void>;
}

const RecordAttendanceModal = ({
  childId,
  onClose,
  onSave,
}: RecordAttendanceModalProps) => {
  const [date, setDate] = useState("");
  const [program, setProgram] = useState("Sunday School");
  const [status, setStatus] = useState<AttendanceStatus>("PRESENT");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!date) {
      setError("Please select an attendance date.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await onSave({
        childId,
        date,
        program,
        status,
        time: status === "ABSENT" ? null : time || null,
        notes: notes.trim() || null,
      });
    } catch (error) {
      console.error("Failed to save attendance:", error);

      setError(
        "Failed to save attendance. Please check your connection and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Record Attendance
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Add an attendance record for this child.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Error */}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          {/* =================================================
              DATE
          ================================================= */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              disabled={saving}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* =================================================
              PROGRAM
          ================================================= */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Program
            </label>

            <select
              value={program}
              onChange={(event) => setProgram(event.target.value)}
              disabled={saving}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="Sunday School">Sunday School</option>

              <option value="Children's Service">Children's Service</option>

              <option value="Bible Study">Bible Study</option>

              <option value="Discipleship">Discipleship</option>
            </select>
          </div>

          {/* =================================================
              STATUS
          ================================================= */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as AttendanceStatus)
              }
              disabled={saving}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="PRESENT">Present</option>

              <option value="LATE">Late</option>

              <option value="ABSENT">Absent</option>
            </select>
          </div>

          {/* =================================================
              ARRIVAL TIME
          ================================================= */}

          {status !== "ABSENT" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Arrival Time
              </label>

              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                disabled={saving}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          )}

          {/* =================================================
              NOTES
          ================================================= */}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Notes
              <span className="ml-1 text-xs font-normal text-gray-400">
                (Optional)
              </span>
            </label>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              disabled={saving}
              placeholder="Add any relevant notes..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordAttendanceModal;
