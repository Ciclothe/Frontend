import React, { createContext, useState, useContext, ReactNode } from "react";

interface SearchContextProps {
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
  searchText: string;
  setSearchText: (value: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider
      value={{ isSearching, setIsSearching, searchText, setSearchText }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
