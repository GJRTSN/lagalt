// contexts/AuthProvider.tsx
import { AuthContext } from "./authContext";
import axios from "axios";
import { useState } from "react";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.get(
        `https://lagalt-case-1.azurewebsites.net/users?username=${username}&password=${password}`
      );
      const user = response.data;
      if (user) {
        setUser({ id: user.userId, username: user.username });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
