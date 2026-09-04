import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Receipt,
  Wallet,
} from "lucide-react";

import AddPaymentModal from "./AddPaymentModal";
import EditPaymentModal from "./EditPaymentModal";
import PaymentHistory from "./PaymentHistory";

import {
  createPayment,
  deletePayment,
  getChildPayments,
  updatePayment,
  type CreatePaymentData,
  type Payment,
  type UpdatePaymentData,
} from "../../services/paymentService";

// Keep the Payment type available to the other payment components
export type { Payment };

interface PaymentsProps {
  childId: string;
}

const Payments = ({ childId }: PaymentsProps) => {
  // =====================================================
  // PAYMENT DATA
  // =====================================================

  const [payments, setPayments] = useState<Payment[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  // =====================================================
  // FILTER
  // =====================================================

  const [filter, setFilter] = useState<"All" | "Paid" | "Pending">("All");

  // =====================================================
  // LOAD PAYMENTS
  // =====================================================

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getChildPayments(childId);

      setPayments(data);
    } catch (err) {
      console.error("Failed to load payments:", err);

      setError("Failed to load payment records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!childId) return;

    loadPayments();
  }, [childId]);

  // =====================================================
  // PAYMENT CALCULATIONS
  // =====================================================

  const totalPaid = useMemo(() => {
    return payments
      .filter((payment) => payment.status === "Paid")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const paymentsMade = useMemo(() => {
    return payments.filter((payment) => payment.status === "Paid").length;
  }, [payments]);

  const pendingPayments = useMemo(() => {
    return payments.filter((payment) => payment.status === "Pending").length;
  }, [payments]);

  // =====================================================
  // TOTAL EXPECTED
  // =====================================================

  // Temporary value.
  // Later we can connect this to a real fee/payment
  // configuration from the database.
  const totalExpected = 9000;

  const outstandingBalance = Math.max(totalExpected - totalPaid, 0);

  const paymentProgress =
    totalExpected > 0
      ? Math.min(Math.round((totalPaid / totalExpected) * 100), 100)
      : 0;

  // =====================================================
  // GENERATE PAYMENT REFERENCE
  // =====================================================

  const generateReference = () => {
    const year = new Date().getFullYear();

    const uniqueNumber = Date.now().toString().slice(-6);

    return `PAY-${year}-${uniqueNumber}`;
  };

  // =====================================================
  // ADD PAYMENT
  // =====================================================

  const handleAddPayment = async (paymentData: CreatePaymentData) => {
    try {
      setError("");

      const createdPayment = await createPayment(childId, paymentData);

      setPayments((currentPayments) => [createdPayment, ...currentPayments]);

      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to create payment:", err);

      setError("Failed to record payment.");
    }
  };

  // =====================================================
  // EDIT PAYMENT
  // =====================================================

  const handleOpenEdit = (payment: Payment) => {
    setEditingPayment(payment);
    setShowEditModal(true);
  };

  const handleEditPayment = async (updatedPayment: UpdatePaymentData) => {
    if (!editingPayment) return;

    try {
      setError("");

      const updated = await updatePayment(
        childId,
        editingPayment.id,
        updatedPayment,
      );

      setPayments((currentPayments) =>
        currentPayments.map((payment) =>
          payment.id === updated.id ? updated : payment,
        ),
      );

      setEditingPayment(null);
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update payment:", err);

      setError("Failed to update payment.");
    }
  };

  // =====================================================
  // DELETE PAYMENT
  // =====================================================

  const handleDeletePayment = async (paymentId: string) => {
    const payment = payments.find((item) => item.id === paymentId);

    if (!payment) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete payment "${payment.reference}"?`,
    );

    if (!confirmed) return;

    try {
      setError("");

      await deletePayment(childId, paymentId);

      setPayments((currentPayments) =>
        currentPayments.filter((item) => item.id !== paymentId),
      );
    } catch (err) {
      console.error("Failed to delete payment:", err);

      setError("Failed to delete payment.");
    }
  };

  // =====================================================
  // FILTER PAYMENTS
  // =====================================================

  const filteredPayments = payments.filter((payment) => {
    if (filter === "All") return true;

    return payment.status === filter;
  });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <div className="mt-5 space-y-5">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Payments
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View and manage payment records associated with this child.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <CreditCard size={17} />
            Record Payment
          </button>
        </div>

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading payment records...
            </p>
          </div>
        ) : (
          <>
            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Total Paid */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Total Paid
                    </p>

                    <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                      KES {totalPaid.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                    <DollarSign
                      size={20}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payments Made */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Payments Made
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                      {paymentsMade}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <Receipt
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                </div>
              </div>

              {/* Pending */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Pending
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                      {pendingPayments}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
                    <Clock3
                      size={20}
                      className="text-yellow-600 dark:text-yellow-400"
                    />
                  </div>
                </div>
              </div>

              {/* Outstanding Balance */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Outstanding Balance
                    </p>

                    <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                      KES {outstandingBalance.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30">
                    <Wallet
                      size={20}
                      className="text-red-600 dark:text-red-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                PAYMENT STATUS
            ================================================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Current Payment Status
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Current financial standing for this child.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {outstandingBalance === 0 ? (
                    <>
                      <CheckCircle2
                        size={18}
                        className="text-green-600 dark:text-green-400"
                      />

                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Fully Paid
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock3
                        size={18}
                        className="text-yellow-600 dark:text-yellow-400"
                      />

                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        Payment Pending
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-green-600 transition-all dark:bg-green-500"
                  style={{
                    width: `${paymentProgress}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Paid: KES {totalPaid.toLocaleString()}</span>

                <span>Total: KES {totalExpected.toLocaleString()}</span>
              </div>
            </div>

            {/* =================================================
                PAYMENT HISTORY
            ================================================= */}

            <PaymentHistory
              payments={filteredPayments}
              filter={filter}
              onFilterChange={setFilter}
              onEdit={handleOpenEdit}
              onDelete={handleDeletePayment}
            />
          </>
        )}
      </div>

      {/* =================================================
          MODALS
      ================================================= */}

      <AddPaymentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddPayment}
        generateReference={generateReference}
      />

      <EditPaymentModal
        isOpen={showEditModal}
        payment={editingPayment}
        onClose={() => {
          setEditingPayment(null);
          setShowEditModal(false);
        }}
        onSave={handleEditPayment}
      />
    </>
  );
};

export default Payments;
