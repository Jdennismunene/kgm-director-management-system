import { Router } from "express";

import {
  getParents,
  getParentById,
  createParent,
  updateParent,
  updateParentStatus,
  deleteParent,
} from "../controllers/parentController.js";

const router = Router();

/**
 * GET /api/parents
 */
router.get("/", getParents);

/**
 * GET /api/parents/:id
 */
router.get("/:id", getParentById);

/**
 * POST /api/parents
 */
router.post("/", createParent);

/**
 * PUT /api/parents/:id
 */
router.put("/:id", updateParent);

/**
 * PATCH /api/parents/:id/status
 */
router.patch("/:id/status", updateParentStatus);

/**
 * DELETE /api/parents/:id
 */
router.delete("/:id", deleteParent);

export default router;