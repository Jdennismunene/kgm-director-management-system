import { BookOpen, CheckCircle2, Clock3, UsersRound } from "lucide-react";

import type { BibleLesson } from "../../../data/bibleLessonsData";

interface BibleLessonsSummaryCardsProps {
  lessons: BibleLesson[];
}

const BibleLessonsSummaryCards = ({
  lessons,
}: BibleLessonsSummaryCardsProps) => {
  const totalLessons = lessons.length;

  const activeLessons = lessons.filter(
    (lesson) => lesson.status === "Active",
  ).length;

  const totalDuration = lessons.reduce(
    (total, lesson) => total + lesson.duration,
    0,
  );

  const ageGroups = new Set(lessons.map((lesson) => lesson.ageGroup)).size;

  const cards = [
    {
      title: "Total Lessons",
      value: totalLessons,
      description: "Available Bible lessons",
      icon: BookOpen,
      iconClass:
        "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    },
    {
      title: "Active Lessons",
      value: activeLessons,
      description: "Currently available",
      icon: CheckCircle2,
      iconClass:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      title: "Teaching Time",
      value: `${totalDuration} min`,
      description: "Total lesson duration",
      icon: Clock3,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
    {
      title: "Age Groups",
      value: ageGroups,
      description: "Learner groups covered",
      icon: UsersRound,
      iconClass:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
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
            <div className="flex items-start justify-between gap-3">
              {/* Text */}
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {card.description}
                </p>
              </div>

              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
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

export default BibleLessonsSummaryCards;
