"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Defina os tipos do contexto
interface TimeZoneUpdateContextType {
  update: boolean;
  triggerUpdate: () => void;
}

// Crie o contexto com um valor padrão
const TimeZoneUpdateContext = createContext<
  TimeZoneUpdateContextType | undefined
>(undefined);

// Defina o provider do contexto
interface TimeZoneUpdateProviderProps {
  children: ReactNode;
}

export function TimeZoneUpdateProvider({
  children,
}: TimeZoneUpdateProviderProps) {
  const [update, setUpdate] = useState(false);

  const triggerUpdate = () => setUpdate((prev) => !prev);

  return (
    <TimeZoneUpdateContext.Provider value={{ update, triggerUpdate }}>
      {children}
    </TimeZoneUpdateContext.Provider>
  );
}

// Hook para usar o contexto
export function useTimeZoneUpdate() {
  const context = useContext(TimeZoneUpdateContext);
  if (context === undefined) {
    throw new Error(
      "useTimeZoneUpdate must be used within a TimeZoneUpdateProvider"
    );
  }
  return context;
}
