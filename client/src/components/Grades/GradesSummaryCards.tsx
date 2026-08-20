import { BookOpen, CheckCircle2, Users, XCircle } from "lucide-react";
import type { Grade } from "../../data/gradesData";

interface GradesSummaryCardsProps {
  grades: Grade[];
}

const GradesSummaryCards = ({ grades }: GradesSummaryCardsProps) => {
  const totalGrades = grades.length;

  const activeGrades = grades.filter(
    (grade) => grade.status === "Active",
  ).length;

  const inactiveGrades = grades.filter(
    (grade) => grade.status === "Inactive",
  ).length;

  const totalMembers = grades.reduce(
    (total, grade) => total + grade.members,
    0,
  );

  const cards = [
    {
      label: "Total Grades",
      value: totalGrades,
      icon: BookOpen,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Active Grades",
      value: activeGrades,
      icon: CheckCircle2,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Inactive Grades",
      value: inactiveGrades,
      icon: XCircle,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      label: "Total Members",
      value: totalMembers,
      icon: Users,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}
            >
              <Icon size={19} className={card.iconColor} />
            </div>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {card.label}
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GradesSummaryCards;
