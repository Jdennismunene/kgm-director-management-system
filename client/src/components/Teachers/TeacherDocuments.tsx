import {
  Download,
  FileText,
  FolderOpen,
  MoreVertical,
  Plus,
} from "lucide-react";
import type { Teacher } from "../../data/teachersData";

interface TeacherDocumentsProps {
  teacher: Teacher;
}

const TeacherDocuments = ({ teacher }: TeacherDocumentsProps) => {
  const documents = [
    {
      id: 1,
      name: "Employment Contract",
      type: "PDF",
      size: "245 KB",
      date: "Aug 10, 2026",
    },
    {
      id: 2,
      name: "Teacher Identification",
      type: "PDF",
      size: "180 KB",
      date: "Aug 10, 2026",
    },
    {
      id: 3,
      name: "Teaching Certificate",
      type: "PDF",
      size: "320 KB",
      date: "Aug 11, 2026",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Teacher Documents
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage documents and files associated with {teacher.name}.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543]"
          >
            <Plus size={17} />
            Upload Document
          </button>
        </div>

        {/* Documents */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {documents.length > 0 ? (
            documents.map((document) => (
              <div
                key={document.id}
                className="flex flex-col gap-4 px-6 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-gray-700/30"
              >
                {/* File Info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#365452]/10 dark:bg-[#8eb0ac]/10">
                    <FileText
                      size={19}
                      className="text-[#365452] dark:text-[#8eb0ac]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {document.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {document.type} • {document.size} • Uploaded{" "}
                      {document.date}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title="Download document"
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#365452] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-[#8eb0ac]"
                  >
                    <Download size={17} />
                  </button>

                  <button
                    type="button"
                    title="More options"
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <MoreVertical size={17} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <FolderOpen
                size={32}
                className="mx-auto text-gray-400 dark:text-gray-500"
              />

              <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                No documents
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                No documents have been uploaded for this teacher yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Document Information */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Document Information
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Keep important teacher records such as certificates, contracts,
          identification documents, and other supporting files here.
        </p>
      </div>
    </div>
  );
};

export default TeacherDocuments;
