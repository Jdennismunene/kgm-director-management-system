import { useEffect, useState } from "react";
import { ArrowLeft, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import GradeMembersHeader from "../../components/Grades/GradeMembersHeader";
import GradeInformation from "../../components/Grades/GradeInformation";
import GradeMembersSummary from "../../components/Grades/GradeMembersSummary";
import GradeMembersTable from "../../components/Grades/GradeMembersTable";

import EditChildModal from "../../components/Children/EditChildModal";
import DeleteChildModal from "../../components/Children/DeleteChildModal";

import { useGrades } from "../../context/GradesContext";
import { getChildren, type Child } from "../../services/childService";

const ClassMembers = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { grades } = useGrades();

  const [children, setChildren] = useState<Child[]>([]);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [deletingChild, setDeletingChild] = useState<Child | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
   * Find the selected grade.
   */
  const grade = grades.find((grade) => grade.id === Number(id));

  /*
   * Fetch real children from the backend.
   */
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getChildren();
        setChildren(response);
      } catch (error) {
        console.error("Failed to load children:", error);
        setError("Failed to load children.");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  /*
   * No Grade Selected / Invalid Grade
   */
  if (!grade) {
    return (
      <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
        <button
          type="button"
          onClick={() => navigate("/class")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#365452] dark:text-gray-400 dark:hover:text-[#8eb0ac]"
        >
          <ArrowLeft size={17} />
          Back to All Classes
        </button>

        <div className="flex min-h-125 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="max-w-md px-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#365452]/10 dark:bg-[#8eb0ac]/10">
              <Users size={26} className="text-[#365452] dark:text-[#8eb0ac]" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
              No Class Selected
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Please go back to All Classes and select a grade to view its
              members.
            </p>

            <button
              type="button"
              onClick={() => navigate("/class")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] dark:bg-[#8eb0ac] dark:text-gray-900 dark:hover:bg-[#9fc0bc]"
            >
              <ArrowLeft size={16} />
              Go to All Classes
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Filter real API children by grade.
   */
  const members = children.filter((child) => child.grade?.name === grade.name);

  /*
   * Member Summary
   */
  const activeMembers = members.filter((child) => child.status === "ACTIVE");

  const inactiveMembers = members.filter(
    (child) => child.status === "INACTIVE",
  );

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
        <div className="flex min-h-100 items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading class members...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
        <div className="rounded-xl border border-red-200 bg-white p-6 text-center dark:border-red-900 dark:bg-gray-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-[#365452] px-4 py-2 text-sm font-medium text-white hover:bg-[#2c4543]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

      {/* Edit Child */}
      <EditChildModal
        child={editingChild}
        onClose={() => setEditingChild(null)}
        onSave={(updatedChild) => {
          setChildren((currentChildren) =>
            currentChildren.map((child) =>
              child.id === updatedChild.id ? updatedChild : child,
            ),
          );

          setEditingChild(null);
        }}
      />

      {/* Delete Child */}
      <DeleteChildModal
        child={deletingChild}
        onClose={() => setDeletingChild(null)}
        onConfirm={() => {
          if (!deletingChild) return;

          setChildren((currentChildren) =>
            currentChildren.filter((child) => child.id !== deletingChild.id),
          );

          setDeletingChild(null);
        }}
      />
    </div>
  );
};

export default ClassMembers;
