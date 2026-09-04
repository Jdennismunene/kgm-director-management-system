import { Router } from "express";

import {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController.js";

const router = Router();

/**
 * GET /api/branches
 */
router.get("/", getBranches);

/**
 * GET /api/branches/:id
 */
router.get("/:id", getBranchById);

/**
 * POST /api/branches
 */
router.post("/", createBranch);

/**
 * PUT /api/branches/:id
 */
router.put("/:id", updateBranch);

/**
 * DELETE /api/branches/:id
 */
router.delete("/:id", deleteBranch);

export default router;