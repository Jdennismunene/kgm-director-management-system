import { CheckCircle2, FileText, Plus, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import type { Parent } from "../../data/parentsData";

interface ParentNotesProps {
  parent: Parent;
}

interface ParentNote {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const ParentNotes = ({ parent }: ParentNotesProps) => {
  const [notes, setNotes] = useState<ParentNote[]>([
    {
      id: 1,
      title: "Parent Follow-up",
      content:
        "Parent was contacted regarding the child's attendance and participation.",
      author: "Admin",
      date: "Aug 18, 2026",
    },
    {
      id: 2,
      title: "General Note",
      content: "Parent is actively involved in the child's church activities.",
      author: "Sarah Wanjiku",
      date: "Aug 12, 2026",
    },
  ]);

  // Add note form
  const [showAddNote, setShowAddNote] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Notification
  const [notification, setNotification] = useState<string | null>(null);

  // Automatically hide notification
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  const resetNoteForm = () => {
    setTitle("");
    setContent("");
    setShowAddNote(false);
  };

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote: ParentNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: "Admin",
      date: "Aug 20, 2026",
    };

    setNotes((prev) => [newNote, ...prev]);

    resetNoteForm();

    setNotification(`Note added successfully for ${parent.name}.`);
  };

  return (
    <div className="relative space-y-6">
      {/* Success Notification */}
      {notification && (
        <div className="fixed right-6 top-6 z-100 w-[calc(100%-3rem)] max-w-sm">
          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-white p-4 shadow-lg dark:border-green-900/50 dark:bg-gray-800">
            {/* Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 size={19} />
            </div>

            {/* Message */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Success
              </p>

              <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
                {notification}
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notes
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Internal notes and important information about {parent.name}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddNote(true)}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <Plus size={17} />
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {showAddNote && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                Add New Note
              </h4>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Add an internal note for this parent.
              </p>
            </div>

            <button
              type="button"
              onClick={resetNoteForm}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Note Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Content */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Note
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Write your note..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetNoteForm}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddNote}
                disabled={!title.trim() || !content.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle2 size={16} />
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-teal-600 dark:text-teal-400" />

            <h3 className="font-semibold text-gray-900 dark:text-white">
              Parent Notes
            </h3>

            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
              {notes.length}
            </span>
          </div>
        </div>

        {/* Notes */}
        {notes.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {notes.map((note) => (
              <div key={note.id} className="px-6 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {note.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {note.content}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                    {note.date}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <UserRound size={13} />
                  </div>

                  <span>
                    Added by <strong>{note.author}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <FileText
              size={32}
              className="mx-auto text-gray-300 dark:text-gray-600"
            />

            <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              No notes yet
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add a note to keep important information about this parent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentNotes;
