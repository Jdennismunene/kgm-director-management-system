import { BookOpen, CalendarCheck2, CircleCheck, Clock3 } from "lucide-react";

interface VBSSummaryCardsProps {
  totalStudies: number;
  thisYearStudies: number;
  completedStudies: number;
  upcomingStudies: number;
}

const VBSSummaryCards = ({
  totalStudies,
  thisYearStudies,
  completedStudies,
  upcomingStudies,
}: VBSSummaryCardsProps) => {
  const cards = [
    {
      title: "Total VBS",
      value: totalStudies,
      description: "All recorded Bible studies",
      icon: BookOpen,
      iconBg: "bg-teal-50 dark:bg-teal-900/30",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
    {
      title: "This Year",
      value: thisYearStudies,
      description: "VBS scheduled this year",
      icon: CalendarCheck2,
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Completed",
      value: completedStudies,
      description: "Successfully completed",
      icon: CircleCheck,
      iconBg: "bg-green-50 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Upcoming",
      value: upcomingStudies,
      description: "Upcoming Bible studies",
      icon: Clock3,
      iconBg: "bg-orange-50 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
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

export default VBSSummaryCards;
