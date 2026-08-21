import {
  CalendarCheck2,
  CalendarClock,
  CheckCircle2,
  Layers3,
} from "lucide-react";

interface ProgramsSummaryCardsProps {
  totalPrograms: number;
  thisYearPrograms: number;
  completedPrograms: number;
  upcomingPrograms: number;
}

const ProgramsSummaryCards = ({
  totalPrograms,
  thisYearPrograms,
  completedPrograms,
  upcomingPrograms,
}: ProgramsSummaryCardsProps) => {
  const cards = [
    {
      title: "Total Programs",
      value: totalPrograms,
      description: "All recorded programs",
      icon: Layers3,
    },
    {
      title: "This Year",
      value: thisYearPrograms,
      description: "Programs in 2026",
      icon: CalendarCheck2,
    },
    {
      title: "Completed",
      value: completedPrograms,
      description: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      title: "Upcoming",
      value: upcomingPrograms,
      description: "Scheduled programs",
      icon: CalendarClock,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

                <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {card.description}
                </p>
              </div>

              <div className="rounded-lg bg-teal-50 p-2.5 dark:bg-teal-900/30">
                <Icon size={21} className="text-teal-600 dark:text-teal-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgramsSummaryCards;
