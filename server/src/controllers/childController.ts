import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

/**
 * GET /api/children
 * Get all children
 */
export const getChildren = async (
  _req: Request,
  res: Response,
) => {
  try {
    const children = await prisma.child.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        parent: true,
        grade: true,
        branch: true,
      },
    });

    return res.status(200).json({
      success: true,
      count: children.length,
      data: children,
    });
  } catch (error) {
    console.error("Error fetching children:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch children",
    });
  }
};

/**
 * GET /api/children/:id
 * Get one child
 */
export const getChildById = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const child = await prisma.child.findUnique({
      where: {
        id:  Array.isArray(id) ? id[0] : id,
      },

      include: {
        parent: true,
        grade: true,
        branch: true,
      },
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: child,
    });
  } catch (error) {
    console.error("Error fetching child:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch child",
    });
  }
};

/**
 * POST /api/children
 * Create a new child
 */
export const createChild = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      name,
      age,
      parentId,
      gradeId,
      branchId,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      age === undefined ||
      !parentId ||
      !gradeId ||
      !branchId
    ) {
      return res.status(400).json({
        success: false,
        message: "All required child fields must be provided",
      });
    }

    // Validate name
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Child name must be a valid name",
      });
    }

    // Validate age
    const childAge = Number(age);

    if (
      !Number.isInteger(childAge) ||
      childAge < 1 ||
      childAge > 18
    ) {
      return res.status(400).json({
        success: false,
        message: "Child age must be a whole number between 1 and 18",
      });
    }

    // Check parent
    const parent = await prisma.parent.findUnique({
      where: {
        id: parentId,
      },
    });

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Selected parent does not exist",
      });
    }

    // Check grade
    const grade = await prisma.grade.findUnique({
      where: {
        id: gradeId,
      },
    });

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: "Selected grade does not exist",
      });
    }

    // Check branch
    const branch = await prisma.branch.findUnique({
      where: {
        id: branchId,
      },
    });

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Selected branch does not exist",
      });
    }

    // Create child
    const child = await prisma.child.create({
      data: {
        name: name.trim(),
        age: childAge,
        parentId,
        gradeId,
        branchId,
      },
      include: {
        parent: true,
        grade: true,
        branch: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Child registered successfully",
      data: child,
    });
  } catch (error) {
    console.error("Error creating child:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create child",
    });
  }
};

/**
 * PUT /api/children/:id
 * Update a child
 */
export const updateChild = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const childId = Array.isArray(id) ? id[0] : id;

    const {
      name,
      age,
      parentId,
      gradeId,
      branchId,
      status,
    } = req.body;

    // Check child
    const existingChild = await prisma.child.findUnique({
      where: {
        id: childId,
      },
    });

    if (!existingChild) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    // Validate name
    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Child name cannot be empty",
        });
      }
    }

    // Validate age
    let childAge: number | undefined;

    if (age !== undefined) {
      childAge = Number(age);

      if (
        !Number.isInteger(childAge) ||
        childAge < 1 ||
        childAge > 18
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Child age must be a whole number between 1 and 18",
        });
      }
    }

    // Validate status
    if (
      status !== undefined &&
      status !== "ACTIVE" &&
      status !== "INACTIVE"
    ) {
      return res.status(400).json({
        success: false,
        message: "Status must be ACTIVE or INACTIVE",
      });
    }

    // Validate parent if changing parent
    if (parentId !== undefined) {
      const parent = await prisma.parent.findUnique({
        where: {
          id: parentId,
        },
      });

      if (!parent) {
        return res.status(404).json({
          success: false,
          message: "Selected parent does not exist",
        });
      }
    }

    // Validate grade if changing grade
    if (gradeId !== undefined) {
      const grade = await prisma.grade.findUnique({
        where: {
          id: gradeId,
        },
      });

      if (!grade) {
        return res.status(404).json({
          success: false,
          message: "Selected grade does not exist",
        });
      }
    }

    // Validate branch if changing branch
    if (branchId !== undefined) {
      const branch = await prisma.branch.findUnique({
        where: {
          id: branchId,
        },
      });

      if (!branch) {
        return res.status(404).json({
          success: false,
          message: "Selected branch does not exist",
        });
      }
    }

    const child = await prisma.child.update({
      where: {
        id: childId,
      },

      data: {
        ...(name !== undefined && {
          name: name.trim(),
        }),

        ...(childAge !== undefined && {
          age: childAge,
        }),

        ...(parentId !== undefined && {
          parentId,
        }),

        ...(gradeId !== undefined && {
          gradeId,
        }),

        ...(branchId !== undefined && {
          branchId,
        }),

        ...(status !== undefined && {
          status,
        }),
      },

      include: {
        parent: true,
        grade: true,
        branch: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Child updated successfully",
      data: child,
    });
  } catch (error) {
    console.error("Error updating child:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update child",
    });
  }
};

/**
 * PATCH /api/children/:id/status
 * Activate/deactivate a child
 */
export const updateChildStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status !== "ACTIVE" && status !== "INACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Status must be ACTIVE or INACTIVE",
      });
    }

    const existingChild = await prisma.child.findUnique({
      where: {
        id:  Array.isArray(id) ? id[0] : id,
      },
    });

    if (!existingChild) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    const child = await prisma.child.update({
      where: {
        id:  Array.isArray(id) ? id[0] : id,
      },

      data: {
        status,
      },

      include: {
        parent: true,
        grade: true,
        branch: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: `Child status changed to ${status}`,
      data: child,
    });
  } catch (error) {
    console.error("Error updating child status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update child status",
    });
  }
};

/**
 * DELETE /api/children/:id
 * Delete a child
 */
export const deleteChild = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const existingChild = await prisma.child.findUnique({
      where: {
        id:  Array.isArray(id) ? id[0] : id,
      },
    });

    if (!existingChild) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    await prisma.child.delete({
      where: {
        id:  Array.isArray(id) ? id[0] : id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Child deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting child:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete child",
    });
  }
};