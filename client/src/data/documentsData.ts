export interface DocumentResource {
  id: number;
  title: string;
  description: string;
  category:
    | "VBS"
    | "Competition"
    | "Baptism"
    | "Teaching"
    | "Administration"
    | "Reports"
    | "General";
  documentType: "PDF" | "Word" | "Excel" | "PowerPoint" | "Text";
  fileName: string;
  fileSize: string;
  dateAdded: string;
  status: "Active" | "Archived";
}

export const documentsData: DocumentResource[] = [
  {
    id: 1,
    title: "Vocational Bible School 2026 Program",
    description:
      "Official program and schedule for the 2026 Vocational Bible School activities, including lessons, sessions, and ministry activities.",
    category: "VBS",
    documentType: "PDF",
    fileName: "VBS_2026_Program.pdf",
    fileSize: "2.4 MB",
    dateAdded: "Aug 10, 2026",
    status: "Active",
  },

  {
    id: 2,
    title: "VBS Teachers Guide 2026",
    description:
      "Teaching guide prepared for teachers and ministry leaders participating in the 2026 Vocational Bible School.",
    category: "VBS",
    documentType: "PDF",
    fileName: "VBS_Teachers_Guide_2026.pdf",
    fileSize: "4.8 MB",
    dateAdded: "Aug 8, 2026",
    status: "Active",
  },

  {
    id: 3,
    title: "VBS Registration Form",
    description:
      "Registration document used for recording participants joining the Vocational Bible School program.",
    category: "VBS",
    documentType: "Word",
    fileName: "VBS_Registration_Form.docx",
    fileSize: "850 KB",
    dateAdded: "Jul 28, 2026",
    status: "Active",
  },

  {
    id: 4,
    title: "Bible Competition Guidelines",
    description:
      "Official guidelines and rules for participants and ministry teams taking part in the Bible competition.",
    category: "Competition",
    documentType: "PDF",
    fileName: "Bible_Competition_Guidelines.pdf",
    fileSize: "1.7 MB",
    dateAdded: "Jul 15, 2026",
    status: "Active",
  },

  {
    id: 5,
    title: "Bible Competition Results 2026",
    description:
      "Official results and records from the completed 2026 Bible competition.",
    category: "Competition",
    documentType: "Excel",
    fileName: "Bible_Competition_Results_2026.xlsx",
    fileSize: "1.2 MB",
    dateAdded: "Jul 22, 2026",
    status: "Active",
  },

  {
    id: 6,
    title: "Competition Event Report",
    description:
      "Summary report documenting the activities, participation, achievements, and outcomes of the completed competition.",
    category: "Competition",
    documentType: "Word",
    fileName: "Competition_Event_Report.docx",
    fileSize: "2.1 MB",
    dateAdded: "Jul 25, 2026",
    status: "Active",
  },

  {
    id: 7,
    title: "Baptism Registration Form",
    description:
      "Registration form used to collect information from members preparing for baptism.",
    category: "Baptism",
    documentType: "Word",
    fileName: "Baptism_Registration_Form.docx",
    fileSize: "720 KB",
    dateAdded: "Jun 30, 2026",
    status: "Active",
  },

  {
    id: 8,
    title: "Baptism Records 2026",
    description:
      "Official baptism records containing documentation of members who participated in baptism during 2026.",
    category: "Baptism",
    documentType: "Excel",
    fileName: "Baptism_Records_2026.xlsx",
    fileSize: "1.5 MB",
    dateAdded: "Jul 5, 2026",
    status: "Active",
  },

  {
    id: 9,
    title: "Baptism Certificate Template",
    description:
      "Official certificate template used for documenting and issuing baptism certificates.",
    category: "Baptism",
    documentType: "Word",
    fileName: "Baptism_Certificate_Template.docx",
    fileSize: "640 KB",
    dateAdded: "Jun 25, 2026",
    status: "Active",
  },

  {
    id: 10,
    title: "Children Ministry Teaching Guide",
    description:
      "Teaching material and guidelines for children's ministry teachers and ministry leaders.",
    category: "Teaching",
    documentType: "PDF",
    fileName: "Children_Ministry_Teaching_Guide.pdf",
    fileSize: "3.6 MB",
    dateAdded: "Jun 18, 2026",
    status: "Active",
  },

  {
    id: 11,
    title: "Annual Ministry Report 2025",
    description:
      "Annual report containing ministry activities, achievements, participation statistics, and key highlights from 2025.",
    category: "Reports",
    documentType: "PDF",
    fileName: "Annual_Ministry_Report_2025.pdf",
    fileSize: "5.2 MB",
    dateAdded: "Jan 20, 2026",
    status: "Active",
  },

  {
    id: 12,
    title: "Church Ministry Guidelines 2025",
    description:
      "General ministry guidelines and operational procedures used by ministry leaders and volunteers.",
    category: "Administration",
    documentType: "PDF",
    fileName: "Church_Ministry_Guidelines_2025.pdf",
    fileSize: "2.9 MB",
    dateAdded: "Jan 12, 2026",
    status: "Archived",
  },
];
