"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Defina os tipos do contexto
interface GroupUpdateContextType {
  update: boolean;
  triggerUpdate: () => void;
}

// Crie o contexto com um valor padrão
const GroupUpdateContext = createContext<GroupUpdateContextType | undefined>(
  undefined
);

// Defina o provider do contexto
interface GroupUpdateProviderProps {
  children: ReactNode;
}

export function GroupUpdateProvider({ children }: GroupUpdateProviderProps) {
  const [update, setUpdate] = useState(false);

  const triggerUpdate = () => setUpdate((prev) => !prev);

  return (
    <GroupUpdateContext.Provider value={{ update, triggerUpdate }}>
      {children}
    </GroupUpdateContext.Provider>
  );
}

// Hook para usar o contexto
export function useGroupUpdate() {
  const context = useContext(GroupUpdateContext);
  if (context === undefined) {
    throw new Error("useGroupUpdate must be used within a GroupUpdateProvider");
  }
  return context;
}
