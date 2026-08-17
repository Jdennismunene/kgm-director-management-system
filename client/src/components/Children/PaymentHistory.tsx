import {
  Banknote,
  ChevronDown,
  CreditCard,
  Pencil,
  Trash2,
  WalletCards,
} from "lucide-react";

import type { Payment } from "./Payments";

interface PaymentHistoryProps {
  payments: Payment[];
  filter: "All" | "Paid" | "Pending";
  onFilterChange: (filter: "All" | "Paid" | "Pending") => void;
  onEdit: (payment: Payment) => void;
  onDelete: (reference: string) => void;
}

const PaymentHistory = ({
  payments,
  filter,
  onFilterChange,
  onEdit,
  onDelete,
}: PaymentHistoryProps) => {
  // =====================================================
  // PAYMENT METHOD ICON
  // =====================================================

  const getMethodIcon = (method: Payment["method"]) => {
    switch (method) {
      case "M-Pesa":
        return (
          <WalletCards
            size={15}
            className="text-green-600 dark:text-green-400"
          />
        );

      case "Cash":
        return (
          <Banknote size={15} className="text-blue-600 dark:text-blue-400" />
        );

      case "Bank":
        return (
          <CreditCard
            size={15}
            className="text-purple-600 dark:text-purple-400"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Payment History
          </h3>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            All recorded payments for this child.
          </p>
        </div>

        {/* Filter */}

        <div className="relative w-fit">
          <select
            value={filter}
            onChange={(e) =>
              onFilterChange(e.target.value as "All" | "Paid" | "Pending")
            }
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-900/30"
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <CreditCard
              size={22}
              className="text-gray-400 dark:text-gray-300"
            />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            No payments found
          </h4>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            There are no payment records matching the selected filter.
          </p>
        </div>
      ) : (
        <>
          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-900/30">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Reference
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Description
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Date
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Method
                  </th>

                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {payments.map((payment) => (
                  <tr
                    key={payment.reference}
                    className="transition hover:bg-gray-50/70 dark:hover:bg-gray-700/20"
                  >
                    {/* Reference */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                        {payment.reference}
                      </span>
                    </td>

                    {/* Description */}

                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-700 dark:text-gray-200">
                        {payment.description}
                      </span>
                    </td>

                    {/* Date */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {payment.date}
                      </span>
                    </td>

                    {/* Amount */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        KES {payment.amount.toLocaleString()}
                      </span>
                    </td>

                    {/* Method */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2">
                        {getMethodIcon(payment.method)}

                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {payment.method}
                        </span>
                      </div>
                    </td>

                    {/* Status */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          payment.status === "Paid"
                            ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(payment)}
                          title="Edit payment"
                          className="rounded-md p-1.5 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(payment.reference)}
                          title="Delete payment"
                          className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =================================================
              MOBILE CARDS
          ================================================= */}

          <div className="divide-y divide-gray-100 md:hidden dark:divide-gray-700">
            {payments.map((payment) => (
              <div key={payment.reference} className="p-5">
                {/* Top */}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                      {payment.reference}
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                      {payment.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      payment.status === "Paid"
                        ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>

                {/* Details */}

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      Amount
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      KES {payment.amount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      Date
                    </p>

                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      {payment.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      Method
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      {getMethodIcon(payment.method)}

                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {payment.method}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}

                <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => onEdit(payment)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(payment.reference)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* =================================================
          FOOTER
      ================================================= */}

      {payments.length > 0 && (
        <div className="border-t border-gray-100 px-5 py-3 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Showing {payments.length}{" "}
            {payments.length === 1 ? "payment" : "payments"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
