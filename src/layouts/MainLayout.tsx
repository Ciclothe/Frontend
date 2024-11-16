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
      <div className="w-full flex flex-col">
        <div className="sticky top-0 z-[100]">
          <Header />
        </div>
        <div className="flex flex-grow w-full">
          {/* SIDEBAR LEFT MENU DESKTOP */}
          <div
            className="hidden md:block w-[30%] xl:w-[28%] fixed py-4 pl-[1em] lg:pl-[5em]"
            style={{
              height: `calc(100vh - 12vh)`,
              borderRightWidth: "0.5px",
              borderStyle: "solid",
              borderColor: isNightMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)",
            }}
          >
            <MenuDesktop />
          </div>

          {/*CREATE POST BUTTON DESKTOP*/}
          <div
            className={`${
              isNightMode ? "hover:text-black" : "hover:text-white"
            }  fixed z-[100] right-2 bottom-20 md:hidden backdrop-blur-lg backdrop-brightness-50 bg-[#02995D] text-[#02995D] border-[#02995D] border-2 border bg-opacity-20 flex items-center rounded-full p-3 h-fit w-fit justify-center`}
          >
            <Icon path={mdiPlusBoxOutline} size={1.2} />
          </div>

          {/* SIDEBAR LEFT MENU MOBILE */}
          <div className="flex md:hidden relative">
            <MenuMobile />
          </div>

          {/* Main Content */}
          <div className="w-full ml-[1em] mr-[1em] md:w-[70%] xl:w-[44%] lg:mr-[5em] md:ml-[30%] xl:ml-[28%] xl:mr-[28%]">
            <Outlet />
          </div>

          {/* Sidebar Right */}
          <div
            className="hidden xl:flex w-[28%] fixed right-0 justify-end py-4 pr-[1em] lg:pr-[5em]"
            style={{
              height: `calc(100vh - 12vh)`,
              borderLeftWidth: "0.5px",
              borderStyle: "solid",
              borderColor: isNightMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)",
            }}
          >
            <SidebarRight />
          </div>
        </div>
      </div>
    </>
  );
};
