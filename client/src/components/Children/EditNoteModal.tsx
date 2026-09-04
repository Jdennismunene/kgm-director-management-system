import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

import type {
  Note,
  NoteType,
  UpdateNoteData,
} from "../../services/noteService";

interface EditNoteModalProps {
  isOpen: boolean;
  note: Note | null;
  onClose: () => void;
  onSave: (updatedNote: UpdateNoteData) => void;
}

const EditNoteModal = ({
  isOpen,
  note,
  onClose,
  onSave,
}: EditNoteModalProps) => {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState<NoteType>("GENERAL");
  const [pinned, setPinned] = useState(false);

  // =====================================================
  // LOAD SELECTED NOTE
  // =====================================================

  useEffect(() => {
    if (!note) {
      return;
    }

    setTitle(note.title);
    setContent(note.content);
    setAuthor(note.author);
    setRole(note.role);
    setType(note.type);
    setPinned(note.pinned);
  }, [note]);

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSubmit = () => {
    if (!note) {
      return;
    }

    if (!title.trim() || !content.trim() || !author.trim() || !role.trim()) {
      return;
    }

    const updatedNote: UpdateNoteData = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      role: role.trim(),
      type,
      pinned,
    };

    onSave(updatedNote);
  };

  // =====================================================
  // DON'T RENDER WHEN CLOSED
  // =====================================================

  if (!isOpen || !note) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Note
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Update the selected note.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <div className="space-y-5 p-6">
          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Note Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Positive Participation"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Content */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Note
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Write the observation or information here..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm leading-5 text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Type */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Note Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value as NoteType)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900/30"
            >
              <option value="GENERAL">General</option>
              <option value="PRAYER">Prayer</option>
              <option value="PROGRESS">Progress</option>
              <option value="FOLLOW_UP">Follow-up</option>
            </select>
          </div>

          {/* Author + Role */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Author */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Author
              </label>

              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Sarah Wanjiku"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-900/30"
              />
            </div>

            {/* Role */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Role
              </label>

              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Sunday School Teacher"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-900/30"
              />
            </div>
          </div>

          {/* Pin Note */}

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Pin this note
              </p>

              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                Keep this note highlighted as important.
              </p>
            </div>
          </label>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              !title.trim() || !content.trim() || !author.trim() || !role.trim()
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

export default EditNoteModal;
