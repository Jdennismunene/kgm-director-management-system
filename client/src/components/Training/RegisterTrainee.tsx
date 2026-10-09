import { CalendarDays, UserPlus, X } from "lucide-react";
import { useState } from "react";
import type { Trainee } from "../../pages/Training/Training";

// =====================================================
// PROPS
// =====================================================

interface RegisterTraineeProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (trainee: Trainee) => void;
}

// =====================================================
// COMPONENT
// =====================================================

function RegisterTrainee({
  isOpen,
  onClose,
  onRegister,
}: RegisterTraineeProps) {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    level: "Level 1",
    cohort: "2026 Cohort A",
    registrationDate: new Date().toISOString().split("T")[0],
    status: "Active",
  });

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // ---------------------------------------------------
    // Basic validation
    // ---------------------------------------------------

    if (!formData.name.trim()) {
      alert("Please enter the trainee name.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Please enter the trainee phone number.");
      return;
    }

    // ---------------------------------------------------
    // Generate registration number
    // ---------------------------------------------------

    const registrationNumber = `KGM-TR-${String(Date.now()).slice(-4)}`;

    // ---------------------------------------------------
    // Format registration date
    // ---------------------------------------------------

    const formattedDate = new Date(
      formData.registrationDate,
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // ---------------------------------------------------
    // Create trainee
    // ---------------------------------------------------

    const newTrainee: Trainee = {
      id: registrationNumber,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      level: formData.level,
      cohort: formData.cohort,
      registrationDate: formattedDate,
      status: formData.status,
    };

    // ---------------------------------------------------
    // Send trainee to parent
    // ---------------------------------------------------

    onRegister(newTrainee);

    // ---------------------------------------------------
    // Reset form
    // ---------------------------------------------------

    setFormData({
      name: "",
      phone: "",
      level: "Level 1",
      cohort: "2026 Cohort A",
      registrationDate: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  if (!isOpen) {
    return null;
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-900">
        {/* =================================================
            MODAL HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <UserPlus
                size={20}
                className="text-[#5F4A8B] dark:text-purple-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Register Trainee
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add a new trainee to the training program
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Trainee Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Trainee Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter trainee full name"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 0712 345 678"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500"
              />
            </div>

            {/* Training Level */}
            <div>
              <label
                htmlFor="level"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Training Level
              </label>

              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="Level 1">Level 1 - Foundation</option>

                <option value="Level 2">Level 2 - Advanced</option>
              </select>
            </div>

            {/* Cohort */}
            <div>
              <label
                htmlFor="cohort"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cohort
              </label>

              <select
                id="cohort"
                name="cohort"
                value={formData.cohort}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="2026 Cohort A">2026 Cohort A</option>

                <option value="2026 Cohort B">2026 Cohort B</option>

                <option value="2026 Cohort C">2026 Cohort C</option>
              </select>
            </div>

            {/* Registration Date */}
            <div>
              <label
                htmlFor="registrationDate"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Registration Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />

                <input
                  id="registrationDate"
                  name="registrationDate"
                  type="date"
                  value={formData.registrationDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#5F4A8B] focus:ring-1 focus:ring-[#5F4A8B] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:justify-end dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5F4A8B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4f3d75]"
            >
              <UserPlus size={17} />
              Register Trainee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterTrainee;
