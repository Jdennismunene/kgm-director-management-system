import api from "./api";

// =====================================================
// TYPES
// =====================================================

export interface TeacherGrade {
  id: string;
  name: string;
  description?: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: string;
  updatedAt?: string;
}

export interface TeacherLesson {
  id: string;
  title: string;
  category: string;
  date: string;
  progress: number;
  status: "COMPLETED" | "IN_PROGRESS";
  score?: number | null;
  teacher: string;
  teacherId?: string | null;
  childId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherNote {
  id: string;
  title: string;
  content: string;
  author: string;
  role: string;
  teacherId?: string | null;
  date: string;
  type: "GENERAL" | "PRAYER" | "PROGRESS" | "FOLLOW_UP";
  pinned: boolean;
  childId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;

  status: "ACTIVE" | "INACTIVE";

  joinedDate: string;
  createdAt: string;
  updatedAt: string;

  grades: TeacherGrade[];

  lessons?: TeacherLesson[];
  notes?: TeacherNote[];
}

// =====================================================
// CREATE TEACHER DATA
// =====================================================

export interface CreateTeacherData {
  name: string;
  email: string;
  phone: string;

  status?: "ACTIVE" | "INACTIVE";

  joinedDate?: string;

  gradeIds?: string[];
}

// =====================================================
// UPDATE TEACHER DATA
// =====================================================

export interface UpdateTeacherData {
  name?: string;
  email?: string;
  phone?: string;

  status?: "ACTIVE" | "INACTIVE";

  joinedDate?: string;

  gradeIds?: string[];
}

// =====================================================
// GET ALL TEACHERS
// =====================================================

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get("/teachers");

  return response.data;
};

// =====================================================
// GET SINGLE TEACHER
// =====================================================

export const getTeacherById = async (id: string): Promise<Teacher> => {
  const response = await api.get(`/teachers/${id}`);

  return response.data;
};

// =====================================================
// CREATE TEACHER
// =====================================================

export const createTeacher = async (
  data: CreateTeacherData,
): Promise<Teacher> => {
  const response = await api.post("/teachers", data);

  return response.data;
};

// =====================================================
// UPDATE TEACHER
// =====================================================

export const updateTeacher = async (
  id: string,
  data: UpdateTeacherData,
): Promise<Teacher> => {
  const response = await api.put(`/teachers/${id}`, data);

  return response.data;
};

// =====================================================
// DELETE TEACHER
// =====================================================

export const deleteTeacher = async (id: string): Promise<void> => {
  await api.delete(`/teachers/${id}`);
};
