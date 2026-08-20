import {
  ArrowLeft,
  Archive,
  CalendarDays,
  FileAudio,
  FileText,
  FileType,
  FileVideo,
  Image,
  Pencil,
  Tag,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  libraryData,
  type LibraryResource,
} from "../../../data/libraryData";

const LibraryRecords = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const resource: LibraryResource | undefined = libraryData.find(
    (item) => item.id === Number(id),
  );

  const getResourceIcon = (type: LibraryResource["type"]) => {
    switch (type) {
      case "Document":
        return FileText;

      case "Video":
        return FileVideo;

      case "Photo":
        return Image;

      case "Audio":
        return FileAudio;

      default:
        return FileType;
    }
  };

  // Resource not found
  if (!resource) {
    return (
      <div className="mx-4 mt-3 pb-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500">
            <Archive size={26} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
            Resource Not Found
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The library resource you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/resources/library")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <ArrowLeft size={17} />
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  const ResourceIcon = getResourceIcon(resource.type);

  return (
    <div className="mx-4 mt-3 space-y-6 pb-3">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/resources/library")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
      >
        <ArrowLeft size={17} />
        Back to Library
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <ResourceIcon size={30} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {resource.title}
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {resource.fileName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                resource.status === "Active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  resource.status === "Active"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />

              {resource.status}
            </span>

            {/* Edit */}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Pencil size={16} />
              Edit Resource
            </button>

            {/* Delete */}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Resource Type */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <ResourceIcon size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Resource Type
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {resource.type}
              </p>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Tag size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Category
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {resource.category}
              </p>
            </div>
          </div>
        </div>

        {/* File Size */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Archive size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                File Size
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {resource.fileSize}
              </p>
            </div>
          </div>
        </div>

        {/* Date Added */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <CalendarDays size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Date Added
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {resource.dateAdded}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Description */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            About This Resource
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
            {resource.description}
          </p>
        </div>

        {/* Resource Information */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Resource Information
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                File Name
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-gray-900 dark:text-white">
                {resource.fileName}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Resource Type
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {resource.type}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Category
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {resource.category}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Date Added
              </p>

              <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                <CalendarDays size={15} className="text-gray-400" />
                {resource.dateAdded}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Preview */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Resource Preview
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Preview and file viewing functionality can be connected when real
          files are added to the system.
        </p>

        <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
          <ResourceIcon
            size={32}
            className="mx-auto text-gray-400 dark:text-gray-500"
          />

          <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Preview not available
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            The resource preview will appear here when the actual file is
            connected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LibraryRecords;
