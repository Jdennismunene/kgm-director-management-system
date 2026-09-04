import api from "./api";

// =====================================================
// TYPES
// =====================================================

export type DocumentType = "PDF" | "JPG" | "PNG";

export type DocumentCategory =
  | "IDENTIFICATION"
  | "CONSENT"
  | "PHOTO"
  | "MEDICAL"
  | "EDUCATION"
  | "OTHER";

export interface DocumentRecord {
  id: string;
  name: string;
  type: DocumentType;
  category: DocumentCategory;
  fileName: string;
  originalName: string;
  filePath: string;
  fileUrl: string;
  mimeType: string;
  size: number;
  childId: string;
  createdAt: string;
  updatedAt: string;
}

// =====================================================
// GET ALL DOCUMENTS FOR A CHILD
// GET /api/children/:childId/documents
// =====================================================

export const getDocuments = async (
  childId: string,
): Promise<DocumentRecord[]> => {
  const response = await api.get<DocumentRecord[]>(
    `/children/${childId}/documents`,
  );

  return response.data;
};

// =====================================================
// GET ONE DOCUMENT
// GET /api/documents/:id
// =====================================================

export const getDocumentById = async (
  id: string,
): Promise<DocumentRecord> => {
  const response = await api.get<DocumentRecord>(
    `/documents/${id}`,
  );

  return response.data;
};

// =====================================================
// CREATE / UPLOAD DOCUMENT
// POST /api/children/:childId/documents
// =====================================================

export interface CreateDocumentData {
  name: string;
  category: DocumentCategory;
  file: File;
}

export const createDocument = async (
  childId: string,
  data: CreateDocumentData,
): Promise<DocumentRecord> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("category", data.category);
  formData.append("file", data.file);

  const response = await api.post<DocumentRecord>(
    `/children/${childId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

// =====================================================
// UPDATE DOCUMENT
// PUT /api/documents/:id
// =====================================================

export interface UpdateDocumentData {
  name?: string;
  category?: DocumentCategory;
  file?: File;
}

export const updateDocument = async (
  id: string,
  data: UpdateDocumentData,
): Promise<DocumentRecord> => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.category !== undefined) {
    formData.append("category", data.category);
  }

  if (data.file) {
    formData.append("file", data.file);
  }

  const response = await api.put<DocumentRecord>(
    `/documents/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

// =====================================================
// DELETE DOCUMENT
// DELETE /api/documents/:id
// =====================================================

export const deleteDocument = async (
  id: string,
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(
    `/documents/${id}`,
  );

  return response.data;
};