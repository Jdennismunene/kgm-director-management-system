import { createContext, useContext, useState, type ReactNode } from "react";
import { attendanceData } from "../data/attendanceData";

export type AttendanceStatus = "Present" | "Absent" | "Late";

export interface AttendanceRecord {
  id: number;
  childId: number;
  childName: string;
  parent: string;
  branch: string;
  className: string;
  date: string;
  time: string;
  status: AttendanceStatus;
}

interface AttendanceContextType {
  attendanceRecords: AttendanceRecord[];
  addAttendanceSession: (
    records: Omit<AttendanceRecord, "id" | "date" | "time">[],
    date: string,
  ) => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(
  undefined,
);

interface AttendanceProviderProps {
  children: ReactNode;
}

export const AttendanceProvider = ({ children }: AttendanceProviderProps) => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >(() => attendanceData);

  const addAttendanceSession = (
    records: Omit<AttendanceRecord, "id" | "date" | "time">[],
    date: string,
  ) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newRecords: AttendanceRecord[] = records.map((record, index) => ({
      ...record,
      id: Date.now() + index,
      date,
      time,
    }));

    setAttendanceRecords((current) => [...newRecords, ...current]);
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendanceRecords,
        addAttendanceSession,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);

  if (!context) {
    throw new Error("useAttendance must be used inside an AttendanceProvider");
  }

  return context;
};
