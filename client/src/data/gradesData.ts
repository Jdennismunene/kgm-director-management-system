export interface Grade {
  id: number;
  name: string;
  description: string;
  teacher: string;
  ageRange: string;
  members: number;
  status: "Active" | "Inactive";
}

export const gradesData: Grade[] = [
  {
    id: 1,
    name: "Grade 1",
    description: "Early primary learners",
    teacher: "Sarah Wanjiku",
    ageRange: "6 - 7 years",
    members: 18,
    status: "Active",
  },
  {
    id: 2,
    name: "Grade 2",
    description: "Primary learners",
    teacher: "David Mwangi",
    ageRange: "7 - 8 years",
    members: 21,
    status: "Active",
  },
  {
    id: 3,
    name: "Grade 3",
    description: "Primary learners",
    teacher: "Mercy Wambui",
    ageRange: "8 - 9 years",
    members: 16,
    status: "Active",
  },
  {
    id: 4,
    name: "Grade 4",
    description: "Primary learners",
    teacher: "John Kamau",
    ageRange: "9 - 10 years",
    members: 20,
    status: "Active",
  },
  {
    id: 5,
    name: "Grade 5",
    description: "Upper primary learners",
    teacher: "Esther Njeri",
    ageRange: "10 - 11 years",
    members: 17,
    status: "Active",
  },
  {
    id: 6,
    name: "Grade 6",
    description: "Upper primary learners",
    teacher: "Peter Kariuki",
    ageRange: "11 - 12 years",
    members: 19,
    status: "Active",
  },
  {
    id: 7,
    name: "Grade 7",
    description: "Junior learners",
    teacher: "Grace Akinyi",
    ageRange: "12 - 13 years",
    members: 15,
    status: "Active",
  },
  {
    id: 8,
    name: "Grade 8",
    description: "Junior learners",
    teacher: "Daniel Otieno",
    ageRange: "13 - 14 years",
    members: 14,
    status: "Inactive",
  },
];
