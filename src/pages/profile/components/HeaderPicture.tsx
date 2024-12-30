import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";

function HeaderPicture({ coverPic, location }) {
  const { themeMode } = useTheme();

  return (
    <div
      className={`w-full h-[50vh] rounded-t-xl bg-cover bg-center relative`}
      style={{ backgroundImage: `url(${coverPic})` }}
    >
      {/* Gradient Overlay */}
      <div
        className={`${
          themeMode === "dark" ? "gradient-black" : "gradient-white"
        } absolute top-0 left-0 w-full h-full`}
      ></div>

      {/* Location Badge */}
      <div
        className={`${
          themeMode === "dark"
            ? "bg-white/30 text-black"
            : "bg-black/30 text-white"
        } flex items-center justify-center text-white absolute rounded-full top-4 left-4 gap-1 px-4 py-1 backdrop-blur-lg`}
      >
        <Icon path={mdiMapMarker} className="icon text-[#DF1E32]" />
        <p className="font-bold z-[10]">
          {location?.city} {location?.country}
        </p>
      </div>
    </div>
  );
}

export default HeaderPicture;
