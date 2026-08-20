import { Camera, Plus } from "lucide-react";

interface PhotosPageHeaderProps {
  onAddPhoto: () => void;
}

const PhotosPageHeader = ({ onAddPhoto }: PhotosPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Information */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
          <Camera size={21} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Photos
          </h1>

          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Manage and organize ministry photography and event memories.
          </p>
        </div>
      </div>

      {/* Add Photo Button */}
      <button
        type="button"
        onClick={onAddPhoto}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
      >
        <Plus size={18} />
        Add Photo
      </button>
    </div>
  );
};

export default PhotosPageHeader;
