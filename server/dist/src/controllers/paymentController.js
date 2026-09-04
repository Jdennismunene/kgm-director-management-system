import prisma from "../lib/prisma.js";
import { createHistory } from "../utilis/historyHelper.js";
// =====================================================
// GET ALL PAYMENTS FOR A CHILD
// GET /api/children/:childId/payments
// =====================================================
export const getPayments = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const payments = await prisma.payment.findMany({
            where: {
                childId,
            },
            orderBy: {
                date: "desc",
            },
        });
        return res.status(200).json({
            success: true,
            data: payments,
        });
    }
    catch (error) {
        console.error("Error fetching payments:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch payments",
        });
    }
};
// =====================================================
// GET SINGLE PAYMENT
// GET /api/children/:childId/payments/:id
// =====================================================
export const getPaymentById = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const id = String(req.params.id);
        const payment = await prisma.payment.findFirst({
            where: {
                id,
                childId,
            },
        });
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: payment,
        });
    }
    catch (error) {
        console.error("Error fetching payment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch payment",
        });
    }
};
// =====================================================
// CREATE PAYMENT
// POST /api/children/:childId/payments
// =====================================================
export const createPayment = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const { reference, description, date, amount, method, status } = req.body;
        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------
        if (!reference ||
            !description ||
            !date ||
            amount === undefined ||
            amount === null ||
            !method) {
            return res.status(400).json({
                success: false,
                message: "Reference, description, date, amount and method are required",
            });
        }
        // -------------------------------------------------
        // CHECK CHILD
        // -------------------------------------------------
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
        // -------------------------------------------------
        // CHECK REFERENCE
        // -------------------------------------------------
        const existingPayment = await prisma.payment.findUnique({
            where: {
                reference,
            },
        });
        if (existingPayment) {
            return res.status(409).json({
                success: false,
                message: "Payment reference already exists",
            });
        }
        // -------------------------------------------------
        // CREATE PAYMENT
        // -------------------------------------------------
        const payment = await prisma.payment.create({
            data: {
                reference: String(reference),
                description: String(description),
                date: new Date(date),
                amount: Number(amount),
                method,
                status: status ?? "PAID",
                childId,
            },
        });
        await createHistory({
            title: "Payment recorded",
            description: `Payment of ${payment.amount} was recorded with reference ${payment.reference}.`,
            type: "PAYMENT",
            user: "System",
            childId: payment.childId,
        });
        return res.status(201).json({
            success: true,
            message: "Payment recorded successfully",
            data: payment,
        });
    }
    catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create payment",
        });
    }
};
// =====================================================
// UPDATE PAYMENT
// PUT /api/children/:childId/payments/:id
// =====================================================
export const updatePayment = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const id = String(req.params.id);
        const { description, date, amount, method, status } = req.body;
        // -------------------------------------------------
        // FIND EXISTING PAYMENT
        // -------------------------------------------------
        const existingPayment = await prisma.payment.findFirst({
            where: {
                id,
                childId,
            },
        });
        if (!existingPayment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }
        // -------------------------------------------------
        // UPDATE PAYMENT
        // -------------------------------------------------
        const payment = await prisma.payment.update({
            where: {
                id,
            },
            data: {
                description: description !== undefined ? String(description) : undefined,
                date: date !== undefined ? new Date(date) : undefined,
                amount: amount !== undefined ? Number(amount) : undefined,
                method: method !== undefined ? method : undefined,
                status: status !== undefined ? status : undefined,
            },
        });
        await createHistory({
            title: "Payment updated",
            description: `Payment with reference ${payment.reference} was updated.`,
            type: "PAYMENT",
            user: "System",
            childId: payment.childId,
        });
        return res.status(200).json({
            success: true,
            message: "Payment updated successfully",
            data: payment,
        });
    }
    catch (error) {
        console.error("Error updating payment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update payment",
        });
    }
};
// =====================================================
// DELETE PAYMENT
// DELETE /api/children/:childId/payments/:id
// =====================================================
export const deletePayment = async (req, res) => {
    try {
        const childId = String(req.params.childId);
        const id = String(req.params.id);
        // -------------------------------------------------
        // FIND EXISTING PAYMENT
        // -------------------------------------------------
        const existingPayment = await prisma.payment.findFirst({
            where: {
                id,
                childId,
            },
        });
        if (!existingPayment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }
        // -------------------------------------------------
        // DELETE PAYMENT
        // -------------------------------------------------
        await createHistory({
            title: "Payment deleted",
            description: `Payment with reference ${existingPayment.reference} was deleted.`,
            type: "PAYMENT",
            user: "System",
            childId: existingPayment.childId,
        });
        await prisma.payment.delete({
            where: {
                id,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Payment deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting payment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete payment",
        });
    }
};
