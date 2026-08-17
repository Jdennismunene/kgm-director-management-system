import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import type { Payment } from "./Payments";

interface EditPaymentModalProps {
  isOpen: boolean;
  payment: Payment | null;
  onClose: () => void;
  onSave: (updatedPayment: Payment) => void;
}

const EditPaymentModal = ({
  isOpen,
  payment,
  onClose,
  onSave,
}: EditPaymentModalProps) => {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<Payment["method"]>("M-Pesa");
  const [status, setStatus] = useState<Payment["status"]>("Paid");

  // =====================================================
  // LOAD SELECTED PAYMENT
  // =====================================================

  useEffect(() => {
    if (!payment) return;

    setDescription(payment.description);
    setAmount(String(payment.amount));
    setMethod(payment.method);
    setStatus(payment.status);

    /*
      The existing payment date is stored as something like:

      Aug 9, 2026

      We display it directly as text in the form instead
      of trying to convert it back into a date input.
    */
    setDate(payment.date);
  }, [payment]);

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSubmit = () => {
    if (!payment) return;

    if (!description.trim() || !amount) {
      return;
    }

    const updatedPayment: Payment = {
      ...payment,

      // Reference remains unchanged
      reference: payment.reference,

      description: description.trim(),

      date: date,

      amount: Number(amount),

      method,

      status,
    };

    onSave(updatedPayment);
  };

  // =====================================================
  // DON'T RENDER WHEN CLOSED
  // =====================================================

  if (!isOpen || !payment) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Payment
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Update the selected payment record.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <div className="space-y-5 p-6">
          {/* Reference */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Payment Reference
            </label>

            <input
              type="text"
              value={payment.reference}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500 dark:border-gray-600 dark:bg-gray-700/60 dark:text-gray-400"
            />

            <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
              Payment references cannot be changed.
            </p>
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Payment Description
            </label>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Sunday School Term 3"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Amount */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Amount (KES)
            </label>

            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 2500"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Date */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Payment Date
            </label>

            {/* 
              Existing dates are stored as formatted strings,
              so we keep the same format here.
            */}

            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Aug 9, 2026"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-900/30"
            />
          </div>

          {/* Method + Status */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Method */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Payment Method
              </label>

              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as Payment["method"])}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900/30"
              >
                <option value="M-Pesa">M-Pesa</option>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
              </select>
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Payment["status"])}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-900/30"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!description.trim() || !amount || Number(amount) <= 0}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPaymentModal;
