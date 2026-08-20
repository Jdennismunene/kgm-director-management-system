import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Grade } from "../../data/gradesData";

interface EditGradeModalProps {
  grade: Grade | null;
  onClose: () => void;
  onSave: (updatedGrade: Grade) => void;
}

const EditGradeModal = ({ grade, onClose, onSave }: EditGradeModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [members, setMembers] = useState(0);
  const [status, setStatus] = useState<Grade["status"]>("Active");

  useEffect(() => {
    if (grade) {
      setName(grade.name);
      setDescription(grade.description);
      setTeacher(grade.teacher);
      setAgeRange(grade.ageRange);
      setMembers(grade.members);
      setStatus(grade.status);
    }
  }, [grade]);

  if (!grade) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedGrade: Grade = {
      id: grade.id,
      name: name.trim(),
      description: description.trim(),
      teacher: teacher.trim(),
      ageRange: ageRange.trim(),
      members,
      status,
    };

    onSave(updatedGrade);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Grade
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update the information for {grade.name}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            title="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            {/* Grade Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Grade Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#8eb0ac]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#8eb0ac]"
              />
            </div>

            {/* Teacher */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Teacher
              </label>

              <input
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#8eb0ac]"
              />
            </div>

            {/* Age Range */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Age Range
              </label>

              <input
                type="text"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                placeholder="e.g. 6 - 7 years"
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#8eb0ac]"
              />
            </div>

            {/* Members + Status */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Members */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Members
                </label>

                <input
                  type="number"
                  min={0}
                  value={members}
                  onChange={(e) => setMembers(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#8eb0ac]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Grade["status"])}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-1 focus:ring-[#365452] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-[#8eb0ac]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] dark:bg-[#8eb0ac] dark:text-gray-900 dark:hover:bg-[#789c98]"
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

export default EditGradeModal;
