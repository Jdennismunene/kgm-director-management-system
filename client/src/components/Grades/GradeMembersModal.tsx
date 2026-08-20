import { Mail, Phone, UserRound, Users, X } from "lucide-react";
import type { Grade } from "../../data/gradesData";
import type { Child } from "../../data/childrenData";

interface GradeMembersModalProps {
  grade: Grade | null;
  members: Child[];
  onClose: () => void;
}

const GradeMembersModal = ({
  grade,
  members,
  onClose,
}: GradeMembersModalProps) => {
  if (!grade) {
    return null;
  }

  // Get children belonging to this grade
  const gradeMembers = members.filter(
    (child) => child.className === grade.name,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#365452]/10 dark:bg-[#8eb0ac]/10">
              <Users size={19} className="text-[#365452] dark:text-[#8eb0ac]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {grade.name} Members
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Children currently assigned to this grade.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            title="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Member Count */}
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Members
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {gradeMembers.length}
          </p>
        </div>

        {/* Members */}
        <div className="max-h-[55vh] overflow-y-auto">
          {gradeMembers.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {gradeMembers.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-gray-50 dark:hover:bg-gray-700/30"
                >
                  {/* Child */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#365452] text-sm font-semibold text-white dark:bg-[#466b68]">
                      {child.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {child.name}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <UserRound size={13} />
                          Age {child.age}
                        </span>

                        <span>{child.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="flex items-center justify-end gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Phone size={13} />
                      {child.phone}
                    </p>

                    <p className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Mail size={13} />
                      {child.parent}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <Users size={22} className="text-gray-400 dark:text-gray-500" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                No Members Found
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                There are currently no children assigned to {grade.name}.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] dark:bg-[#8eb0ac] dark:text-gray-900 dark:hover:bg-[#789c98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeMembersModal;
