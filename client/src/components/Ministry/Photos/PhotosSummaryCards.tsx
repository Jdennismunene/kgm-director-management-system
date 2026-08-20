import { Archive, Camera, Images, Tags } from "lucide-react";

import type { PhotoResource } from "../../../data/photosData";

interface PhotosSummaryCardsProps {
  photos: PhotoResource[];
}

const PhotosSummaryCards = ({ photos }: PhotosSummaryCardsProps) => {
  const totalPhotos = photos.length;

  const activePhotos = photos.filter(
    (photo) => photo.status === "Active",
  ).length;

  const archivedPhotos = photos.filter(
    (photo) => photo.status === "Archived",
  ).length;

  const categories = new Set(photos.map((photo) => photo.category)).size;

  const cards = [
    {
      title: "Total Photos",
      value: totalPhotos,
      description: "All photo records",
      icon: Images,
      iconClass:
        "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    },
    {
      title: "Active Photos",
      value: activePhotos,
      description: "Currently available",
      icon: Camera,
      iconClass:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      title: "Archived",
      value: archivedPhotos,
      description: "Archived photo records",
      icon: Archive,
      iconClass:
        "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    },
    {
      title: "Categories",
      value: categories,
      description: "Photo categories",
      icon: Tags,
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {card.description}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconClass}`}
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

export default PhotosSummaryCards;
