"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Defina os tipos do contexto
interface UserUpdateContextType {
  update: boolean;
  triggerUpdate: () => void;
}

// Crie o contexto com um valor padrão
const UserUpdateContext = createContext<UserUpdateContextType | undefined>(
  undefined
);

// Defina o provider do contexto
interface UserUpdateProviderProps {
  children: ReactNode;
}

export function UserUpdateProvider({ children }: UserUpdateProviderProps) {
  const [update, setUpdate] = useState(false);

  const triggerUpdate = () => setUpdate((prev) => !prev);

  return (
    <UserUpdateContext.Provider value={{ update, triggerUpdate }}>
      {children}
    </UserUpdateContext.Provider>
  );
}

// Hook para usar o contexto
export function useUserUpdate() {
  const context = useContext(UserUpdateContext);
  if (context === undefined) {
    throw new Error("useUserUpdate must be used within a UserUpdateProvider");
  }
  return context;
}
