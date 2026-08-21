export type BaptismDocumentType =
  | "Baptism Certificate"
  | "Consent Form"
  | "Registration Form"
  | "Other";

export type BaptismDocumentStatus = "Available" | "Pending" | "Missing";

export interface BaptismDocument {
  id: number;

  // Links this document to a baptism record
  recordId: number;

  documentName: string;
  documentType: BaptismDocumentType;

  uploadedDate: string;
  status: BaptismDocumentStatus;

  // File information
  fileName: string;
  fileUrl: string;

  notes: string;
}

export const baptismDocumentationData: BaptismDocument[] = [
  {
    id: 1,
    recordId: 1,

    documentName: "Baptism Certificate",
    documentType: "Baptism Certificate",

    uploadedDate: "2026-01-18",
    status: "Available",

    fileName: "brian-mwangi-baptism-certificate.pdf",
    fileUrl: "",

    notes: "Official baptism certificate issued after the ceremony.",
  },

  {
    id: 2,
    recordId: 1,

    documentName: "Parent Consent Form",
    documentType: "Consent Form",

    uploadedDate: "2026-01-15",
    status: "Available",

    fileName: "brian-mwangi-consent-form.pdf",
    fileUrl: "",

    notes: "Signed consent form submitted by the parent.",
  },

  {
    id: 3,
    recordId: 2,

    documentName: "Baptism Certificate",
    documentType: "Baptism Certificate",

    uploadedDate: "2026-02-08",
    status: "Available",

    fileName: "mercy-wanjiku-baptism-certificate.pdf",
    fileUrl: "",

    notes: "Certificate issued successfully.",
  },

  {
    id: 4,
    recordId: 3,

    documentName: "Baptism Registration Form",
    documentType: "Registration Form",

    uploadedDate: "2026-08-10",
    status: "Available",

    fileName: "daniel-kiptoo-registration-form.pdf",
    fileUrl: "",

    notes: "Registration completed for the scheduled baptism.",
  },

  {
    id: 5,
    recordId: 3,

    documentName: "Baptism Certificate",
    documentType: "Baptism Certificate",

    uploadedDate: "",
    status: "Pending",

    fileName: "",
    fileUrl: "",

    notes: "Certificate will be issued after baptism.",
  },

  {
    id: 6,
    recordId: 4,

    documentName: "Parent Consent Form",
    documentType: "Consent Form",

    uploadedDate: "",
    status: "Missing",

    fileName: "",
    fileUrl: "",

    notes: "Awaiting signed consent form from the parent.",
  },

  {
    id: 7,
    recordId: 5,

    documentName: "Baptism Certificate",
    documentType: "Baptism Certificate",

    uploadedDate: "2025-12-14",
    status: "Available",

    fileName: "samuel-otieno-baptism-certificate.pdf",
    fileUrl: "",

    notes: "Certificate archived successfully.",
  },
];
