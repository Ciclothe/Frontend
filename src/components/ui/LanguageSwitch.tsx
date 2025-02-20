/**
 * LanguageSwitch component allows users to switch between different languages.
 * It displays a dropdown menu with language options and updates the selected language.
 *
 * @component
 * @param {boolean} onlyFlag - If true, only the flag icon is displayed without the language code.
 * @param {string} position - The position of the dropdown menu relative to the button.
 *
 * @example
 * <LanguageSwitch onlyFlag={false} position="left" />
 *
 * @returns {JSX.Element} The LanguageSwitch component.
 */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import spainIcon from "../../../public/CountriesIcons/espana.png";
import englandIcon from "../../../public/CountriesIcons/england.png";
import frenchIcon from "../../../public/CountriesIcons/francia.png";
import germanIcon from "../../../public/CountriesIcons/german.png";
import { useTheme } from "../../context/ThemeContext";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const languages = [
  { code: "en", name: "English", icon: englandIcon, ISO6392: "Eng" },
  { code: "es", name: "Español", icon: spainIcon, ISO6392: "Esp" },
  { code: "fr", name: "Français", icon: frenchIcon, ISO6392: "Fra" },
  { code: "de", name: "Deutsch", icon: germanIcon, ISO6392: "Deu" },
];

interface LanguageSwitchProps {
  onlyFlag: boolean;
  position: string;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  onlyFlag,
  position,
}) => {
  const { i18n } = useTranslation();
  const { themeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      const parsedLanguage = JSON.parse(storedLanguage);
      setSelectedLanguage(parsedLanguage);
      i18n.changeLanguage(parsedLanguage.code);
    }
  }, [i18n]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code);
    setIsOpen(false);
    localStorage.setItem("selectedLanguage", JSON.stringify(language));
  };

  return (
    <div
      className={`dropdown relative ${
        themeMode === "dark" ? "night-mode" : "day-mode"
      }`}
    >
      <button
        onClick={toggleMenu}
        className={`dropdown-toggle flex items-center py-1 px-2 font-bold ${
          themeMode === "dark" ? "bg-[#171717]" : "bg-[#F7F7F7]"
        } rounded-full`}
      >
        <img
          src={selectedLanguage.icon}
          alt={selectedLanguage.name}
          className="w-[1em] aspect-aquare"
        />
        {!onlyFlag && <p className="ml-2">{selectedLanguage.ISO6392}</p>}
      </button>
      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <div
            className={`dropdown-menu min-w-auto mt-2 ${position}-0`}
            style={{ zIndex: 100 }}
          >
            {languages.map((language) => (
              <div
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`dropdown-item ${
                  selectedLanguage.code === language.code
                    ? "dropdown-item-selected"
                    : ""
                } ${
                  language.code === "en"
                    ? "rounded-tl-xl rounded-tr-xl"
                    : language.code === "de"
                    ? "rounded-bl-xl rounded-br-xl"
                    : ""
                }`}
              >
                <img
                  src={language.icon}
                  alt={language.name}
                  className="w-[1em] aspect-aquare mr-2"
                />
                <p className="ml-2 font-bold">{language.name}</p>
                {language.code !== "fr" && <hr className="mx-2" />}
              </div>
            ))}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default LanguageSwitch;
