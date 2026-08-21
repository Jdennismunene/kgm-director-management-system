import {
  UserPlus,
  User,
  Phone,
  Users,
  BookOpen,
  MapPin,
  Save,
  X,
} from "lucide-react";

const AddChild = () => {
  return (
    <div className="space-y-6 mx-4 mt-3 pb-3">
      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-blue-600 dark:text-blue-400">
              Dashboard
            </span>

            <span>/</span>

            <span className="text-blue-600 dark:text-blue-400">
              Children
            </span>

            <span>/</span>

            <span className="text-gray-600 dark:text-gray-300">
              Add Child
            </span>
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
        <form>
          <div className="p-6">
            {/* =========================
                PERSONAL INFORMATION
            ========================== */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-4">
                <User
                  size={17}
                  className="text-blue-600 dark:text-blue-400"
                />

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
                    placeholder="Enter child's full name"
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
                    min="1"
                    max="20"
                    placeholder="Enter age"
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
                    "
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Class
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <div className="relative">
                    <select
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
                      "
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select class
                      </option>
                      <option value="PP2">PP1</option>
                      <option value="PP1">PP2</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
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
                    defaultValue=""
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
                    "
                  >
                    <option value="" disabled>
                      Select branch
                    </option>

                    <option value="Main Church">
                      Main Church
                    </option>

                    <option value="Shiloh Worship Centre">
                      Shiloh Worship Centre
                    </option>

                    <option value="Ukombozi Restoration Center">
                      Ukombozi Restoration Center
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* =========================
                PARENT INFORMATION
            ========================== */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users
                  size={17}
                  className="text-blue-600 dark:text-blue-400"
                />

                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Parent / Guardian Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                {/* Parent */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Parent / Guardian
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter parent or guardian name"
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
                      placeholder="e.g. 0721 234 567"
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
              "
            >
              <X size={16} />
              Cancel
            </button>

            {/* Save */}
            <button
              type="submit"
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
              "
            >
              <Save size={16} />
              Save Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChild;