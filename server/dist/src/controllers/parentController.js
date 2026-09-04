import prisma from "../lib/prisma.js";
/**
 * GET /api/parents
 * Get all parents
 */
export const getParents = async (_req, res) => {
    try {
        const parents = await prisma.parent.findMany({
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
            count: parents.length,
            data: parents,
        });
    }
    catch (error) {
        console.error("Error fetching parents:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch parents",
        });
    }
};
/**
 * GET /api/parents/:id
 * Get one parent
 */
export const getParentById = async (req, res) => {
    try {
        const { id } = req.params;
        const parentId = Array.isArray(id) ? id[0] : id;
        const parent = await prisma.parent.findUnique({
            where: {
                id: parentId,
            },
            include: {
                children: {
                    include: {
                        grade: true,
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
        if (!parent) {
            return res.status(404).json({
                success: false,
                message: "Parent not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: parent,
        });
    }
    catch (error) {
        console.error("Error fetching parent:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch parent",
        });
    }
};
/**
 * POST /api/parents
 * Create a new parent
 */
export const createParent = async (req, res) => {
    try {
        const { name, phone, email, } = req.body;
        if (!name ||
            typeof name !== "string" ||
            !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Parent name is required",
            });
        }
        if (!phone ||
            typeof phone !== "string" ||
            !phone.trim()) {
            return res.status(400).json({
                success: false,
                message: "Parent phone is required",
            });
        }
        const parent = await prisma.parent.create({
            data: {
                name: name.trim(),
                phone: phone.trim(),
                email: email !== undefined &&
                    email !== null &&
                    String(email).trim() !== ""
                    ? String(email).trim()
                    : null,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Parent registered successfully",
            data: parent,
        });
    }
    catch (error) {
        console.error("Error creating parent:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create parent",
        });
    }
};
/**
 * PUT /api/parents/:id
 * Update a parent
 */
export const updateParent = async (req, res) => {
    try {
        const { id } = req.params;
        const parentId = Array.isArray(id) ? id[0] : id;
        const { name, phone, email, } = req.body;
        const existingParent = await prisma.parent.findUnique({
            where: {
                id: parentId,
            },
        });
        if (!existingParent) {
            return res.status(404).json({
                success: false,
                message: "Parent not found",
            });
        }
        if (name !== undefined &&
            (typeof name !== "string" || !name.trim())) {
            return res.status(400).json({
                success: false,
                message: "Parent name cannot be empty",
            });
        }
        if (phone !== undefined &&
            (typeof phone !== "string" || !phone.trim())) {
            return res.status(400).json({
                success: false,
                message: "Parent phone cannot be empty",
            });
        }
        const parent = await prisma.parent.update({
            where: {
                id: parentId,
            },
            data: {
                ...(name !== undefined && {
                    name: name.trim(),
                }),
                ...(phone !== undefined && {
                    phone: phone.trim(),
                }),
                ...(email !== undefined && {
                    email: email === null ||
                        String(email).trim() === ""
                        ? null
                        : String(email).trim(),
                }),
            },
        });
        return res.status(200).json({
            success: true,
            message: "Parent updated successfully",
            data: parent,
        });
    }
    catch (error) {
        console.error("Error updating parent:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update parent",
        });
    }
};
/**
 * PATCH /api/parents/:id/status
 * Activate/deactivate a parent
 */
export const updateParentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const parentId = Array.isArray(id) ? id[0] : id;
        const { status } = req.body;
        if (status !== "ACTIVE" &&
            status !== "INACTIVE") {
            return res.status(400).json({
                success: false,
                message: "Status must be ACTIVE or INACTIVE",
            });
        }
        const existingParent = await prisma.parent.findUnique({
            where: {
                id: parentId,
            },
        });
        if (!existingParent) {
            return res.status(404).json({
                success: false,
                message: "Parent not found",
            });
        }
        const parent = await prisma.parent.update({
            where: {
                id: parentId,
            },
            data: {
                status,
            },
        });
        return res.status(200).json({
            success: true,
            message: `Parent status changed to ${status}`,
            data: parent,
        });
    }
    catch (error) {
        console.error("Error updating parent status:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update parent status",
        });
    }
};
/**
 * DELETE /api/parents/:id
 * Delete a parent
 */
export const deleteParent = async (req, res) => {
    try {
        const { id } = req.params;
        const parentId = Array.isArray(id) ? id[0] : id;
        const existingParent = await prisma.parent.findUnique({
            where: {
                id: parentId,
            },
            include: {
                _count: {
                    select: {
                        children: true,
                    },
                },
            },
        });
        if (!existingParent) {
            return res.status(404).json({
                success: false,
                message: "Parent not found",
            });
        }
        if (existingParent._count.children > 0) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete a parent who has children assigned to them",
            });
        }
        await prisma.parent.delete({
            where: {
                id: parentId,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Parent deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting parent:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete parent",
        });
    }
};
