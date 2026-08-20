import {
  CalendarDays,
  Camera,
  Eye,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

import type { PhotoResource } from "../../../data/photosData";

interface PhotosGridProps {
  photos: PhotoResource[];
  onView: (photo: PhotoResource) => void;
  onEdit: (photo: PhotoResource) => void;
  onDelete: (photo: PhotoResource) => void;
}

const PhotosGrid = ({ photos, onView, onEdit, onDelete }: PhotosGridProps) => {
  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
          <Camera size={26} />
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          No Photos Found
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          No photos match your current search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          {/* -------------------------------------------------- */}
          {/* Photo Preview */}
          {/* -------------------------------------------------- */}

          <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
            {photo.imageUrl ? (
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-teal-50 via-gray-50 to-blue-50 dark:from-teal-900/20 dark:via-gray-900 dark:to-blue-900/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-teal-600 shadow-sm dark:bg-gray-800/80 dark:text-teal-400">
                  <Camera size={28} />
                </div>

                <p className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  No Image Available
                </p>
              </div>
            )}

            {/* Dark overlay */}
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />

            {/* Status */}
            <div className="absolute right-3 top-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${
                  photo.status === "Active"
                    ? "bg-green-100/95 text-green-700 dark:bg-green-900/70 dark:text-green-400"
                    : "bg-gray-100/95 text-gray-600 dark:bg-gray-700/90 dark:text-gray-300"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    photo.status === "Active" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />

                {photo.status}
              </span>
            </div>

            {/* View Overlay */}
            <button
              type="button"
              onClick={() => onView(photo)}
              className="absolute inset-0 flex items-center justify-center bg-transparent text-white opacity-0 transition group-hover:opacity-100"
            >
              <span className="inline-flex items-center gap-2 rounded-xl bg-black/60 px-4 py-2.5 text-sm font-semibold shadow-lg backdrop-blur-sm transition hover:bg-black/75">
                <Eye size={17} />
                View Photo
              </span>
            </button>
          </div>

          {/* -------------------------------------------------- */}
          {/* Content */}
          {/* -------------------------------------------------- */}

          <div className="p-5">
            {/* Category + File Size */}
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                {photo.category}
              </span>

              <span className="truncate text-xs text-gray-400">
                {photo.fileSize}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-3 line-clamp-1 text-base font-bold text-gray-900 dark:text-white">
              {photo.title}
            </h3>

            {/* Description */}
            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
              {photo.description}
            </p>

            {/* Information */}
            <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4 dark:border-gray-700">
              {/* Event Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <CalendarDays size={14} className="shrink-0 text-gray-400" />

                <span className="truncate">{photo.eventDate}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={14} className="shrink-0 text-gray-400" />

                <span className="truncate">{photo.location}</span>
              </div>

              {/* Photographer */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Camera size={14} className="shrink-0 text-gray-400" />

                <span className="truncate">{photo.photographer}</span>
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* Actions */}
            {/* -------------------------------------------------- */}

            <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
              {/* View */}
              <button
                type="button"
                onClick={() => onView(photo)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:hover:bg-teal-900/40"
              >
                <Eye size={14} />
                View
              </button>

              {/* Edit */}
              <button
                type="button"
                onClick={() => onEdit(photo)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                title="Edit photo"
                aria-label={`Edit ${photo.title}`}
              >
                <Pencil size={15} />
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => onDelete(photo)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
                title="Delete photo"
                aria-label={`Delete ${photo.title}`}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotosGrid;
