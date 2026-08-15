export interface ChildParentInfo {
  parentName: string;
  phone: string;
  occupation: string;
  relationship: string;
  email: string;
  address: string;
}

export const childParentInfoData: Record<number, ChildParentInfo> = {
  1: {
    parentName: "John Mwangi",
    phone: "0721 234 567",
    occupation: "Businessman",
    relationship: "Father",
    email: "johnmwangi@email.com",
    address: "123 Faith Drive, Nairobi, Kenya",
  },

  2: {
    parentName: "Jane Wanjiku",
    phone: "0712 345 678",
    occupation: "Teacher",
    relationship: "Mother",
    email: "janewanjiku@email.com",
    address: "45 Hope Road, Nairobi, Kenya",
  },
};