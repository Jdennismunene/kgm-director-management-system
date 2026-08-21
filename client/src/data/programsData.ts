export type ProgramType =
  | "Vocational Bible Studies"
  | "Teachers Seminars"
  | "Teachers Bondings";

export type ProgramStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";

export interface Program {
  id: number;
  name: string;
  type: ProgramType;
  year: number;
  startDate: string;
  endDate: string;
  venue: string;
  participants: number;
  status: ProgramStatus;
  description: string;
  coordinator: string;
}

export const programsData: Program[] = [
  {
    id: 1,
    name: "Vocational Bible Studies 2026",
    type: "Vocational Bible Studies",
    year: 2026,
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    venue: "Main Church",
    participants: 120,
    status: "Completed",
    description:
      "Annual vocational Bible studies program focused on spiritual growth and biblical learning.",
    coordinator: "Pastor Daniel Mwangi",
  },
  {
    id: 2,
    name: "Annual Teachers Seminar 2026",
    type: "Teachers Seminars",
    year: 2026,
    startDate: "2026-09-18",
    endDate: "2026-09-19",
    venue: "Shiloh Worship Centre",
    participants: 45,
    status: "Upcoming",
    description:
      "Annual seminar designed to equip and strengthen teachers for effective ministry.",
    coordinator: "Sarah Wanjiku",
  },
  {
    id: 3,
    name: "Teachers Bonding 2026",
    type: "Teachers Bondings",
    year: 2026,
    startDate: "2026-10-25",
    endDate: "2026-10-25",
    venue: "Main Church",
    participants: 35,
    status: "Upcoming",
    description: "A fellowship and team-building event for teachers.",
    coordinator: "John Kamau",
  },
  {
    id: 4,
    name: "Vocational Bible Studies 2025",
    type: "Vocational Bible Studies",
    year: 2025,
    startDate: "2025-08-11",
    endDate: "2025-08-15",
    venue: "Main Church",
    participants: 105,
    status: "Completed",
    description: "Annual vocational Bible studies program conducted in 2025.",
    coordinator: "Pastor Daniel Mwangi",
  },
  {
    id: 5,
    name: "Teachers Seminar 2025",
    type: "Teachers Seminars",
    year: 2025,
    startDate: "2025-09-20",
    endDate: "2025-09-21",
    venue: "Shiloh Worship Centre",
    participants: 42,
    status: "Completed",
    description:
      "Teachers training and development seminar for ministry teachers.",
    coordinator: "Sarah Wanjiku",
  },
  {
    id: 6,
    name: "Teachers Bonding 2025",
    type: "Teachers Bondings",
    year: 2025,
    startDate: "2025-10-26",
    endDate: "2025-10-26",
    venue: "Ukombozi Restoration Center",
    participants: 30,
    status: "Completed",
    description: "Teachers fellowship and bonding activity conducted in 2025.",
    coordinator: "John Kamau",
  },
];
