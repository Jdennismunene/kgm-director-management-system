export interface TeachingManual {
  id: number;
  title: string;
  provider: string;
  description: string;
  category: string;
  audience: string;
  ageGroup: string;
  lessonsCount: number;
  status: "Active" | "Inactive";
  dateAdded: string;
}

export const teachingManualsData: TeachingManual[] = [
  {
    id: 1,
    title: "Centre for Christian Living (CCL)",
    provider: "Centre for Christian Living",
    description:
      "Christian education, teacher training, and teaching resources designed to support effective ministry and Sunday School instruction.",
    category: "Christian Education",
    audience: "Sunday School Teachers",
    ageGroup: "All Ages",
    lessonsCount: 12,
    status: "Active",
    dateAdded: "Aug 5, 2026",
  },

  {
    id: 2,
    title: "Scripture Unions",
    provider: "Scripture Union",
    description:
      "Bible-based teaching, discipleship, and Christian education resources designed to support children, young people, and ministry teachers.",
    category: "Bible Education",
    audience: "Teachers & Ministry Leaders",
    ageGroup: "Children & Youth",
    lessonsCount: 8,
    status: "Active",
    dateAdded: "Aug 7, 2026",
  },

  {
    id: 3,
    title: "Deliverance Church Kasarani International - Zimmerman",
    provider: "Deliverance Church Kasarani International",
    description:
      "Teaching and ministry resources used to support Bible instruction, discipleship, and Christian education within the church ministry.",
    category: "Church Ministry",
    audience: "Ministry Teachers",
    ageGroup: "All Ages",
    lessonsCount: 6,
    status: "Active",
    dateAdded: "Aug 10, 2026",
  },
];
