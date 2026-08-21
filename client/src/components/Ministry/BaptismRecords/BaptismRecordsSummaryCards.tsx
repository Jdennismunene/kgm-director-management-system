import { Award, CalendarDays, ClipboardList, Droplets } from "lucide-react";

interface BaptismRecordsSummaryCardsProps {
  totalRecords: number;
  thisYear: number;
  pending: number;
  certificatesIssued: number;
}

const BaptismRecordsSummaryCards = ({
  totalRecords,
  thisYear,
  pending,
  certificatesIssued,
}: BaptismRecordsSummaryCardsProps) => {
  const cards = [
    {
      title: "Total Records",
      value: totalRecords,
      description: "All baptism records",
      icon: Droplets,
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "This Year",
      value: thisYear,
      description: "Baptisms recorded this year",
      icon: CalendarDays,
      iconBg: "bg-purple-50 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Pending",
      value: pending,
      description: "Awaiting baptism",
      icon: ClipboardList,
      iconBg: "bg-orange-50 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Certificates Issued",
      value: certificatesIssued,
      description: "Baptism certificates issued",
      icon: Award,
      iconBg: "bg-green-50 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}
              >
                <Icon size={20} className={card.iconColor} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BaptismRecordsSummaryCards;
