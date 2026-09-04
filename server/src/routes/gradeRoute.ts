import { Router } from "express";

import {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  updateGradeStatus,
  deleteGrade,
} from "../controllers/gradeController.js";

const router = Router();

/**
 * GET /api/grades
 */
router.get("/", getGrades);

/**
 * GET /api/grades/:id
 */
router.get("/:id", getGradeById);

/**
 * POST /api/grades
 */
router.post("/", createGrade);

/**
 * PUT /api/grades/:id
 */
router.put("/:id", updateGrade);

/**
 * PATCH /api/grades/:id/status
 */
router.patch("/:id/status", updateGradeStatus);

/**
 * DELETE /api/grades/:id
 */
router.delete("/:id", deleteGrade);

export default router;