import { FileText, Pencil, Pin, Trash2, UserRound } from "lucide-react";

import type { Note } from "./Notes";

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void;
}

const NotesList = ({
  notes,
  onEdit,
  onDelete,
  onTogglePin,
}: NotesListProps) => {
  // =====================================================
  // NOTE TYPE COLORS
  // =====================================================

  const getTypeStyles = (type: Note["type"]) => {
    switch (type) {
      case "Prayer":
        return "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";

      case "Progress":
        return "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400";

      case "Follow-up":
        return "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";

      case "General":
      default:
        return "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <FileText size={17} className="text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Child Notes
            </h3>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Recent observations and important information
            </p>
          </div>
        </div>

        <span className="text-xs text-gray-400 dark:text-gray-500">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </div>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <FileText size={22} className="text-gray-400 dark:text-gray-300" />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            No notes yet
          </h4>

          <p className="mt-1 max-w-sm text-xs text-gray-500 dark:text-gray-400">
            There are currently no notes recorded for this child.
          </p>
        </div>
      ) : (
        /* =================================================
           NOTES
        ================================================= */

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-5 transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
            >
              <div className="flex gap-4">
                {/* =================================================
                    ICON
                ================================================= */}

                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 sm:flex dark:bg-gray-700">
                  <FileText
                    size={19}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="min-w-0 flex-1">
                  {/* Title + Type + Pin */}

                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {note.title}
                      </h4>

                      {note.pinned && (
                        <Pin
                          size={14}
                          className="shrink-0 text-yellow-500"
                          fill="currentColor"
                        />
                      )}
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getTypeStyles(
                        note.type,
                      )}`}
                    >
                      {note.type}
                    </span>
                  </div>

                  {/* Note Content */}

                  <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {note.content}
                  </p>

                  {/* Author Information */}

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                        <UserRound
                          size={14}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>

                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                        {note.author}
                      </span>
                    </div>

                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {note.role}
                    </span>

                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {note.date}
                    </span>
                  </div>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                    {/* Pin / Unpin */}

                    <button
                      type="button"
                      onClick={() => onTogglePin(note.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                        note.pinned
                          ? "border-yellow-200 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Pin
                        size={14}
                        fill={note.pinned ? "currentColor" : "none"}
                      />

                      {note.pinned ? "Unpin" : "Pin"}
                    </button>

                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() => onEdit(note)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() => onDelete(note.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =================================================
          FOOTER
      ================================================= */}

      {notes.length > 0 && (
        <div className="border-t border-gray-100 px-5 py-3 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Showing all {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesList;
