import {
  UserPlus,
  User,
  Phone,
  Users,
  BookOpen,
  MapPin,
  Save,
  X,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createChild, type CreateChildData } from "../../services/childService";

import {
  createParent,
  type CreateParentData,
} from "../../services/parentService";

import { getGrades, type Grade } from "../../services/gradeService";

import { getBranches, type Branch } from "../../services/branchService";

const AddChild = () => {
  const navigate = useNavigate();

  // =========================
  // Child form data
  // =========================
  const [formData, setFormData] = useState<CreateChildData>({
    name: "",
    age: 0,
    parentId: "",
    gradeId: "",
    branchId: "",
  });

  // =========================
  // Parent form data
  // =========================
  const [parentData, setParentData] = useState<CreateParentData>({
    name: "",
    phone: "",
    email: "",
  });

  // =========================
  // Options
  // =========================
  const [grades, setGrades] = useState<Grade[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);

  // =========================
  // Loading / errors
  // =========================
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Load grades and branches
  // =========================
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
        console.error("Failed to load grades and branches:", error);

        setError(
          "Failed to load grades and branches. Please make sure the backend server is running.",
        );
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  // =========================
  // Child input changes
  // =========================
  const handleChildChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  // =========================
  // Parent input changes
  // =========================
  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setParentData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================
  // Submit
  // =========================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    // =========================
    // Validate child
    // =========================
    if (!formData.name.trim()) {
      setError("Child name is required.");
      return;
    }

    if (!formData.age || formData.age < 1) {
      setError("Please enter a valid child age.");
      return;
    }

    if (!formData.gradeId) {
      setError("Please select a class.");
      return;
    }

    if (!formData.branchId) {
      setError("Please select a branch.");
      return;
    }

    // =========================
    // Validate parent
    // =========================
    if (!parentData.name.trim()) {
      setError("Parent / Guardian name is required.");
      return;
    }

    if (!parentData.phone.trim()) {
      setError("Parent / Guardian phone number is required.");
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // STEP 1: Create the parent first
      // =====================================================
      const createdParent = await createParent({
        name: parentData.name.trim(),
        phone: parentData.phone.trim(),
        email: parentData.email?.trim() || "",
      });

      // =====================================================
      // STEP 2: Use the new parent's ID to create the child
      // =====================================================
      await createChild({
        name: formData.name.trim(),
        age: formData.age,
        parentId: createdParent.id,
        gradeId: formData.gradeId,
        branchId: formData.branchId,
      });

      // =====================================================
      // STEP 3: Go back to All Children
      // =====================================================
      navigate("/children");
    } catch (error) {
      console.error("Failed to register child:", error);

      setError(
        "Failed to register child. Please check the details and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mx-4 mt-3 pb-3">
      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-blue-600 dark:text-blue-400">Dashboard</span>

            <span>/</span>

            <span className="text-blue-600 dark:text-blue-400">Children</span>

            <span>/</span>

            <span className="text-gray-600 dark:text-gray-300">Add Child</span>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Add Child
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Register a new child into the Sunday School management system.
          </p>
        </div>
      </div>

      {/* =========================
          ERROR
      ========================== */}
      {error && (
        <div
          className="
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
            dark:border-red-800
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* =========================
          FORM CARD
      ========================== */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
        {/* Form Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
              <UserPlus
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                Child Information
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Enter the child's details below.
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            FORM
        ========================== */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* =========================
                PERSONAL INFORMATION
            ========================== */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-4">
                <User size={17} className="text-blue-600 dark:text-blue-400" />

                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                {/* Child Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Child Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChildChange}
                    placeholder="Enter child's full name"
                    disabled={loading}
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-lg
                      border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-800
                      text-sm
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100 dark:focus:ring-blue-950
                      transition
                      disabled:opacity-50
                    "
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="20"
                    value={formData.age || ""}
                    onChange={handleChildChange}
                    placeholder="Enter age"
                    disabled={loading}
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-lg
                      border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-800
                      text-sm
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100 dark:focus:ring-blue-950
                      transition
                      disabled:opacity-50
                    "
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Class
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">
                    <select
                      name="gradeId"
                      value={formData.gradeId}
                      onChange={handleChildChange}
                      disabled={loading || loadingOptions}
                      className="
                        appearance-none
                        w-full
                        h-11
                        px-4
                        pr-10
                        rounded-lg
                        border border-gray-200 dark:border-gray-700
                        bg-white dark:bg-gray-800
                        text-sm
                        text-gray-800 dark:text-gray-100
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100 dark:focus:ring-blue-950
                        cursor-pointer
                        transition
                        disabled:opacity-50
                      "
                    >
                      <option value="" disabled>
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

                    <BookOpen
                      size={16}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        pointer-events-none
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =========================
                CHURCH INFORMATION
            ========================== */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-4">
                <MapPin
                  size={17}
                  className="text-blue-600 dark:text-blue-400"
                />

                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Church Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Branch
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <select
                    name="branchId"
                    value={formData.branchId}
                    onChange={handleChildChange}
                    disabled={loading || loadingOptions}
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-lg
                      border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-800
                      text-sm
                      text-gray-800 dark:text-gray-100
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100 dark:focus:ring-blue-950
                      cursor-pointer
                      disabled:opacity-50
                    "
                  >
                    <option value="" disabled>
                      {loadingOptions ? "Loading branches..." : "Select branch"}
                    </option>

                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* =========================
                PARENT INFORMATION
            ========================== */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users size={17} className="text-blue-600 dark:text-blue-400" />

                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Parent / Guardian Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                {/* Parent Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Parent / Guardian Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={parentData.name}
                    onChange={handleParentChange}
                    placeholder="Enter parent or guardian name"
                    disabled={loading}
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-lg
                      border border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-800
                      text-sm
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100 dark:focus:ring-blue-950
                      transition
                      disabled:opacity-50
                    "
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="
                        absolute
                        left-3.5
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={parentData.phone}
                      onChange={handleParentChange}
                      placeholder="Parent phone number"
                      disabled={loading}
                      className="
                        w-full
                        h-11
                        pl-10
                        pr-4
                        rounded-lg
                        border border-gray-200 dark:border-gray-700
                        bg-white dark:bg-gray-800
                        text-sm
                        text-gray-800 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-500
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100 dark:focus:ring-blue-950
                        transition
                        disabled:opacity-50
                      "
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                    <span className="text-gray-400 ml-1">(Optional)</span>
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="
                        absolute
                        left-3.5
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      value={parentData.email || ""}
                      onChange={handleParentChange}
                      placeholder="Parent email address"
                      disabled={loading}
                      className="
                        w-full
                        h-11
                        pl-10
                        pr-4
                        rounded-lg
                        border border-gray-200 dark:border-gray-700
                        bg-white dark:bg-gray-800
                        text-sm
                        text-gray-800 dark:text-gray-100
                        placeholder-gray-400 dark:placeholder-gray-500
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100 dark:focus:ring-blue-950
                        transition
                        disabled:opacity-50
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              FORM FOOTER
          ========================== */}
          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:items-center
              sm:justify-end
              gap-3
              px-6
              py-4
              bg-gray-50 dark:bg-gray-800/60
              border-t border-gray-200 dark:border-gray-700
            "
          >
            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate("/children")}
              disabled={loading}
              className="
                w-full
                sm:w-auto
                h-10
                px-5
                rounded-lg
                border border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-800
                text-gray-700 dark:text-gray-300
                text-sm
                font-medium
                flex
                items-center
                justify-center
                gap-2
                hover:bg-gray-50 dark:hover:bg-gray-700
                transition
                cursor-pointer
                disabled:opacity-50
              "
            >
              <X size={16} />
              Cancel
            </button>

            {/* Save */}
            <button
              type="submit"
              disabled={loading || loadingOptions}
              className="
                w-full
                sm:w-auto
                h-10
                px-5
                rounded-lg
                bg-blue-600
                hover:bg-blue-700
                dark:bg-blue-600
                dark:hover:bg-blue-500
                text-white
                text-sm
                font-medium
                flex
                items-center
                justify-center
                gap-2
                transition
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              <Save size={16} />

              {loading ? "Saving..." : "Save Child"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChild;
