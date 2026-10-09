import { BookOpen, Download, FileText } from "lucide-react";
import type { TrainingManual } from "../../pages/Training/Training";

// =====================================================
// PROPS
// =====================================================

interface TrainingManualsProps {
  manuals: TrainingManual[];
}

// =====================================================
// COMPONENT
// =====================================================

function TrainingManuals({ manuals }: TrainingManualsProps) {
  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section className="mb-6">
      {/* SECTION HEADER */}

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Training Manuals
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Training materials and learning resources
        </p>
      </div>

      {/* MANUAL GRID */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {manuals.map((manual) => (
          <div
            key={manual.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
          >
            {/* HEADER */}

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <BookOpen
                    size={22}
                    className="text-[#5F4A8B] dark:text-purple-400"
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {manual.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {manual.edition}
                  </p>
                </div>
              </div>

              {/* LEVEL BADGE */}

              <span className="shrink-0 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-[#5F4A8B] dark:bg-purple-900/30 dark:text-purple-300">
                {manual.level}
              </span>
            </div>

            {/* DESCRIPTION */}

            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {manual.description}
            </p>

            {/* MODULE INFORMATION */}

            <div className="mt-5 flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-800">
              <FileText
                size={17}
                className="text-gray-400 dark:text-gray-500"
              />

              <span className="text-sm text-gray-600 dark:text-gray-400">
                Training Modules
              </span>

              <span className="ml-auto text-sm font-semibold text-gray-900 dark:text-white">
                {manual.modules}
              </span>
            </div>

            {/* DOWNLOAD BUTTON */}

            <button
              type="button"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-[#5F4A8B] px-4 py-2.5 text-sm font-medium text-[#5F4A8B] transition hover:bg-[#5F4A8B] hover:text-white dark:border-purple-400 dark:text-purple-300 dark:hover:bg-purple-500 dark:hover:text-white"
            >
              <Download size={16} />
              Download Manual
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrainingManuals;
