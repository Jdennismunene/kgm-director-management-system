import { Router } from "express";

import {
  getChildren,
  getChildById,
  createChild,
  updateChild,
  updateChildStatus,
  deleteChild,
} from "../controllers/childController.js";

const router = Router();

/**
 * GET /api/children
 * Get all children
 */
router.get("/", getChildren);

/**
 * GET /api/children/:id
 * Get one child
 */
router.get("/:id", getChildById);

/**
 * POST /api/children
 * Create a new child
 */
router.post("/", createChild);

/**
 * PUT /api/children/:id
 * Update a child
 */
router.put("/:id", updateChild);

/**
 * PATCH /api/children/:id/status
 * Activate/deactivate a child
 */
router.patch("/:id/status", updateChildStatus);

/**
 * DELETE /api/children/:id
 * Delete a child
 */
router.delete("/:id", deleteChild);

export default router;