import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

import type { Teacher, UpdateTeacherData } from "../../services/teacherService";

interface EditTeacherModalProps {
  teacher: Teacher | null;
  onClose: () => void;
  onSave: (id: string, data: UpdateTeacherData) => Promise<void>;
}

const EditTeacherModal = ({
  teacher,
  onClose,
  onSave,
}: EditTeacherModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Teacher["status"]>("ACTIVE");
  const [selectedGradeIds, setSelectedGradeIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!teacher) return;

    setName(teacher.name);
    setEmail(teacher.email);
    setPhone(teacher.phone);
    setStatus(teacher.status);
    setSelectedGradeIds(teacher.grades.map((grade) => grade.id));
  }, [teacher]);

  const handleGradeChange = (gradeId: string, checked: boolean) => {
    setSelectedGradeIds((prev) =>
      checked ? [...prev, gradeId] : prev.filter((id) => id !== gradeId),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teacher) return;

    try {
      setSaving(true);

      await onSave(teacher.id, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        status,
        gradeIds: selectedGradeIds,
      });
    } catch (error) {
      console.error("Error updating teacher:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!teacher) return null;

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
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-200"
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
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
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
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
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
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
            />
          </div>

          {/* Classes */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Classes
            </label>

            <div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border border-gray-300 bg-white p-3 dark:border-gray-600 dark:bg-gray-700">
              {teacher.grades.length > 0 ? (
                teacher.grades.map((grade) => (
                  <label
                    key={grade.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGradeIds.includes(grade.id)}
                      onChange={(e) =>
                        handleGradeChange(grade.id, e.target.checked)
                      }
                      disabled={saving}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {grade.name}
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No classes assigned to this teacher.
                </p>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Select the classes assigned to this teacher.
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
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-teal-900"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherModal;
