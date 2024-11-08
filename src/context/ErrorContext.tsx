import { createContext, ReactNode, useContext, useState } from "react";

interface ErrorContextType {
  error: { message: string; messages?: string[]; name?: string; stack?: string } | null;
  setError: React.Dispatch<
    React.SetStateAction<{
      message: string;
      messages?: string[];
      name?: string;
      stack?: string;
    } | null>
  >;
}

export const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<{
    message: string;
    messages?: string[];
    name?: string;
    stack?: string;
  } | null>(null);

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
};

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (context === null) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};
