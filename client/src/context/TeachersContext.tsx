import { createContext, useContext, useState } from "react";
import { teachersData, type Teacher } from "../data/teachersData";

interface TeachersContextType {
  teachers: Teacher[];
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: number) => void;
}

const TeachersContext = createContext<TeachersContextType | undefined>(
  undefined,
);

export const TeachersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [teachers, setTeachers] = useState<Teacher[]>(teachersData);

  const addTeacher = (teacher: Teacher) => {
    setTeachers((prev) => [...prev, teacher]);
  };

  const updateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher,
      ),
    );
  };

  const deleteTeacher = (id: number) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
  };

  return (
    <TeachersContext.Provider
      value={{
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
};

export const useTeachers = () => {
  const context = useContext(TeachersContext);

  if (!context) {
    throw new Error("useTeachers must be used inside TeachersProvider");
  }

  return context;
};
