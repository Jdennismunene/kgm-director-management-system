import { createContext, useContext, useEffect, useState } from "react";

import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  type Teacher,
  type CreateTeacherData,
  type UpdateTeacherData,
} from "../services/teacherService";

// =====================================================
// CONTEXT TYPE
// =====================================================

interface TeachersContextType {
  teachers: Teacher[];

  loading: boolean;
  error: string | null;

  addTeacher: (data: CreateTeacherData) => Promise<Teacher>;
  updateTeacher: (id: string, data: UpdateTeacherData) => Promise<Teacher>;
  deleteTeacher: (id: string) => Promise<void>;

  refreshTeachers: () => Promise<void>;
}

// =====================================================
// CREATE CONTEXT
// =====================================================

const TeachersContext = createContext<TeachersContextType | undefined>(
  undefined,
);

// =====================================================
// PROVIDER
// =====================================================

export const TeachersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // GET ALL TEACHERS
  // =====================================================

  const refreshTeachers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTeachers();

      setTeachers(data);
    } catch (error) {
      console.error("Error loading teachers:", error);

      setError("Failed to load teachers.");

      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD TEACHERS WHEN PROVIDER MOUNTS
  // =====================================================

  useEffect(() => {
    refreshTeachers();
  }, []);

  // =====================================================
  // ADD TEACHER
  // =====================================================

  const addTeacher = async (data: CreateTeacherData): Promise<Teacher> => {
    try {
      setError(null);

      const newTeacher = await createTeacher(data);

      setTeachers((prev) => [...prev, newTeacher]);

      return newTeacher;
    } catch (error) {
      console.error("Error creating teacher:", error);

      setError("Failed to create teacher.");

      throw error;
    }
  };

  // =====================================================
  // UPDATE TEACHER
  // =====================================================

  const handleUpdateTeacher = async (
    id: string,
    data: UpdateTeacherData,
  ): Promise<Teacher> => {
    try {
      setError(null);

      const updatedTeacher = await updateTeacher(id, data);

      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === updatedTeacher.id ? updatedTeacher : teacher,
        ),
      );

      return updatedTeacher;
    } catch (error) {
      console.error("Error updating teacher:", error);

      setError("Failed to update teacher.");

      throw error;
    }
  };

  // =====================================================
  // DELETE TEACHER
  // =====================================================

  const handleDeleteTeacher = async (id: string): Promise<void> => {
    try {
      setError(null);

      await deleteTeacher(id);

      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);

      setError("Failed to delete teacher.");

      throw error;
    }
  };

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <TeachersContext.Provider
      value={{
        teachers,
        loading,
        error,
        addTeacher,
        updateTeacher: handleUpdateTeacher,
        deleteTeacher: handleDeleteTeacher,
        refreshTeachers,
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useTeachers = () => {
  const context = useContext(TeachersContext);

  if (!context) {
    throw new Error("useTeachers must be used inside TeachersProvider");
  }

  return context;
};
