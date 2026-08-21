import { Eye, MoreVertical, Pencil, Droplets, Trash2 } from "lucide-react";
import { useState } from "react";

import type { BaptismRecord } from "../../../data/baptismRecordsData";

interface BaptismRecordsTableProps {
  records: BaptismRecord[];
  onView: (record: BaptismRecord) => void;
  onEdit: (record: BaptismRecord) => void;
  onDelete: (record: BaptismRecord) => void;
}

const BaptismRecordsTable = ({
  records,
  onView,
  onEdit,
  onDelete,
}: BaptismRecordsTableProps) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: BaptismRecord["status"]) => {
    switch (status) {
      case "Baptized":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

      case "Scheduled":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

      case "Pending":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getCertificateStyle = (status: BaptismRecord["certificateStatus"]) => {
    switch (status) {
      case "Issued":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";

      case "Not Required":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <Droplets
          size={40}
          className="mx-auto text-gray-400 dark:text-gray-500"
        />

        <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
          No baptism records found
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try changing your filters or add a new baptism record.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-275">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/40">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Person
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Baptism Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Branch
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Minister
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Certificate
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {records.map((record) => (
              <tr
                key={record.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                {/* Person */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                      <Droplets
                        size={17}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {record.personName}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {record.baptismNumber}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Baptism Date */}
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {formatDate(record.baptismDate)}
                  </p>

                  {record.baptismLocation && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {record.baptismLocation}
                    </p>
                  )}
                </td>

                {/* Branch */}
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {record.branch}
                  </p>
                </td>

                {/* Minister */}
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {record.minister || "—"}
                  </p>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                      record.status,
                    )}`}
                  >
                    {record.status}
                  </span>
                </td>

                {/* Certificate */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getCertificateStyle(
                      record.certificateStatus,
                    )}`}
                  >
                    {record.certificateStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="relative px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(openMenu === record.id ? null : record.id)
                    }
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    aria-label={`Actions for ${record.personName}`}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === record.id && (
                    <div className="absolute right-5 top-12 z-20 w-40 rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onView(record);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onEdit(record);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onDelete(record);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BaptismRecordsTable;
