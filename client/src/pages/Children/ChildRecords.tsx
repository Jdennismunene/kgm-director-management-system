import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import ChildRecordHeader from "../../components/Children/ChildRecordHeader";
import ChildRecordTabs from "../../components/Children/ChildRecordTabs";

import PersonalInformation from "../../components/Children/PersonalInformation";
import ParentInformation from "../../components/Children/ParentInformation";
import AcademicInformation from "../../components/Children/AcademicInformation";
import HealthInformation from "../../components/Children/HealthInformation";
import QuickInfo from "../../components/Children/QuickInfo";
import RecentActivity from "../../components/Children/RecentActivity";
import ChildRecordActions from "../../components/Children/ChildRecordActions";
import ChildProfilePrint from "../../components/Children/ChildProfilePrint";

import Attendance from "../../components/Children/Attendance";
import Lessons from "../../components/Children/Lessons";
import Discipleship from "../../components/Children/Discipleship";
import Payments from "../../components/Children/Payments";
import Notes from "../../components/Children/Notes";
import Documents from "../../components/Children/Documents";
import History from "../../components/Children/History";

import { childrenData, type Child } from "../../data/childrenData";

import {
  childPersonalInfoData,
  type ChildPersonalInfo,
} from "../../data/childPersonalInfo";

import {
  childParentInfoData,
  type ChildParentInfo,
} from "../../data/childParentInfo";

import {
  academicInformationData,
  type AcademicInformationType,
} from "../../data/academicInformation";

import {
  healthInformationData,
  type HealthInformation as HealthInformationType,
} from "../../data/healthInformation";

import { quickInfoData } from "../../data/quickInfo";

const ChildRecords = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("overview");
  const [showSuccess, setShowSuccess] = useState(false);

  // Find child using URL parameter
  const child = childrenData.find((item) => item.id === Number(id));

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState<ChildPersonalInfo | null>(
    child ? childPersonalInfoData[child.id] : null,
  );

  // Parent Information
  const [parentInfo, setParentInfo] = useState<ChildParentInfo | null>(
  child
    ? childParentInfoData[child.id] ?? {
        parentName: "Not provided",
        phone: "Not provided",
        occupation: "Not provided",
        relationship: "Not provided",
        email: "Not provided",
        address: "Not provided",
      }
    : null,
);

  // Academic Information
  const [academicInfo, setAcademicInfo] =
    useState<AcademicInformationType>(academicInformationData);

  // Health Information
  const [healthInfo, setHealthInfo] =
    useState<HealthInformationType>(healthInformationData);

  /*
   * Child Not Found
   */
  if (!child) {
    return (
      <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/children")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#365452] dark:text-gray-400 dark:hover:text-[#8eb0ac]"
        >
          <ArrowLeft size={17} />
          Back to Children
        </button>

        {/* Not Found Card */}
        <div className="flex min-h-100 items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Child Not Found
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              The child you're looking for does not exist.
            </p>

            <button
              type="button"
              onClick={() => navigate("/children")}
              className="mt-5 rounded-lg bg-[#365452] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2c4543] dark:bg-[#8eb0ac] dark:text-gray-900"
            >
              Back to Children
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Tab Change
   */
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  /*
   * Success Notification
   */
  const showUpdateSuccess = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  /*
   * Information Updates
   */
  const handlePersonalInfoUpdate = (updatedInfo: ChildPersonalInfo) => {
    setPersonalInfo(updatedInfo);
    showUpdateSuccess();
  };

  const handleParentInfoUpdate = (updatedInfo: ChildParentInfo) => {
    setParentInfo(updatedInfo);
    showUpdateSuccess();
  };

  const handleAcademicInfoUpdate = (
    updatedInfo: AcademicInformationType,
  ) => {
    setAcademicInfo(updatedInfo);
    showUpdateSuccess();
  };

  const handleHealthInfoUpdate = (
    updatedInfo: HealthInformationType,
  ) => {
    setHealthInfo(updatedInfo);
    showUpdateSuccess();
  };

  /*
   * Render
   */
  return (
    <div className="relative min-h-full bg-gray-50 p-6 dark:bg-gray-900">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-lg border border-green-200 bg-white px-4 py-3 shadow-lg dark:border-green-800 dark:bg-gray-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2
              size={18}
              className="text-green-600 dark:text-green-400"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Child Updated
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Child information was successfully updated.
            </p>
          </div>
        </div>
      )}

      {/* Back to Children */}
      <div className="mb-5">
        <button
          type="button"
          onClick={() => navigate("/children")}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#365452] dark:text-gray-400 dark:hover:text-[#8eb0ac]"
        >
          <ArrowLeft size={17} />
          Back to Children
        </button>
      </div>

      {/* Child Header */}
      <ChildRecordHeader
        selectedChild={child}
        onSelectChild={() => {}}
        searchTerm=""
        onSearchChange={() => {}}
        filteredChildren={[child]}
      />

      {/* Child Tabs */}
      <ChildRecordTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* ================= OVERVIEW ================= */}
      {activeTab === "overview" && (
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2.2fr)_minmax(300px,1fr)]">
          {/* Left Column */}
          <div>
            {personalInfo && (
              <PersonalInformation
                info={personalInfo}
                onUpdate={handlePersonalInfoUpdate}
              />
            )}

            {parentInfo && (
              <ParentInformation
                info={parentInfo}
                onUpdate={handleParentInfoUpdate}
              />
            )}

            <AcademicInformation
              info={academicInfo}
              onUpdate={handleAcademicInfoUpdate}
            />

            <HealthInformation
              info={healthInfo}
              onUpdate={handleHealthInfoUpdate}
            />
          </div>

          {/* Right Column */}
          <div>
            <QuickInfo info={quickInfoData} />

            <RecentActivity />

            <ChildRecordActions
              child={child}
              onUpdateChild={(updatedChild: Child) => {
                console.log("Child updated:", updatedChild);
                showUpdateSuccess();
              }}
            />

            <ChildProfilePrint child={child} />
          </div>
        </div>
      )}

      {/* ================= ATTENDANCE ================= */}
      {activeTab === "attendance" && <Attendance />}

      {/* ================= LESSONS ================= */}
      {activeTab === "lessons" && <Lessons />}

      {/* ================= DISCIPLESHIP ================= */}
      {activeTab === "discipleship" && <Discipleship />}

      {/* ================= PAYMENTS ================= */}
      {activeTab === "payments" && <Payments />}

      {/* ================= NOTES ================= */}
      {activeTab === "notes" && <Notes />}

      {/* ================= DOCUMENTS ================= */}
      {activeTab === "documents" && <Documents />}

      {/* ================= HISTORY ================= */}
      {activeTab === "history" && <History />}
    </div>
  );
};

export default ChildRecords;