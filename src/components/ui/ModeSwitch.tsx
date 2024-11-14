  import { Icon } from "@mdi/react";
  import { mdiMoonWaningCrescent } from "@mdi/js";
  import SunIcon from "../../assets/icons/SunIcon";
  import { useTheme } from "../../context/ThemeContext";

  const ModeSwitch = () => {
    const { isNightMode, toggleMode } = useTheme();

    const handleModeToggle = () => {
      toggleMode();
      document.body.classList.toggle("bodyNightMode", !isNightMode);
      document.body.classList.toggle("bodyDayMode", isNightMode);
    };

    return (
      <div className="flex items-center justify-end">
        <div
          className={`rounded-full border ${
            isNightMode ? "border-white" : "border-black"
          } p-0.5 flex items-center`}
          onClick={handleModeToggle}
          style={{ cursor: "pointer" }}
        >
          <div
            className={`flex ${
              isNightMode ? "bg-none" : "bg-black"
            } rounded-full justify-center py-1 px-2 ${
              isNightMode ? "ml-auto" : "mr-auto"
            }`}
          >
            <SunIcon size={"1em"} color={"white"} />
          </div>
          <div
            className={`flex ${
              isNightMode ? "bg-white" : "bg-none"
            } rounded-full justify-center py-1 px-2 ${
              isNightMode ? "mr-auto" : "ml-auto"
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
