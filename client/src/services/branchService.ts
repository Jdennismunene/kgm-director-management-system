import api from "./api";

export interface Branch {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  _count?: {
    children: number;
  };
}

export interface CreateBranchData {
  name: string;
}

export const getBranches = async (): Promise<Branch[]> => {
  const response = await api.get("/branches");

  return response.data.data;
};

export const getBranchById = async (
  id: string,
): Promise<Branch> => {
  const response = await api.get(`/branches/${id}`);

  return response.data.data;
};

export const createBranch = async (
  data: CreateBranchData,
): Promise<Branch> => {
  const response = await api.post("/branches", data);

  return response.data.data;
};

export const updateBranch = async (
  id: string,
  data: Partial<CreateBranchData>,
): Promise<Branch> => {
  const response = await api.put(`/branches/${id}`, data);

  return response.data.data;
};

export const deleteBranch = async (
  id: string,
): Promise<void> => {
  await api.delete(`/branches/${id}`);
};