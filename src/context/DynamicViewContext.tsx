import React, { createContext, useContext, useState, ReactNode } from "react";

type DynamicViewType = "search" | "pageView";

interface DynamicViewState {
  showDynamicView: boolean;
  type: DynamicViewType;
  setShowDynamicView: (show: boolean) => void;
  setType: (type: DynamicViewType) => void;
}

const initialState: DynamicViewState = {
  showDynamicView: false,
  type: "pageView",
  setShowDynamicView: () => {},
  setType: () => {},
};

const DynamicViewContext = createContext<DynamicViewState>(initialState);

export const DynamicViewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showDynamicView, setShowDynamicView] = useState<boolean>(false);
  const [type, setType] = useState<DynamicViewType>("pageView");

  return (
    <DynamicViewContext.Provider
      value={{
        showDynamicView,
        type,
        setShowDynamicView,
        setType,
      }}
    >
      {children}
    </DynamicViewContext.Provider>
  );
};

export const useDynamicView = () => {
  const context = useContext(DynamicViewContext);
  if (!context) {
    throw new Error("useDynamicView must be used within a DynamicViewProvider");
  }
  return context;
};
