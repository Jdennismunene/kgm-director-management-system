import prisma from "../lib/prisma.js";
// =====================================================
// GET ALL TEACHERS
// =====================================================
export const getTeachers = async (req, res) => {
    try {
        const teachers = await prisma.teacher.findMany({
            include: {
                grades: true,
            },
            orderBy: {
                joinedDate: "desc",
            },
        });
        res.status(200).json(teachers);
    }
    catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({
            message: "Failed to fetch teachers",
        });
    }
};
// =====================================================
// GET SINGLE TEACHER
// =====================================================
export const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await prisma.teacher.findUnique({
            where: {
                id: String(id),
            },
            include: {
                grades: true,
                lessons: true,
                notes: true,
            },
        });
        if (!teacher) {
            res.status(404).json({
                message: "Teacher not found",
            });
            return;
        }
        res.status(200).json(teacher);
    }
    catch (error) {
        console.error("Error fetching teacher:", error);
        res.status(500).json({
            message: "Failed to fetch teacher",
        });
    }
};
// =====================================================
// CREATE TEACHER
// =====================================================
export const createTeacher = async (req, res) => {
    try {
        const { name, email, phone, status, joinedDate, gradeIds, } = req.body;
        if (!name || !email || !phone) {
            res.status(400).json({
                message: "Name, email and phone are required",
            });
            return;
        }
        const existingTeacher = await prisma.teacher.findUnique({
            where: {
                email,
            },
        });
        if (existingTeacher) {
            res.status(409).json({
                message: "A teacher with this email already exists",
            });
            return;
        }
        const teacher = await prisma.teacher.create({
            data: {
                name,
                email,
                phone,
                status: status ?? "ACTIVE",
                joinedDate: joinedDate
                    ? new Date(joinedDate)
                    : new Date(),
                grades: Array.isArray(gradeIds) && gradeIds.length > 0
                    ? {
                        connect: gradeIds.map((gradeId) => ({
                            id: gradeId,
                        })),
                    }
                    : undefined,
            },
            include: {
                grades: true,
            },
        });
        res.status(201).json(teacher);
    }
    catch (error) {
        console.error("Error creating teacher:", error);
        res.status(500).json({
            message: "Failed to create teacher",
        });
    }
};
// =====================================================
// UPDATE TEACHER
// =====================================================
export const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, status, joinedDate, gradeIds, } = req.body;
        const existingTeacher = await prisma.teacher.findUnique({
            where: {
                id: String(id),
            },
        });
        if (!existingTeacher) {
            res.status(404).json({
                message: "Teacher not found",
            });
            return;
        }
        const teacher = await prisma.teacher.update({
            where: {
                id: String(id),
            },
            data: {
                ...(name !== undefined && { name }),
                ...(email !== undefined && { email }),
                ...(phone !== undefined && { phone }),
                ...(status !== undefined && { status }),
                ...(joinedDate !== undefined && {
                    joinedDate: new Date(joinedDate),
                }),
                ...(Array.isArray(gradeIds) && {
                    grades: {
                        set: gradeIds.map((gradeId) => ({
                            id: gradeId,
                        })),
                    },
                }),
            },
            include: {
                grades: true,
            },
        });
        res.status(200).json(teacher);
    }
    catch (error) {
        console.error("Error updating teacher:", error);
        res.status(500).json({
            message: "Failed to update teacher",
        });
    }
};
// =====================================================
// DELETE TEACHER
// =====================================================
export const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const existingTeacher = await prisma.teacher.findUnique({
            where: {
                id: String(id),
            },
        });
        if (!existingTeacher) {
            res.status(404).json({
                message: "Teacher not found",
            });
            return;
        }
        await prisma.teacher.delete({
            where: {
                id: String(id),
            },
        });
        res.status(200).json({
            message: "Teacher deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting teacher:", error);
        res.status(500).json({
            message: "Failed to delete teacher",
        });
    }
};
