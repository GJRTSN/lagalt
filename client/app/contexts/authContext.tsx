// contexts/authContext.tsx
import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  user: null | { id: number; username: string };
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
