import prisma from "../lib/prisma.js";
/**
 * GET /api/branches
 * Get all branches
 */
export const getBranches = async (_req, res) => {
    try {
        const branches = await prisma.branch.findMany({
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
            count: branches.length,
            data: branches,
        });
    }
    catch (error) {
        console.error("Error fetching branches:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch branches",
        });
    }
};
/**
 * GET /api/branches/:id
 * Get one branch
 */
export const getBranchById = async (req, res) => {
    try {
        const { id } = req.params;
        const branchId = Array.isArray(id) ? id[0] : id;
        const branch = await prisma.branch.findUnique({
            where: {
                id: branchId,
            },
            include: {
                children: true,
                _count: {
                    select: {
                        children: true,
                    },
                },
            },
        });
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: branch,
        });
    }
    catch (error) {
        console.error("Error fetching branch:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch branch",
        });
    }
};
/**
 * POST /api/branches
 * Create a new branch
 */
export const createBranch = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Branch name is required",
            });
        }
        const existingBranch = await prisma.branch.findUnique({
            where: {
                name: name.trim(),
            },
        });
        if (existingBranch) {
            return res.status(409).json({
                success: false,
                message: "A branch with this name already exists",
            });
        }
        const branch = await prisma.branch.create({
            data: {
                name: name.trim(),
            },
        });
        return res.status(201).json({
            success: true,
            message: "Branch created successfully",
            data: branch,
        });
    }
    catch (error) {
        console.error("Error creating branch:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create branch",
        });
    }
};
/**
 * PUT /api/branches/:id
 * Update a branch
 */
export const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branchId = Array.isArray(id) ? id[0] : id;
        const { name } = req.body;
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Branch name is required",
            });
        }
        const existingBranch = await prisma.branch.findUnique({
            where: {
                id: branchId,
            },
        });
        if (!existingBranch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }
        const duplicateBranch = await prisma.branch.findFirst({
            where: {
                name: name.trim(),
                NOT: {
                    id: branchId,
                },
            },
        });
        if (duplicateBranch) {
            return res.status(409).json({
                success: false,
                message: "A branch with this name already exists",
            });
        }
        const branch = await prisma.branch.update({
            where: {
                id: branchId,
            },
            data: {
                name: name.trim(),
            },
        });
        return res.status(200).json({
            success: true,
            message: "Branch updated successfully",
            data: branch,
        });
    }
    catch (error) {
        console.error("Error updating branch:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update branch",
        });
    }
};
/**
 * DELETE /api/branches/:id
 * Delete a branch
 */
export const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branchId = Array.isArray(id) ? id[0] : id;
        const existingBranch = await prisma.branch.findUnique({
            where: {
                id: branchId,
            },
            include: {
                _count: {
                    select: {
                        children: true,
                    },
                },
            },
        });
        if (!existingBranch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }
        if (existingBranch._count.children > 0) {
            return res.status(409).json({
                success: false,
                message: "Cannot delete a branch that has children assigned to it",
            });
        }
        await prisma.branch.delete({
            where: {
                id: branchId,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Branch deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting branch:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete branch",
        });
    }
};
