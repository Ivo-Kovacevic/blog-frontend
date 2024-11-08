import { ReactNode } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(localStorage.getItem("username") || null);

  return <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
