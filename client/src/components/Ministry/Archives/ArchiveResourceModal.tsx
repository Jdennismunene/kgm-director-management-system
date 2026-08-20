import { Archive, X } from "lucide-react";
import { useState } from "react";

import type { ArchiveResource } from "../../../data/archivesData";

interface ArchiveResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArchive: (archive: ArchiveResource) => void;
}

const ArchiveResourceModal = ({
  isOpen,
  onClose,
  onArchive,
}: ArchiveResourceModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState<ArchiveResource["type"]>("Document");

  const [category, setCategory] =
    useState<ArchiveResource["category"]>("Other");

  const [originalSection, setOriginalSection] = useState<
    ArchiveResource["originalSection"] | ""
  >("");
  const [originalDate, setOriginalDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [archivedDate, setArchivedDate] = useState("");

  if (!isOpen) return null;

  // --------------------------------------------------
  // Format Date
  // --------------------------------------------------

  const formatDate = (date: string) => {
    if (!date) {
      return new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !originalSection ||
      !originalDate ||
      !fileName.trim()
    ) {
      return;
    }

    const newArchive: ArchiveResource = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      type,
      category,
      archivedDate: formatDate(archivedDate),
      originalDate: formatDate(originalDate),
      fileName: fileName.trim(),
      fileSize: fileSize.trim() || "0 MB",
      originalResourceId: Date.now(),
      originalSection: originalSection as ArchiveResource["originalSection"],
    };

    onArchive(newArchive);

    // --------------------------------------------------
    // Reset Form
    // --------------------------------------------------

    setTitle("");
    setDescription("");
    setType("Document");
    setCategory("Other");
    setOriginalSection("");
    setOriginalDate("");
    setFileName("");
    setFileSize("");
    setArchivedDate("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <Archive size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Archive Resource
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Move a resource into the central archive.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Resource Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. VBS 2024 Documentation"
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
                placeholder="Describe the archived resource..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>

            {/* Type + Category */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Type */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Resource Type
                </label>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as ArchiveResource["type"])
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                >
                  <option value="Document">Document</option>
                  <option value="Photo Collection">Photo Collection</option>
                  <option value="Video">Video</option>
                  <option value="Audio">Audio</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as ArchiveResource["category"])
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                >
                  <option value="VBS">VBS</option>
                  <option value="Competition">Competition</option>
                  <option value="Baptism">Baptism</option>
                  <option value="Church Events">Church Events</option>
                  <option value="Sunday School">Sunday School</option>
                  <option value="Children Ministry">Children Ministry</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Original Section */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Original Section
              </label>

              <select
                value={originalSection}
                onChange={(e) =>
                  setOriginalSection(
                    e.target.value as ArchiveResource["originalSection"] | "",
                  )
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                <option value="">Select section</option>
                <option value="Library">Library</option>
                <option value="Documents">Documents</option>
                <option value="Photos">Photos</option>
              </select>
            </div>

            {/* Original Date + Archived Date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Original Date
                </label>

                <input
                  type="date"
                  value={originalDate}
                  onChange={(e) => setOriginalDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Archived Date
                </label>

                <input
                  type="date"
                  value={archivedDate}
                  onChange={(e) => setArchivedDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
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
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="resource-file.pdf"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  File Size
                </label>

                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="4.8 MB"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
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
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <Archive size={16} />
              Archive Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArchiveResourceModal;
