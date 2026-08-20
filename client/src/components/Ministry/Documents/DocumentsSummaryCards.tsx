import { Archive, CheckCircle2, FileText, FolderOpen } from "lucide-react";

import type { DocumentResource } from "../../../data/documentsData";

interface DocumentsSummaryCardsProps {
  documents: DocumentResource[];
}

const DocumentsSummaryCards = ({ documents }: DocumentsSummaryCardsProps) => {
  const totalDocuments = documents.length;

  const activeDocuments = documents.filter(
    (document) => document.status === "Active",
  ).length;

  const archivedDocuments = documents.filter(
    (document) => document.status === "Archived",
  ).length;

  const categories = new Set(documents.map((document) => document.category))
    .size;

  const cards = [
    {
      label: "Total Documents",
      value: totalDocuments,
      icon: FileText,
      iconBg: "bg-teal-100 dark:bg-teal-900/30",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
    {
      label: "Active Documents",
      value: activeDocuments,
      icon: CheckCircle2,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Archived",
      value: archivedDocuments,
      icon: Archive,
      iconBg: "bg-gray-100 dark:bg-gray-700",
      iconColor: "text-gray-600 dark:text-gray-400",
    },
    {
      label: "Categories",
      value: categories,
      icon: FolderOpen,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.label}
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

export default DocumentsSummaryCards;
