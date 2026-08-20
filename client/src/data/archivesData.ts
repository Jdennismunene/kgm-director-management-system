export interface ArchiveResource {
  id: number;

  title: string;
  description: string;

  type: "Document" | "Photo Collection" | "Video" | "Audio" | "Other";

  category:
    | "VBS"
    | "Competition"
    | "Baptism"
    | "Church Events"
    | "Ministry"
    | "Administration"
    | "Other";

  archivedDate: string;
  originalDate: string;

  fileName: string;
  fileSize: string;

  originalResourceId: number;

  originalSection: "Library" | "Documents" | "Photos";
}

export const archivesData: ArchiveResource[] = [
  {
    id: 1,
    title: "VBS 2024 Documentation",
    description:
      "Archived documentation containing information, schedules, activities, and records from the 2024 Vocational Bible School program.",
    type: "Document",
    category: "VBS",
    archivedDate: "Jan 12, 2026",
    originalDate: "Aug 18, 2024",
    fileName: "vbs-2024-documentation.pdf",
    fileSize: "4.8 MB",
    originalResourceId: 101,
    originalSection: "Documents",
  },

  {
    id: 2,
    title: "Bible Quiz Competition 2024",
    description:
      "Archived photo collection from the church Bible Quiz Competition held in 2024.",
    type: "Photo Collection",
    category: "Competition",
    archivedDate: "Feb 03, 2026",
    originalDate: "Jul 20, 2024",
    fileName: "bible-quiz-competition-2024.jpg",
    fileSize: "6.4 MB",
    originalResourceId: 102,
    originalSection: "Photos",
  },

  {
    id: 3,
    title: "Baptism Service 2023",
    description:
      "Archived photo collection documenting the baptism service held in 2023.",
    type: "Photo Collection",
    category: "Baptism",
    archivedDate: "Mar 20, 2026",
    originalDate: "Jul 16, 2023",
    fileName: "baptism-service-2023.jpg",
    fileSize: "7.2 MB",
    originalResourceId: 103,
    originalSection: "Photos",
  },

  {
    id: 4,
    title: "Children Ministry Annual Report 2024",
    description:
      "Annual report containing activities, achievements, attendance information, and ministry highlights from 2024.",
    type: "Document",
    category: "Ministry",
    archivedDate: "Jan 25, 2026",
    originalDate: "Dec 20, 2024",
    fileName: "children-ministry-report-2024.pdf",
    fileSize: "3.6 MB",
    originalResourceId: 104,
    originalSection: "Documents",
  },

  {
    id: 5,
    title: "Church Leadership Retreat 2024",
    description:
      "Archived photographs from the church leadership retreat and ministry planning sessions held in 2024.",
    type: "Photo Collection",
    category: "Church Events",
    archivedDate: "Apr 08, 2026",
    originalDate: "Nov 14, 2024",
    fileName: "leadership-retreat-2024.jpg",
    fileSize: "8.1 MB",
    originalResourceId: 105,
    originalSection: "Photos",
  },

  {
    id: 6,
    title: "Sunday School Teaching Series 2024",
    description:
      "Archived teaching materials and resources used during the 2024 Sunday School program.",
    type: "Document",
    category: "Ministry",
    archivedDate: "Feb 18, 2026",
    originalDate: "Oct 10, 2024",
    fileName: "sunday-school-series-2024.pdf",
    fileSize: "5.3 MB",
    originalResourceId: 106,
    originalSection: "Library",
  },

  {
    id: 7,
    title: "VBS 2023 Highlights",
    description:
      "Archived video highlights capturing activities and memorable moments from the 2023 VBS program.",
    type: "Video",
    category: "VBS",
    archivedDate: "May 02, 2026",
    originalDate: "Aug 15, 2023",
    fileName: "vbs-2023-highlights.mp4",
    fileSize: "184 MB",
    originalResourceId: 107,
    originalSection: "Library",
  },

  {
    id: 8,
    title: "Children Ministry Worship Audio",
    description:
      "Archived audio recording from a children ministry worship session.",
    type: "Audio",
    category: "Ministry",
    archivedDate: "May 18, 2026",
    originalDate: "Sep 22, 2024",
    fileName: "children-worship-session.mp3",
    fileSize: "28 MB",
    originalResourceId: 108,
    originalSection: "Library",
  },

  {
    id: 9,
    title: "Church Event Planning Notes 2024",
    description:
      "Archived planning notes and preparation documents for major church events conducted during 2024.",
    type: "Document",
    category: "Administration",
    archivedDate: "Jun 04, 2026",
    originalDate: "Dec 05, 2024",
    fileName: "church-event-planning-2024.pdf",
    fileSize: "2.9 MB",
    originalResourceId: 109,
    originalSection: "Library",
  },

  {
    id: 10,
    title: "Old Ministry Resource Collection",
    description:
      "A collection of miscellaneous ministry resources that are no longer actively used but are retained for historical reference.",
    type: "Other",
    category: "Other",
    archivedDate: "Jun 15, 2026",
    originalDate: "Jun 12, 2024",
    fileName: "old-ministry-resources.zip",
    fileSize: "12.5 MB",
    originalResourceId: 110,
    originalSection: "Library",
  },
];
