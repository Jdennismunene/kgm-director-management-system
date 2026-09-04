import { Router } from "express";

import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";

import uploadDocument from "../middlewares/uploadDocument.js";

const router = Router();

// Get all documents for a child
router.get(
  "/children/:childId/documents",
  getDocuments,
);

// Get one document
router.get(
  "/documents/:id",
  getDocumentById,
);

// Upload document
router.post(
  "/children/:childId/documents",
  uploadDocument.single("file"),
  createDocument,
);

// Update document / optionally replace file
router.put(
  "/documents/:id",
  uploadDocument.single("file"),
  updateDocument,
);

// Delete document
router.delete(
  "/documents/:id",
  deleteDocument,
);

export default router;