import prisma from "../lib/prisma.js";

export type HistoryType =
  | "PAYMENT"
  | "LESSON"
  | "NOTE"
  | "ATTENDANCE"
  | "DOCUMENT"
  | "PROFILE"
  | "DISCIPLESHIP";

interface CreateHistoryParams {
  title: string;
  description: string;
  type: HistoryType;
  user?: string;
  childId: string;
}

export const createHistory = async ({
  title,
  description,
  type,
  user = "System",
  childId,
}: CreateHistoryParams): Promise<void> => {
  try {
    await prisma.history.create({
      data: {
        title,
        description,
        type,
        user,
        childId,
      },
    });
  } catch (error) {
    console.error("Failed to create history record:", error);
  }
};