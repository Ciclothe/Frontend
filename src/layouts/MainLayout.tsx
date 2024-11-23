import { FC, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import MenuDesktop from "@/components/layout/MenuDesktop";
import MenuMobile from "@/components/layout/MenuMobile";
import SidebarRight from "@/components/layout/SidebarRight";
import Header from "@/components/layout/Header";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import useMediaQuery from "@/hooks/useMediaQuery";

const MainLayout: FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { isNightMode } = useTheme();

  const isMdOrLarger = useMediaQuery("(min-width: 768px)");

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > scrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    setScrollY(currentScrollY);
  };

  useEffect(() => {
    if (isMdOrLarger) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (isMdOrLarger) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollY, isMdOrLarger]);

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div
        className={`sticky top-0 z-[1000] md:${
          showHeader ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <Header />
      </div>

      <div className={`flex ${showHeader ? "flex-grow" : "h-full"} w-full`}>
        {/* Sidebar Left */}
        <div
          className={`hidden md:block w-[30%] xl:w-[28%] fixed py-4 pl-[1em] lg:pl-[5em] ${
            showHeader ? "" : "top-0"
          }`}
          style={{
            height: `${showHeader ? "" : "100vh"}`,
            borderRightWidth: "0.5px",
            borderStyle: "solid",
            borderColor: isNightMode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(140, 140, 140, 0.1)",
          }}
        >
          <MenuDesktop showHeader={showHeader} />
        </div>

        {/* Create Post Button for Mobile */}
        <div
          className={`${
            isNightMode ? "text-black" : "text-white"
          } fixed z-[100] right-2 bottom-20 md:hidden bg-[#02995D] flex items-center rounded-full p-3 h-fit w-fit justify-center`}
        >
          <Icon path={mdiPlusBoxOutline} size={1.2} />
        </div>

        {/* Sidebar Left Menu Mobile */}
        <div className="flex md:hidden relative">
          <MenuMobile />
        </div>

        {/* Main Content */}
        <div
          className={`w-full mb-10 md:mb-0 md:ml-[1em] md:mr-[1em] md:w-[70%] xl:w-[44%] lg:mr-[0em] md:ml-[30%] xl:ml-[28%] xl:mr-[28%]`}
        >
          <Outlet context={{ showHeader: isMdOrLarger ? showHeader : true }} />
        </div>

        {/* Sidebar Right */}
        <div
          className={`hidden xl:flex w-[28%] fixed right-0 justify-end py-4 pr-[1em] lg:pr-[5em] ${
            showHeader ? "" : "top-0"
          } transition-all duration-300`}
          style={{
            height: `${showHeader ? "calc(100vh - 10em)" : "100vh"}`,
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
  );
};

export default MainLayout;
