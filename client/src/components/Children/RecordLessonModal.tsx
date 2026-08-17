import { X, Save, BookOpen } from "lucide-react";
import { useState } from "react";

export interface LessonRecord {
  id: number;
  title: string;
  category: string;
  date: string;
  progress: number;
  status: "Completed" | "In Progress";
  score: string;
  teacher: string;
}

interface RecordLessonModalProps {
  onClose: () => void;
  onSave: (lesson: Omit<LessonRecord, "id">) => void;
}

const RecordLessonModal = ({ onClose, onSave }: RecordLessonModalProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bible Study");
  const [date, setDate] = useState("");
  const [progress, setProgress] = useState(100);
  const [status, setStatus] = useState<"Completed" | "In Progress">(
    "Completed",
  );
  const [score, setScore] = useState("");
  const [teacher, setTeacher] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !date || !teacher.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      category,
      date,
      progress,
      status,
      score: status === "Completed" ? `${score}%` : "-",
      teacher: teacher.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <BookOpen
                size={18}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Record Lesson
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Add a lesson to this child's learning record.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            {/* Lesson Title */}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                Lesson Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Knowing God"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Category + Date */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                >
                  <option value="Bible Study">Bible Study</option>

                  <option value="Discipleship">Discipleship</option>

                  <option value="Christian Living">Christian Living</option>

                  <option value="Prayer">Prayer</option>

                  <option value="Character">Character</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Lesson Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Teacher */}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                Conducted By
              </label>

              <input
                type="text"
                value={teacher}
                onChange={(event) => setTeacher(event.target.value)}
                placeholder="e.g. David Kamau"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "Completed" | "In Progress")
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              >
                <option value="Completed">Completed</option>

                <option value="In Progress">In Progress</option>
              </select>
            </div>

            {/* Progress */}

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </label>

                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {progress}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={(event) => setProgress(Number(event.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Score */}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                Score
                {status !== "Completed" && (
                  <span className="ml-1 text-gray-400">(optional)</span>
                )}
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  disabled={status !== "Completed"}
                  onChange={(event) => setScore(event.target.value)}
                  placeholder="e.g. 92"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:disabled:bg-gray-700"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Save size={16} />
              Save Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordLessonModal;
