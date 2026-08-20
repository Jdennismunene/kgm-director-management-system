export interface Parent {
  id: number;
  name: string;
  phone: string;
  email: string;
  relationship: "Father" | "Mother" | "Guardian";
  branch: string;
  childrenIds: number[];
  status: "Active" | "Inactive";
  joinedDate: string;
}

export const parentsData: Parent[] = [
  {
    id: 1,
    name: "John Kamau",
    phone: "+254 712 345 678",
    email: "john.kamau@example.com",
    relationship: "Father",
    branch: "Main Church",
    childrenIds: [1, 4],
    status: "Active",
    joinedDate: "Aug 10, 2026",
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    phone: "+254 723 456 789",
    email: "mary.wanjiku@example.com",
    relationship: "Mother",
    branch: "Shiloh Worship Centre",
    childrenIds: [2],
    status: "Active",
    joinedDate: "Aug 8, 2026",
  },
  {
    id: 3,
    name: "David Mwangi",
    phone: "+254 734 567 890",
    email: "david.mwangi@example.com",
    relationship: "Father",
    branch: "Main Church",
    childrenIds: [3, 7],
    status: "Active",
    joinedDate: "Aug 5, 2026",
  },
  {
    id: 4,
    name: "Grace Njeri",
    phone: "+254 745 678 901",
    email: "grace.njeri@example.com",
    relationship: "Mother",
    branch: "Ukombozi Restoration Center",
    childrenIds: [5],
    status: "Active",
    joinedDate: "Jul 30, 2026",
  },
  {
    id: 5,
    name: "Peter Otieno",
    phone: "+254 756 789 012",
    email: "peter.otieno@example.com",
    relationship: "Father",
    branch: "Main Church",
    childrenIds: [6, 8],
    status: "Active",
    joinedDate: "Jul 25, 2026",
  },
  {
    id: 6,
    name: "Lucy Achieng",
    phone: "+254 767 890 123",
    email: "lucy.achieng@example.com",
    relationship: "Mother",
    branch: "Shiloh Worship Centre",
    childrenIds: [9],
    status: "Active",
    joinedDate: "Jul 20, 2026",
  },
  {
    id: 7,
    name: "Samuel Kariuki",
    phone: "+254 778 901 234",
    email: "samuel.kariuki@example.com",
    relationship: "Guardian",
    branch: "Main Church",
    childrenIds: [10],
    status: "Inactive",
    joinedDate: "Jul 15, 2026",
  },
  {
    id: 8,
    name: "Anne Wambui",
    phone: "+254 789 012 345",
    email: "anne.wambui@example.com",
    relationship: "Mother",
    branch: "Ukombozi Restoration Center",
    childrenIds: [11, 12],
    status: "Active",
    joinedDate: "Jul 12, 2026",
  },
  {
    id: 9,
    name: "James Kibet",
    phone: "+254 790 123 456",
    email: "james.kibet@example.com",
    relationship: "Father",
    branch: "Main Church",
    childrenIds: [13],
    status: "Active",
    joinedDate: "Jul 8, 2026",
  },
  {
    id: 10,
    name: "Esther Chebet",
    phone: "+254 701 234 567",
    email: "esther.chebet@example.com",
    relationship: "Guardian",
    branch: "Shiloh Worship Centre",
    childrenIds: [14],
    status: "Active",
    joinedDate: "Jul 3, 2026",
  },
];