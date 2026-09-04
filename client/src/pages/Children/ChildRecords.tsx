import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

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

import { getChildById, type Child } from "../../services/childService";

import { type ChildPersonalInfo } from "../../data/childPersonalInfo";

import { type ChildParentInfo } from "../../data/childParentInfo";

import {
  healthInformationData,
  type HealthInformation as HealthInformationType,
} from "../../data/healthInformation";

const ChildRecords = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  // =========================
  // CHILD
  // =========================

  const [child, setChild] = useState<Child | null>(null);

  // =========================
  // LOADING / ERROR
  // =========================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // TABS
  // =========================

  const [activeTab, setActiveTab] = useState("overview");

  // =========================
  // SUCCESS MESSAGE
  // =========================

  const [showSuccess, setShowSuccess] = useState(false);

  // =========================
  // PERSONAL INFORMATION
  // =========================

  const [personalInfo, setPersonalInfo] = useState<ChildPersonalInfo | null>(
    null,
  );

  // =========================
  // PARENT INFORMATION
  // =========================

  const [parentInfo, setParentInfo] = useState<ChildParentInfo | null>(null);

  // =========================
  // HEALTH INFORMATION
  // =========================

  const [healthInfo, setHealthInfo] = useState<HealthInformationType>(
    healthInformationData,
  );

  // =====================================================
  // LOAD CHILD FROM DATABASE
  // =====================================================

  useEffect(() => {
    const loadChild = async () => {
      if (!id) {
        setError("Child ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("Loading child:", id);

        const childData = await getChildById(id);

        console.log("Child loaded:", childData);

        setChild(childData);

        // =================================================
        // PERSONAL INFORMATION
        // =================================================

        setPersonalInfo({
          fullName: childData.name,
          age: childData.age,
          address: "Not provided",
          gender: "Not provided",
          bloodGroup: "Not provided",
          nationality: "Not provided",
          dateOfBirth: "Not provided",
          language: "Not provided",
        });

        setParentInfo({
          parentName: childData.parent?.name ?? "Not provided",
          phone: childData.parent?.phone ?? "Not provided",
          email: childData.parent?.email ?? "Not provided",
          occupation: "Not provided",
          relationship: "Not provided",
          address: "Not provided",
        });
      } catch (error) {
        console.error("Failed to load child:", error);

        setError(
          "Failed to load child information. Please make sure the child exists and the backend server is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadChild();
  }, [id]);

  // =====================================================
  // TAB CHANGE
  // =====================================================

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // =====================================================
  // SUCCESS MESSAGE
  // =====================================================

  const showUpdateSuccess = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // =====================================================
  // PERSONAL INFORMATION UPDATE
  // =====================================================

  const handlePersonalInfoUpdate = (updatedInfo: ChildPersonalInfo) => {
    setPersonalInfo(updatedInfo);

    showUpdateSuccess();
  };

  // =====================================================
  // PARENT INFORMATION UPDATE
  // =====================================================

  const handleParentInfoUpdate = (updatedInfo: ChildParentInfo) => {
    setParentInfo(updatedInfo);

    showUpdateSuccess();
  };

  // =====================================================
  // HEALTH INFORMATION UPDATE
  // =====================================================

  const handleHealthInfoUpdate = (updatedInfo: HealthInformationType) => {
    setHealthInfo(updatedInfo);

    showUpdateSuccess();
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
        <button
          type="button"
          onClick={() => navigate("/children")}
          className="
            mb-6
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-600
            transition
            hover:text-[#365452]
            dark:text-gray-400
            dark:hover:text-[#8eb0ac]
          "
        >
          <ArrowLeft size={17} />
          Back to Children
        </button>

        <div
          className="
            flex
            min-h-100
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            bg-white
            dark:border-gray-700
            dark:bg-gray-800
          "
        >
          <div className="flex flex-col items-center text-center">
            <Loader2 size={30} className="animate-spin text-blue-600" />

            <p
              className="
                mt-4
                text-sm
                font-medium
                text-gray-700
                dark:text-gray-200
              "
            >
              Loading child information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR / CHILD NOT FOUND
  // =====================================================

  if (error || !child) {
    return (
      <div className="min-h-full bg-gray-50 p-6 dark:bg-gray-900">
        <button
          type="button"
          onClick={() => navigate("/children")}
          className="
            mb-6
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-600
            transition
            hover:text-[#365452]
            dark:text-gray-400
            dark:hover:text-[#8eb0ac]
          "
        >
          <ArrowLeft size={17} />
          Back to Children
        </button>

        <div
          className="
            flex
            min-h-100
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            bg-white
            dark:border-gray-700
            dark:bg-gray-800
          "
        >
          <div className="text-center">
            <h2
              className="
                text-lg
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Child Not Found
            </h2>

            <p
              className="
                mt-2
                max-w-md
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {error || "The child you're looking for does not exist."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/children")}
              className="
                mt-5
                rounded-lg
                bg-[#365452]
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#2c4543]
                dark:bg-[#8eb0ac]
                dark:text-gray-900
              "
            >
              Back to Children
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
      className="
        relative
        min-h-full
        bg-gray-50
        p-6
        dark:bg-gray-900
      "
    >
      {/* =================================================
          SUCCESS NOTIFICATION
      ================================================= */}

      {showSuccess && (
        <div
          className="
            fixed
            right-6
            top-6
            z-50
            flex
            items-center
            gap-3
            rounded-lg
            border
            border-green-200
            bg-white
            px-4
            py-3
            shadow-lg
            dark:border-green-800
            dark:bg-gray-800
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-green-100
              dark:bg-green-900/30
            "
          >
            <CheckCircle2
              size={18}
              className="
                text-green-600
                dark:text-green-400
              "
            />
          </div>

          <div>
            <p
              className="
                text-sm
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Child Updated
            </p>

            <p
              className="
                text-xs
                text-gray-500
                dark:text-gray-400
              "
            >
              Child information was successfully updated.
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          BACK
      ================================================= */}

      <div className="mb-5">
        <button
          type="button"
          onClick={() => navigate("/children")}
          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-500
            transition
            hover:text-[#365452]
            dark:text-gray-400
            dark:hover:text-[#8eb0ac]
          "
        >
          <ArrowLeft size={17} />
          Back to Children
        </button>
      </div>

      {/* =================================================
          CHILD HEADER
      ================================================= */}

      <ChildRecordHeader
        selectedChild={child}
        onSelectChild={() => {}}
        searchTerm=""
        onSearchChange={() => {}}
        filteredChildren={[child]}
      />

      {/* =================================================
          TABS
      ================================================= */}

      <ChildRecordTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* =================================================
          OVERVIEW
      ================================================= */}

      {activeTab === "overview" && (
        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-[minmax(0,2.2fr)_minmax(300px,1fr)]
          "
        >
          {/* LEFT */}

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
              child={child}
              onUpdate={(updatedChild: Child) => {
                setChild(updatedChild);
                showUpdateSuccess();
              }}
            />

            <HealthInformation
              info={healthInfo}
              onUpdate={handleHealthInfoUpdate}
            />
          </div>

          {/* RIGHT */}

          <div>
            <QuickInfo child={child} />

            <RecentActivity />

            <ChildRecordActions
              child={child}
              onUpdateChild={(updatedChild: Child) => {
                setChild(updatedChild);
                showUpdateSuccess();
              }}
            />

            <ChildProfilePrint child={child} />
          </div>
        </div>
      )}

      {/* =================================================
          ATTENDANCE
      ================================================= */}

      {activeTab === "attendance" && <Attendance childId={child.id} />}

      {/* =================================================
          LESSONS
      ================================================= */}

      {activeTab === "lessons" && <Lessons childId={child.id} />}

      {/* =================================================
          DISCIPLESHIP
      ================================================= */}

      {activeTab === "discipleship" && <Discipleship childId={child.id} />}

      {/* =================================================
          PAYMENTS
      ================================================= */}

      {activeTab === "payments" && <Payments childId={child.id} />}

      {/* =================================================
          NOTES
      ================================================= */}

      {activeTab === "notes" && <Notes childId={child.id} />}

      {/* =================================================
          DOCUMENTS
      ================================================= */}

      {activeTab === "documents" && <Documents childId={child.id} />}

      {/* =================================================
          HISTORY
      ================================================= */}

      {activeTab === "history" && <History childId={child.id} />}
    </div>
  );
};

export default ChildRecords;
