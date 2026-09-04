import prisma from "../lib/prisma.js";
/**
 * GET /api/grades
 * Get all grades
 */
export const getGrades = async (_req, res) => {
    try {
        const grades = await prisma.grade.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                _count: {
                    select: {
                        children: true,
                    },
                },
            },
        });
        return res.status(200).json({
            success: true,
            count: grades.length,
            data: grades,
        });
    }
    catch (error) {
        console.error("Error fetching grades:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch grades",
        });
    }
};
/**
 * GET /api/grades/:id
 * Get one grade
 */
export const getGradeById = async (req, res) => {
    try {
        const { id } = req.params;
        const gradeId = Array.isArray(id) ? id[0] : id;
        const grade = await prisma.grade.findUnique({
            where: {
                id: gradeId,
            },
            include: {
                children: {
                    include: {
                        parent: true,
                        branch: true,
                    },
                    orderBy: {
                        name: "asc",
                    },
                },
                _count: {
                    select: {
                        children: true,
                    },
                },
            },
        });
        if (!grade) {
            return res.status(404).json({
                success: false,
                message: "Grade not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: grade,
        });
    }
    catch (error) {
        console.error("Error fetching grade:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch grade",
        });
    }
};
/**
 * POST /api/grades
 * Create a new grade
 */
export const createGrade = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Grade name is required",
            });
        }
        const existingGrade = await prisma.grade.findUnique({
            where: {
                name: name.trim(),
            },
        });
        if (existingGrade) {
            return res.status(409).json({
                success: false,
                message: "A grade with this name already exists",
            });
        }
        const grade = await prisma.grade.create({
            data: {
                name: name.trim(),
                description: description !== undefined &&
                    description !== null &&
                    String(description).trim() !== ""
                    ? String(description).trim()
                    : null,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Grade created successfully",
            data: grade,
        });
    }
    catch (error) {
        console.error("Error creating grade:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create grade",
        });
    }
};
/**
 * PUT /api/grades/:id
 * Update a grade
 */
export const updateGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const gradeId = Array.isArray(id) ? id[0] : id;
        const { name, description } = req.body;
        const existingGrade = await prisma.grade.findUnique({
            where: {
                id: gradeId,
            },
        });
        if (!existingGrade) {
            return res.status(404).json({
                success: false,
                message: "Grade not found",
            });
        }
        if (name !== undefined &&
            (typeof name !== "string" || !name.trim())) {
            return res.status(400).json({
                success: false,
                message: "Grade name cannot be empty",
            });
        }
        if (name !== undefined) {
            const duplicateGrade = await prisma.grade.findFirst({
                where: {
                    name: name.trim(),
                    NOT: {
                        id: gradeId,
                    },
                },
            });
            if (duplicateGrade) {
                return res.status(409).json({
                    success: false,
                    message: "A grade with this name already exists",
                });
            }
        }
        const grade = await prisma.grade.update({
            where: {
                id: gradeId,
            },
            data: {
                ...(name !== undefined && {
                    name: name.trim(),
                }),
                ...(description !== undefined && {
                    description: description === null ||
                        String(description).trim() === ""
                        ? null
                        : String(description).trim(),
                }),
            },
        });
        return res.status(200).json({
            success: true,
            message: "Grade updated successfully",
            data: grade,
        });
    }
    catch (error) {
        console.error("Error updating grade:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update grade",
        });
    }
};
/**
 * PATCH /api/grades/:id/status
 * Activate/deactivate a grade
 */
export const updateGradeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const gradeId = Array.isArray(id) ? id[0] : id;
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Status must be ACTIVE or INACTIVE",
            });
        }
        const existingGrade = await prisma.grade.findUnique({
            where: {
                id: gradeId,
            },
        });
        if (!existingGrade) {
            return res.status(404).json({
                success: false,
                message: "Grade not found",
            });
        }
        const grade = await prisma.grade.update({
            where: {
                id: gradeId,
            },
            data: {
                status,
            },
        });
        return res.status(200).json({
            success: true,
            message: `Grade status changed to ${status}`,
            data: grade,
        });
    }
    catch (error) {
        console.error("Error updating grade status:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update grade status",
        });
    }
};
/**
 * DELETE /api/grades/:id
 * Delete a grade
 */
export const deleteGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const gradeId = Array.isArray(id) ? id[0] : id;
        const existingGrade = await prisma.grade.findUnique({
            where: {
                id: gradeId,
            },
            include: {
                _count: {
                    select: {
                        children: true,
                    },
                },
            },
        });
        if (!existingGrade) {
            return res.status(404).json({
                success: false,
                message: "Grade not found",
            });
        }
        if (existingGrade._count.children > 0) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete a grade that has children assigned to it",
            });
        }
        await prisma.grade.delete({
            where: {
                id: gradeId,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Grade deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting grade:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete grade",
        });
    }
};
