import { createContext, useContext, useState, ReactNode } from "react";

type SectionOption = {
  name: string;
  value: number;
};

type SectionOptionsContextType = {
  sectionOptions: SectionOption[];
  setSectionOptions: (options: SectionOption[]) => void;
};

const SectionOptionsContext = createContext<
  SectionOptionsContextType | undefined
>(undefined);

export const SectionOptionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sectionOptions, setSectionOptions] = useState<SectionOption[]>([]);

  console.log(sectionOptions);
  return (
    <SectionOptionsContext.Provider
      value={{ sectionOptions, setSectionOptions }}
    >
      {children}
    </SectionOptionsContext.Provider>
  );
};

export const useSectionOptions = () => {
  const context = useContext(SectionOptionsContext);
  if (!context) {
    throw new Error(
      "useSectionOptions must be used within a SectionOptionsProvider"
    );
  }
  return context;
};
