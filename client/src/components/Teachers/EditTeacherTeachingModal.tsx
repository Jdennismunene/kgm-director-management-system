import { Save, X } from "lucide-react";
import { useState } from "react";
import type { Teacher, UpdateTeacherData } from "../../services/teacherService";
interface EditTeacherTeachingModalProps {
  teacher: Teacher;
  onClose: () => void;
  onSave: (id: string, data: UpdateTeacherData) => Promise<void>;
}
const EditTeacherTeachingModal = ({
  teacher,
  onClose,
  onSave,
}: EditTeacherTeachingModalProps) => {
  const [selectedGradeIds, setSelectedGradeIds] = useState<string[]>(
    teacher.grades.map((grade) => grade.id),
  );
  const [saving, setSaving] = useState(false);
  const toggleGrade = (gradeId: string) => {
    setSelectedGradeIds((current) =>
      current.includes(gradeId)
        ? current.filter((id) => id !== gradeId)
        : [...current, gradeId],
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSave(teacher.id, { gradeIds: selectedGradeIds });
    } catch (error) {
      console.error("Error updating teaching assignments:", error);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {" "}
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {" "}
        {/* Header */}{" "}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          {" "}
          <div>
            {" "}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {" "}
              Edit Teaching Assignments{" "}
            </h2>{" "}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {" "}
              Select the grades currently assigned to this teacher.{" "}
            </p>{" "}
          </div>{" "}
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            {" "}
            <X size={20} />{" "}
          </button>{" "}
        </div>{" "}
        {/* Grades */}{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="p-6">
            {" "}
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {" "}
              Assigned Grades{" "}
            </label>{" "}
            {teacher.grades.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {" "}
                {teacher.grades.map((grade) => {
                  const isSelected = selectedGradeIds.includes(grade.id);
                  return (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => toggleGrade(grade.id)}
                      disabled={saving}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${isSelected ? "border-[#365452] bg-[#365452]/10 text-[#365452] dark:border-[#8eb0ac] dark:bg-[#8eb0ac]/10 dark:text-[#8eb0ac]" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"}`}
                    >
                      {" "}
                      <span>{grade.name}</span>{" "}
                      {isSelected && (
                        <span className="text-xs font-semibold">
                          {" "}
                          Selected{" "}
                        </span>
                      )}{" "}
                    </button>
                  );
                })}{" "}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
                {" "}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {" "}
                  No grades are currently assigned to this teacher.{" "}
                </p>{" "}
              </div>
            )}{" "}
            {selectedGradeIds.length === 0 && (
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {" "}
                No grades selected.{" "}
              </p>
            )}{" "}
          </div>{" "}
          {/* Footer */}{" "}
          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
            {" "}
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {" "}
              Cancel{" "}
            </button>{" "}
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {" "}
              <Save size={17} /> {saving ? "Saving..." : "Save Changes"}{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
export default EditTeacherTeachingModal;
