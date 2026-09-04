import { Router } from "express";

import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  toggleNotePin,
} from "../controllers/noteController.js";

const router = Router();

// Get all notes for a child
router.get("/children/:childId/notes", getNotes);

// Get a single note
router.get("/notes/:id", getNoteById);

// Create a note for a child
router.post("/children/:childId/notes", createNote);

// Update a note
router.put("/notes/:id", updateNote);

// Delete a note
router.delete("/notes/:id", deleteNote);

// Pin / unpin a note
router.patch("/notes/:id/pin", toggleNotePin);

export default router;