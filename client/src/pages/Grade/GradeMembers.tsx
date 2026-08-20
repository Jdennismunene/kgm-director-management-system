import { useState } from "react";
import { ArrowLeft, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import GradeMembersHeader from "../../components/Grades/GradeMembersHeader";
import GradeInformation from "../../components/Grades/GradeInformation";
import GradeMembersSummary from "../../components/Grades/GradeMembersSummary";
import GradeMembersTable from "../../components/Grades/GradeMembersTable";

import EditChildModal from "../../components/Children/EditChildModal";
import DeleteChildModal from "../../components/Children/DeleteChildModal";

import { useGrades } from "../../context/GradesContext";
import { childrenData, type Child } from "../../data/childrenData";

const GradeMembers = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { grades } = useGrades();

  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [deletingChild, setDeletingChild] = useState<Child | null>(null);

  /*
   * Find the selected grade using the URL parameter.
   *
   * Example:
   * /grade/1
   *
   * id = "1"
   */
  const grade = grades.find((grade) => grade.id === Number(id));

  /*
   * No Grade Selected / Invalid Grade
   *
   * This happens when:
   * 1. User clicks Grade Members from the sidebar
   * 2. User visits /grade directly
   * 3. The grade ID does not exist
   */
  if (!grade) {
    return (
      <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/grade")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#365452] dark:text-gray-400 dark:hover:text-[#8eb0ac]"
        >
          <ArrowLeft size={17} />
          Back to All Grades
        </button>

        {/* Empty State */}
        <div className="flex min-h-125 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="max-w-md px-6 text-center">
            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#365452]/10 dark:bg-[#8eb0ac]/10">
              <Users size={26} className="text-[#365452] dark:text-[#8eb0ac]" />
            </div>

            {/* Title */}
            <h2 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
              No Grade Selected
            </h2>

            {/* Description */}
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Please go back to All Grades and select a grade to view its
              members.
            </p>

            {/* Action */}
            <button
              type="button"
              onClick={() => navigate("/grade")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] dark:bg-[#8eb0ac] dark:text-gray-900 dark:hover:bg-[#9fc0bc]"
            >
              <ArrowLeft size={16} />
              Go to All Grades
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Get members belonging to this grade
   */
  const members = childrenData.filter(
    (child) => child.className === grade.name,
  );

  /*
   * Member Summary
   */
  const activeMembers = members.filter((child) => child.status === "Active");

  const inactiveMembers = members.filter(
    (child) => child.status === "Inactive",
  );

  return (
    <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
      {/* Header */}
      <GradeMembersHeader grade={grade} onBack={() => navigate("/grade")} />

      {/* Grade Information */}
      <GradeInformation grade={grade} memberCount={members.length} />

      {/* Summary */}
      <GradeMembersSummary
        total={members.length}
        active={activeMembers.length}
        inactive={inactiveMembers.length}
      />

      {/* Members */}
      <GradeMembersTable
        members={members}
        gradeName={grade.name}
        onEditChild={(child) => setEditingChild(child)}
        onRemoveChild={(child) => setDeletingChild(child)}
      />

      <EditChildModal
        child={editingChild}
        onClose={() => setEditingChild(null)}
        onSave={(updatedChild) => {
          setEditingChild(null);

          // For now, close the modal after saving.
          // Later this should update your central children state/database.
          console.log("Updated child:", updatedChild);
        }}
      />

      <DeleteChildModal
        child={deletingChild}
        onClose={() => setDeletingChild(null)}
        onConfirm={() => {
          if (!deletingChild) return;

          // For now, close the modal after confirmation.
          // Later this should remove the child from your central data/database.
          console.log("Delete child:", deletingChild);

          setDeletingChild(null);
        }}
      />
    </div>
  );
};

export default GradeMembers;
