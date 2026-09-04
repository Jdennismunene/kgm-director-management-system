import api from "./api";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

export interface AttendanceRecord {
  id: string;
  date: string;
  program: string;
  status: AttendanceStatus;
  time?: string | null;
  notes?: string | null;
  childId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAttendanceData {
  childId: string;
  date: string;
  program: string;
  status: AttendanceStatus;
  time?: string | null;
  notes?: string | null;
}

export interface UpdateAttendanceData {
  date?: string;
  program?: string;
  status?: AttendanceStatus;
  time?: string | null;
  notes?: string | null;
}

// ============================================
// GET CHILD ATTENDANCE
// GET /api/attendance/child/:childId
// ============================================

export const getChildAttendance = async (
  childId: string,
): Promise<AttendanceRecord[]> => {
  const response = await api.get(`/attendance/child/${childId}`);

  return response.data.data;
};

// ============================================
// GET ATTENDANCE BY ID
// GET /api/attendance/:id
// ============================================

export const getAttendanceById = async (
  id: string,
): Promise<AttendanceRecord> => {
  const response = await api.get(`/attendance/${id}`);

  return response.data.data;
};

// ============================================
// CREATE ATTENDANCE
// POST /api/attendance
// ============================================

export const createAttendance = async (
  data: CreateAttendanceData,
): Promise<AttendanceRecord> => {
  const response = await api.post("/attendance", data);

  return response.data.data;
};

// ============================================
// UPDATE ATTENDANCE
// PUT /api/attendance/:id
// ============================================

export const updateAttendance = async (
  id: string,
  data: UpdateAttendanceData,
): Promise<AttendanceRecord> => {
  const response = await api.put(`/attendance/${id}`, data);

  return response.data.data;
};

// ============================================
// DELETE ATTENDANCE
// DELETE /api/attendance/:id
// ============================================

export const deleteAttendance = async (
  id: string,
): Promise<void> => {
  await api.delete(`/attendance/${id}`);
};