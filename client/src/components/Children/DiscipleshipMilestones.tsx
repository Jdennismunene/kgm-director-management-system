import {
  Award,
  CheckCircle2,
  Pencil,
  Plus,
  Target,
  Trash2,
} from "lucide-react";

import type { DiscipleshipRecord } from "../../services/discipleshipService";

interface DiscipleshipMilestonesProps {
  milestones: DiscipleshipRecord[];
  onAdd: () => void;
  onEdit: (milestone: DiscipleshipRecord) => void;
  onDelete: (id: string) => void;
}

/**
 * Formats the database date into a readable date.
 *
 * Example:
 * 2026-08-31T00:00:00.000Z
 * becomes:
 * 31 Aug 2026
 */
const formatDate = (date: string | null) => {
  if (!date) {
    return "No date recorded";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
};

const DiscipleshipMilestones = ({
  milestones,
  onAdd,
  onEdit,
  onDelete,
}: DiscipleshipMilestonesProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
            <Award size={17} className="text-yellow-600 dark:text-yellow-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Discipleship Milestones
            </h3>

            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Progress through key spiritual development milestones
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <Plus size={15} />
          Add Milestone
        </button>
      </div>

      {/* =================================================
          MILESTONE LIST
      ================================================= */}

      {milestones.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <Target size={22} className="text-gray-400 dark:text-gray-300" />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            No discipleship records yet
          </h4>

          <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500 dark:text-gray-400">
            Add a discipleship milestone, Bible lesson, prayer activity, or
            other spiritual development record.
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={15} />
            Add First Record
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="flex items-start gap-4 p-5 transition hover:bg-gray-50/70 dark:hover:bg-gray-700/20"
            >
              {/* =================================================
                  STATUS ICON
              ================================================= */}

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  milestone.completed
                    ? "bg-green-50 dark:bg-green-900/30"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {milestone.completed ? (
                  <CheckCircle2
                    size={18}
                    className="text-green-600 dark:text-green-400"
                  />
                ) : (
                  <Target
                    size={18}
                    className="text-gray-400 dark:text-gray-300"
                  />
                )}
              </div>

              {/* =================================================
                  RECORD DETAILS
              ================================================= */}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {milestone.title}
                    </h4>

                    <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                      {milestone.type}
                    </p>
                  </div>

                  {/* =================================================
                      ACTIONS + STATUS
                  ================================================= */}

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        milestone.completed
                          ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {milestone.completed ? "Completed" : "In Progress"}
                    </span>

                    <button
                      type="button"
                      onClick={() => onEdit(milestone)}
                      title="Edit record"
                      className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(milestone.id)}
                      title="Delete record"
                      className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  {milestone.description}
                </p>

                {/* =================================================
                    METADATA
                ================================================= */}

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    {formatDate(milestone.date)}
                  </p>

                  {milestone.mentor && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Mentor: {milestone.mentor}
                    </p>
                  )}
                </div>

                {/* =================================================
                    NOTES
                ================================================= */}

                {milestone.notes && (
                  <div className="mt-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/40">
                    <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
                      {milestone.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscipleshipMilestones;
