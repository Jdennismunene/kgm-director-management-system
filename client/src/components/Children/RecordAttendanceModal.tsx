import { X } from "lucide-react";
import { useState } from "react";

export type AttendanceStatus = "Present" | "Absent" | "Late";

export interface AttendanceRecord {
  id: number;
  date: string;
  program: string;
  status: AttendanceStatus;
  time: string;
  notes?: string;
}

interface RecordAttendanceModalProps {
  onClose: () => void;
  onSave: (record: Omit<AttendanceRecord, "id">) => void;
}

const RecordAttendanceModal = ({
  onClose,
  onSave,
}: RecordAttendanceModalProps) => {
  const [date, setDate] = useState("");
  const [program, setProgram] = useState("Sunday School");
  const [status, setStatus] = useState<AttendanceStatus>("Present");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!date) return;

    const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    );

    onSave({
      date: formattedDate,
      program,
      status,
      time: status === "Absent" ? "-" : time || "-",
      notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
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
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Program */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Program
            </label>

            <select
              value={program}
              onChange={(event) => setProgram(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="Sunday School">Sunday School</option>

              <option value="Children's Service">Children's Service</option>

              <option value="Bible Study">Bible Study</option>

              <option value="Discipleship">Discipleship</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as AttendanceStatus)
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          {/* Arrival Time */}
          {status !== "Absent" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Arrival Time
              </label>

              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          )}

          {/* Notes */}
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
              placeholder="Add any relevant notes..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Save Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordAttendanceModal;
