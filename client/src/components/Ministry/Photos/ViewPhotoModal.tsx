import {
  CalendarDays,
  Camera,
  FileImage,
  HardDrive,
  ImageIcon,
  MapPin,
  Tag,
  UserRound,
  X,
} from "lucide-react";

import type { PhotoResource } from "../../../data/photosData";

interface ViewPhotoModalProps {
  isOpen: boolean;
  photo: PhotoResource | null;
  onClose: () => void;
}

const ViewPhotoModal = ({ isOpen, photo, onClose }: ViewPhotoModalProps) => {
  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <ImageIcon size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                {photo.title}
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Photo details and preview
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
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Photo Preview */}
          <div>
            <div className="relative flex min-h-105 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="h-full max-h-150 w-full object-contain"
              />

              {/* Status */}
              <div className="absolute right-4 top-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    photo.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {photo.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-5">
            {/* Title + Description */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                  {photo.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {photo.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {photo.description}
              </p>
            </div>

            {/* Event Information */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Event Information
              </p>

              <div className="space-y-3">
                <DetailRow
                  icon={<Tag size={16} />}
                  label="Event"
                  value={photo.event}
                />

                <DetailRow
                  icon={<CalendarDays size={16} />}
                  label="Event Date"
                  value={photo.eventDate}
                />

                <DetailRow
                  icon={<MapPin size={16} />}
                  label="Location"
                  value={photo.location}
                />

                <DetailRow
                  icon={<Camera size={16} />}
                  label="Photographer"
                  value={photo.photographer}
                />
              </div>
            </div>

            {/* File Information */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                File Information
              </p>

              <div className="space-y-3">
                <DetailRow
                  icon={<FileImage size={16} />}
                  label="File Name"
                  value={photo.fileName}
                />

                <DetailRow
                  icon={<HardDrive size={16} />}
                  label="File Size"
                  value={photo.fileSize}
                />

                <DetailRow
                  icon={<CalendarDays size={16} />}
                  label="Date Added"
                  value={photo.dateAdded}
                />

                <DetailRow
                  icon={<UserRound size={16} />}
                  label="Category"
                  value={photo.category}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailRow = ({ icon, label, value }: DetailRowProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400">{label}</p>

        <p className="mt-0.5 wrap-break-word text-sm font-medium text-gray-700 dark:text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ViewPhotoModal;
