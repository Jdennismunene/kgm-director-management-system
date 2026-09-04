import api from "./api";

// =====================================================
// HISTORY TYPES
// =====================================================

export type HistoryType =
  | "PAYMENT"
  | "LESSON"
  | "NOTE"
  | "ATTENDANCE"
  | "DOCUMENT"
  | "PROFILE"
  | "DISCIPLESHIP";

export interface HistoryRecord {
  id: string;
  title: string;
  description: string;
  type: HistoryType;
  user: string;
  childId: string;
  createdAt: string;
  updatedAt: string;
}

// =====================================================
// GET HISTORY FOR A CHILD
// GET /api/children/:childId/history
// =====================================================

export const getHistory = async (
  childId: string,
): Promise<HistoryRecord[]> => {
  const response = await api.get<HistoryRecord[]>(
    `/children/${childId}/history`,
  );

  return response.data;
};

// =====================================================
// GET ONE HISTORY RECORD
// GET /api/history/:id
// =====================================================

export const getHistoryById = async (
  id: string,
): Promise<HistoryRecord> => {
  const response = await api.get<HistoryRecord>(`/history/${id}`);

  return response.data;
};