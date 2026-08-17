import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import type { SpiritualDevelopment } from "./Discipleship";

interface EditSpiritualDevelopmentModalProps {
  isOpen: boolean;
  development: SpiritualDevelopment;
  onClose: () => void;
  onSave: (updatedDevelopment: SpiritualDevelopment) => void;
}

const EditSpiritualDevelopmentModal = ({
  isOpen,
  development,
  onClose,
  onSave,
}: EditSpiritualDevelopmentModalProps) => {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState<SpiritualDevelopment>(development);

  // =====================================================
  // LOAD CURRENT DEVELOPMENT DATA
  // =====================================================

  useEffect(() => {
    setFormData(development);
  }, [development]);

  // =====================================================
  // HANDLE VALUE CHANGE
  // =====================================================

  const handleChange = (field: keyof SpiritualDevelopment, value: number) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSubmit = () => {
    onSave(formData);
  };

  // =====================================================
  // DON'T RENDER WHEN CLOSED
  // =====================================================

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Spiritual Development
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Update the child's current development assessment.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <div className="space-y-6 p-6">
          {/* =================================================
              BIBLE KNOWLEDGE
          ================================================= */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Bible Knowledge
              </label>

              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {formData.bibleKnowledge}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={formData.bibleKnowledge}
              onChange={(e) =>
                handleChange("bibleKnowledge", Number(e.target.value))
              }
              className="w-full accent-blue-600"
            />

            <div className="mt-1 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
              <span>Beginning</span>
              <span>Developing</span>
              <span>Strong</span>
            </div>
          </div>

          {/* =================================================
              PRAYER LIFE
          ================================================= */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Prayer Life
              </label>

              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {formData.prayerLife}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={formData.prayerLife}
              onChange={(e) =>
                handleChange("prayerLife", Number(e.target.value))
              }
              className="w-full accent-blue-600"
            />

            <div className="mt-1 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
              <span>Beginning</span>
              <span>Developing</span>
              <span>Strong</span>
            </div>
          </div>

          {/* =================================================
              CHRISTIAN CHARACTER
          ================================================= */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Christian Character
              </label>

              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {formData.christianCharacter}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={formData.christianCharacter}
              onChange={(e) =>
                handleChange("christianCharacter", Number(e.target.value))
              }
              className="w-full accent-blue-600"
            />

            <div className="mt-1 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
              <span>Beginning</span>
              <span>Developing</span>
              <span>Strong</span>
            </div>
          </div>
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSpiritualDevelopmentModal;
