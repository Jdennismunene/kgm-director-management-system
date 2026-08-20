import { ImagePlus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { PhotoResource } from "../../../data/photosData";

interface EditPhotoModalProps {
  isOpen: boolean;
  photo: PhotoResource | null;
  onClose: () => void;
  onSave: (photo: PhotoResource) => void;
}

const EditPhotoModal = ({
  isOpen,
  photo,
  onClose,
  onSave,
}: EditPhotoModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] =
    useState<PhotoResource["category"]>("Photography");

  const [event, setEvent] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [dateAdded, setDateAdded] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [location, setLocation] = useState("");
  const [photographer, setPhotographer] = useState("");

  const [status, setStatus] = useState<PhotoResource["status"]>("Active");

  // --------------------------------------------------
  // Load Existing Photo
  // --------------------------------------------------

  useEffect(() => {
    if (!photo) return;

    setTitle(photo.title);
    setDescription(photo.description);
    setCategory(photo.category);
    setEvent(photo.event);

    setFileName(photo.fileName);
    setFileSize(photo.fileSize);

    setDateAdded(photo.dateAdded);
    setEventDate(photo.eventDate);

    setLocation(photo.location);
    setPhotographer(photo.photographer);

    setStatus(photo.status);

    setSelectedFile(null);
    setImagePreview(photo.imageUrl || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [photo]);

  if (!isOpen || !photo) return null;

  // --------------------------------------------------
  // Handle File Selection
  // --------------------------------------------------

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    // Revoke previous temporary preview
    if (selectedFile && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedFile(file);

    setFileName(file.name);

    setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // --------------------------------------------------
  // Remove / Restore Image
  // --------------------------------------------------

  const handleRemoveNewImage = () => {
    if (selectedFile && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedFile(null);

    setImagePreview(photo.imageUrl || "");

    setFileName(photo.fileName);
    setFileSize(photo.fileSize);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !event.trim() ||
      !fileName.trim() ||
      !eventDate ||
      !location.trim() ||
      !photographer.trim()
    ) {
      return;
    }

    const updatedPhoto: PhotoResource = {
      id: photo.id,

      title: title.trim(),

      description: description.trim(),

      category,

      event: event.trim(),

      fileName: fileName.trim(),

      fileSize: fileSize.trim() || "0 MB",

      imageUrl: imagePreview,

      dateAdded,

      eventDate,

      location: location.trim(),

      photographer: photographer.trim(),

      status,
    };

    onSave(updatedPhoto);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <ImagePlus size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Edit Photo
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Update photo and event information.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Photo Upload */}

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Photo
              </label>

              <div className="overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt={title || "Photo preview"}
                      className="h-64 w-full object-cover"
                    />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/80"
                      >
                        <Upload size={15} />
                        Replace Photo
                      </button>

                      {selectedFile && (
                        <button
                          type="button"
                          onClick={handleRemoveNewImage}
                          className="inline-flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/80"
                        >
                          <X size={15} />
                          Keep Original
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center px-6 py-10 text-center transition hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                      <Upload size={22} />
                    </div>

                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Click to upload a photo
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      JPG, JPEG, PNG or WEBP
                    </p>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Title */}

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Photo Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. VBS 2026 Opening Day"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the photo or event..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>

            {/* Category + Event */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as PhotoResource["category"])
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                >
                  <option value="Photography">Photography</option>
                  <option value="VBS">VBS</option>
                  <option value="Competition">Competition</option>
                  <option value="Baptism">Baptism</option>
                  <option value="Church Events">Church Events</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Event
                </label>

                <input
                  type="text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  placeholder="e.g. VBS 2026"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* File Name + File Size */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  File Name
                </label>

                <input
                  type="text"
                  value={fileName}
                  readOnly
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  File Size
                </label>

                <input
                  type="text"
                  value={fileSize}
                  readOnly
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3.5 py-2.5 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                />
              </div>
            </div>

            {/* Event Date + Date Added */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Event Date
                </label>

                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Aug 10, 2026"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Date Added
                </label>

                <input
                  type="text"
                  value={dateAdded}
                  onChange={(e) => setDateAdded(e.target.value)}
                  placeholder="Aug 12, 2026"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                />
              </div>
            </div>

            {/* Location */}

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Church"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>

            {/* Photographer */}

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Photographer / Media Team
              </label>

              <input
                type="text"
                value={photographer}
                onChange={(e) => setPhotographer(e.target.value)}
                placeholder="e.g. Church Media Team"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as PhotoResource["status"])
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Footer */}

          <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <ImagePlus size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPhotoModal;
