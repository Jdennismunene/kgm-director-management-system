export interface AcademicInformation {
  className: string;
  branch: string;
  dateJoined: string;
  baptized: "Yes" | "No";
  baptismDate: string;
}

export const academicInformationData: AcademicInformation = {
  className: "Class 5",
  branch: "Main Church",
  dateJoined: "2024-05-12",
  baptized: "Yes",
  baptismDate: "2024-08-10",
};