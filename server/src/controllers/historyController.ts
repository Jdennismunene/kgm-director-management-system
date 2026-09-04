import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// =====================================================
// GET HISTORY FOR A CHILD
// GET /api/children/:childId/history
// =====================================================

export const getHistory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const childId = Array.isArray(req.params.childId)
      ? req.params.childId[0]
      : req.params.childId;

    if (!childId) {
      res.status(400).json({
        success: false,
        message: "Child ID is required",
      });
      return;
    }

    const history = await prisma.history.findMany({
      where: {
        childId: childId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(history);
  } catch (error) {
    console.error("Failed to fetch child history:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch child history",
    });
  }
};

// =====================================================
// GET ONE HISTORY RECORD
// GET /api/history/:id
// =====================================================

export const getHistoryById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "History ID is required",
      });
      return;
    }

    const history = await prisma.history.findUnique({
      where: {
        id: id,
      },
    });

    if (!history) {
      res.status(404).json({
        success: false,
        message: "History record not found",
      });
      return;
    }

    res.status(200).json(history);
  } catch (error) {
    console.error("Failed to fetch history record:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history record",
    });
  }
};