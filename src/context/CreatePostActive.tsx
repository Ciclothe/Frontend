import React, { createContext, useState, useContext, ReactNode } from "react";

interface PostButtonContextType {
  showPostButton: boolean;
  setShowPostButton: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crear el contexto con un valor por defecto
const PostButtonContext = createContext<PostButtonContextType | undefined>(
  undefined
);

// Proveedor del contexto
export const CreatePostActive = ({ children }: { children: ReactNode }) => {
  const [showPostButton, setShowPostButton] = useState<boolean>(false);

  return (
    <PostButtonContext.Provider value={{ showPostButton, setShowPostButton }}>
      {children}
    </PostButtonContext.Provider>
  );
};

export const usePostButton = (): PostButtonContextType => {
  const context = useContext(PostButtonContext);
  if (!context) {
    throw new Error("usePostButton must be used within a PostButtonProvider");
  }
  return context;
};
