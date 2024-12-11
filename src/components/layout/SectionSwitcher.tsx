import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";

interface SectionSwitcherProps {
  options: { name: string; value: number }[];
}
const SectionSwitcher = ({ options }: SectionSwitcherProps) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const { activeSection, setActiveSection } = useActiveSection();
  const { sectionOptions } = useSectionOptions();

  const isCentered = options.length === 2;
  const containerClasses = `flex items-center h-fit w-full font-bold ${
    themeMode === "dark" ? "text-white bg-[#0b0b0b]" : "text-black bg-[#ffffff]"
  } ${isCentered ? "justify-center" : "justify-start"}`;

  return (
    <>
      {sectionOptions.length > 0 && (
        <div
          className={`${containerClasses}`}
          style={{
            borderBottom: `0.5px solid ${
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)"
            }`,
          }}
        >
          <div
            className="flex overflow-x-auto w-full no-scrollbar scroll-snap-x"
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveSection(option.value);
                }}
                className={`inline-flex flex-col items-center h-full ${
                  isCentered ? "px-10 w-[50%]" : ""
                } md:px-0 mr-4 cursor-pointer ${
                  activeSection === option.value
                    ? "text-opacity-100"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <p className="align-middle font-bold pb-[0.5em] md:pt-[1em] md:text-[1.1em]">
                  {t(`SectionSwitcher.${option.name}`)}
                </p>
                <div
                  className={`h-[4px] md:h-[4px] w-full bg-[#0DBC73] z-[2000] rounded-full transition-all duration-300 ${
                    activeSection === option.value ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SectionSwitcher;
