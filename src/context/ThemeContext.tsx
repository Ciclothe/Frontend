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

  // Detectar el modo de preferencia del navegador (claro/oscuro)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsNightMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsNightMode(e.matches); // Actualiza el estado cuando cambie la preferencia
    };

    // Escuchar los cambios en la preferencia del esquema de color
    mediaQuery.addEventListener("change", handleChange);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Aplicar la clase correspondiente al body dependiendo del tema
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
