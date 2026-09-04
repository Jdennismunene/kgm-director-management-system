import api from "./api";

// =====================================================
// TYPES
// =====================================================

export type LessonStatus = "COMPLETED" | "IN_PROGRESS";

export interface LessonRecord {
  id: string;
  title: string;
  category: string;
  date: string;
  progress: number;
  status: LessonStatus;
  score: number | null;
  teacher: string;
  childId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLessonData {
  childId: string;
  title: string;
  category: string;
  date: string;
  progress: number;
  status: LessonStatus;
  score?: number | null;
  teacher: string;
}

export interface UpdateLessonData {
  title?: string;
  category?: string;
  date?: string;
  progress?: number;
  status?: LessonStatus;
  score?: number | null;
  teacher?: string;
}

// =====================================================
// GET CHILD LESSONS
// GET /api/lessons/child/:childId
// =====================================================

export const getChildLessons = async (
  childId: string,
): Promise<LessonRecord[]> => {
  const response = await api.get(`/lessons/child/${childId}`);

  return response.data.data;
};

// =====================================================
// GET LESSON BY ID
// GET /api/lessons/:id
// =====================================================

export const getLessonById = async (id: string): Promise<LessonRecord> => {
  const response = await api.get(`/lessons/${id}`);

  return response.data.data;
};

// =====================================================
// CREATE LESSON
// POST /api/lessons
// =====================================================

export const createLesson = async (
  data: CreateLessonData,
): Promise<LessonRecord> => {
  const response = await api.post("/lessons", data);

  return response.data.data;
};

// =====================================================
// UPDATE LESSON
// PUT /api/lessons/:id
// =====================================================

export const updateLesson = async (
  id: string,
  data: UpdateLessonData,
): Promise<LessonRecord> => {
  const response = await api.put(`/lessons/${id}`, data);

  return response.data.data;
};

// =====================================================
// DELETE LESSON
// DELETE /api/lessons/:id
// =====================================================

export const deleteLesson = async (id: string): Promise<void> => {
  await api.delete(`/lessons/${id}`);
};
