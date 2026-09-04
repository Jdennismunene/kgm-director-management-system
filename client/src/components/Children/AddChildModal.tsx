import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { getParents, type Parent } from "../../services/parentService";

import { getGrades, type Grade } from "../../services/gradeService";

import { getBranches, type Branch } from "../../services/branchService";

import type { CreateChildData } from "../../services/childService";

interface AddChildModalProps {
  onClose: () => void;
  onSave: (child: CreateChildData) => void;
}

const AddChildModal = ({ onClose, onSave }: AddChildModalProps) => {
  // =========================
  // Form fields
  // =========================

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [parentId, setParentId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [branchId, setBranchId] = useState("");

  // =========================
  // Dropdown data
  // =========================

  const [parents, setParents] = useState<Parent[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);

  // =========================
  // Loading / errors
  // =========================

  const [loadingData, setLoadingData] = useState(true);
  const [formError, setFormError] = useState("");

  // =========================
  // Load parents, grades,
  // and branches
  // =========================

  useEffect(() => {
    const loadFormData = async () => {
      try {
        setLoadingData(true);
        setFormError("");

        const [parentsData, gradesData, branchesData] = await Promise.all([
          getParents(),
          getGrades(),
          getBranches(),
        ]);

        setParents(parentsData);
        setGrades(gradesData);
        setBranches(branchesData);
      } catch (error) {
        console.error("Failed to load child form data:", error);

        setFormError("Failed to load parents, classes, or branches.");
      } finally {
        setLoadingData(false);
      }
    };

    loadFormData();
  }, []);

  // =========================
  // Submit
  // =========================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormError("");

    // Validate required relationships
    if (!parentId) {
      setFormError("Please select a parent or guardian.");
      return;
    }

    if (!gradeId) {
      setFormError("Please select a class.");
      return;
    }

    if (!branchId) {
      setFormError("Please select a branch.");
      return;
    }

    const childData: CreateChildData = {
      name: name.trim(),
      age: Number(age),
      parentId,
      gradeId,
      branchId,
    };

    onSave(childData);
  };

  // =========================
  // Selected parent
  // =========================

  const selectedParent = parents.find((parent) => parent.id === parentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl">
        {/* =========================
            Header
        ========================== */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Add Child
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add a new child to the Sunday School system.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-8
              h-8
              rounded-lg
              flex
              items-center
              justify-center
              text-gray-500
              dark:text-gray-400
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition
              cursor-pointer
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* =========================
            Form
        ========================== */}

        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Loading */}

            {loadingData && (
              <div className="md:col-span-2">
                <div
                  className="
                  rounded-lg
                  bg-blue-50
                  dark:bg-blue-950/30
                  border
                  border-blue-200
                  dark:border-blue-800
                  px-4
                  py-3
                  text-sm
                  text-blue-700
                  dark:text-blue-400
                "
                >
                  Loading parents, classes and branches...
                </div>
              </div>
            )}

            {/* Error */}

            {formError && (
              <div className="md:col-span-2">
                <div
                  className="
                  rounded-lg
                  bg-red-50
                  dark:bg-red-950/30
                  border
                  border-red-200
                  dark:border-red-800
                  px-4
                  py-3
                  text-sm
                  text-red-700
                  dark:text-red-400
                "
                >
                  {formError}
                </div>
              </div>
            )}

            {/* =========================
                Child Name
            ========================== */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Child Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter child's full name"
                required
                className="
                  w-full
                  px-3
                  py-2.5
                  border
                  border-gray-300
                  dark:border-gray-600
                  rounded-lg
                  text-sm
                  bg-white
                  dark:bg-gray-800
                  text-gray-900
                  dark:text-gray-100
                  placeholder:text-gray-400
                  dark:placeholder:text-gray-500
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />
            </div>

            {/* =========================
                Age
            ========================== */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Age
              </label>

              <input
                type="number"
                min="1"
                max="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                required
                className="
                  w-full
                  px-3
                  py-2.5
                  border
                  border-gray-300
                  dark:border-gray-600
                  rounded-lg
                  text-sm
                  bg-white
                  dark:bg-gray-800
                  text-gray-900
                  dark:text-gray-100
                  placeholder:text-gray-400
                  dark:placeholder:text-gray-500
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />
            </div>

            {/* =========================
                Class
            ========================== */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Class
              </label>

              <select
                value={gradeId}
                onChange={(e) => setGradeId(e.target.value)}
                required
                disabled={loadingData}
                className="
                  w-full
                  px-3
                  py-2.5
                  border
                  border-gray-300
                  dark:border-gray-600
                  rounded-lg
                  text-sm
                  bg-white
                  dark:bg-gray-800
                  text-gray-900
                  dark:text-gray-100
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <option value="">Select class</option>

                {grades
                  .filter((grade) => grade.status === "ACTIVE")
                  .map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* =========================
                Branch
            ========================== */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Branch
              </label>

              <select
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                required
                disabled={loadingData}
                className="
                  w-full
                  px-3
                  py-2.5
                  border
                  border-gray-300
                  dark:border-gray-600
                  rounded-lg
                  text-sm
                  bg-white
                  dark:bg-gray-800
                  text-gray-900
                  dark:text-gray-100
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <option value="">Select branch</option>

                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* =========================
                Parent / Guardian
            ========================== */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parent / Guardian
              </label>

              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                required
                disabled={loadingData}
                className="
                  w-full
                  px-3
                  py-2.5
                  border
                  border-gray-300
                  dark:border-gray-600
                  rounded-lg
                  text-sm
                  bg-white
                  dark:bg-gray-800
                  text-gray-900
                  dark:text-gray-100
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <option value="">Select parent / guardian</option>

                {parents
                  .filter((parent) => parent.status === "ACTIVE")
                  .map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* =========================
                Parent Phone
            ========================== */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parent Phone
              </label>

              <input
                type="tel"
                value={selectedParent?.phone ?? ""}
                readOnly
                placeholder="Parent phone number"
                className="
                  w-full
                  px-3
                  py-2.5
                  border
                  border-gray-300
                  dark:border-gray-600
                  rounded-lg
                  text-sm
                  bg-gray-50
                  dark:bg-gray-800
                  text-gray-700
                  dark:text-gray-300
                  outline-none
                  cursor-not-allowed
                "
              />
            </div>
          </div>

          {/* =========================
              Footer
          ========================== */}

          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2.5
                rounded-lg
                border
                border-gray-300
                dark:border-gray-600
                text-sm
                font-medium
                text-gray-700
                dark:text-gray-200
                bg-white
                dark:bg-gray-800
                hover:bg-gray-100
                dark:hover:bg-gray-700
                transition
                cursor-pointer
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loadingData}
              className="
                px-5
                py-2.5
                rounded-lg
                bg-blue-600
                hover:bg-blue-700
                text-white
                text-sm
                font-medium
                transition
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Save Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildModal;
