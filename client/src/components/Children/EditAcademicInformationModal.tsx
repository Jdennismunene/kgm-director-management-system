import { Save, X } from "lucide-react";
import { useState } from "react";
import type { AcademicInformation } from "../../data/academicInformation";

interface EditAcademicInformationModalProps {
  info: AcademicInformation;
  onClose: () => void;
  onSave: (updatedInfo: AcademicInformation) => void;
}

const EditAcademicInformationModal = ({
  info,
  onClose,
  onSave,
}: EditAcademicInformationModalProps) => {
  const [className, setClassName] = useState(info.className);
  const [branch, setBranch] = useState(info.branch);
  const [dateJoined, setDateJoined] = useState(info.dateJoined);
  const [baptized, setBaptized] = useState<"Yes" | "No">(info.baptized);
  const [baptismDate, setBaptismDate] = useState(info.baptismDate);

  const handleBaptizedChange = (value: "Yes" | "No") => {
    setBaptized(value);

    // Clear baptism date if child is not baptized
    if (value === "No") {
      setBaptismDate("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      className,
      branch,
      dateJoined,
      baptized,
      baptismDate,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 dark:bg-black/60">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Edit Academic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update the child's class and church information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Class */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Class
              </label>

              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Branch
              </label>

              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select branch</option>
                <option value="Main Church">Main Church</option>
                <option value="Shiloh Worship Centre">
                  Shiloh Worship Centre
                </option>
                <option value="Ukombozi Restoration Center">
                  Ukombozi Restoration Center
                </option>
              </select>
            </div>

            {/* Date Joined */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Date Joined
              </label>

              <input
                type="date"
                value={dateJoined}
                onChange={(e) => setDateJoined(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Baptized */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Baptized
              </label>

              <select
                value={baptized}
                onChange={(e) =>
                  handleBaptizedChange(e.target.value as "Yes" | "No")
                }
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Baptism Date */}
            {baptized === "Yes" && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Baptism Date
                </label>

                <input
                  type="date"
                  value={baptismDate}
                  onChange={(e) => setBaptismDate(e.target.value)}
                  required={baptized === "Yes"}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/70">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAcademicInformationModal;
