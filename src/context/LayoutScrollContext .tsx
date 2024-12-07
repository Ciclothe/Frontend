import { createContext, useContext, useState, ReactNode } from "react";

interface LayoutScrollContextType {
  hasScroll: boolean;
  setHasScroll: (value: boolean) => void;
}

const LayoutScrollContext = createContext<LayoutScrollContextType | undefined>(
  undefined
);

export const LayoutScrollProvider = ({ children }: { children: ReactNode }) => {
  const [hasScroll, setHasScroll] = useState(false);

  return (
    <LayoutScrollContext.Provider value={{ hasScroll, setHasScroll }}>
      {children}
    </LayoutScrollContext.Provider>
  );
};

export const useLayoutScroll = (): LayoutScrollContextType => {
  const context = useContext(LayoutScrollContext);
  if (!context) {
    throw new Error(
      "useLayoutScroll must be used within a LayoutScrollProvider"
    );
  }
  return context;
};
