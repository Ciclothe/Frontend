import React, { createContext, useState, useContext, ReactNode } from "react";

interface ThemeContextProps {
  isNightMode: boolean;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isNightMode, setIsNightMode] = useState(true);

  const toggleMode = () => {
    setIsNightMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser utilizado dentro de un ThemeProvider");
  }
  return context;
};
