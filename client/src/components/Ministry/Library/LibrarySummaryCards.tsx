import { Archive, BookOpen, FileText, Image, Video } from "lucide-react";

import type { LibraryResource } from "../../../data/libraryData";

interface LibrarySummaryCardsProps {
  resources: LibraryResource[];
}

const LibrarySummaryCards = ({ resources }: LibrarySummaryCardsProps) => {
  const totalResources = resources.length;

  const documents = resources.filter(
    (resource) => resource.type === "Document",
  ).length;

  const photos = resources.filter(
    (resource) => resource.type === "Photo",
  ).length;

  const videos = resources.filter(
    (resource) => resource.type === "Video",
  ).length;

  const archived = resources.filter(
    (resource) => resource.status === "Archived",
  ).length;

  const cards = [
    {
      title: "Total Resources",
      value: totalResources,
      icon: BookOpen,
      iconBg: "bg-teal-100 dark:bg-teal-900/30",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
    {
      title: "Documents",
      value: documents,
      icon: FileText,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Photos",
      value: photos,
      icon: Image,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Videos",
      value: videos,
      icon: Video,
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Archived",
      value: archived,
      icon: Archive,
      iconBg: "bg-gray-100 dark:bg-gray-700",
      iconColor: "text-gray-600 dark:text-gray-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
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

export default LibrarySummaryCards;
