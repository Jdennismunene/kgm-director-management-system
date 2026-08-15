import { X } from "lucide-react";
import { useState } from "react";
import type { Child } from "../../data/childrenData";

interface AddChildModalProps {
  onClose: () => void;
  onSave: (child: Child) => void;
}

const AddChildModal = ({ onClose, onSave }: AddChildModalProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");
  const [parent, setParent] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newChild: Child = {
      id: Date.now(),
      name,
      age: Number(age),
      className,
      parent,
      phone,
      branch,
      status,
    };

    onSave(newChild);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl">
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Child Name */}
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

            {/* Age */}
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

            {/* Class */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Class
              </label>

              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
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
  outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Branch
              </label>

              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
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

            {/* Parent */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parent / Guardian
              </label>

              <input
                type="text"
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                placeholder="Enter parent or guardian"
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0721 234 567"
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

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Active" | "Inactive")
                }
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
"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer */}
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
