import { Router } from "express";
import { getChildAttendance, getAttendanceById, createAttendance, updateAttendance, deleteAttendance, } from "../controllers/attendanceController.js";
const router = Router();
// Get attendance for a specific child
router.get("/child/:childId", getChildAttendance);
// Get one attendance record
router.get("/:id", getAttendanceById);
// Create attendance
router.post("/", createAttendance);
// Update attendance
router.put("/:id", updateAttendance);
// Delete attendance
router.delete("/:id", deleteAttendance);
export default router;
