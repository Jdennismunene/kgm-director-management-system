import { ClipboardList, FileCheck2, FileText, FileWarning } from "lucide-react";

import type { BaptismDocument } from "../../../data/baptismDocumentationData";

interface BaptismDocumentationSummaryCardsProps {
  documents: BaptismDocument[];
}

const BaptismDocumentationSummaryCards = ({
  documents,
}: BaptismDocumentationSummaryCardsProps) => {
  const totalDocuments = documents.length;

  const certificates = documents.filter(
    (document) => document.documentType === "Baptism Certificate",
  ).length;

  const consentForms = documents.filter(
    (document) => document.documentType === "Consent Form",
  ).length;

  const missingDocuments = documents.filter(
    (document) => document.status === "Missing",
  ).length;

  const summaryCards = [
    {
      title: "Total Documents",
      value: totalDocuments,
      description: "All baptism documents",
      icon: FileText,
    },
    {
      title: "Certificates",
      value: certificates,
      description: "Baptism certificates",
      icon: FileCheck2,
    },
    {
      title: "Consent Forms",
      value: consentForms,
      description: "Parent consent forms",
      icon: ClipboardList,
    },
    {
      title: "Missing Documents",
      value: missingDocuments,
      description: "Documents still required",
      icon: FileWarning,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {card.description}
                </p>
              </div>

              <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
                <Icon size={22} className="text-gray-600 dark:text-gray-300" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BaptismDocumentationSummaryCards;
