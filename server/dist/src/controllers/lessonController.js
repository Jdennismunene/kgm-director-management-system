import prisma from "../lib/prisma.js";
import { createHistory } from "../utilis/historyHelper.js";
// ============================================
// GET CHILD LESSONS
// GET /api/lessons/child/:childId
// ============================================
export const getChildLessons = async (req, res) => {
    try {
        const childId = req.params.childId;
        const lessons = await prisma.lesson.findMany({
            where: {
                childId,
            },
            orderBy: {
                date: "desc",
            },
        });
        return res.status(200).json({
            success: true,
            data: lessons,
        });
    }
    catch (error) {
        console.error("Error fetching child lessons:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch child lessons",
        });
    }
};
// ============================================
// GET LESSON BY ID
// GET /api/lessons/:id
// ============================================
export const getLessonById = async (req, res) => {
    try {
        const id = req.params.id;
        const lesson = await prisma.lesson.findUnique({
            where: {
                id,
            },
        });
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: lesson,
        });
    }
    catch (error) {
        console.error("Error fetching lesson:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch lesson",
        });
    }
};
// ============================================
// CREATE LESSON
// POST /api/lessons
// ============================================
export const createLesson = async (req, res) => {
    try {
        const { childId, title, category, date, progress, status, score, teacher } = req.body;
        if (!childId ||
            !title ||
            !category ||
            !date ||
            progress === undefined ||
            !status ||
            !teacher) {
            return res.status(400).json({
                success: false,
                message: "Missing required lesson fields",
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
        if (!["COMPLETED", "IN_PROGRESS"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lesson status",
            });
        }
        if (typeof progress !== "number" || progress < 0 || progress > 100) {
            return res.status(400).json({
                success: false,
                message: "Progress must be between 0 and 100",
            });
        }
        if (score !== undefined &&
            score !== null &&
            (typeof score !== "number" || score < 0 || score > 100)) {
            return res.status(400).json({
                success: false,
                message: "Score must be between 0 and 100",
            });
        }
        const lesson = await prisma.lesson.create({
            data: {
                childId,
                title: title.trim(),
                category,
                date: new Date(date),
                progress,
                status,
                score: status === "COMPLETED" ? (score ?? null) : null,
                teacher: teacher.trim(),
            },
        });
        await createHistory({
            title: "Lesson recorded",
            description: `Lesson "${title.trim()}" was recorded.`,
            type: "LESSON",
            user: teacher.trim(),
            childId,
        });
        return res.status(201).json({
            success: true,
            message: "Lesson recorded successfully",
            data: lesson,
        });
    }
    catch (error) {
        console.error("Error creating lesson:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create lesson",
        });
    }
};
// ============================================
// UPDATE LESSON
// PUT /api/lessons/:id
// ============================================
export const updateLesson = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, category, date, progress, status, score, teacher } = req.body;
        const existingLesson = await prisma.lesson.findUnique({
            where: {
                id,
            },
        });
        if (!existingLesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            });
        }
        if (progress !== undefined &&
            (typeof progress !== "number" || progress < 0 || progress > 100)) {
            return res.status(400).json({
                success: false,
                message: "Progress must be between 0 and 100",
            });
        }
        if (score !== undefined &&
            score !== null &&
            (typeof score !== "number" || score < 0 || score > 100)) {
            return res.status(400).json({
                success: false,
                message: "Score must be between 0 and 100",
            });
        }
        if (status !== undefined &&
            !["COMPLETED", "IN_PROGRESS"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lesson status",
            });
        }
        const finalStatus = status ?? existingLesson.status;
        const lesson = await prisma.lesson.update({
            where: {
                id,
            },
            data: {
                ...(title !== undefined && {
                    title: title.trim(),
                }),
                ...(category !== undefined && {
                    category,
                }),
                ...(date !== undefined && {
                    date: new Date(date),
                }),
                ...(progress !== undefined && {
                    progress,
                }),
                ...(status !== undefined && {
                    status,
                }),
                score: finalStatus === "COMPLETED" ? (score ?? existingLesson.score) : null,
                ...(teacher !== undefined && {
                    teacher: teacher.trim(),
                }),
            },
        });
        await createHistory({
            title: "Lesson updated",
            description: `Lesson "${lesson.title}" was updated.`,
            type: "LESSON",
            user: lesson.teacher,
            childId: lesson.childId,
        });
        return res.status(200).json({
            success: true,
            message: "Lesson updated successfully",
            data: lesson,
        });
    }
    catch (error) {
        console.error("Error updating lesson:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update lesson",
        });
    }
};
// ============================================
// DELETE LESSON
// DELETE /api/lessons/:id
// ============================================
export const deleteLesson = async (req, res) => {
    try {
        const id = req.params.id;
        const existingLesson = await prisma.lesson.findUnique({
            where: {
                id,
            },
        });
        if (!existingLesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found",
            });
        }
        await createHistory({
            title: "Lesson deleted",
            description: `Lesson "${existingLesson.title}" was deleted.`,
            type: "LESSON",
            user: existingLesson.teacher,
            childId: existingLesson.childId,
        });
        await prisma.lesson.delete({
            where: {
                id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Lesson deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting lesson:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete lesson",
        });
    }
};
