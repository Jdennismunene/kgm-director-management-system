import {
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Receipt,
  Wallet,
} from "lucide-react";

const Payments = () => {
  const payments = [
    {
      reference: "PAY-2026-081",
      description: "Sunday School Term 3",
      date: "Aug 9, 2026",
      amount: "KES 2,500",
      method: "M-Pesa",
      status: "Paid",
    },
    {
      reference: "PAY-2026-067",
      description: "Children's Activity",
      date: "Jul 26, 2026",
      amount: "KES 1,000",
      method: "M-Pesa",
      status: "Paid",
    },
    {
      reference: "PAY-2026-052",
      description: "Sunday School Term 2",
      date: "Jun 7, 2026",
      amount: "KES 2,500",
      method: "Cash",
      status: "Paid",
    },
    {
      reference: "PAY-2026-041",
      description: "Children's Retreat",
      date: "May 18, 2026",
      amount: "KES 3,000",
      method: "Bank",
      status: "Pending",
    },
  ];

  return (
    <div className="mt-5 space-y-5">
      {/* Header */}
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
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <CreditCard size={17} />
          Record Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Paid */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Paid
              </p>

              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                KES 6,000
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

        {/* Payments */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Payments Made
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                3
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <Receipt size={20} className="text-blue-600 dark:text-blue-400" />
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
                1
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

        {/* Balance */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Outstanding Balance
              </p>

              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                KES 3,000
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30">
              <Wallet size={20} className="text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status */}
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
            <CheckCircle2
              size={18}
              className="text-green-600 dark:text-green-400"
            />

            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Account Active
            </span>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-green-600 dark:bg-green-500"
            style={{ width: "67%" }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Paid: KES 6,000</span>
          <span>Total: KES 9,000</span>
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Table Header */}
        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <Receipt size={17} className="text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Payment History
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Recent transactions and payment records
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            All Payments
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left">
            <thead className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Reference
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Description
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Date
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Amount
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Method
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.reference}
                  className="border-b border-gray-100 last:border-b-0 dark:border-gray-700"
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {payment.reference}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {payment.description}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {payment.date}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {payment.amount}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {payment.method}
                  </td>

                  <td className="px-5 py-4">
                    {payment.status === "Paid" ? (
                      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
