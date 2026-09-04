import { useEffect, useMemo, useState } from "react";
import { Clock3, FileText, Pin, Plus } from "lucide-react";

import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";
import NotesList from "./NotesList";

import {
  getNotes,
  deleteNote,
  toggleNotePin,
  updateNote,
  createNote,
  type Note,
  type CreateNoteData,
  type UpdateNoteData,
} from "../../services/noteService";

interface NotesProps {
  childId: string;
}

const Notes = ({ childId }: NotesProps) => {
  // =====================================================
  // NOTES DATA
  // =====================================================

  const [notes, setNotes] = useState<Note[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // =====================================================
  // LOAD NOTES
  // =====================================================

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getNotes(childId);

      setNotes(data);
    } catch (error) {
      console.error("Failed to load notes:", error);

      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!childId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    loadNotes();
  }, [childId]);

  // =====================================================
  // SUMMARY DATA
  // =====================================================

  const totalNotes = notes.length;

  const pinnedNotes = useMemo(
    () => notes.filter((note) => note.pinned).length,
    [notes],
  );

  /**
   * For now, Recent Notes means all notes
   * currently loaded for this child.
   */
  const recentNotes = notes.length;

  // =====================================================
  // ADD NOTE
  // =====================================================

  const handleAddNote = async (newNote: CreateNoteData) => {
    try {
      setError(null);

      const createdNote = await createNote(childId, newNote);

      setNotes((currentNotes) => [createdNote, ...currentNotes]);

      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create note:", error);

      setError("Failed to create note. Please try again.");
    }
  };

  // =====================================================
  // EDIT NOTE
  // =====================================================

  const handleOpenEdit = (note: Note) => {
    setEditingNote(note);
    setShowEditModal(true);
  };

  const handleEditNote = async (updatedData: UpdateNoteData) => {
    if (!editingNote) return;

    try {
      setError(null);

      const updatedNote = await updateNote(editingNote.id, updatedData);

      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note,
        ),
      );

      setEditingNote(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update note:", error);

      setError("Failed to update note. Please try again.");
    }
  };

  // =====================================================
  // DELETE NOTE
  // =====================================================

  const handleDeleteNote = async (id: string) => {
    const note = notes.find((item) => item.id === id);

    if (!note) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${note.title}"?`,
    );

    if (!confirmed) return;

    try {
      setError(null);

      await deleteNote(id);

      setNotes((currentNotes) => currentNotes.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);

      setError("Failed to delete note. Please try again.");
    }
  };

  // =====================================================
  // PIN / UNPIN NOTE
  // =====================================================

  const handleTogglePin = async (id: string) => {
    try {
      setError(null);

      const updatedNote = await toggleNotePin(id);

      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note,
        ),
      );
    } catch (error) {
      console.error("Failed to update note pin:", error);

      setError("Failed to update note pin status. Please try again.");
    }
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
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

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

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading notes...
            </p>
          </div>
        ) : notes.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <FileText size={32} className="mx-auto text-gray-400" />

            <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
              No notes yet
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add the first note for this child.
            </p>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              Add Note
            </button>
          </div>
        ) : (
          <NotesList
            notes={notes}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        )}
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
