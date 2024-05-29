"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Defina os tipos do contexto
interface DefaultUpdateContextType {
  update: boolean;
  triggerUpdate: () => void;
}

// Crie o contexto com um valor padrão
const DefaultUpdateContext = createContext<
  DefaultUpdateContextType | undefined
>(undefined);

// Defina o provider do contexto
interface DefaultUpdateProviderProps {
  children: ReactNode;
}

export function DefaultUpdateProvider({
  children,
}: DefaultUpdateProviderProps) {
  const [update, setUpdate] = useState(false);

  const triggerUpdate = () => setUpdate((prev) => !prev);

  return (
    <DefaultUpdateContext.Provider value={{ update, triggerUpdate }}>
      {children}
    </DefaultUpdateContext.Provider>
  );
}

// Hook para usar o contexto
export function useDefaultUpdate() {
  const context = useContext(DefaultUpdateContext);
  if (context === undefined) {
    throw new Error(
      "useDefaultUpdate must be used within a DefaultUpdateProvider"
    );
  }
  return context;
}
