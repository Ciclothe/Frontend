import { createContext, useContext, useState, ReactNode } from "react";

interface ActiveSectionContextType {
  activeSection: number;
  setActiveSection: (section: number) => void;
}

const ActiveSectionContext = createContext<
  ActiveSectionContextType | undefined
>(undefined);

export const useActiveSection = (): ActiveSectionContextType => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      "useActiveSection must be used within a ActiveSectionProvider"
    );
  }
  return context;
};

interface ActiveSectionProviderProps {
  children: ReactNode;
}

export const ActiveSectionProvider = ({
  children,
}: ActiveSectionProviderProps) => {
  const [activeSection, setActiveSection] = useState<number>(0);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};
