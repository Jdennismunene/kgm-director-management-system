import { BookOpen, Plus } from "lucide-react";

interface LibraryPageHeaderProps {
  onAddResource: () => void;
}

const LibraryPageHeader = ({
  onAddResource,
}: LibraryPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Library
            </h1>

            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Manage ministry resources, media, documents, and archives.
            </p>
          </div>
        </div>
      </div>

      {/* Add Resource */}
      <button
        type="button"
        onClick={onAddResource}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:bg-teal-600 dark:hover:bg-teal-700"
      >
        <Plus size={18} />
        Add Resource
      </button>
    </div>
  );
};

export default LibraryPageHeader;