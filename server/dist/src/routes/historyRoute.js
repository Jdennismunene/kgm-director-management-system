import { Router } from "express";
import { getHistory, getHistoryById, } from "../controllers/historyController.js";
const router = Router();
// GET /api/children/:childId/history
router.get("/children/:childId/history", getHistory);
// GET /api/history/:id
router.get("/history/:id", getHistoryById);
export default router;
