import {
  Archive,
  ArchiveRestore,
  CalendarDays,
  FileText,
  HardDrive,
  Layers3,
  Tag,
  X,
} from "lucide-react";

import type { ArchiveResource } from "../../../data/archivesData";

interface ViewArchiveModalProps {
  isOpen: boolean;
  archive: ArchiveResource | null;
  onClose: () => void;
  onRestore: () => void;
}

const ViewArchiveModal = ({
  isOpen,
  archive,
  onClose,
  onRestore,
}: ViewArchiveModalProps) => {
  if (!isOpen || !archive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <Archive size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                {archive.title}
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Archived resource details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Resource Overview */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                    {archive.type}
                  </span>

                  <span className="rounded-full bg-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {archive.category}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                  {archive.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {archive.description}
                </p>
              </div>

              {/* Archived Badge */}
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                <Archive size={14} />
                Archived
              </span>
            </div>
          </div>

          {/* Archive Information */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
              Archive Information
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailCard
                icon={<Layers3 size={16} />}
                label="Original Section"
                value={archive.originalSection}
              />

              <DetailCard
                icon={<Tag size={16} />}
                label="Category"
                value={archive.category}
              />

              <DetailCard
                icon={<CalendarDays size={16} />}
                label="Archived Date"
                value={archive.archivedDate}
              />

              <DetailCard
                icon={<CalendarDays size={16} />}
                label="Original Date"
                value={archive.originalDate}
              />
            </div>
          </div>

          {/* File Information */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
              File Information
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailCard
                icon={<FileText size={16} />}
                label="File Name"
                value={archive.fileName}
              />

              <DetailCard
                icon={<HardDrive size={16} />}
                label="File Size"
                value={archive.fileSize}
              />
            </div>
          </div>

          {/* Restore Notice */}
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-teal-900/50 dark:bg-teal-900/20">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400">
                <ArchiveRestore size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-teal-800 dark:text-teal-300">
                  Need this resource again?
                </p>

                <p className="mt-1 text-xs leading-5 text-teal-700/80 dark:text-teal-400/80">
                  You can restore this resource and return it to its original
                  section.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onRestore}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <ArchiveRestore size={16} />
            Restore Resource
          </button>
        </div>
      </div>
    </div>
  );
};

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailCard = ({ icon, label, value }: DetailCardProps) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400">{label}</p>

        <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-700 dark:text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ViewArchiveModal;
