export interface QuickInfo {
  membershipNumber: string;
  status: "Active" | "Inactive";
  dateAdded: string;
  lastUpdated: string;
}

export const quickInfoData: QuickInfo = {
  membershipNumber: "CHD-2024-0012",
  status: "Active",
  dateAdded: "May 12, 2024",
  lastUpdated: "May 15, 2024",
};