import { CalendarPlus, CircleCheck, Users, UsersRound } from "lucide-react";
import type { Parent } from "../../data/parentsData";

interface ParentsSummaryCardsProps {
  parents: Parent[];
}

const ParentsSummaryCards = ({ parents }: ParentsSummaryCardsProps) => {
  const totalParents = parents.length;

  const activeParents = parents.filter(
    (parent) => parent.status === "Active",
  ).length;

  const parentsWithChildren = parents.filter(
    (parent) => parent.childrenIds.length > 0,
  ).length;

  const recentRegistrations = parents.filter((parent) => {
    const joinedDate = new Date(parent.joinedDate);
    const now = new Date();

    const difference = now.getTime() - joinedDate.getTime();

    const daysDifference = difference / (1000 * 60 * 60 * 24);

    return daysDifference <= 30;
  }).length;

  const cards = [
    {
      title: "Total Parents",
      value: totalParents,
      icon: UsersRound,
      description: "Registered parents",
    },
    {
      title: "Active Parents",
      value: activeParents,
      icon: CircleCheck,
      description: "Currently active",
    },
    {
      title: "With Children",
      value: parentsWithChildren,
      icon: Users,
      description: "Linked to children",
    },
    {
      title: "Recent Registrations",
      value: recentRegistrations,
      icon: CalendarPlus,
      description: "Joined in the last 30 days",
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
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                <Icon size={21} />
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

export default ParentsSummaryCards;
