export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  grade: string[];
  status: "Active" | "Inactive";
  joinedDate: string;
}

export const teachersData: Teacher[] = [
  {
    id: 1,
    name: "Sarah Wanjiku",
    email: "sarah.wanjiku@example.com",
    phone: "+254 712 345 678",
    grade: ["Grade 1", "Grade 2"],
    status: "Active",
    joinedDate: "Jan 12, 2025",
  },
  {
    id: 2,
    name: "David Mwangi",
    email: "david.mwangi@example.com",
    phone: "+254 723 456 789",
    grade: ["Grade 3"],
    status: "Active",
    joinedDate: "Feb 05, 2025",
  },
  {
    id: 3,
    name: "Grace Njeri",
    email: "grace.njeri@example.com",
    phone: "+254 734 567 890",
    grade: ["Grade 4", "Grade 5"],
    status: "Active",
    joinedDate: "Mar 18, 2025",
  },
  {
    id: 4,
    name: "James Kamau",
    email: "james.kamau@example.com",
    phone: "+254 745 678 901",
    grade: ["Grade 7", "Grade 8"],
    status: "Inactive",
    joinedDate: "Apr 22, 2025",
  },
  {
    id: 5,
    name: "Mary Atieno",
    email: "mary.atieno@example.com",
    phone: "+254 756 789 012",
    grade: ["Grade 9"],
    status: "Active",
    joinedDate: "May 10, 2025",
  },
  {
    id: 6,
    name: "Peter Otieno",
    email: "peter.otieno@example.com",
    phone: "+254 767 890 123",
    grade: ["Grade 10", "Grade 9"],
    status: "Active",
    joinedDate: "Jun 03, 2025",
  },
];
