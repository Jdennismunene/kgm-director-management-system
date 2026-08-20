import { createContext, useContext, useState } from "react";
import { gradesData, type Grade } from "../data/gradesData";

interface GradesContextType {
  grades: Grade[];
  addGrade: (grade: Grade) => void;
  updateGrade: (grade: Grade) => void;
  deleteGrade: (id: number) => void;
}

const GradesContext = createContext<GradesContextType | undefined>(undefined);

export const GradesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [grades, setGrades] = useState<Grade[]>(gradesData);

  const addGrade = (grade: Grade) => {
    setGrades((prev) => [...prev, grade]);
  };

  const updateGrade = (updatedGrade: Grade) => {
    setGrades((prev) =>
      prev.map((grade) =>
        grade.id === updatedGrade.id ? updatedGrade : grade,
      ),
    );
  };

  const deleteGrade = (id: number) => {
    setGrades((prev) => prev.filter((grade) => grade.id !== id));
  };

  return (
    <GradesContext.Provider
      value={{
        grades,
        addGrade,
        updateGrade,
        deleteGrade,
      }}
    >
      {children}
    </GradesContext.Provider>
  );
};

export const useGrades = () => {
  const context = useContext(GradesContext);

  if (!context) {
    throw new Error("useGrades must be used inside GradesProvider");
  }

  return context;
};