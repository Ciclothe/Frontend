import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface ThemeContextProps {
  isNightMode: boolean;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsNightMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsNightMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add("bodyNightMode");
      document.body.classList.remove("bodyDayMode");
    } else {
      document.body.classList.add("bodyDayMode");
      document.body.classList.remove("bodyNightMode");
    }
  }, [isNightMode]);

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
