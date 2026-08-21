export type SeminarStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";

export type SeminarLocation =
  | "Main Church"
  | "Shiloh Worship Centre"
  | "Ukombozi Restoration Center"
  | "Other";

export interface TeacherSeminar {
  id: number;
  title: string;
  year: number;
  startDate: string;
  endDate: string;
  location: SeminarLocation;
  facilitator: string;
  participants: number;
  status: SeminarStatus;
  theme: string;
  description: string;
}

export const teachersSeminarsData: TeacherSeminar[] = [
  {
    id: 1,
    title: "Annual Teachers Seminar",
    year: 2026,
    startDate: "2026-02-09",
    endDate: "2026-02-11",
    location: "Main Church",
    facilitator: "Pastor David Mwangi",
    participants: 38,
    status: "Completed",
    theme: "Teaching with Purpose",
    description:
      "An annual seminar designed to equip teachers with practical and spiritual tools for effective ministry.",
  },
  {
    id: 2,
    title: "Children Ministry Teachers Seminar",
    year: 2026,
    startDate: "2026-05-18",
    endDate: "2026-05-20",
    location: "Shiloh Worship Centre",
    facilitator: "Rev. James Kariuki",
    participants: 27,
    status: "Completed",
    theme: "Effective Teaching for Children",
    description:
      "A focused seminar helping children's ministry teachers improve teaching methods, communication, and classroom engagement.",
  },
  {
    id: 3,
    title: "Teachers Leadership Seminar",
    year: 2026,
    startDate: "2026-08-24",
    endDate: "2026-08-26",
    location: "Main Church",
    facilitator: "Pastor Peter Kamau",
    participants: 42,
    status: "Upcoming",
    theme: "Leadership and Servanthood",
    description:
      "A leadership development seminar focused on servant leadership and effective ministry coordination.",
  },
  {
    id: 4,
    title: "Sunday School Teachers Seminar",
    year: 2025,
    startDate: "2025-03-10",
    endDate: "2025-03-12",
    location: "Ukombozi Restoration Center",
    facilitator: "Pastor David Mwangi",
    participants: 31,
    status: "Completed",
    theme: "Building Strong Sunday School Classes",
    description:
      "A seminar aimed at strengthening Sunday school teaching and classroom management.",
  },
  {
    id: 5,
    title: "Bible Teaching Skills Seminar",
    year: 2025,
    startDate: "2025-06-16",
    endDate: "2025-06-18",
    location: "Main Church",
    facilitator: "Rev. James Kariuki",
    participants: 35,
    status: "Completed",
    theme: "Understanding and Teaching Scripture",
    description:
      "A practical seminar focused on Bible interpretation and communicating Scripture effectively.",
  },
  {
    id: 6,
    title: "Teachers Development Seminar",
    year: 2024,
    startDate: "2024-04-15",
    endDate: "2024-04-17",
    location: "Main Church",
    facilitator: "Pastor Peter Kamau",
    participants: 29,
    status: "Completed",
    theme: "Growing as a Ministry Teacher",
    description:
      "A professional and spiritual development seminar for church teachers.",
  },
  {
    id: 7,
    title: "Youth Teachers Seminar",
    year: 2024,
    startDate: "2024-09-02",
    endDate: "2024-09-04",
    location: "Shiloh Worship Centre",
    facilitator: "Rev. James Kariuki",
    participants: 24,
    status: "Completed",
    theme: "Teaching and Mentoring Young People",
    description:
      "A seminar designed to equip youth teachers with effective mentoring and discipleship approaches.",
  },
];
