/**
 * A component that provides a switch to toggle between light and dark themes.
 * It uses the `useTheme` hook to get the current theme mode and a function to toggle the mode.
 *
 * @component
 * @example
 * // Usage example:
 * <ModeSwitch />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * The component displays two icons: a sun icon for the light mode and a moon icon for the dark mode.
 * The background color of the switch changes based on the current theme mode.
 * Clicking on the switch toggles between the light and dark modes.
 */
import { Icon } from "@mdi/react";
import { mdiMoonWaningCrescent } from "@mdi/js";
import SunIcon from "@/assets/icons/SunIcon";
import { useTheme } from "@/context/ThemeContext";

const ModeSwitch = () => {
  const { themeMode, toggleMode } = useTheme();

  return (
    <div className="flex items-center justify-end">
      <div
        className={`${
          themeMode === "dark" ? "bg-[#171717]" : "bg-[#F7F7F7]"
        } rounded-full p-0.5 flex items-center`}
        style={{ cursor: "pointer" }}
        onClick={toggleMode}
      >
        {/* Light Icon */}
        <div
          className={`flex ${
            themeMode === "light" ? "bg-black" : "bg-none"
          } rounded-full justify-center py-1 px-2 ${
            themeMode === "dark" ? "ml-auto" : "mr-auto"
          }`}
        >
          <SunIcon size={"1em"} color={"white"} />
        </div>

        {/* Dark Icon */}
        <div
          className={`flex ${
            themeMode === "dark" ? "bg-white" : "bg-none"
          } rounded-full justify-center py-1 px-2 ${
            themeMode === "light" ? "mr-auto" : "ml-auto"
          }`}
        >
          <Icon
            path={mdiMoonWaningCrescent}
            className={`w-[1em] text-black`}
            style={{ transform: `rotate(-30deg)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModeSwitch;
