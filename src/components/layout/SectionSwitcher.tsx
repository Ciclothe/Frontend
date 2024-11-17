import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface SectionSwitcherProps {
  options: { name: string; path: string }[];
}
const SectionSwitcher = ({ options }: SectionSwitcherProps) => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const isCentered = options.length === 2;
  const containerClasses = `flex items-center h-full w-full font-bold ${
    isNightMode ? "text-white bg-[#0b0b0b]" : "text-black bg-[#f0eff4]"
  } ${isCentered ? "justify-center" : "justify-start"}`;

  return (
    <div className={containerClasses}>
      {options.map((option: any, index: number) => (
        <div
          key={index}
          onClick={() => setSelectedOption(option)}
          className={`flex flex-col items-center h-full ${
            isCentered ? "px-10 w-[50%]" : "px-5"
          } md:px-5 cursor-pointer ${
            selectedOption === option
              ? "text-opacity-100"
              : "opacity-50 hover:opacity-100"
          }`}
        >
          <a href={option?.path}>
            <p className="align-middle fond bold pb-[1em] md:pt-[1em] md:text-[1.1em]">
              {t(`SectionSwitcher.${option?.name}`)}
            </p>
          </a>
          <div
            className={`h-[2px] md:h-[4px] w-full bg-[#0DBC73] rounded-full transition-all duration-300 ${
              selectedOption === option ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SectionSwitcher;
