import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { createHistory } from "../utilis/historyHelper.js";

/**
 * GET /api/attendance/child/:childId
 * Get all attendance records for one child
 */
export const getChildAttendance = async (req: Request, res: Response) => {
  try {
    const { childId } = req.params;

    const id = Array.isArray(childId) ? childId[0] : childId;

    // Check if child exists
    const child = await prisma.child.findUnique({
      where: {
        id,
      },
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    const attendance = await prisma.attendance.findMany({
      where: {
        childId: id,
      },
      orderBy: {
        date: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching child attendance:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance records",
    });
  }
};

/**
 * GET /api/attendance/:id
 * Get one attendance record
 */
export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const attendanceId = Array.isArray(id) ? id[0] : id;

    const attendance = await prisma.attendance.findUnique({
      where: {
        id: attendanceId,
      },
      include: {
        child: true,
      },
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance record",
    });
  }
};

/**
 * POST /api/attendance
 * Create an attendance record
 */
export const createAttendance = async (req: Request, res: Response) => {
  try {
    const { childId, date, program, status, time, notes } = req.body;

    // ============================================
    // VALIDATE REQUIRED FIELDS
    // ============================================

    if (!childId || !date || !program || !status) {
      return res.status(400).json({
        success: false,
        message: "Child, date, program and status are required",
      });
    }

    // ============================================
    // VALIDATE STATUS
    // ============================================

    if (status !== "PRESENT" && status !== "ABSENT" && status !== "LATE") {
      return res.status(400).json({
        success: false,
        message: "Status must be PRESENT, ABSENT or LATE",
      });
    }

    // ============================================
    // CHECK CHILD
    // ============================================

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

    // ============================================
    // VALIDATE DATE
    // ============================================

    const attendanceDate = new Date(date);

    if (Number.isNaN(attendanceDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance date",
      });
    }

    // ============================================
    // CREATE ATTENDANCE
    // ============================================

    const attendance = await prisma.attendance.create({
      data: {
        childId,
        date: attendanceDate,
        program: program.trim(),
        status,
        time: time || null,
        notes: notes?.trim() || null,
      },
    });

    await createHistory({
      title: "Attendance recorded",
      description: `${program.trim()} attendance marked as ${status.toLowerCase()}.`,
      type: "ATTENDANCE",
      user: "System",
      childId,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance recorded successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Error creating attendance:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to record attendance",
    });
  }
};

/**
 * PUT /api/attendance/:id
 * Update an attendance record
 */
export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const attendanceId = Array.isArray(id) ? id[0] : id;

    const { date, program, status, time, notes } = req.body;

    // ============================================
    // CHECK RECORD
    // ============================================

    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        id: attendanceId,
      },
    });

    if (!existingAttendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    // ============================================
    // VALIDATE STATUS
    // ============================================

    if (
      status !== undefined &&
      status !== "PRESENT" &&
      status !== "ABSENT" &&
      status !== "LATE"
    ) {
      return res.status(400).json({
        success: false,
        message: "Status must be PRESENT, ABSENT or LATE",
      });
    }

    // ============================================
    // VALIDATE DATE
    // ============================================

    let attendanceDate: Date | undefined;

    if (date !== undefined) {
      attendanceDate = new Date(date);

      if (Number.isNaN(attendanceDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid attendance date",
        });
      }
    }

    // ============================================
    // UPDATE
    // ============================================

    const attendance = await prisma.attendance.update({
      where: {
        id: attendanceId,
      },

      data: {
        ...(attendanceDate !== undefined && {
          date: attendanceDate,
        }),

        ...(program !== undefined && {
          program: program.trim(),
        }),

        ...(status !== undefined && {
          status,
        }),

        ...(time !== undefined && {
          time: time || null,
        }),

        ...(notes !== undefined && {
          notes: notes?.trim() || null,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Error updating attendance:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update attendance",
    });
  }
};

/**
 * DELETE /api/attendance/:id
 * Delete an attendance record
 */
export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const attendanceId = Array.isArray(id) ? id[0] : id;

    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        id: attendanceId,
      },
    });

    if (!existingAttendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    await prisma.attendance.delete({
      where: {
        id: attendanceId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting attendance:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete attendance",
    });
  }
};
