import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ChildRecordHeader from "../../components/Children/ChildRecordHeader";
import ChildRecordTabs from "../../components/Children/ChildRecordTabs";
import PersonalInformation from "../../components/Children/PersonalInformation";
import ParentInformation from "../../components/Children/ParentInformation";
import AcademicInformation from "../../components/Children/AcademicInformation";
import HealthInformation from "../../components/Children/HealthInformation";
import QuickInfo from "../../components/Children/QuickInfo";
import RecentActivity from "../../components/Children/RecentActivity";
import ChildRecordActions from "../../components/Children/ChildRecordActions";
import Attendance from "../../components/Children/Attendance";
import Lessons from "../../components/Children/Lessons";
import Discipleship from "../../components/Children/Discipleship";
import Payments from "../../components/Children/Payments";
import Notes from "../../components/Children/Notes";
import Documents from "../../components/Children/Documents";
import History from "../../components/Children/History";
import AddChildModal from "../../components/Children/AddChildModal";
import ChildProfilePrint from "../../components/Children/ChildProfilePrint";

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
  type AcademicInformationType as AcademicInformationType,
} from "../../data/academicInformation";

import {
  healthInformationData,
  type HealthInformation as HealthInformationType,
} from "../../data/healthInformation";

import {
  quickInfoData
} from "../../data/quickInfo";

const ChildRecords = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [children, setChildren] = useState<Child[]>(childrenData);
  // Selected child
  const [selectedChild, setSelectedChild] = useState<Child>(childrenData[0]);
  const [parentInfo, setParentInfo] = useState<ChildParentInfo>(
    childParentInfoData[childrenData[0].id],
  );

  // Personal and Academic Information
  const [personalInfo, setPersonalInfo] = useState<ChildPersonalInfo>(
    childPersonalInfoData[childrenData[0].id],
  );
  const [academicInfo, setAcademicInfo] = useState<AcademicInformationType>(
    academicInformationData,
  );
  const [healthInfo, setHealthInfo] = useState<HealthInformationType>(
    healthInformationData,
  );

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Search children
  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAcademicInfoUpdate = (updatedInfo: AcademicInformationType) => {
    setAcademicInfo(updatedInfo);
  };
  const handleHealthInfoUpdate = (updatedInfo: HealthInformationType) => {
    setHealthInfo(updatedInfo);
  };

  const handleParentInfoUpdate = (updatedInfo: ChildParentInfo) => {
    setParentInfo(updatedInfo);
  };

  const handlePersonalInfoUpdate = (updatedInfo: ChildPersonalInfo) => {
    setPersonalInfo(updatedInfo);
  };

  const handleAddChild = (newChild: Child) => {
    setChildren((prevChildren) => [...prevChildren, newChild]);

    setSelectedChild(newChild);

    setShowAddChildModal(false);
  };

  const handleUpdateChild = (updatedChild: Child) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) =>
        child.id === updatedChild.id ? updatedChild : child,
      ),
    );
    setSelectedChild(updatedChild);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <span className="cursor-pointer text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Dashboard
        </span>

        <span className="text-gray-400 dark:text-gray-600">›</span>

        <span className="cursor-pointer text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Children
        </span>

        <span className="text-gray-400 dark:text-gray-600">›</span>

        <span className="text-gray-500 dark:text-gray-400">Child Records</span>
      </div>

      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Child Records
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage detailed information for each child.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/children")}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to All Children
          </button>

          {/* Add Child Button */}
          <button
            type="button"
            onClick={() => setShowAddChildModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
          >
            <Plus size={18} />
            Add Child
          </button>
        </div>
      </div>

      {/* Child Profile Header */}
      <ChildRecordHeader
        selectedChild={selectedChild}
        onSelectChild={setSelectedChild}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filteredChildren={filteredChildren}
      />

      {/* Child Record Tabs */}
      <ChildRecordTabs onTabChange={setActiveTab} />

      {/* Overview Content */}
      {activeTab === "Overview" && (
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2.2fr)_minmax(300px,1fr)]">
          {/* Left Column */}
          <div>
            <PersonalInformation
              info={personalInfo}
              onUpdate={handlePersonalInfoUpdate}
            />

            <ParentInformation
              info={parentInfo}
              onUpdate={handleParentInfoUpdate}
            />

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
              child={selectedChild}
              onUpdateChild={handleUpdateChild}
            />

            <ChildProfilePrint child={selectedChild} />
          </div>
        </div>
      )}

      {/* Other Tabs */}
      {activeTab === "Attendance" && <Attendance />}

      {activeTab === "Lessons" && <Lessons />}

      {activeTab === "Discipleship" && <Discipleship />}

      {activeTab === "Payments" && <Payments />}

      {activeTab === "Notes" && <Notes />}

      {activeTab === "Documents" && <Documents />}

      {activeTab === "History" && <History />}

      {activeTab !== "Overview" &&
        activeTab !== "Attendance" &&
        activeTab !== "Lessons" &&
        activeTab !== "Discipleship" &&
        activeTab !== "Payments" &&
        activeTab !== "Notes" &&
        activeTab !== "Documents" &&
        activeTab !== "History" && (
          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeTab}
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This section will be built next.
            </p>
          </div>
        )}

      {showAddChildModal && (
        <AddChildModal
          onClose={() => setShowAddChildModal(false)}
          onSave={handleAddChild}
        />
      )}
    </div>
  );
};

export default ChildRecords;
