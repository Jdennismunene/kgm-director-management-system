import api from "./api";

// =====================================================
// TYPES
// =====================================================

export type PaymentMethod = "M-Pesa" | "Cash" | "Bank";
export type PaymentStatus = "Paid" | "Pending";

export interface Payment {
  id: string;
  reference: string;
  description: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  childId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentData {
  reference: string;
  description: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  status?: PaymentStatus;
}

export interface UpdatePaymentData {
  description?: string;
  date?: string;
  amount?: number;
  method?: PaymentMethod;
  status?: PaymentStatus;
}

// =====================================================
// DATABASE → FRONTEND MAPPING
// =====================================================

const mapPaymentFromApi = (payment: any): Payment => {
  return {
    id: payment.id,
    reference: payment.reference,
    description: payment.description,
    date: payment.date,
    amount: Number(payment.amount),
    method:
      payment.method === "MPESA"
        ? "M-Pesa"
        : payment.method === "CASH"
          ? "Cash"
          : "Bank",
    status: payment.status === "PAID" ? "Paid" : "Pending",
    childId: payment.childId,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
};

// =====================================================
// FRONTEND → DATABASE MAPPING
// =====================================================

const mapPaymentToApi = (
  payment: CreatePaymentData | UpdatePaymentData,
) => {
  const data: Record<string, unknown> = {};

  if ("reference" in payment && payment.reference !== undefined) {
    data.reference = payment.reference;
  }

  if (payment.description !== undefined) {
    data.description = payment.description;
  }

  if (payment.date !== undefined) {
    data.date = payment.date;
  }

  if (payment.amount !== undefined) {
    data.amount = payment.amount;
  }

  if (payment.method !== undefined) {
    data.method =
      payment.method === "M-Pesa"
        ? "MPESA"
        : payment.method === "Cash"
          ? "CASH"
          : "BANK";
  }

  if (payment.status !== undefined) {
    data.status =
      payment.status === "Paid"
        ? "PAID"
        : "PENDING";
  }

  return data;
};

// =====================================================
// GET ALL PAYMENTS FOR CHILD
// =====================================================

export const getChildPayments = async (
  childId: string,
): Promise<Payment[]> => {
  const response = await api.get(
    `/children/${childId}/payments`,
  );

  return response.data.data.map(mapPaymentFromApi);
};

// =====================================================
// GET SINGLE PAYMENT
// =====================================================

export const getPaymentById = async (
  childId: string,
  paymentId: string,
): Promise<Payment> => {
  const response = await api.get(
    `/children/${childId}/payments/${paymentId}`,
  );

  return mapPaymentFromApi(response.data.data);
};

// =====================================================
// CREATE PAYMENT
// =====================================================

export const createPayment = async (
  childId: string,
  data: CreatePaymentData,
): Promise<Payment> => {
  const response = await api.post(
    `/children/${childId}/payments`,
    mapPaymentToApi(data),
  );

  return mapPaymentFromApi(response.data.data);
};

// =====================================================
// UPDATE PAYMENT
// =====================================================

export const updatePayment = async (
  childId: string,
  paymentId: string,
  data: UpdatePaymentData,
): Promise<Payment> => {
  const response = await api.put(
    `/children/${childId}/payments/${paymentId}`,
    mapPaymentToApi(data),
  );

  return mapPaymentFromApi(response.data.data);
};

// =====================================================
// DELETE PAYMENT
// =====================================================

export const deletePayment = async (
  childId: string,
  paymentId: string,
): Promise<void> => {
  await api.delete(
    `/children/${childId}/payments/${paymentId}`,
  );
};