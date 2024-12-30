import React, { createContext, useContext, useState } from "react";

interface HeaderVisibilityContextProps {
  isVisible: boolean;
  toggleVisibility: (value: boolean) => void;
}

const HeaderVisibilityContext = createContext<
  HeaderVisibilityContextProps | undefined
>(undefined);

export const HeaderVisibilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = (value: boolean) => {
    setIsVisible(value);
  };

  return (
    <HeaderVisibilityContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};

export const useHeaderVisibility = (): HeaderVisibilityContextProps => {
  const context = useContext(HeaderVisibilityContext);
  if (!context) {
    throw new Error(
      "useHeaderVisibility must be used within a HeaderVisibilityProvider"
    );
  }
  return context;
};
