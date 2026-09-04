import api from "./api";

export type NoteType =
  | "GENERAL"
  | "PRAYER"
  | "PROGRESS"
  | "FOLLOW_UP";

export interface Note {
  id: string;
  title: string;
  content: string;
  author: string;
  role: string;
  date: string;
  type: NoteType;
  pinned: boolean;
  childId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  author: string;
  role: string;
  date?: string;
  type?: NoteType;
  pinned?: boolean;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  author?: string;
  role?: string;
  date?: string;
  type?: NoteType;
  pinned?: boolean;
}

/**
 * Get all notes for a child
 */
export const getNotes = async (childId: string): Promise<Note[]> => {
  const response = await api.get<Note[]>(
    `/children/${childId}/notes`,
  );

  return response.data;
};

/**
 * Get a single note
 */
export const getNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
};

/**
 * Create a new note for a child
 */
export const createNote = async (
  childId: string,
  data: CreateNoteData,
): Promise<Note> => {
  const response = await api.post<Note>(
    `/children/${childId}/notes`,
    data,
  );

  return response.data;
};

/**
 * Update an existing note
 */
export const updateNote = async (
  id: string,
  data: UpdateNoteData,
): Promise<Note> => {
  const response = await api.put<Note>(
    `/notes/${id}`,
    data,
  );

  return response.data;
};

/**
 * Delete a note
 */
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

/**
 * Pin / unpin a note
 */
export const toggleNotePin = async (
  id: string,
): Promise<Note> => {
  const response = await api.patch<Note>(
    `/notes/${id}/pin`,
  );

  return response.data;
};