import { X, Save } from "lucide-react";
import type { Child } from "../../data/childrenData";

interface EditChildModalProps {
  child: Child | null;
  onClose: () => void;
  onSave: (updatedChild: Child) => void;
}

const EditChildModal = ({ child, onClose, onSave }: EditChildModalProps) => {
  if (!child) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedChild: Child = {
      ...child,
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
      className: formData.get("className") as string,
      branch: formData.get("branch") as string,
      parent: formData.get("parent") as string,
      phone: formData.get("phone") as string,
    };

    onSave(updatedChild);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-black/40 overflow-hidden transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Edit Child
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Update the child's information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              text-gray-500
              dark:text-gray-400
              hover:bg-gray-100
              dark:hover:bg-gray-800
              hover:text-gray-700
              dark:hover:text-gray-200
              transition
              cursor-pointer
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            {/* Child Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Child Name
              </label>

              <input
                type="text"
                name="name"
                defaultValue={child.name}
                required
                className="
                  w-full
                  px-4
                  py-2.5
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-lg
                  outline-none
                  bg-white
                  dark:bg-gray-800
                  text-gray-800
                  dark:text-gray-100
                  placeholder-gray-400
                  dark:placeholder-gray-500
                  focus:border-blue-500
                  dark:focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                  dark:focus:ring-blue-950
                  text-sm
                  transition
                "
              />
            </div>

            {/* Age + Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  min="1"
                  max="20"
                  defaultValue={child.age}
                  required
                  className="
                    w-full
                    px-4
                    py-2.5
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded-lg
                    outline-none
                    bg-white
                    dark:bg-gray-800
                    text-gray-800
                    dark:text-gray-100
                    focus:border-blue-500
                    dark:focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100
                    dark:focus:ring-blue-950
                    text-sm
                    transition
                  "
                />
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Class
                </label>

                <input
                  type="text"
                  name="className"
                  defaultValue={child.className}
                  required
                  className="
                    w-full
                    px-4
                    py-2.5
                    border
                    border-gray-200
                    dark:border-gray-700
                    rounded-lg
                    outline-none
                    bg-white
                    dark:bg-gray-800
                    text-gray-800
                    dark:text-gray-100
                    focus:border-blue-500
                    dark:focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100
                    dark:focus:ring-blue-950
                    text-sm
                    transition
                  "
                />
              </div>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Branch
              </label>

              <select
                name="branch"
                defaultValue={child.branch}
                required
                className="
                  w-full
                  px-4
                  py-2.5
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-lg
                  outline-none
                  bg-white
                  dark:bg-gray-800
                  text-gray-700
                  dark:text-gray-100
                  focus:border-blue-500
                  dark:focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                  dark:focus:ring-blue-950
                  text-sm
                  cursor-pointer
                  transition
                "
              >
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Parent / Guardian
              </label>

              <input
                type="text"
                name="parent"
                defaultValue={child.parent}
                required
                className="
                  w-full
                  px-4
                  py-2.5
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-lg
                  outline-none
                  bg-white
                  dark:bg-gray-800
                  text-gray-800
                  dark:text-gray-100
                  focus:border-blue-500
                  dark:focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                  dark:focus:ring-blue-950
                  text-sm
                  transition
                "
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                defaultValue={child.phone}
                required
                className="
                  w-full
                  px-4
                  py-2.5
                  border
                  border-gray-200
                  dark:border-gray-700
                  rounded-lg
                  outline-none
                  bg-white
                  dark:bg-gray-800
                  text-gray-800
                  dark:text-gray-100
                  focus:border-blue-500
                  dark:focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                  dark:focus:ring-blue-950
                  text-sm
                  transition
                "
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70">
            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2.5
                rounded-lg
                border
                border-gray-200
                dark:border-gray-700
                bg-white
                dark:bg-gray-900
                text-gray-700
                dark:text-gray-200
                text-sm
                font-medium
                hover:bg-gray-100
                dark:hover:bg-gray-800
                transition
                cursor-pointer
              "
            >
              Cancel
            </button>

            {/* Save */}
            <button
              type="submit"
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-lg
                bg-blue-600
                text-white
                text-sm
                font-medium
                hover:bg-blue-700
                dark:hover:bg-blue-500
                transition
                cursor-pointer
              "
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

export default EditChildModal;
