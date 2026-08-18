import { useState } from "react";
import { X, Save } from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface EditTeacherModalProps {
  teacher: Teacher | null;
  onClose: () => void;
  onSave: (updatedTeacher: Teacher) => void;
}

const EditTeacherModal = ({
  teacher,
  onClose,
  onSave,
}: EditTeacherModalProps) => {
  if (!teacher) return null;

  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email);
  const [phone, setPhone] = useState(teacher.phone);
  const [Grade, setGrade] = useState(teacher.grade.join(", "));
  const [status, setStatus] = useState<Teacher["status"]>(teacher.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTeacher: Teacher = {
      ...teacher,
      name,
      email,
      phone,
      grade: Grade
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      status,
    };

    onSave(updatedTeacher);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Teacher
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update teacher information below.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
            />
          </div>

          {/* Classes */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Classes
            </label>

            <input
              type="text"
              value={Grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="e.g. Beginners, Intermediate"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
            />

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Separate multiple classes with commas.
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Teacher["status"])}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
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

export default EditTeacherModal;
