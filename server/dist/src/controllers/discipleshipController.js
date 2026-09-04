import prisma from "../lib/prisma.js";
import { createHistory } from "../utilis/historyHelper.js";
// =====================================================
// GET ALL DISCIPLESHIP RECORDS FOR A CHILD
// =====================================================
export const getDiscipleshipRecords = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const records = await prisma.discipleshipRecord.findMany({
            where: {
                childId,
            },
            orderBy: {
                date: "desc",
            },
        });
        return res.status(200).json({
            success: true,
            data: records,
        });
    }
    catch (error) {
        console.error("Error fetching discipleship records:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch discipleship records",
        });
    }
};
// =====================================================
// GET SINGLE DISCIPLESHIP RECORD
// =====================================================
export const getDiscipleshipRecordById = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const id = String(req.params.id);
        const record = await prisma.discipleshipRecord.findFirst({
            where: {
                id,
                childId,
            },
        });
        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Discipleship record not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: record,
        });
    }
    catch (error) {
        console.error("Error fetching discipleship record:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch discipleship record",
        });
    }
};
// =====================================================
// CREATE DISCIPLESHIP RECORD
// =====================================================
export const createDiscipleshipRecord = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const { type, title, description, date, completed, mentor, notes } = req.body;
        if (!type || !title || !description || !mentor) {
            return res.status(400).json({
                success: false,
                message: "Type, title, description and mentor are required",
            });
        }
        const child = await prisma.child.findUnique({
            where: {
                id: childId,
            },
        });
        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Child not found",
            });
        }
        const record = await prisma.discipleshipRecord.create({
            data: {
                childId,
                type,
                title,
                description,
                date: date ? new Date(date) : null,
                completed: completed ?? false,
                mentor,
                notes: notes ?? "",
            },
        });
        await createHistory({
            title: "Discipleship record created",
            description: `Discipleship milestone "${record.title}" was recorded.`,
            type: "DISCIPLESHIP",
            user: record.mentor,
            childId: record.childId,
        });
        return res.status(201).json({
            success: true,
            message: "Discipleship record created successfully",
            data: record,
        });
    }
    catch (error) {
        console.error("Error creating discipleship record:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create discipleship record",
        });
    }
};
// =====================================================
// UPDATE DISCIPLESHIP RECORD
// =====================================================
export const updateDiscipleshipRecord = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const id = String(req.params.id);
        const { type, title, description, date, completed, mentor, notes } = req.body;
        const existingRecord = await prisma.discipleshipRecord.findFirst({
            where: {
                id,
                childId,
            },
        });
        if (!existingRecord) {
            return res.status(404).json({
                success: false,
                message: "Discipleship record not found",
            });
        }
        const record = await prisma.discipleshipRecord.update({
            where: {
                id,
            },
            data: {
                type,
                title,
                description,
                date: date ? new Date(date) : null,
                completed,
                mentor,
                notes,
            },
        });
        await createHistory({
            title: "Discipleship record updated",
            description: `Discipleship milestone "${record.title}" was updated.`,
            type: "DISCIPLESHIP",
            user: record.mentor,
            childId: record.childId,
        });
        return res.status(200).json({
            success: true,
            message: "Discipleship record updated successfully",
            data: record,
        });
    }
    catch (error) {
        console.error("Error updating discipleship record:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update discipleship record",
        });
    }
};
// =====================================================
// DELETE DISCIPLESHIP RECORD
// =====================================================
export const deleteDiscipleshipRecord = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const id = String(req.params.id);
        const existingRecord = await prisma.discipleshipRecord.findFirst({
            where: {
                id,
                childId,
            },
        });
        if (!existingRecord) {
            return res.status(404).json({
                success: false,
                message: "Discipleship record not found",
            });
        }
        await createHistory({
            title: "Discipleship record deleted",
            description: `Discipleship milestone "${existingRecord.title}" was deleted.`,
            type: "DISCIPLESHIP",
            user: existingRecord.mentor,
            childId: existingRecord.childId,
        });
        await prisma.discipleshipRecord.delete({
            where: {
                id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Discipleship record deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting discipleship record:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete discipleship record",
        });
    }
};
// =====================================================
// GET SPIRITUAL DEVELOPMENT
// =====================================================
export const getSpiritualDevelopment = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const development = await prisma.spiritualDevelopment.findUnique({
            where: {
                childId,
            },
        });
        return res.status(200).json({
            success: true,
            data: development,
        });
    }
    catch (error) {
        console.error("Error fetching spiritual development:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch spiritual development",
        });
    }
};
// =====================================================
// CREATE / UPDATE SPIRITUAL DEVELOPMENT
// =====================================================
export const updateSpiritualDevelopment = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const { bibleKnowledge, prayerLife, christianCharacter } = req.body;
        const child = await prisma.child.findUnique({
            where: {
                id: childId,
            },
        });
        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Child not found",
            });
        }
        const development = await prisma.spiritualDevelopment.upsert({
            where: {
                childId,
            },
            update: {
                bibleKnowledge,
                prayerLife,
                christianCharacter,
            },
            create: {
                childId,
                bibleKnowledge: bibleKnowledge ?? 0,
                prayerLife: prayerLife ?? 0,
                christianCharacter: christianCharacter ?? 0,
            },
        });
        await createHistory({
            title: "Spiritual development updated",
            description: "The child's spiritual development assessment was updated.",
            type: "DISCIPLESHIP",
            user: "System",
            childId,
        });
        return res.status(200).json({
            success: true,
            message: "Spiritual development updated successfully",
            data: development,
        });
    }
    catch (error) {
        console.error("Error updating spiritual development:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update spiritual development",
        });
    }
};
