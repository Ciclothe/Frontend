import { useTheme } from "@/context/ThemeContext.js";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";

const GoBackSticky = () => {
  const { themeMode } = useTheme();

  return (
    <div
      className={`${
        themeMode === "dark" ? "bg-[#0B0B0B]" : "bg-[#ffffff]"
      } col-span-12 px-2 py-4 md:px-4 md:py-4 sticky top-0 z-[1000]`}
    >
      <button
        className={`${
          themeMode === "dark" ? "bg-[#232323]" : "bg-[#F7F7F7]"
        } p-2 flex items-center justify-center rounded-full aspect-square w-8 h-8`}
        onClick={() => window.history.back()}
      >
        <Icon path={mdiArrowLeft} size={0.7} />
      </button>
    </div>
  );
};

export default GoBackSticky;
