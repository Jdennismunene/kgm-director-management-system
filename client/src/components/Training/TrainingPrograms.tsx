import { BookOpen, Clock3, GraduationCap, Users } from "lucide-react";
import type { Trainee } from "../../pages/Training/Training";

// =====================================================
// PROPS
// =====================================================

interface TrainingProgramsProps {
  trainees: Trainee[];
}

// =====================================================
// COMPONENT
// =====================================================

function TrainingPrograms({ trainees }: TrainingProgramsProps) {
  // ===================================================
  // CALCULATE TRAINEES BY LEVEL
  // ===================================================

  const level1Trainees = trainees.filter(
    (trainee) => trainee.level === "Level 1",
  ).length;

  const level2Trainees = trainees.filter(
    (trainee) => trainee.level === "Level 2",
  ).length;

  // ===================================================
  // TRAINING PROGRAMS
  // ===================================================

  const programs = [
    {
      level: "Level 1",
      title: "Foundation Training",
      description:
        "Foundation-level training covering Christian education, children's ministry, Bible teaching, lesson planning and discipleship.",
      trainees: level1Trainees,
      duration: "12 Weeks",
      icon: GraduationCap,
      iconBackground: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      level: "Level 2",
      title: "Advanced Training",
      description:
        "Advanced training focused on leadership, discipleship, mentorship, ministry planning, child protection and practical ministry.",
      trainees: level2Trainees,
      duration: "14 Weeks",
      icon: BookOpen,
      iconBackground: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section className="mb-6">
      {/* SECTION HEADER */}

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Training Programs
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          KGM training programs and learning levels
        </p>
      </div>

      {/* PROGRAM GRID */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {programs.map((program) => {
          const Icon = program.icon;

          return (
            <div
              key={program.level}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              {/* CARD HEADER */}

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg ${program.iconBackground}`}
                  >
                    <Icon size={22} className={program.iconColor} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {program.level}
                      </h3>

                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Active
                      </span>
                    </div>

                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                      {program.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}

              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {program.description}
              </p>

              {/* PROGRAM STATS */}

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Users
                      size={16}
                      className="text-gray-400 dark:text-gray-500"
                    />

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Trainees
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    {program.trainees}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={16}
                      className="text-gray-400 dark:text-gray-500"
                    />

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Duration
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    {program.duration}
                  </p>
                </div>
              </div>

              {/* ACTION */}

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#5F4A8B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4f3d75]"
              >
                <BookOpen size={16} />
                View {program.level}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TrainingPrograms;
