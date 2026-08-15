import {
  Download,
  File,
  FileImage,
  FileText,
  FolderOpen,
  Plus,
  Upload,
} from "lucide-react";

const Documents = () => {
  const documents = [
    {
      name: "Birth Certificate",
      type: "PDF",
      category: "Identification",
      size: "1.2 MB",
      date: "May 12, 2024",
      icon: FileText,
    },
    {
      name: "Parent Consent Form",
      type: "PDF",
      category: "Consent",
      size: "845 KB",
      date: "May 15, 2024",
      icon: FileText,
    },
    {
      name: "Child Profile Photo",
      type: "JPG",
      category: "Photo",
      size: "2.4 MB",
      date: "May 12, 2024",
      icon: FileImage,
    },
    {
      name: "Medical Information Form",
      type: "PDF",
      category: "Medical",
      size: "980 KB",
      date: "May 16, 2024",
      icon: FileText,
    },
    {
      name: "School Report",
      type: "PDF",
      category: "Education",
      size: "1.7 MB",
      date: "July 20, 2026",
      icon: FileText,
    },
  ];

  return (
    <div className="mt-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Documents
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage documents and files associated with this child.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Upload size={17} />
          Upload Document
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Documents */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Documents
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                5
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <FolderOpen
                size={20}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
        </div>

        {/* PDFs */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                PDF Documents
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                4
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30">
              <FileText size={20} className="text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Images
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                1
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
              <FileImage
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Storage Used
              </p>

              <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                7.1 MB
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
              <File size={20} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm dark:border-gray-600 dark:bg-gray-800">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
          <Upload size={22} className="text-blue-600 dark:text-blue-400" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
          Upload a new document
        </h3>

        <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-gray-500 dark:text-gray-400">
          Upload birth certificates, consent forms, medical records, school
          documents, or other important files.
        </p>

        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <Plus size={15} />
          Choose File
        </button>

        <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500">
          Supported formats: PDF, JPG, PNG • Maximum size: 10 MB
        </p>
      </div>

      {/* Documents List */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <FolderOpen
                size={17}
                className="text-blue-600 dark:text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Child Documents
              </h3>

              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Files and records stored for this child
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            All Documents
          </button>
        </div>

        {/* Documents */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {documents.map((document) => {
            const Icon = document.icon;

            return (
              <div
                key={document.name}
                className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center dark:hover:bg-gray-700/30"
              >
                {/* File Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                  <Icon
                    size={21}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </div>

                {/* Document Information */}
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {document.name}
                  </h4>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{document.category}</span>

                    <span>•</span>

                    <span>{document.type}</span>

                    <span>•</span>

                    <span>{document.size}</span>

                    <span>•</span>

                    <span>{document.date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Documents;
