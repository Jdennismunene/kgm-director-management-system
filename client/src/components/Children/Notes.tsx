import { useMemo, useState } from "react";
import { Clock3, FileText, Pin, Plus } from "lucide-react";

import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";
import NotesList from "./NotesList";

export interface Note {
  id: number;
  title: string;
  content: string;
  author: string;
  role: string;
  date: string;
  type: "General" | "Prayer" | "Progress" | "Follow-up";
  pinned: boolean;
}

const Notes = () => {
  // =====================================================
  // NOTES DATA
  // =====================================================

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Positive Participation",
      content:
        "Brian participated actively during the Bible study session and demonstrated a good understanding of the lesson.",
      author: "Sarah Wanjiku",
      role: "Sunday School Teacher",
      date: "Aug 9, 2026",
      type: "General",
      pinned: true,
    },
    {
      id: 2,
      title: "Prayer Request",
      content:
        "Parent requested that the ministry team remember the family in prayer during the coming week.",
      author: "David Kamau",
      role: "Children's Ministry Mentor",
      date: "Aug 2, 2026",
      type: "Prayer",
      pinned: false,
    },
    {
      id: 3,
      title: "Academic Progress",
      content:
        "Child continues to show good progress in class and is becoming more confident when answering questions.",
      author: "Mary Njeri",
      role: "Class Teacher",
      date: "Jul 26, 2026",
      type: "Progress",
      pinned: false,
    },
    {
      id: 4,
      title: "Follow-up Required",
      content:
        "Follow up with the parent regarding participation in the upcoming children's retreat.",
      author: "David Kamau",
      role: "Children's Ministry Mentor",
      date: "Jul 19, 2026",
      type: "Follow-up",
      pinned: false,
    },
  ]);

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // =====================================================
  // SUMMARY DATA
  // =====================================================

  const totalNotes = notes.length;

  const pinnedNotes = useMemo(
    () => notes.filter((note) => note.pinned).length,
    [notes],
  );

  // For now, "Recent Notes" represents the notes
  // currently displayed in this child record.
  const recentNotes = notes.length;

  // =====================================================
  // ADD NOTE
  // =====================================================

  const handleAddNote = (newNote: Note) => {
    setNotes((currentNotes) => [newNote, ...currentNotes]);

    setShowAddModal(false);
  };

  // =====================================================
  // EDIT NOTE
  // =====================================================

  const handleOpenEdit = (note: Note) => {
    setEditingNote(note);
    setShowEditModal(true);
  };

  const handleEditNote = (updatedNote: Note) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      ),
    );

    setEditingNote(null);
    setShowEditModal(false);
  };

  // =====================================================
  // DELETE NOTE
  // =====================================================

  const handleDeleteNote = (id: number) => {
    const note = notes.find((item) => item.id === id);

    if (!note) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${note.title}"?`,
    );

    if (!confirmed) return;

    setNotes((currentNotes) => currentNotes.filter((item) => item.id !== id));
  };

  // =====================================================
  // PIN / UNPIN NOTE
  // =====================================================

  const handleTogglePin = (id: number) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note,
      ),
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <div className="mt-5 space-y-5">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notes
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View important notes, observations, and follow-ups for this child.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Plus size={17} />
            Add Note
          </button>
        </div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Notes */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Total Notes
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {totalNotes}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <FileText
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Pinned */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Pinned Notes
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {pinnedNotes}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
                <Pin
                  size={20}
                  className="text-yellow-600 dark:text-yellow-400"
                />
              </div>
            </div>
          </div>

          {/* Recent */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Recent Notes
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {recentNotes}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                <Clock3
                  size={20}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            NOTES LIST
        ================================================= */}

        <NotesList
          notes={notes}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteNote}
          onTogglePin={handleTogglePin}
        />
      </div>

      {/* =================================================
          MODALS
      ================================================= */}

      <AddNoteModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddNote}
      />

      <EditNoteModal
        isOpen={showEditModal}
        note={editingNote}
        onClose={() => {
          setEditingNote(null);
          setShowEditModal(false);
        }}
        onSave={handleEditNote}
      />
    </>
  );
};

export default Notes;
