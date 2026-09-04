import prisma from "../lib/prisma.js";
import { createHistory } from "../utilis/historyHelper.js";
/**
 * Safely get a route parameter as a string.
 *
 * Express can type route parameters as:
 * string | string[] | undefined
 *
 * Prisma requires a plain string for IDs.
 */
const getParam = (value) => {
    return Array.isArray(value) ? value[0] : value;
};
/**
 * Allowed NoteType values from Prisma.
 */
const validNoteTypes = ["GENERAL", "PRAYER", "PROGRESS", "FOLLOW_UP"];
/**
 * Check whether a value is a valid NoteType.
 */
const isValidNoteType = (value) => {
    return (typeof value === "string" && validNoteTypes.includes(value));
};
/**
 * GET /api/children/:childId/notes
 *
 * Get all notes belonging to a child.
 */
export const getNotes = async (req, res) => {
    try {
        const childId = getParam(req.params.childId);
        if (!childId) {
            return res.status(400).json({
                message: "Child ID is required",
            });
        }
        const notes = await prisma.note.findMany({
            where: {
                childId,
            },
            orderBy: [
                {
                    pinned: "desc",
                },
                {
                    date: "desc",
                },
            ],
        });
        return res.status(200).json(notes);
    }
    catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({
            message: "Failed to fetch notes",
        });
    }
};
/**
 * GET /api/notes/:id
 *
 * Get a single note by ID.
 */
export const getNoteById = async (req, res) => {
    try {
        const id = getParam(req.params.id);
        if (!id) {
            return res.status(400).json({
                message: "Note ID is required",
            });
        }
        const note = await prisma.note.findUnique({
            where: {
                id,
            },
        });
        if (!note) {
            return res.status(404).json({
                message: "Note not found",
            });
        }
        return res.status(200).json(note);
    }
    catch (error) {
        console.error("Error fetching note:", error);
        return res.status(500).json({
            message: "Failed to fetch note",
        });
    }
};
/**
 * POST /api/children/:childId/notes
 *
 * Create a new note for a child.
 */
export const createNote = async (req, res) => {
    try {
        const childId = getParam(req.params.childId);
        const { title, content, author, role, date, type, pinned } = req.body;
        if (!childId) {
            return res.status(400).json({
                message: "Child ID is required",
            });
        }
        if (!title || !content || !author || !role) {
            return res.status(400).json({
                message: "Title, content, author and role are required",
            });
        }
        /**
         * Validate note type if supplied.
         */
        if (type !== undefined && !isValidNoteType(type)) {
            return res.status(400).json({
                message: "Invalid note type. Allowed values: GENERAL, PRAYER, PROGRESS, FOLLOW_UP",
            });
        }
        /**
         * Validate date if supplied.
         */
        let noteDate = new Date();
        if (date !== undefined) {
            noteDate = new Date(date);
            if (Number.isNaN(noteDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid note date",
                });
            }
        }
        /**
         * Make sure the child exists.
         */
        const child = await prisma.child.findUnique({
            where: {
                id: childId,
            },
        });
        if (!child) {
            return res.status(404).json({
                message: "Child not found",
            });
        }
        /**
         * Create note.
         */
        const note = await prisma.note.create({
            data: {
                title: String(title).trim(),
                content: String(content).trim(),
                author: String(author).trim(),
                role: String(role).trim(),
                date: noteDate,
                type: type ?? "GENERAL",
                pinned: pinned ?? false,
                childId,
            },
        });
        await createHistory({
            title: "Note added",
            description: `Note "${note.title}" was added to the child's records.`,
            type: "NOTE",
            user: note.author,
            childId: note.childId,
        });
        return res.status(201).json(note);
    }
    catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({
            message: "Failed to create note",
        });
    }
};
/**
 * PUT /api/notes/:id
 *
 * Update an existing note.
 */
export const updateNote = async (req, res) => {
    try {
        const id = getParam(req.params.id);
        const { title, content, author, role, date, type, pinned } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "Note ID is required",
            });
        }
        /**
         * Find existing note.
         */
        const existingNote = await prisma.note.findUnique({
            where: {
                id,
            },
        });
        if (!existingNote) {
            return res.status(404).json({
                message: "Note not found",
            });
        }
        /**
         * Validate note type if supplied.
         */
        if (type !== undefined && !isValidNoteType(type)) {
            return res.status(400).json({
                message: "Invalid note type. Allowed values: GENERAL, PRAYER, PROGRESS, FOLLOW_UP",
            });
        }
        /**
         * Validate date if supplied.
         */
        let parsedDate;
        if (date !== undefined) {
            parsedDate = new Date(date);
            if (Number.isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid note date",
                });
            }
        }
        /**
         * Update note.
         */
        const note = await prisma.note.update({
            where: {
                id,
            },
            data: {
                ...(title !== undefined && {
                    title: String(title).trim(),
                }),
                ...(content !== undefined && {
                    content: String(content).trim(),
                }),
                ...(author !== undefined && {
                    author: String(author).trim(),
                }),
                ...(role !== undefined && {
                    role: String(role).trim(),
                }),
                ...(parsedDate !== undefined && {
                    date: parsedDate,
                }),
                ...(type !== undefined && {
                    type,
                }),
                ...(pinned !== undefined && {
                    pinned: Boolean(pinned),
                }),
            },
        });
        await createHistory({
            title: "Note updated",
            description: `Note "${note.title}" was updated.`,
            type: "NOTE",
            user: note.author,
            childId: note.childId,
        });
        return res.status(200).json(note);
    }
    catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({
            message: "Failed to update note",
        });
    }
};
/**
 * DELETE /api/notes/:id
 *
 * Delete a note.
 */
export const deleteNote = async (req, res) => {
    try {
        const id = getParam(req.params.id);
        if (!id) {
            return res.status(400).json({
                message: "Note ID is required",
            });
        }
        /**
         * Check whether note exists.
         */
        const existingNote = await prisma.note.findUnique({
            where: {
                id,
            },
        });
        if (!existingNote) {
            return res.status(404).json({
                message: "Note not found",
            });
        }
        /**
         * Delete note.
         */
        await createHistory({
            title: "Note deleted",
            description: `Note "${existingNote.title}" was deleted.`,
            type: "NOTE",
            user: existingNote.author,
            childId: existingNote.childId,
        });
        await prisma.note.delete({
            where: {
                id,
            },
        });
        return res.status(200).json({
            message: "Note deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).json({
            message: "Failed to delete note",
        });
    }
};
/**
 * PATCH /api/notes/:id/pin
 *
 * Pin or unpin a note.
 */
export const toggleNotePin = async (req, res) => {
    try {
        const id = getParam(req.params.id);
        if (!id) {
            return res.status(400).json({
                message: "Note ID is required",
            });
        }
        /**
         * Find existing note.
         */
        const existingNote = await prisma.note.findUnique({
            where: {
                id,
            },
        });
        if (!existingNote) {
            return res.status(404).json({
                message: "Note not found",
            });
        }
        /**
         * Toggle pinned status.
         */
        const note = await prisma.note.update({
            where: {
                id,
            },
            data: {
                pinned: !existingNote.pinned,
            },
        });
        return res.status(200).json(note);
    }
    catch (error) {
        console.error("Error toggling note pin:", error);
        return res.status(500).json({
            message: "Failed to update note pin status",
        });
    }
};
