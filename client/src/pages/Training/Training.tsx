import { Users } from "lucide-react";
import { useState } from "react";

import RegisterTrainee from "../../components/Training/RegisterTrainee";
import TrainingSummary from "../../components/Training/TrainingSummary";
import TrainingPrograms from "../../components/Training/TrainingPrograms";
import TrainingManuals from "../../components/Training/TrainingManuals";
import TrainingCohorts from "../../components/Training/TrainingCohorts";
import TraineeTable from "../../components/Training/TraineeTable";
import CertificateSummary from "../../components/Training/CertificateSummary";

// =====================================================
// TRAINEE TYPE
// =====================================================

export interface Trainee {
  id: string;
  name: string;
  phone: string;
  level: string;
  cohort: string;
  registrationDate: string;
  status: string;
}

// =====================================================
// COHORT TYPE
// =====================================================

export interface TrainingCohort {
  id: string;
  name: string;
  level: string;
  trainer: string;
  startDate: string;
  endDate: string;
  trainees: number;
  status: string;
}

// =====================================================
// TRAINING MANUAL TYPE
// =====================================================

export interface TrainingManual {
  id: string;
  title: string;
  level: string;
  modules: number;
  edition: string;
  description: string;
}

// =====================================================
// TRAINING PAGE
// =====================================================

function Training() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // ===================================================
  // TRAINEES
  // ===================================================

  const [trainees, setTrainees] = useState<Trainee[]>([
    {
      id: "KGM-TR-001",
      name: "Mary Wanjiku",
      phone: "0712 345 678",
      level: "Level 1",
      cohort: "2026 Cohort A",
      registrationDate: "10 Jan 2026",
      status: "Active",
    },
    {
      id: "KGM-TR-002",
      name: "Peter Kamau",
      phone: "0723 456 789",
      level: "Level 1",
      cohort: "2026 Cohort A",
      registrationDate: "12 Jan 2026",
      status: "Active",
    },
    {
      id: "KGM-TR-003",
      name: "Jane Njeri",
      phone: "0701 234 567",
      level: "Level 1",
      cohort: "2026 Cohort A",
      registrationDate: "15 Jan 2026",
      status: "Active",
    },
    {
      id: "KGM-TR-004",
      name: "Samuel Kariuki",
      phone: "0798 765 432",
      level: "Level 2",
      cohort: "2026 Cohort B",
      registrationDate: "07 Feb 2026",
      status: "Completed",
    },
    {
      id: "KGM-TR-005",
      name: "Ruth Wambui",
      phone: "0711 222 333",
      level: "Level 2",
      cohort: "2026 Cohort B",
      registrationDate: "09 Feb 2026",
      status: "Active",
    },
    {
      id: "KGM-TR-006",
      name: "Daniel Otieno",
      phone: "0722 333 444",
      level: "Level 2",
      cohort: "2026 Cohort B",
      registrationDate: "11 Feb 2026",
      status: "Active",
    },
    {
      id: "KGM-TR-007",
      name: "Esther Achieng",
      phone: "0700 555 666",
      level: "Level 1",
      cohort: "2026 Cohort C",
      registrationDate: "11 Jul 2026",
      status: "Pending",
    },
  ]);

  // ===================================================
  // TRAINING COHORTS
  // ===================================================

  const [cohorts] = useState<TrainingCohort[]>([
    {
      id: "COHORT-001",
      name: "2026 Cohort A",
      level: "Level 1",
      trainer: "David Kamau",
      startDate: "10 Jan 2026",
      endDate: "04 Apr 2026",
      trainees: 18,
      status: "Completed",
    },
    {
      id: "COHORT-002",
      name: "2026 Cohort B",
      level: "Level 2",
      trainer: "John Mwangi",
      startDate: "07 Feb 2026",
      endDate: "09 May 2026",
      trainees: 15,
      status: "Active",
    },
    {
      id: "COHORT-003",
      name: "2026 Cohort C",
      level: "Level 1",
      trainer: "Grace Mwangi",
      startDate: "11 Jul 2026",
      endDate: "03 Oct 2026",
      trainees: 15,
      status: "Active",
    },
  ]);

  const activeCohorts = cohorts.filter(
    (cohort) => cohort.status === "Active",
  ).length;

// ===================================================
// TRAINING MANUALS
// ===================================================

const [manuals] = useState<TrainingManual[]>([
  {
    id: "MANUAL-001",
    title: "Level 1 Training Manual",
    level: "Level 1",
    modules: 8,
    edition: "2026 Edition",
    description:
      "A practical foundation guide covering Christian education, children's ministry, Bible teaching, lesson planning and discipleship.",
  },
  {
    id: "MANUAL-002",
    title: "Level 2 Training Manual",
    level: "Level 2",
    modules: 10,
    edition: "2026 Edition",
    description:
      "An advanced training guide covering leadership, discipleship, mentorship, ministry planning, child protection and practical ministry.",
  },
]);

  // ===================================================
  // ADD TRAINEE
  // ===================================================

  const handleAddTrainee = (newTrainee: Trainee) => {
    setTrainees((currentTrainees) => [...currentTrainees, newTrainee]);

    setShowRegisterModal(false);
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="mx-4 mt-3 space-y-6 pb-4">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Training & Resources
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage KGM training programs, trainees, cohorts and training
            resources.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowRegisterModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5F4A8B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4f3d75]"
        >
          <Users size={18} />
          Register Trainee
        </button>
      </div>

      {/* =================================================
          TRAINING SUMMARY
      ================================================= */}

      <TrainingSummary trainees={trainees} activeCohorts={activeCohorts} />

      {/* =================================================
          TRAINING PROGRAMS
      ================================================= */}

      <TrainingPrograms trainees={trainees} />

      {/* =================================================
          TRAINING MANUALS
      ================================================= */}

      <TrainingManuals manuals={manuals} />

      {/* =================================================
          TRAINING COHORTS
      ================================================= */}

      <TrainingCohorts cohorts={cohorts} />

      {/* =================================================
          REGISTERED TRAINEES
      ================================================= */}

      <TraineeTable trainees={trainees} />

      {/* =================================================
          CERTIFICATE SUMMARY
      ================================================= */}

      <CertificateSummary />

      {/* =================================================
          REGISTER TRAINEE MODAL
      ================================================= */}

      <RegisterTrainee
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleAddTrainee}
      />
    </div>
  );
}

export default Training;
