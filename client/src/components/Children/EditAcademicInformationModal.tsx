import { Save, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import type { Child } from "../../services/childService";
import { updateChild, type UpdateChildData } from "../../services/childService";

import { getGrades, type Grade } from "../../services/gradeService";

import { getBranches, type Branch } from "../../services/branchService";

interface EditAcademicInformationModalProps {
  child: Child;
  onClose: () => void;
  onSave: (updatedChild: Child) => void;
}

const EditAcademicInformationModal = ({
  child,
  onClose,
  onSave,
}: EditAcademicInformationModalProps) => {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [gradeId, setGradeId] = useState(child.gradeId);
  const [branchId, setBranchId] = useState(child.branchId);

  // =====================================================
  // DROPDOWN DATA
  // =====================================================

  const [grades, setGrades] = useState<Grade[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);

  // =====================================================
  // LOADING / SAVING
  // =====================================================

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // LOAD GRADES + BRANCHES
  // =====================================================

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoadingOptions(true);
        setError("");

        const [gradesData, branchesData] = await Promise.all([
          getGrades(),
          getBranches(),
        ]);

        setGrades(gradesData);
        setBranches(branchesData);
      } catch (error) {
        console.error("Failed to load academic options:", error);

        setError("Failed to load grades and branches. Please try again.");
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!gradeId || !branchId) {
      setError("Please select both a class and a branch.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const updateData: UpdateChildData = {
        gradeId,
        branchId,
      };

      // Send update to backend
      const updatedChild = await updateChild(child.id, updateData);

      // Give updated child back to parent
      onSave(updatedChild);

      // Close modal
      onClose();
    } catch (error) {
      console.error("Failed to update academic information:", error);

      setError("Failed to update academic information. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 dark:bg-black/60">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-900">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Edit Academic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update the child's class and church branch.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* =================================================
                CLASS
            ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Class
              </label>

              <select
                value={gradeId}
                onChange={(e) => setGradeId(e.target.value)}
                required
                disabled={loadingOptions || saving}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-700"
              >
                <option value="">
                  {loadingOptions ? "Loading classes..." : "Select class"}
                </option>

                {grades
                  .filter((grade) => grade.status === "ACTIVE")
                  .map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* =================================================
                BRANCH
            ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Branch
              </label>

              <select
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                required
                disabled={loadingOptions || saving}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-700"
              >
                <option value="">
                  {loadingOptions ? "Loading branches..." : "Select branch"}
                </option>

                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* =================================================
                CURRENT INFORMATION
            ================================================= */}

            <div className="md:col-span-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Current Information
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Current Class
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {child.grade?.name ?? "Not assigned"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Current Branch
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {child.branch?.name ?? "Not assigned"}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/70">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loadingOptions || saving}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAcademicInformationModal;
