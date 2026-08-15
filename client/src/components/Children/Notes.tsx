import { FileText, Plus, UserRound, Clock3, Pin } from "lucide-react";

const Notes = () => {
  const notes = [
    {
      title: "Positive Participation",
      content:
        "Brian participated actively during the Bible study session and demonstrated a good understanding of the lesson.",
      author: "Sarah Wanjiku",
      role: "Sunday School Teacher",
      date: "Aug 9, 2026",
      type: "General",
      pinned: true,
    },
    {
      title: "Prayer Request",
      content:
        "Parent requested that the ministry team remember the family in prayer during the coming week.",
      author: "David Kamau",
      role: "Children's Ministry Mentor",
      date: "Aug 2, 2026",
      type: "Prayer",
      pinned: false,
    },
    {
      title: "Academic Progress",
      content:
        "Child continues to show good progress in class and is becoming more confident when answering questions.",
      author: "Mary Njeri",
      role: "Class Teacher",
      date: "Jul 26, 2026",
      type: "Progress",
      pinned: false,
    },
    {
      title: "Follow-up Required",
      content:
        "Follow up with the parent regarding participation in the upcoming children's retreat.",
      author: "David Kamau",
      role: "Children's Ministry Mentor",
      date: "Jul 19, 2026",
      type: "Follow-up",
      pinned: false,
    },
  ];

  return (
    <div className="mt-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notes
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View important notes, observations, and follow-ups for this child.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus size={17} />
          Add Note
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Notes */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Notes
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                12
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <FileText
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Pinned */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Pinned Notes
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                1
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
              <Pin size={20} className="text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Recent */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Recent Notes
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                4
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <Clock3
                size={20}
                className="text-green-600 dark:text-green-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <FileText
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Child Notes
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Recent observations and important information
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            All Notes
          </button>
        </div>

        {/* Notes */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {notes.map((note, index) => (
            <div
              key={`${note.title}-${index}`}
              className="p-5 transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 sm:flex dark:bg-gray-700">
                  <FileText
                    size={19}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  {/* Title + Badge */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {note.title}
                      </h4>

                      {note.pinned && (
                        <Pin size={14} className="text-yellow-500" />
                      )}
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        note.type === "Prayer"
                          ? "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                          : note.type === "Progress"
                            ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : note.type === "Follow-up"
                              ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {note.type}
                    </span>
                  </div>

                  {/* Note Content */}
                  <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {note.content}
                  </p>

                  {/* Author */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                        <UserRound
                          size={14}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>

                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                        {note.author}
                      </span>
                    </div>

                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {note.role}
                    </span>

                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {note.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
