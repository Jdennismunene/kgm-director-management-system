import prisma from "../lib/prisma.js";
export const createHistory = async ({ title, description, type, user = "System", childId, }) => {
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
    }
    catch (error) {
        console.error("Failed to create history record:", error);
    }
};
