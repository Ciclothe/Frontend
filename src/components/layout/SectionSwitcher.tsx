import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useActiveSection } from "@/context/ActiveSectionContext";

interface SectionSwitcherProps {
  options: { name: string; value: number }[];
}

const SectionSwitcher = ({ options }: SectionSwitcherProps) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const { activeSection, setActiveSection } = useActiveSection();

  const isCentered = options.length === 2;
  const containerClasses = `flex items-center h-fit w-full font-bold ${
    themeMode === "dark" ? "text-white bg-[#0b0b0b]" : "text-black bg-[#ffffff]"
  } ${isCentered ? "justify-center" : "justify-start"}`;

  return (
    <div className={containerClasses}>
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => {
            setActiveSection(option.value);
          }}
          className={`flex flex-col items-center h-full ${
            isCentered ? "px-10 w-[50%]" : ""
          } md:px-0 mr-4 cursor-pointer ${
            activeSection === option.value
              ? "text-opacity-100"
              : "opacity-50 hover:opacity-100"
          }`}
        >
          <p className="align-middle font-bold pb-[1em] md:pt-[1em] md:text-[1.1em]">
            {t(`SectionSwitcher.${option.name}`)}
          </p>
          <div
            className={`h-[4px] mb-[-0.15em] md:h-[4px] w-full bg-[#0DBC73] rounded-full transition-all duration-300 ${
              activeSection === option.value ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SectionSwitcher;
