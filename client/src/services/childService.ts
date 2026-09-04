import api from "./api";

export interface ChildParent {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  status: "ACTIVE" | "INACTIVE";
}

export interface ChildGrade {
  id: string;
  name: string;
  description?: string | null;
  status: "ACTIVE" | "INACTIVE";
}

export interface ChildBranch {
  id: string;
  name: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  status: "ACTIVE" | "INACTIVE";

  parentId: string;
  gradeId: string;
  branchId: string;

  parent: ChildParent;
  grade: ChildGrade;
  branch: ChildBranch;

  createdAt: string;
  updatedAt: string;
}

export interface CreateChildData {
  name: string;
  age: number;
  parentId: string;
  gradeId: string;
  branchId: string;
}

export interface UpdateChildData {
  name?: string;
  age?: number;
  parentId?: string;
  gradeId?: string;
  branchId?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export const getChildren = async (): Promise<Child[]> => {
  const response = await api.get("/children");

  return response.data.data;
};

export const getChildById = async (
  id: string,
): Promise<Child> => {
  const response = await api.get(`/children/${id}`);

  return response.data.data;
};

export const createChild = async (
  data: CreateChildData,
): Promise<Child> => {
  const response = await api.post("/children", data);

  return response.data.data;
};

export const updateChild = async (
  id: string,
  data: UpdateChildData,
): Promise<Child> => {
  const response = await api.put(`/children/${id}`, data);

  return response.data.data;
};

export const updateChildStatus = async (
  id: string,
  status: "ACTIVE" | "INACTIVE",
): Promise<Child> => {
  const response = await api.patch(
    `/children/${id}/status`,
    { status },
  );

  return response.data.data;
};

export const deleteChild = async (
  id: string,
): Promise<void> => {
  await api.delete(`/children/${id}`);
};