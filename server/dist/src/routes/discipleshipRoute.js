import { Router } from "express";
import { getDiscipleshipRecords, getDiscipleshipRecordById, createDiscipleshipRecord, updateDiscipleshipRecord, deleteDiscipleshipRecord, getSpiritualDevelopment, updateSpiritualDevelopment, } from "../controllers/discipleshipController.js";
const router = Router();
// =====================================================
// DISCIPLESHIP RECORDS
// =====================================================
router.get("/children/:childId/discipleship", getDiscipleshipRecords);
router.get("/children/:childId/discipleship/:id", getDiscipleshipRecordById);
router.post("/children/:childId/discipleship", createDiscipleshipRecord);
router.put("/children/:childId/discipleship/:id", updateDiscipleshipRecord);
router.delete("/children/:childId/discipleship/:id", deleteDiscipleshipRecord);
// =====================================================
// SPIRITUAL DEVELOPMENT
// =====================================================
router.get("/children/:childId/spiritual-development", getSpiritualDevelopment);
router.put("/children/:childId/spiritual-development", updateSpiritualDevelopment);
export default router;
