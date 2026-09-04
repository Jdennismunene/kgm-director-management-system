import api from "./api";

export interface Grade {
  id: string;
  name: string;
  description?: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;

  _count?: {
    children: number;
  };
}

export interface CreateGradeData {
  name: string;
  description?: string;
}

export const getGrades = async (): Promise<Grade[]> => {
  const response = await api.get("/grades");

  return response.data.data;
};

export const getGradeById = async (
  id: string,
): Promise<Grade> => {
  const response = await api.get(`/grades/${id}`);

  return response.data.data;
};

export const createGrade = async (
  data: CreateGradeData,
): Promise<Grade> => {
  const response = await api.post("/grades", data);

  return response.data.data;
};

export const updateGrade = async (
  id: string,
  data: Partial<CreateGradeData>,
): Promise<Grade> => {
  const response = await api.put(`/grades/${id}`, data);

  return response.data.data;
};

export const updateGradeStatus = async (
  id: string,
  status: "ACTIVE" | "INACTIVE",
): Promise<Grade> => {
  const response = await api.patch(
    `/grades/${id}/status`,
    { status },
  );

  return response.data.data;
};

export const deleteGrade = async (
  id: string,
): Promise<void> => {
  await api.delete(`/grades/${id}`);
};