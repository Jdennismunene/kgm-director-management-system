export type AttendanceStatus = "Present" | "Absent" | "Late";

export interface AttendanceRecord {
  id: number;
  childId: number;
  childName: string;
  parent: string;
  className: string;
  branch: string;
  date: string;
  status: AttendanceStatus;
  time: string;
}

export const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    childId: 1,
    childName: "Brian Mwangi",
    parent: "John Mwangi",
    className: "Grade 4",
    branch: "Main Church",
    date: "Aug 9, 2026",
    status: "Present",
    time: "9:00 AM",
  },
  {
    id: 2,
    childId: 2,
    childName: "Mary Wanjiku",
    parent: "Jane Wanjiku",
    className: "Grade 4",
    branch: "Main Church",
    date: "Aug 9, 2026",
    status: "Absent",
    time: "-",
  },
  {
    id: 3,
    childId: 3,
    childName: "David Kamau",
    parent: "Peter Kamau",
    className: "Grade 5",
    branch: "Shiloh Worship Centre",
    date: "Aug 9, 2026",
    status: "Late",
    time: "9:24 AM",
  },
  {
    id: 4,
    childId: 4,
    childName: "Sarah Njeri",
    parent: "James Njeri",
    className: "Grade 3",
    branch: "Ukombozi Restoration Center",
    date: "Aug 2, 2026",
    status: "Present",
    time: "9:03 AM",
  },
  {
    id: 5,
    childId: 1,
    childName: "Brian Mwangi",
    parent: "John Mwangi",
    className: "Grade 4",
    branch: "Main Church",
    date: "Aug 2, 2026",
    status: "Present",
    time: "9:01 AM",
  },
  {
    id: 6,
    childId: 2,
    childName: "Mary Wanjiku",
    parent: "Jane Wanjiku",
    className: "Grade 4",
    branch: "Main Church",
    date: "Aug 2, 2026",
    status: "Present",
    time: "9:06 AM",
  },
  {
    id: 7,
    childId: 3,
    childName: "David Kamau",
    parent: "Peter Kamau",
    className: "Grade 5",
    branch: "Shiloh Worship Centre",
    date: "Jul 26, 2026",
    status: "Absent",
    time: "-",
  },
  {
    id: 8,
    childId: 4,
    childName: "Sarah Njeri",
    parent: "James Njeri",
    className: "Grade 3",
    branch: "Ukombozi Restoration Center",
    date: "Jul 26, 2026",
    status: "Present",
    time: "9:00 AM",
  },
];
