import React, { createContext, useState, useContext, ReactNode } from "react";

// Define el tipo de datos que se pasarán al modal
interface SwapContextType {
  showModal: boolean;
  selectedPost: any;
  setModalState: (showModal: boolean, selectedPost?: any) => void;
}

// Tipar el prop children como ReactNode
interface SwapProviderProps {
  children: ReactNode;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const SwapProvider: React.FC<SwapProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const setModalState = (showModal: boolean, selectedPost: any) => {
    setShowModal(showModal);
    setSelectedPost(selectedPost);
  };

  return (
    <SwapContext.Provider value={{ showModal, selectedPost, setModalState }}>
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context;
};
