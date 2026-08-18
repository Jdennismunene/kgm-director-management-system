import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import TeacherRecordHeader from "../../components/Teachers/TeacherRecordHeader";
import TeacherRecordTabs from "../../components/Teachers/TeacherRecordTabs";
import TeacherOverview from "../../components/Teachers/TeacherOverview";
import TeacherPersonalInformation from "../../components/Teachers/TeacherPersonalInformation";
import TeacherTeaching from "../../components/Teachers/TeacherTeaching";
import TeacherDocuments from "../../components/Teachers/TeacherDocuments";
import TeacherHistory from "../../components/Teachers/TeacherHistory";
import { useTeachers } from "../../context/TeachersContext";

const TeacherRecords = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { id } = useParams();

  const { teachers } = useTeachers();

  const teacher = teachers.find((item) => item.id === Number(id));

  /*
   * Teacher not found
   */
  if (!teacher) {
    return (
      <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
        <button
          onClick={() => navigate("/teachers")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#365452] dark:text-gray-400 dark:hover:text-[#8eb0ac]"
        >
          <ArrowLeft size={17} />
          Back to Teachers
        </button>

        <div className="flex min-h-100 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Teacher Not Found
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              The teacher you're looking for does not exist.
            </p>

            <button
              onClick={() => navigate("/teachers")}
              className="mt-5 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543]"
            >
              Back to Teachers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
      {/* Breadcrumb / Back */}
      <div className="mb-5">
        <button
          onClick={() => navigate("/teachers")}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#365452] dark:text-gray-400 dark:hover:text-[#8eb0ac]"
        >
          <ArrowLeft size={17} />
          Back to Teachers
        </button>
      </div>

      {/* Teacher Header */}
      <TeacherRecordHeader teacher={teacher} />

      {/* Teacher Tabs */}
      <TeacherRecordTabs
        teacher={teacher}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      {activeTab === "overview" && <TeacherOverview teacher={teacher} />}

      {activeTab === "personal" && (
        <TeacherPersonalInformation teacher={teacher} />
      )}

      {activeTab === "teaching" && <TeacherTeaching teacher={teacher} />}

      {activeTab === "documents" && <TeacherDocuments teacher={teacher} />}

      {activeTab === "history" && <TeacherHistory teacher={teacher} />}
    </div>
  );
};

export default TeacherRecords;
