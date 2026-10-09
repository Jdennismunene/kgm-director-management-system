import { Users, GraduationCap, BookOpen, CalendarCheck } from "lucide-react";
import type { Trainee } from "../../pages/Training/Training";

// =====================================================
// PROPS
// =====================================================

interface TrainingSummaryProps {
  trainees: Trainee[];
  activeCohorts: number;
}

// =====================================================
// COMPONENT
// =====================================================

function TrainingSummary({ trainees, activeCohorts }: TrainingSummaryProps) {
  // ===================================================
  // CALCULATE SUMMARY VALUES
  // ===================================================

  const totalTrainees = trainees.length;

  const level1Trainees = trainees.filter(
    (trainee) => trainee.level === "Level 1",
  ).length;

  const level2Trainees = trainees.filter(
    (trainee) => trainee.level === "Level 2",
  ).length;

  // ===================================================
  // SUMMARY CARDS
  // ===================================================

  const summaryCards = [
    {
      title: "Total Trainees",
      value: totalTrainees,
      description: "Registered trainees",
      icon: Users,
    },
    {
      title: "Level 1 Trainees",
      value: level1Trainees,
      description: "Foundation training",
      icon: GraduationCap,
    },
    {
      title: "Level 2 Trainees",
      value: level2Trainees,
      description: "Advanced training",
      icon: BookOpen,
    },
    {
      title: "Active Cohorts",
      value: activeCohorts,
      description: "Currently running",
      icon: CalendarCheck,
    },
  ];

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
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

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Icon
                  size={22}
                  className="text-[#5F4A8B] dark:text-purple-400"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TrainingSummary;
