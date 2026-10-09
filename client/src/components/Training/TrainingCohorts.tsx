import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound,
  Users,
} from "lucide-react";
import type { TrainingCohort } from "../../pages/Training/Training";

// =====================================================
// PROPS
// =====================================================

interface TrainingCohortsProps {
  cohorts: TrainingCohort[];
}

// =====================================================
// COMPONENT
// =====================================================

function TrainingCohorts({ cohorts }: TrainingCohortsProps) {
  // ===================================================
  // STATUS STYLES
  // ===================================================

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";

      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";

      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section className="mb-6">
      {/* SECTION HEADER */}

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Training Cohorts
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage training groups, schedules and participants
        </p>
      </div>

      {/* COHORT GRID */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {cohorts.map((cohort) => (
          <div
            key={cohort.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
          >
            {/* CARD HEADER */}

            <div className="border-b border-gray-200 p-5 dark:border-gray-700">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                      <Users
                        size={18}
                        className="text-[#5F4A8B] dark:text-purple-400"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {cohort.name}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {cohort.level}
                      </p>
                    </div>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                    cohort.status,
                  )}`}
                >
                  {cohort.status}
                </span>
              </div>
            </div>

            {/* CARD CONTENT */}

            <div className="space-y-4 p-5">
              {/* TRAINER */}

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <UserRound
                    size={17}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Trainer
                  </p>

                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {cohort.trainer}
                  </p>
                </div>
              </div>

              {/* DATES */}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={15}
                      className="text-gray-400 dark:text-gray-500"
                    />

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Start Date
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {cohort.startDate}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={15}
                      className="text-gray-400 dark:text-gray-500"
                    />

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      End Date
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {cohort.endDate}
                  </p>
                </div>
              </div>

              {/* TRAINEE COUNT */}

              <div className="flex items-center justify-between rounded-lg bg-purple-50 px-4 py-3 dark:bg-purple-900/20">
                <div className="flex items-center gap-2">
                  <Users
                    size={16}
                    className="text-[#5F4A8B] dark:text-purple-400"
                  />

                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Registered Trainees
                  </span>
                </div>

                <span className="text-sm font-semibold text-[#5F4A8B] dark:text-purple-300">
                  {cohort.trainees}
                </span>
              </div>

              {/* VIEW BUTTON */}

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <CheckCircle2 size={16} />
                View Cohort
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrainingCohorts;
