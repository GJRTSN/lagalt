import { useRouter } from "next/navigation";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface User {
  userId: number | null;
  username: string | null;
  // ... other user properties
}

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    userId: null,
    username: null /* ... other user properties */,
  });
  const router = useRouter();

  const logout = () => {
    setUser({
      userId: null,
      username: null /* ... other user properties */,
    });
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    // This is a safeguard to ensure the context is not accessed outside a provider
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
