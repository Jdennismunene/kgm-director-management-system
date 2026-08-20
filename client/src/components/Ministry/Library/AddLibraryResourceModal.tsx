import { useState } from "react";
import { FilePlus2, Upload, X, FileText, Film, Image, Music } from "lucide-react";

import type { LibraryResource } from "../../../data/libraryData";

interface AddLibraryResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (resource: LibraryResource) => void;
}

const AddLibraryResourceModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddLibraryResourceModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] =
    useState<LibraryResource["type"]>("Document");
  const [category, setCategory] =
    useState<LibraryResource["category"]>("General");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] =
    useState<LibraryResource["status"]>("Active");

  if (!isOpen) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(
      index === 0 ? 0 : 1,
    )} ${units[index]}`;
  };

  const getAcceptedFileTypes = () => {
    switch (type) {
      case "Document":
        return ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt";

      case "Video":
        return ".mp4,.mov,.avi,.mkv,.webm";

      case "Photo":
        return ".jpg,.jpeg,.png,.webp,.gif";

      case "Audio":
        return ".mp3,.wav,.m4a,.aac,.ogg";

      default:
        return undefined;
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleTypeChange = (
    value: LibraryResource["type"],
  ) => {
    setType(value);
    setSelectedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !selectedFile) {
      return;
    }

    const newResource: LibraryResource = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      type,
      category,
      fileName: selectedFile.name,
      fileSize: formatFileSize(selectedFile.size),
      dateAdded: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status,
    };

    onAdd(newResource);

    setTitle("");
    setDescription("");
    setType("Document");
    setCategory("General");
    setSelectedFile(null);
    setStatus("Active");
  };

  const getFileIcon = () => {
    if (!selectedFile) return <Upload size={22} />;

    switch (type) {
      case "Document":
        return <FileText size={22} />;

      case "Video":
        return <Film size={22} />;

      case "Photo":
        return <Image size={22} />;

      case "Audio":
        return <Music size={22} />;

      default:
        return <Upload size={22} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <FilePlus2 size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Add Library Resource
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Add a new resource to the ministry library.
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

        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Resource Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Vocational Bible School 2026"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this resource..."
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resource Type
                </label>

                <select
                  value={type}
                  onChange={(e) =>
                    handleTypeChange(
                      e.target.value as LibraryResource["type"],
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                >
                  <option value="Document">Document</option>
                  <option value="Video">Video</option>
                  <option value="Photo">Photo</option>
                  <option value="Audio">Audio</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value as LibraryResource["category"],
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                >
                  <option value="Photography">Photography</option>
                  <option value="VBS">VBS</option>
                  <option value="Competition">Competition</option>
                  <option value="Baptism">Baptism</option>
                  <option value="Teaching">Teaching</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Resource
              </label>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept={getAcceptedFileTypes()}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-7 text-center transition hover:border-teal-400 hover:bg-teal-50/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-teal-600 dark:hover:bg-teal-900/10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                    {getFileIcon()}
                  </div>

                  {selectedFile ? (
                    <>
                      <p className="mt-3 truncate px-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedFile.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(selectedFile.size)}
                      </p>

                      <p className="mt-2 text-xs font-medium text-teal-600 dark:text-teal-400">
                        Click to replace file
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Click to upload a file
                      </p>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {type === "Document" &&
                          "PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX or TXT"}

                        {type === "Video" &&
                          "MP4, MOV, AVI, MKV or WEBM"}

                        {type === "Photo" &&
                          "JPG, JPEG, PNG, WEBP or GIF"}

                        {type === "Audio" &&
                          "MP3, WAV, M4A, AAC or OGG"}

                        {type === "Other" &&
                          "Select any supported file type"}
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as LibraryResource["status"],
                  )
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

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
              disabled={!selectedFile}
              className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLibraryResourceModal;
