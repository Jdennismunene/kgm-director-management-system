import {
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  PlayCircle,
} from "lucide-react";

const Lessons = () => {
  const lessons = [
    {
      title: "Knowing God",
      category: "Bible Study",
      date: "Aug 9, 2026",
      progress: 100,
      status: "Completed",
      score: "92%",
    },
    {
      title: "The Life of Jesus",
      category: "Bible Study",
      date: "Aug 2, 2026",
      progress: 100,
      status: "Completed",
      score: "88%",
    },
    {
      title: "Prayer and Faith",
      category: "Discipleship",
      date: "Jul 26, 2026",
      progress: 75,
      status: "In Progress",
      score: "-",
    },
    {
      title: "Christian Character",
      category: "Discipleship",
      date: "Jul 19, 2026",
      progress: 50,
      status: "In Progress",
      score: "-",
    },
    {
      title: "Serving Others",
      category: "Christian Living",
      date: "Jul 12, 2026",
      progress: 100,
      status: "Completed",
      score: "95%",
    },
  ];

  return (
    <div className="mt-5 space-y-5">
      {/* Page Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lessons
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track lessons, learning progress, and completed activities.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Lessons */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Lessons
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                24
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <BookOpen
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Completed
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                18
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <CheckCircle2
                size={20}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                In Progress
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                4
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
              <Clock3
                size={20}
                className="text-yellow-600 dark:text-yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Average Score
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                91%
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <GraduationCap
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lesson History */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <BookOpen
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Lesson History
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Recent lessons and learning progress
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            All Lessons
          </button>
        </div>

        {/* Lessons */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {lessons.map((lesson, index) => (
            <div
              key={`${lesson.title}-${index}`}
              className="p-5 transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Lesson Information */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <PlayCircle
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {lesson.title}
                    </h4>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{lesson.category}</span>
                      <span>•</span>
                      <span>{lesson.date}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="w-full lg:max-w-xs">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Progress
                    </span>

                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                      {lesson.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                </div>

                {/* Status + Score */}
                <div className="flex items-center gap-4">
                  {lesson.status === "Completed" ? (
                    <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                      In Progress
                    </span>
                  )}

                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                    {lesson.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
