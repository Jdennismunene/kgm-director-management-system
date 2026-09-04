import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Heart,
  Pencil,
  Plus,
  Target,
  UserRound,
  X,
} from "lucide-react";

import AddDiscipleshipModal from "./AddDiscipleshipModal";
import EditDiscipleshipModal from "./EditDiscipleshipModal";
import EditSpiritualDevelopmentModal from "./EditSpiritualDevelopmentModal";
import DiscipleshipMilestones from "./DiscipleshipMilestones";

import {
  createDiscipleshipRecord,
  deleteDiscipleshipRecord,
  getChildDiscipleshipRecords,
  getSpiritualDevelopment,
  updateDiscipleshipRecord,
  updateSpiritualDevelopment,
  type CreateDiscipleshipData,
  type DiscipleshipRecord,
} from "../../services/discipleshipService";

interface DiscipleshipProps {
  childId: string;
}

export interface SpiritualDevelopment {
  bibleKnowledge: number;
  prayerLife: number;
  christianCharacter: number;
}

type ToastType = "success" | "error";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const Discipleship = ({ childId }: DiscipleshipProps) => {
  // =====================================================
  // DISCIPLESHIP RECORDS
  // =====================================================

  const [milestones, setMilestones] = useState<DiscipleshipRecord[]>([]);

  // =====================================================
  // SPIRITUAL DEVELOPMENT
  // =====================================================

  const [spiritualDevelopment, setSpiritualDevelopment] =
    useState<SpiritualDevelopment>({
      bibleKnowledge: 0,
      prayerLife: 0,
      christianCharacter: 0,
    });

  // =====================================================
  // LOADING / ERROR
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // ACTION STATE
  // =====================================================

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  // =====================================================
  // TOAST STATE
  // =====================================================

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastCounter, setToastCounter] = useState(0);

  const showToast = (type: ToastType, message: string) => {
    const id = toastCounter + 1;

    setToastCounter(id);

    setToasts((previous) => [
      ...previous,
      {
        id,
        type,
        message,
      },
    ]);

    window.setTimeout(() => {
      setToasts((previous) => previous.filter((toast) => toast.id !== id));
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  };

  // =====================================================
  // MODAL STATE
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDevelopmentModal, setShowDevelopmentModal] = useState(false);

  const [editingMilestone, setEditingMilestone] =
    useState<DiscipleshipRecord | null>(null);

  // =====================================================
  // LOAD DISCIPLESHIP DATA
  // =====================================================

  useEffect(() => {
    const loadDiscipleshipData = async () => {
      try {
        setLoading(true);
        setError("");

        const [records, development] = await Promise.all([
          getChildDiscipleshipRecords(childId),
          getSpiritualDevelopment(childId),
        ]);

        setMilestones(records);

        if (development) {
          setSpiritualDevelopment({
            bibleKnowledge: development.bibleKnowledge,
            prayerLife: development.prayerLife,
            christianCharacter: development.christianCharacter,
          });
        } else {
          setSpiritualDevelopment({
            bibleKnowledge: 0,
            prayerLife: 0,
            christianCharacter: 0,
          });
        }
      } catch (error) {
        console.error("Failed to load discipleship data:", error);

        setError(
          "Failed to load discipleship information. Please make sure the backend server is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (childId) {
      loadDiscipleshipData();
    }
  }, [childId]);

  // =====================================================
  // CALCULATED VALUES
  // =====================================================

  const completedMilestones = useMemo(
    () => milestones.filter((milestone) => milestone.completed).length,
    [milestones],
  );

  const totalMilestones = milestones.length;

  const discipleshipProgress =
    totalMilestones === 0
      ? 0
      : Math.round((completedMilestones / totalMilestones) * 100);

  const bibleLessons = useMemo(
    () =>
      milestones.filter(
        (milestone) => milestone.type === "Bible Lesson" && milestone.completed,
      ).length,
    [milestones],
  );

  const mentor = useMemo(() => {
    const latestMentoredRecord = milestones.find((milestone) =>
      milestone.mentor?.trim(),
    );

    return latestMentoredRecord?.mentor || "Not assigned";
  }, [milestones]);

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleOpenEdit = (milestone: DiscipleshipRecord) => {
    if (actionLoading) return;

    setEditingMilestone(milestone);
    setShowEditModal(true);
  };

  // =====================================================
  // ADD DISCIPLESHIP RECORD
  // =====================================================

  const handleAddRecord = async (data: CreateDiscipleshipData) => {
    if (actionLoading) return;

    try {
      setActionLoading(true);
      setActionError("");

      const createdRecord = await createDiscipleshipRecord(childId, data);

      setMilestones((previous) => [createdRecord, ...previous]);

      setShowAddModal(false);

      showToast("success", "Discipleship record added successfully.");
    } catch (error) {
      console.error("Failed to create discipleship record:", error);

      const message =
        "Failed to create the discipleship record. Please try again.";

      setActionError(message);
      showToast("error", message);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // EDIT DISCIPLESHIP RECORD
  // =====================================================

  const handleEditRecord = async (updatedMilestone: DiscipleshipRecord) => {
    if (actionLoading) return;

    try {
      setActionLoading(true);
      setActionError("");

      const updatedRecord = await updateDiscipleshipRecord(
        childId,
        updatedMilestone.id,
        {
          type: updatedMilestone.type,
          title: updatedMilestone.title,
          description: updatedMilestone.description,
          date: updatedMilestone.date,
          completed: updatedMilestone.completed,
          mentor: updatedMilestone.mentor,
          notes: updatedMilestone.notes,
        },
      );

      setMilestones((previous) =>
        previous.map((milestone) =>
          milestone.id === updatedRecord.id ? updatedRecord : milestone,
        ),
      );

      setEditingMilestone(null);
      setShowEditModal(false);

      showToast("success", "Discipleship record updated successfully.");
    } catch (error) {
      console.error("Failed to update discipleship record:", error);

      const message =
        "Failed to update the discipleship record. Please try again.";

      setActionError(message);
      showToast("error", message);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // DELETE DISCIPLESHIP RECORD
  // =====================================================

  const handleDeleteRecord = async (id: string) => {
    if (actionLoading) return;

    const milestone = milestones.find((item) => item.id === id);

    if (!milestone) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${milestone.title}"?`,
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setActionError("");

      await deleteDiscipleshipRecord(childId, id);

      setMilestones((previous) => previous.filter((item) => item.id !== id));

      showToast("success", "Discipleship record deleted successfully.");
    } catch (error) {
      console.error("Failed to delete discipleship record:", error);

      const message =
        "Failed to delete the discipleship record. Please try again.";

      setActionError(message);
      showToast("error", message);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // UPDATE SPIRITUAL DEVELOPMENT
  // =====================================================

  const handleUpdateDevelopment = async (
    updatedDevelopment: SpiritualDevelopment,
  ) => {
    if (actionLoading) return;

    try {
      setActionLoading(true);
      setActionError("");

      const savedDevelopment = await updateSpiritualDevelopment(childId, {
        bibleKnowledge: updatedDevelopment.bibleKnowledge,
        prayerLife: updatedDevelopment.prayerLife,
        christianCharacter: updatedDevelopment.christianCharacter,
      });

      setSpiritualDevelopment({
        bibleKnowledge: savedDevelopment.bibleKnowledge,
        prayerLife: savedDevelopment.prayerLife,
        christianCharacter: savedDevelopment.christianCharacter,
      });

      setShowDevelopmentModal(false);

      showToast("success", "Spiritual development updated successfully.");
    } catch (error) {
      console.error("Failed to update spiritual development:", error);

      const message =
        "Failed to update spiritual development. Please try again.";

      setActionError(message);
      showToast("error", message);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="mt-5 flex min-h-100 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-center text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-200">
            Loading discipleship information...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="mt-5 rounded-xl border border-red-200 bg-white p-8 text-center dark:border-red-800 dark:bg-gray-800">
        <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
          Unable to load discipleship information
        </h3>

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =====================================================
          TOAST NOTIFICATIONS
      ===================================================== */}

      <div className="fixed right-4 top-4 z-100 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
              toast.type === "success"
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/90 dark:text-green-300"
                : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/90 dark:text-red-300"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <Target size={18} />
              )}
            </div>

            <p className="flex-1 text-sm font-medium">{toast.message}</p>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              title="Dismiss notification"
              className="shrink-0 rounded-md p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-5">
        {/* =================================================
            ACTION ERROR
        ================================================= */}

        {actionError && (
          <div className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            <span>{actionError}</span>

            <button
              type="button"
              onClick={() => setActionError("")}
              title="Dismiss error"
              className="shrink-0 rounded p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Discipleship
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track the child's spiritual growth, milestones, and discipleship
              journey.
            </p>
          </div>

          <button
            type="button"
            disabled={actionLoading}
            onClick={() => setShowAddModal(true)}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                  {mentor}
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
                disabled={actionLoading}
                onClick={() => setShowDevelopmentModal(true)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
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
                    {mentor}
                  </h4>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Children's Ministry Mentor
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Assigned through discipleship records
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
                <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
                  The mentor is responsible for guiding the child's spiritual
                  development and following up on their discipleship progress.
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
