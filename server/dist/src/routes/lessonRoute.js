import { Router } from "express";
import { getChildLessons, getLessonById, createLesson, updateLesson, deleteLesson, } from "../controllers/lessonController.js";
const router = Router();
// GET /api/lessons/child/:childId
router.get("/child/:childId", getChildLessons);
// GET /api/lessons/:id
router.get("/:id", getLessonById);
// POST /api/lessons
router.post("/", createLesson);
// PUT /api/lessons/:id
router.put("/:id", updateLesson);
// DELETE /api/lessons/:id
router.delete("/:id", deleteLesson);
export default router;
