import { BookOpen, CheckCircle2, Layers3, LibraryBig } from "lucide-react";

import type { TeachingManual } from "../../../data/teachingManualsData";

interface ManualsSummaryCardsProps {
  manuals: TeachingManual[];
}

const ManualsSummaryCards = ({ manuals }: ManualsSummaryCardsProps) => {
  const totalManuals = manuals.length;

  const activeManuals = manuals.filter(
    (manual) => manual.status === "Active",
  ).length;

  const totalLessons = manuals.reduce(
    (total, manual) => total + manual.lessonsCount,
    0,
  );

  const categories = new Set(manuals.map((manual) => manual.category)).size;

  const cards = [
    {
      title: "Total Manuals",
      value: totalManuals,
      description: "Teaching resources",
      icon: LibraryBig,
    },
    {
      title: "Active Manuals",
      value: activeManuals,
      description: "Currently in use",
      icon: CheckCircle2,
    },
    {
      title: "Categories",
      value: categories,
      description: "Resource categories",
      icon: Layers3,
    },
    {
      title: "Total Lessons",
      value: totalLessons,
      description: "Across all manuals",
      icon: BookOpen,
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
            <div className="flex items-start justify-between">
              {/* Information */}
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h2>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {card.description}
                </p>
              </div>

              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ManualsSummaryCards;
