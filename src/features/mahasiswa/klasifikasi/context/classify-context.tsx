"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ClassifyResponse } from "@/services/classify";

interface ClassifyContextType {
  result: ClassifyResponse | null;
  setResult: (result: ClassifyResponse | null) => void;
}

const ClassifyContext = createContext<ClassifyContextType | undefined>(
  undefined
);

export function ClassifyProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<ClassifyResponse | null>(null);

  return (
    <ClassifyContext.Provider value={{ result, setResult }}>
      {children}
    </ClassifyContext.Provider>
  );
}

export function useClassify() {
  const context = useContext(ClassifyContext);
  if (!context) {
    throw new Error("useClassify must be used within a ClassifyProvider");
  }
  return context;
}
