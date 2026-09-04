import api from "./api";

export interface Parent {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface CreateParentData {
  name: string;
  phone: string;
  email?: string;
}

export const getParents = async (): Promise<Parent[]> => {
  const response = await api.get("/parents");

  return response.data.data;
};

export const getParentById = async (
  id: string,
): Promise<Parent> => {
  const response = await api.get(`/parents/${id}`);

  return response.data.data;
};

export const createParent = async (
  data: CreateParentData,
): Promise<Parent> => {
  const response = await api.post("/parents", data);

  return response.data.data;
};

export const updateParent = async (
  id: string,
  data: Partial<CreateParentData>,
): Promise<Parent> => {
  const response = await api.put(`/parents/${id}`, data);

  return response.data.data;
};

export const updateParentStatus = async (
  id: string,
  status: "ACTIVE" | "INACTIVE",
): Promise<Parent> => {
  const response = await api.patch(
    `/parents/${id}/status`,
    { status },
  );

  return response.data.data;
};

export const deleteParent = async (
  id: string,
): Promise<void> => {
  await api.delete(`/parents/${id}`);
};