import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface ThemeContextProps {
  themeMode: "light" | "dark";
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemMode = mediaQuery.matches ? "dark" : "light";
    setThemeMode(systemMode);

    const handleChange = (e: MediaQueryListEvent) => {
      const systemMode = e.matches ? "dark" : "light";
      setThemeMode(systemMode);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("bodyNightMode");
      document.body.classList.remove("bodyDayMode");
    } else {
      document.body.classList.add("bodyDayMode");
      document.body.classList.remove("bodyNightMode");
    }
  }, [themeMode]);

  const toggleMode = () => {
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleMode }}>
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
