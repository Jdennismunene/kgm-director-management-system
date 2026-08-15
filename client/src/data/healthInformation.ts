export interface HealthInformation {
  allergies: string;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
  notes: string;
}

export const healthInformationData: HealthInformation = {
  allergies: "None",
  medicalConditions: "None",
  emergencyContact: "Jane Mwangi (Mother)",
  emergencyPhone: "0712 345 678",
  notes: "N/A",
};