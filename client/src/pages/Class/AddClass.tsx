import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGrades } from "../../context/GradesContext";
import type { Grade } from "../../data/gradesData";

const AddClass = () => {
  const navigate = useNavigate();
  const { addGrade } = useGrades();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [status, setStatus] = useState<Grade["status"]>("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newGrade: Grade = {
      id: Date.now(),
      name,
      description,
      teacher,
      ageRange,
      members: 0,
      status,
    };

    // Add grade to context
    addGrade(newGrade);

    // Return to Grades page with success state
    navigate("/grade", {
      state: {
        gradeAdded: true,
      },
    });
  };

  return (
    <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate("/grades")}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#365452] dark:text-gray-400 dark:hover:text-[#8eb0ac]"
        >
          <ArrowLeft size={17} />
          Back to Grades
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add Grade
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create a new grade for your church.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Form Header */}
          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Class Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Enter the details for the new class.
            </p>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-2">
            {/* Grade Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Class Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Grade 5"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#365452] focus:ring-2 focus:ring-[#365452]/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>

            {/* Teacher */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Teacher
              </label>

              <input
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="e.g. Sarah Wanjiku"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#365452] focus:ring-2 focus:ring-[#365452]/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>

            {/* Age Range */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Age Range
              </label>

              <input
                type="text"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                placeholder="e.g. 9 - 10 years"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#365452] focus:ring-2 focus:ring-[#365452]/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Grade["status"])}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-2 focus:ring-[#365452]/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe this grade..."
                rows={4}
                required
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#365452] focus:ring-2 focus:ring-[#365452]/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate("/grades")}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#365452] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] dark:bg-[#8eb0ac] dark:text-gray-900 dark:hover:bg-[#789c98]"
            >
              <Save size={17} />
              Save Class
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
