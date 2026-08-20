export interface LibraryResource {
  id: number;
  title: string;
  description: string;
  type: "Document" | "Video" | "Photo" | "Audio" | "Other";
  category:
    | "Photography"
    | "VBS"
    | "Competition"
    | "Baptism"
    | "Teaching"
    | "General";
  fileName: string;
  fileSize: string;
  dateAdded: string;
  status: "Active" | "Archived";
}

export const libraryData: LibraryResource[] = [
  {
    id: 1,
    title: "Vocational Bible School 2026",
    description:
      "Vocational Bible School documentary and supporting ministry resources for the 2026 program.",
    type: "Video",
    category: "VBS",
    fileName: "vbs-2026-documentary.mp4",
    fileSize: "245 MB",
    dateAdded: "Aug 5, 2026",
    status: "Active",
  },
  {
    id: 2,
    title: "Children's Ministry Photography",
    description:
      "Photography collection from children's ministry activities and events.",
    type: "Photo",
    category: "Photography",
    fileName: "childrens-ministry-2026.zip",
    fileSize: "380 MB",
    dateAdded: "Aug 7, 2026",
    status: "Active",
  },
  {
    id: 3,
    title: "Bible Competition 2026",
    description:
      "Records and media from the completed Bible competition.",
    type: "Document",
    category: "Competition",
    fileName: "bible-competition-2026.pdf",
    fileSize: "8.4 MB",
    dateAdded: "Aug 10, 2026",
    status: "Archived",
  },
  {
    id: 4,
    title: "Baptism Documentation",
    description:
      "Baptism records, supporting documentation, and related ministry materials.",
    type: "Document",
    category: "Baptism",
    fileName: "baptism-documentation-2026.pdf",
    fileSize: "5.2 MB",
    dateAdded: "Aug 12, 2026",
    status: "Active",
  },
  {
    id: 5,
    title: "Sunday School Teaching Resources",
    description:
      "Teaching resources used by children's ministry teachers during Sunday School.",
    type: "Document",
    category: "Teaching",
    fileName: "sunday-school-resources.pdf",
    fileSize: "12.6 MB",
    dateAdded: "Aug 13, 2026",
    status: "Active",
  },
  {
    id: 6,
    title: "Children's Ministry Event Photos",
    description:
      "Photo collection from children's ministry events and activities.",
    type: "Photo",
    category: "Photography",
    fileName: "ministry-events-2026.zip",
    fileSize: "420 MB",
    dateAdded: "Aug 15, 2026",
    status: "Active",
  },
];
