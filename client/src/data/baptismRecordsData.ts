export type BaptismRecordStatus =
  | "Pending"
  | "Scheduled"
  | "Baptized"
  | "Cancelled";

export type CertificateStatus =
  | "Issued"
  | "Pending"
  | "Not Required";

export interface BaptismRecord {
  id: number;

  personName: string;
  age: number;
  gender: "Male" | "Female";

  dateOfBirth: string;

  parentGuardian: string;
  phone: string;
  email: string;

  baptismDate: string;
  baptismLocation: string;
  minister: string;
  branch: string;

  baptismNumber: string;

  status: BaptismRecordStatus;
  certificateStatus: CertificateStatus;

  notes: string;
}

export const baptismRecordsData: BaptismRecord[] = [
  {
    id: 1,
    personName: "Brian Mwangi",
    age: 10,
    gender: "Male",
    dateOfBirth: "2016-03-15",

    parentGuardian: "Peter Mwangi",
    phone: "0712345678",
    email: "peter.mwangi@example.com",

    baptismDate: "2026-01-18",
    baptismLocation: "Main Church",
    minister: "Pastor David",
    branch: "Main Church",

    baptismNumber: "BAP-2026-001",

    status: "Baptized",
    certificateStatus: "Issued",

    notes: "Baptized during the January Sunday service.",
  },

  {
    id: 2,
    personName: "Mercy Wanjiku",
    age: 12,
    gender: "Female",
    dateOfBirth: "2014-07-22",

    parentGuardian: "Jane Wanjiku",
    phone: "0723456789",
    email: "jane.wanjiku@example.com",

    baptismDate: "2026-02-08",
    baptismLocation: "Shiloh Worship Centre",
    minister: "Pastor Samuel",
    branch: "Shiloh Worship Centre",

    baptismNumber: "BAP-2026-002",

    status: "Baptized",
    certificateStatus: "Issued",

    notes: "Certificate issued after baptism.",
  },

  {
    id: 3,
    personName: "Daniel Kiptoo",
    age: 9,
    gender: "Male",
    dateOfBirth: "2017-05-10",

    parentGuardian: "Joseph Kiptoo",
    phone: "0734567890",
    email: "",

    baptismDate: "2026-09-12",
    baptismLocation: "Main Church",
    minister: "Pastor David",
    branch: "Main Church",

    baptismNumber: "BAP-2026-003",

    status: "Scheduled",
    certificateStatus: "Pending",

    notes: "Scheduled for the September baptism service.",
  },

  {
    id: 4,
    personName: "Faith Akinyi",
    age: 11,
    gender: "Female",
    dateOfBirth: "2015-11-03",

    parentGuardian: "Grace Akinyi",
    phone: "0745678901",
    email: "grace.akinyi@example.com",

    baptismDate: "2026-10-04",
    baptismLocation: "Ukombozi Restoration Center",
    minister: "Pastor Mark",
    branch: "Ukombozi Restoration Center",

    baptismNumber: "BAP-2026-004",

    status: "Pending",
    certificateStatus: "Not Required",

    notes: "Parent confirmation pending.",
  },

  {
    id: 5,
    personName: "Samuel Otieno",
    age: 13,
    gender: "Male",
    dateOfBirth: "2013-02-18",

    parentGuardian: "James Otieno",
    phone: "0756789012",
    email: "james.otieno@example.com",

    baptismDate: "2025-12-14",
    baptismLocation: "Main Church",
    minister: "Pastor David",
    branch: "Main Church",

    baptismNumber: "BAP-2025-018",

    status: "Baptized",
    certificateStatus: "Issued",

    notes: "Completed baptism successfully.",
  },
];