import { Save, X } from "lucide-react";
import { useState } from "react";

interface TeacherDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
}

interface UploadTeacherDocumentModalProps {
  onClose: () => void;
  onSave: (document: TeacherDocument) => void;
}

const UploadTeacherDocumentModal = ({
  onClose,
  onSave,
}: UploadTeacherDocumentModalProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("PDF");
  const [size, setSize] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDocument: TeacherDocument = {
      id: Date.now(),
      name: name.trim(),
      type,
      size: size.trim() || "Unknown size",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    onSave(newDocument);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upload Document
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add a document to this teacher's records.
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            {/* Document Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Employment Contract"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-2 focus:ring-[#365452]/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Document Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-2 focus:ring-[#365452]/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="PDF">PDF</option>
                <option value="DOC">DOC</option>
                <option value="DOCX">DOCX</option>
                <option value="JPG">JPG</option>
                <option value="PNG">PNG</option>
              </select>
            </div>

            {/* File Size */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                File Size
              </label>

              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. 245 KB"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-[#365452] focus:ring-2 focus:ring-[#365452]/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
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
              className="flex items-center gap-2 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543]"
            >
              <Save size={17} />
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadTeacherDocumentModal;
