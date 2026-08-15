import { Eye, Pencil, MoreVertical, SearchX } from "lucide-react";
import type { Child } from "../../data/childrenData";
import { useState } from "react";

interface ChildrenTableProps {
  children: Child[];
  onViewChild: (child: Child) => void;
  onEditChild: (child: Child) => void;
  onDeactivateChild: (child: Child) => void;
  onDeleteChild: (child: Child) => void;
}

const ChildrenTable = ({
  children,
  onViewChild,
  onEditChild,
  onDeactivateChild,
  onDeleteChild,
}: ChildrenTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div className="mt-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-colors">
      {/* Table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Table Header */}
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                #
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                Child Name
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                Age
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                Class
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                Branch
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                Parent / Guardian
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                Phone
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                Status
              </th>

              <th className="px-5 py-4 text-center font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {children.length > 0 ? (
              children.map((child) => (
                <tr
                  key={child.id}
                  className="
                    border-b
                    border-gray-100
                    dark:border-gray-800
                    last:border-b-0
                    hover:bg-gray-50
                    dark:hover:bg-gray-800/60
                    transition
                  "
                >
                  {/* Number */}
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    {child.id}
                  </td>

                  {/* Child Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className="
                          w-9
                          h-9
                          rounded-full
                          bg-blue-100
                          dark:bg-blue-950/60
                          text-blue-600
                          dark:text-blue-400
                          flex
                          items-center
                          justify-center
                          font-semibold
                          shrink-0
                        "
                      >
                        {child.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <span className="font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
                        {child.name}
                      </span>
                    </div>
                  </td>

                  {/* Age */}
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    {child.age}
                  </td>

                  {/* Class */}
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {child.className}
                  </td>

                  {/* Branch */}
                  <td className="px-5 py-4">
                    <span
                      className="
                        inline-flex
                        items-center
                        px-3
                        py-1
                        rounded-full
                        bg-blue-50
                        dark:bg-blue-950/60
                        text-blue-700
                        dark:text-blue-300
                        border
                        border-blue-100
                        dark:border-blue-900
                        text-xs
                        font-medium
                        whitespace-nowrap
                      "
                    >
                      {child.branch}
                    </span>
                  </td>

                  {/* Parent */}
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {child.parent}
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {child.phone}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    {child.status === "Active" ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1
                          rounded-full
                          bg-green-50
                          dark:bg-green-950/50
                          text-green-700
                          dark:text-green-300
                          border
                          border-green-100
                          dark:border-green-900
                          text-xs
                          font-medium
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Active
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1
                          rounded-full
                          bg-red-50
                          dark:bg-red-950/50
                          text-red-600
                          dark:text-red-300
                          border
                          border-red-100
                          dark:border-red-900
                          text-xs
                          font-medium
                        "
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      <button
                        type="button"
                        title="View child"
                        onClick={() => onViewChild(child)}
                        className="
                          w-8
                          h-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          text-blue-600
                          dark:text-blue-400
                          hover:bg-blue-50
                          dark:hover:bg-blue-950/50
                          transition
                          cursor-pointer
                        "
                      >
                        <Eye size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        title="Edit child"
                        onClick={() => onEditChild(child)}
                        className="
                          w-8
                          h-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          text-blue-600
                          dark:text-blue-400
                          hover:bg-blue-50
                          dark:hover:bg-blue-950/50
                          transition
                          cursor-pointer
                        "
                      >
                        <Pencil size={17} />
                      </button>

                      {/* More */}
                      <div className="relative">
                        <button
                          type="button"
                          title="More options"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === child.id ? null : child.id,
                            )
                          }
                          className="
                            w-8
                            h-8
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-blue-600
                            dark:text-blue-400
                            hover:bg-blue-50
                            dark:hover:bg-blue-950/50
                            transition
                            cursor-pointer
                          "
                        >
                          <MoreVertical size={18} />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === child.id && (
                          <div
                            className="
                              absolute
                              right-0
                              top-10
                              z-50
                              w-44
                              bg-white
                              dark:bg-gray-900
                              border
                              border-gray-200
                              dark:border-gray-700
                              rounded-lg
                              shadow-lg
                              dark:shadow-black/40
                              py-1
                            "
                          >
                            {/* View Details */}
                            <button
                              type="button"
                              onClick={() => {
                                onViewChild(child);
                                setOpenMenuId(null);
                              }}
                              className="
                                w-full
                                px-4
                                py-2.5
                                text-left
                                text-sm
                                text-gray-700
                                dark:text-gray-200
                                hover:bg-gray-50
                                dark:hover:bg-gray-800
                                transition
                                cursor-pointer
                              "
                            >
                              View Details
                            </button>

                            {/* Edit Child */}
                            <button
                              type="button"
                              onClick={() => {
                                onEditChild(child);
                                setOpenMenuId(null);
                              }}
                              className="
                                w-full
                                px-4
                                py-2.5
                                text-left
                                text-sm
                                text-gray-700
                                dark:text-gray-200
                                hover:bg-gray-50
                                dark:hover:bg-gray-800
                                transition
                                cursor-pointer
                              "
                            >
                              Edit Child
                            </button>

                            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                            {/* Deactivate */}
                            <button
                              type="button"
                              onClick={() => {
                                onDeactivateChild(child);
                                setOpenMenuId(null);
                              }}
                              className="
                                w-full
                                px-4
                                py-2.5
                                text-left
                                text-sm
                                text-orange-600
                                dark:text-orange-400
                                hover:bg-orange-50
                                dark:hover:bg-orange-950/40
                                transition
                                cursor-pointer
                              "
                            >
                              Deactivate Child
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteChild(child);
                                setOpenMenuId(null);
                              }}
                              className="
                                w-full
                                px-4
                                py-2.5
                                text-left
                                text-sm
                                text-red-600
                                dark:text-red-400
                                hover:bg-red-50
                                dark:hover:bg-red-950/40
                                transition
                                cursor-pointer
                              "
                            >
                              Delete Child
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-5 py-14 text-center">
                  <div className="flex flex-col items-center justify-center">
                    {/* Icon */}
                    <div
                      className="
                        w-14
                        h-14
                        rounded-full
                        bg-gray-100
                        dark:bg-gray-800
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        dark:text-gray-500
                      "
                    >
                      <SearchX size={26} />
                    </div>

                    {/* Message */}
                    <h3 className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      No children found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChildrenTable;
