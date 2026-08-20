import { Archive, FileText, Image, Layers3 } from "lucide-react";

import type { ArchiveResource } from "../../../data/archivesData";

interface ArchivesSummaryCardsProps {
  archives: ArchiveResource[];
}

const ArchivesSummaryCards = ({ archives }: ArchivesSummaryCardsProps) => {
  const totalArchived = archives.length;

  const totalDocuments = archives.filter(
    (archive) => archive.type === "Document",
  ).length;

  const totalPhotos = archives.filter(
    (archive) => archive.type === "Photo Collection",
  ).length;

  const totalOther = archives.filter(
    (archive) =>
      archive.type === "Video" ||
      archive.type === "Audio" ||
      archive.type === "Other",
  ).length;

  const cards = [
    {
      title: "Total Archived",
      value: totalArchived,
      icon: Archive,
      iconBg:
        "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    },
    {
      title: "Documents",
      value: totalDocuments,
      icon: FileText,
      iconBg:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Photos",
      value: totalPhotos,
      icon: Image,
      iconBg:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      title: "Other",
      value: totalOther,
      icon: Layers3,
      iconBg:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Information */}
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Archived resources
                </p>
              </div>

              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon size={21} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArchivesSummaryCards;
