import { useState } from "react";
import {
  Award,
  BookOpen,
  Heart,
  Target,
  UserRound,
  Plus,
  Pencil,
} from "lucide-react";

import AddDiscipleshipModal from "./AddDiscipleshipModal";
import EditDiscipleshipModal from "./EditDiscipleshipModal";
import EditSpiritualDevelopmentModal from "./EditSpiritualDevelopmentModal";
import DiscipleshipMilestones from "./DiscipleshipMilestones";

export interface Milestone {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  type: string;
  mentor: string;
  notes: string;
}

export interface SpiritualDevelopment {
  bibleKnowledge: number;
  prayerLife: number;
  christianCharacter: number;
}

const Discipleship = () => {
  // =====================================================
  // DISCIPLESHIP MILESTONES
  // =====================================================

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: "Salvation",
      description:
        "Child has made a personal commitment to follow Christ.",
      date: "June 15, 2024",
      completed: true,
      type: "Milestone",
      mentor: "David Kamau",
      notes: "",
    },
    {
      id: 2,
      title: "Bible Basics",
      description:
        "Completed the introductory Bible study lessons.",
      date: "August 20, 2024",
      completed: true,
      type: "Bible Lesson",
      mentor: "David Kamau",
      notes: "",
    },
    {
      id: 3,
      title: "Prayer Life",
      description:
        "Learning and developing a consistent prayer routine.",
      date: "July 12, 2026",
      completed: true,
      type: "Spiritual Growth",
      mentor: "David Kamau",
      notes: "",
    },
    {
      id: 4,
      title: "Serving Others",
      description:
        "Participating in church service and community activities.",
      date: "In Progress",
      completed: false,
      type: "Service",
      mentor: "David Kamau",
      notes: "",
    },
  ]);

  // =====================================================
  // BIBLE LESSONS
  // =====================================================

  const [bibleLessons, setBibleLessons] = useState(18);

  // =====================================================
  // SPIRITUAL DEVELOPMENT
  // =====================================================

  const [spiritualDevelopment, setSpiritualDevelopment] =
    useState<SpiritualDevelopment>({
      bibleKnowledge: 80,
      prayerLife: 70,
      christianCharacter: 85,
    });

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDevelopmentModal, setShowDevelopmentModal] =
    useState(false);

  const [editingMilestone, setEditingMilestone] =
    useState<Milestone | null>(null);

  // =====================================================
  // CALCULATED VALUES
  // =====================================================

  const completedMilestones = milestones.filter(
    (milestone) => milestone.completed
  ).length;

  const totalMilestones = milestones.length;

  const discipleshipProgress =
    totalMilestones === 0
      ? 0
      : Math.round(
          (completedMilestones / totalMilestones) * 100
        );

  // =====================================================
  // ADD RECORD
  // =====================================================

  const handleAddRecord = (newMilestone: Milestone) => {
    setMilestones((previous) => [
      ...previous,
      newMilestone,
    ]);

    if (
      newMilestone.type === "Bible Lesson" &&
      newMilestone.completed
    ) {
      setBibleLessons((previous) => previous + 1);
    }

    setShowAddModal(false);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleOpenEdit = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setShowEditModal(true);
  };

  // =====================================================
  // EDIT RECORD
  // =====================================================

  const handleEditRecord = (
    updatedMilestone: Milestone
  ) => {
    if (!editingMilestone) return;

    const previousWasBibleLesson =
      editingMilestone.type === "Bible Lesson" &&
      editingMilestone.completed;

    const updatedIsBibleLesson =
      updatedMilestone.type === "Bible Lesson" &&
      updatedMilestone.completed;

    setMilestones((previous) =>
      previous.map((milestone) =>
        milestone.id === updatedMilestone.id
          ? updatedMilestone
          : milestone
      )
    );

    // Update Bible lesson count if the record
    // changes between Bible Lesson/completed states.
    if (
      !previousWasBibleLesson &&
      updatedIsBibleLesson
    ) {
      setBibleLessons((previous) => previous + 1);
    }

    if (
      previousWasBibleLesson &&
      !updatedIsBibleLesson
    ) {
      setBibleLessons((previous) =>
        Math.max(0, previous - 1)
      );
    }

    setEditingMilestone(null);
    setShowEditModal(false);
  };

  // =====================================================
  // DELETE RECORD
  // =====================================================

  const handleDeleteRecord = (id: number) => {
    const milestone = milestones.find(
      (item) => item.id === id
    );

    if (!milestone) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${milestone.title}"?`
    );

    if (!confirmed) return;

    setMilestones((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (
      milestone.type === "Bible Lesson" &&
      milestone.completed
    ) {
      setBibleLessons((previous) =>
        Math.max(0, previous - 1)
      );
    }
  };

  // =====================================================
  // UPDATE SPIRITUAL DEVELOPMENT
  // =====================================================

  const handleUpdateDevelopment = (
    updatedDevelopment: SpiritualDevelopment
  ) => {
    setSpiritualDevelopment(updatedDevelopment);
    setShowDevelopmentModal(false);
  };

  return (
    <>
      <div className="mt-5 space-y-5">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Discipleship
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track the child's spiritual growth,
              milestones, and discipleship journey.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer"
          >
            <Plus size={17} />
            Add Record
          </button>
        </div>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Progress */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Discipleship Progress
                </p>

                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {discipleshipProgress}%
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <Target
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500 dark:bg-blue-500"
                style={{
                  width: `${discipleshipProgress}%`,
                }}
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
                  {completedMilestones} / {totalMilestones}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                <Award
                  size={20}
                  className="text-green-600 dark:text-green-400"
                />
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
                  {bibleLessons}
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

        {/* =================================================
            SPIRITUAL DEVELOPMENT + MENTOR
        ================================================= */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Spiritual Development */}

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <Heart
                    size={17}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Spiritual Development
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowDevelopmentModal(true)}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-blue-600 transition cursor-pointer hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                <Pencil size={14} />
                Edit
              </button>
            </div>

            <div className="space-y-5 p-5">
              {/* Bible Knowledge */}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Bible Knowledge
                  </span>

                  <span className="text-xs font-semibold text-gray-900 dark:text-white">
                    {spiritualDevelopment.bibleKnowledge}%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500"
                    style={{
                      width: `${spiritualDevelopment.bibleKnowledge}%`,
                    }}
                  />
                </div>
              </div>

              {/* Prayer Life */}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Prayer Life
                  </span>

                  <span className="text-xs font-semibold text-gray-900 dark:text-white">
                    {spiritualDevelopment.prayerLife}%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500"
                    style={{
                      width: `${spiritualDevelopment.prayerLife}%`,
                    }}
                  />
                </div>
              </div>

              {/* Christian Character */}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Christian Character
                  </span>

                  <span className="text-xs font-semibold text-gray-900 dark:text-white">
                    {spiritualDevelopment.christianCharacter}%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500"
                    style={{
                      width: `${spiritualDevelopment.christianCharacter}%`,
                    }}
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
                  David is responsible for guiding the
                  child's spiritual development and
                  following up on their discipleship
                  progress.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            MILESTONES
        ================================================= */}

        <DiscipleshipMilestones
          milestones={milestones}
          onAdd={() => setShowAddModal(true)}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteRecord}
        />
      </div>

      {/* =================================================
          MODALS
      ================================================= */}

      <AddDiscipleshipModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddRecord}
      />

      <EditDiscipleshipModal
        isOpen={showEditModal}
        milestone={editingMilestone}
        onClose={() => {
          setEditingMilestone(null);
          setShowEditModal(false);
        }}
        onSave={handleEditRecord}
      />

      <EditSpiritualDevelopmentModal
        isOpen={showDevelopmentModal}
        development={spiritualDevelopment}
        onClose={() => setShowDevelopmentModal(false)}
        onSave={handleUpdateDevelopment}
      />
    </>
  );
};

export default Discipleship;