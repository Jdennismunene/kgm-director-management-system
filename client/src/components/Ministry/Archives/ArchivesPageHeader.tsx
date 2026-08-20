import { Archive, Plus } from "lucide-react";

interface ArchivesPageHeaderProps {
  onArchiveResource: () => void;
}

const ArchivesPageHeader = ({ onArchiveResource }: ArchivesPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-gray-700 dark:bg-gray-800">
      {/* Left Side */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
          <Archive size={24} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Archives
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Manage resources that are no longer actively in use but need to be
            preserved for future reference.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <button
        type="button"
        onClick={onArchiveResource}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
      >
        <Plus size={17} />
        Archive Resource
      </button>
    </div>
  );
};

export default ArchivesPageHeader;
