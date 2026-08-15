import {
  Award,
  BookOpen,
  CheckCircle2,
  Heart,
  Star,
  Target,
  UserRound,
} from "lucide-react";

const Discipleship = () => {
  const milestones = [
    {
      title: "Salvation",
      description: "Child has made a personal commitment to follow Christ.",
      date: "June 15, 2024",
      completed: true,
    },
    {
      title: "Bible Basics",
      description: "Completed the introductory Bible study lessons.",
      date: "August 20, 2024",
      completed: true,
    },
    {
      title: "Prayer Life",
      description: "Learning and developing a consistent prayer routine.",
      date: "July 12, 2026",
      completed: true,
    },
    {
      title: "Serving Others",
      description: "Participating in church service and community activities.",
      date: "In Progress",
      completed: false,
    },
  ];

  return (
    <div className="mt-5 space-y-5">
      {/* Page Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Discipleship
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track the child's spiritual growth, milestones, and discipleship
          journey.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Discipleship Progress
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                75%
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <Target size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
              style={{ width: "75%" }}
            />
          </div>
        </div>

        {/* Milestones */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Milestones
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                3 / 4
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <Award size={20} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Bible Lessons */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Bible Lessons
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                18
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <BookOpen
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Mentor */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Mentor
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                David Kamau
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
              <UserRound
                size={20}
                className="text-yellow-600 dark:text-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Spiritual Growth */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Current Development */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-700">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <Heart size={17} className="text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Spiritual Development
            </h3>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Bible Knowledge
                </span>

                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  80%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                  style={{ width: "80%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Prayer Life
                </span>

                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  70%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                  style={{ width: "70%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  Christian Character
                </span>

                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  85%
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Information */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-700">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <UserRound
                size={17}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>

            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Mentor Information
            </h3>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <UserRound
                  size={22}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  David Kamau
                </h4>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Children's Ministry Mentor
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Assigned: January 15, 2026
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
              <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
                David is responsible for guiding the child's spiritual
                development and following up on their discipleship progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
            <Star size={17} className="text-yellow-600 dark:text-yellow-400" />
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

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {milestones.map((milestone, index) => (
            <div
              key={`${milestone.title}-${index}`}
              className="flex items-start gap-4 p-5"
            >
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

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {milestone.title}
                  </h4>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      milestone.completed
                        ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {milestone.completed ? "Completed" : "In Progress"}
                  </span>
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  {milestone.description}
                </p>

                <p className="mt-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                  {milestone.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discipleship;
