import { FC } from "react";
import MenuDesktop from "@/components/layout/MenuDesktop";
import MenuMobile from "@/components/layout/MenuMobile";
import SidebarRight from "@/components/layout/SidebarRight";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";

export const MainLayout: FC = () => {
  const { isNightMode } = useTheme();

  return (
    <>
      {/* Desktop View */}
      <div className="text-black lg:grid grid-cols-12 relative">
        {/* Header */}
        <header
          className={`col-span-12 sticky top-0 z-[1000] ${
            isNightMode ? "bg-[#0b0b0b]" : "bg-[#f0eff4]"
          }`}
        >
          <Header />
        </header>

        <div className="col-span-12 flex md:gap-6 px-[1em] lg:px-[5em]">
          {/* Left Sidebar */}
          <div
            className={`hidden md:block min-w-[25vw] lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] relative `}
            style={{
              borderRightWidth: "0.5px",
              borderStyle: "solid",
              borderColor: isNightMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)",
            }}
          >
            <MenuDesktop />
          </div>

          <div className="md:hidden">
            <MenuMobile />
          </div>

          {/* Main Content Area */}
          <div className="md:mt-0 flex-grow flex flex-col">
            {/* Main Content */}
            <Outlet />
          </div>

          {/* Right Sidebar */}
          <div className="hidden xl:block lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] relative">
            <SidebarRight />
          </div>
        </div>

        {/*CREATE POST BUTTON MOBILE*/}
        <div
          className={`fixed z-[1000] bottom-20 right-5 fixed w-fit flex md:hidden bg-[#02995D] text-[#02995D] border-[#02995D] backdrop-blur-md backdrop-brightness-50 border-2 border bg-opacity-20 flex items-center rounded-full p-2 justify-center aspect-square`}
        >
          <Icon path={mdiPlusBoxOutline} size={1} />
        </div>
      </div>
    </>
  );
};
