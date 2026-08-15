export interface AcademicInformationType {
  className: string;
  branch: string;
  dateJoined: string;
  baptized: "Yes" | "No";
  baptismDate: string;
}

export const academicInformationData: AcademicInformationType = {
  className: "Class 5",
  branch: "Main Church",
  dateJoined: "2024-05-12",
  baptized: "Yes",
  baptismDate: "2024-08-10",
};