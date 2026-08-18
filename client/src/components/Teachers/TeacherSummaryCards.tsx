import { Users, UserCheck, UserX, BookOpen } from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface TeacherSummaryCardsProps {
  teachers: Teacher[];
}

const TeacherSummaryCards = ({ teachers }: TeacherSummaryCardsProps) => {
  const totalTeachers = teachers.length;

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active",
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "Inactive",
  ).length;

  const totalClasses = new Set(teachers.flatMap((teacher) => teacher.grade))
    .size;

  const cards = [
    {
      title: "Total Teachers",
      value: totalTeachers,
      icon: Users,
      description: "All registered teachers",
    },
    {
      title: "Active Teachers",
      value: activeTeachers,
      icon: UserCheck,
      description: "Currently active",
    },
    {
      title: "Inactive Teachers",
      value: inactiveTeachers,
      icon: UserX,
      description: "Currently inactive",
    },
    {
      title: "Classes Covered",
      value: totalClasses,
      icon: BookOpen,
      description: "Unique classes assigned",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30">
                <Icon size={20} className="text-teal-600 dark:text-teal-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherSummaryCards;
