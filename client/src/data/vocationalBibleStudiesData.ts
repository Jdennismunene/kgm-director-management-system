export type VBSStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";

export type VBSLocation =
  | "Main Church"
  | "Shiloh Worship Centre"
  | "Ukombozi Restoration Center"
  | "Other";

export interface VocationalBibleStudy {
  id: number;
  title: string;
  year: number;
  startDate: string;
  endDate: string;
  location: VBSLocation;
  facilitator: string;
  participants: number;
  status: VBSStatus;
  theme: string;
  description: string;
}

export const vocationalBibleStudiesData: VocationalBibleStudy[] = [
  {
    id: 1,
    title: "2026 Easter Vocational Bible Study",
    year: 2026,
    startDate: "2026-04-06",
    endDate: "2026-04-10",
    location: "Main Church",
    facilitator: "Pastor David Mwangi",
    participants: 85,
    status: "Completed",
    theme: "Growing in Faith and Service",
    description:
      "A five-day vocational Bible study focused on strengthening faith, Christian service, and spiritual growth.",
  },
  {
    id: 2,
    title: "Youth Vocational Bible Study",
    year: 2026,
    startDate: "2026-06-15",
    endDate: "2026-06-19",
    location: "Shiloh Worship Centre",
    facilitator: "Rev. James Kariuki",
    participants: 62,
    status: "Completed",
    theme: "Living for Christ",
    description:
      "A Bible study program designed to help young people understand their faith and apply biblical principles in daily life.",
  },
  {
    id: 3,
    title: "Annual Vocational Bible Study",
    year: 2026,
    startDate: "2026-09-07",
    endDate: "2026-09-11",
    location: "Main Church",
    facilitator: "Pastor Peter Kamau",
    participants: 100,
    status: "Upcoming",
    theme: "The Word and Christian Living",
    description:
      "The annual church-wide vocational Bible study bringing members together for intensive Bible learning and fellowship.",
  },
  {
    id: 4,
    title: "Family Vocational Bible Study",
    year: 2025,
    startDate: "2025-08-11",
    endDate: "2025-08-15",
    location: "Ukombozi Restoration Center",
    facilitator: "Pastor David Mwangi",
    participants: 74,
    status: "Completed",
    theme: "Building Strong Christian Families",
    description:
      "A family-focused Bible study addressing Christian values, parenting, relationships, and spiritual growth within the home.",
  },
  {
    id: 5,
    title: "Community Outreach Bible Study",
    year: 2025,
    startDate: "2025-10-20",
    endDate: "2025-10-24",
    location: "Other",
    facilitator: "Rev. James Kariuki",
    participants: 58,
    status: "Completed",
    theme: "Faith in Action",
    description:
      "A community-oriented Bible study combining biblical teaching with Christian outreach and service.",
  },
  {
    id: 6,
    title: "New Members Bible Study",
    year: 2024,
    startDate: "2024-03-04",
    endDate: "2024-03-08",
    location: "Main Church",
    facilitator: "Pastor Peter Kamau",
    participants: 45,
    status: "Completed",
    theme: "Foundations of Faith",
    description:
      "An introductory Bible study helping new members understand the foundations of Christian faith and church life.",
  },
  {
    id: 7,
    title: "Youth Leadership Bible Study",
    year: 2024,
    startDate: "2024-07-08",
    endDate: "2024-07-12",
    location: "Shiloh Worship Centre",
    facilitator: "Rev. James Kariuki",
    participants: 51,
    status: "Completed",
    theme: "Leadership Through Scripture",
    description:
      "A leadership-focused Bible study for young church leaders and ministry volunteers.",
  },
];
