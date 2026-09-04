import { Router } from "express";

import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";

const router = Router();

// =====================================================
// PAYMENT ROUTES
// =====================================================

// GET all payments for a child
// GET /api/children/:childId/payments
router.get(
  "/children/:childId/payments",
  getPayments,
);

// GET single payment
// GET /api/children/:childId/payments/:id
router.get(
  "/children/:childId/payments/:id",
  getPaymentById,
);

// CREATE payment
// POST /api/children/:childId/payments
router.post(
  "/children/:childId/payments",
  createPayment,
);

// UPDATE payment
// PUT /api/children/:childId/payments/:id
router.put(
  "/children/:childId/payments/:id",
  updatePayment,
);

// DELETE payment
// DELETE /api/children/:childId/payments/:id
router.delete(
  "/children/:childId/payments/:id",
  deletePayment,
);

export default router;