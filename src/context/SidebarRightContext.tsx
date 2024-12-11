import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SidebarRightContextType {
  isSidebarRightVisible: boolean;
  setIsSidebarRightVisible: Dispatch<SetStateAction<boolean>>;
}

const SidebarRightContext = createContext<SidebarRightContextType | undefined>(
  undefined
);

export const SidebarRightProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarRightVisible, setIsSidebarRightVisible] = useState(true);

  return (
    <SidebarRightContext.Provider
      value={{ isSidebarRightVisible, setIsSidebarRightVisible }}
    >
      {children}
    </SidebarRightContext.Provider>
  );
};

export const useSidebarRight = (): SidebarRightContextType => {
  const context = useContext(SidebarRightContext);
  if (!context) {
    throw new Error(
      "useSidebarRight debe usarse dentro de un SidebarRightProvider"
    );
  }
  return context;
};
