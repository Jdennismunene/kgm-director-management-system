import {
  CalendarDays,
  Droplets,
  FileCheck2,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import type { ReactNode } from "react";

import type { BaptismRecord } from "../../../data/baptismRecordsData";

interface BaptismRecordDetailsModalProps {
  isOpen: boolean;
  record: BaptismRecord | null;
  onClose: () => void;
  onEdit: (record: BaptismRecord) => void;
  onDelete: (record: BaptismRecord) => void;
}

const BaptismRecordDetailsModal = ({
  isOpen,
  record,
  onClose,
  onEdit,
  onDelete,
}: BaptismRecordDetailsModalProps) => {
  if (!isOpen || !record) {
    return null;
  }

  const formatDate = (date: string) => {
    if (!date) {
      return "Not provided";
    }

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusStyle = () => {
    switch (record.status) {
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

  const getCertificateStyle = () => {
    switch (record.certificateStatus) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <Droplets
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Baptism Record
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {record.baptismNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-5">
          {/* Person Summary */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                  <UserRound
                    size={22}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {record.personName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {record.age} years old • {record.gender}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle()}`}
                >
                  {record.status}
                </span>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getCertificateStyle()}`}
                >
                  Certificate: {record.certificateStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                label="Full Name"
                value={record.personName}
                icon={<UserRound size={16} />}
              />

              <InfoItem
                label="Date of Birth"
                value={formatDate(record.dateOfBirth)}
                icon={<CalendarDays size={16} />}
              />

              <InfoItem label="Age" value={`${record.age} years`} />

              <InfoItem label="Gender" value={record.gender} />
            </div>
          </section>

          {/* Parent / Guardian */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Parent / Guardian
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                label="Name"
                value={record.parentGuardian}
                icon={<UserRound size={16} />}
              />

              <InfoItem
                label="Phone"
                value={record.phone}
                icon={<Phone size={16} />}
              />

              <InfoItem label="Email" value={record.email || "Not provided"} />
            </div>
          </section>

          {/* Baptism Information */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Baptism Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                label="Baptism Date"
                value={formatDate(record.baptismDate)}
                icon={<CalendarDays size={16} />}
              />

              <InfoItem
                label="Baptism Location"
                value={record.baptismLocation || "Not provided"}
                icon={<MapPin size={16} />}
              />

              <InfoItem
                label="Minister"
                value={record.minister || "Not provided"}
                icon={<UserRound size={16} />}
              />

              <InfoItem label="Branch" value={record.branch} />

              <InfoItem
                label="Baptism Number"
                value={record.baptismNumber}
                icon={<FileCheck2 size={16} />}
              />
            </div>
          </section>

          {/* Notes */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Notes
            </h3>

            <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {record.notes || "No notes available."}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <button
            type="button"
            onClick={() => onDelete(record)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 size={17} />
            Delete Record
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => onEdit(record)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Pencil size={17} />
              Edit Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  icon?: ReactNode;
}

const InfoItem = ({ label, value, icon }: InfoItemProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
        {icon && (
          <span className="text-gray-400 dark:text-gray-500">{icon}</span>
        )}

        <span>{value}</span>
      </div>
    </div>
  );
};

export default BaptismRecordDetailsModal;
