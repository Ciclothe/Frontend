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
import { usePostButton } from "@/context/CreatePostActive";
import { useLocation } from "react-router-dom";

const MainLayout: FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { isNightMode } = useTheme();
  const { showPostButton } = usePostButton();
  const location = useLocation();

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
    if (location.pathname.includes("/post/")) {
      setShowHeader(false);
    } else if (!isMdOrLarger) {
      setShowHeader(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log("Scrolling");
    if (!location.pathname.includes("/post")) {
      if (isMdOrLarger) {
        window.addEventListener("scroll", handleScroll);
      }
      return () => {
        if (isMdOrLarger) {
          window.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [scrollY, isMdOrLarger, location.pathname]);

  return (
    <div className="w-full flex flex-col min-h-screen justify-between">
      {/* Header */}
      <div
        className={`w-full pb-0 px-[1em] lg:px-[5em] md:pb-[2em] pt-[2em] flex flex-col gap-4 fixed top-0 z-[2000] ${
          isNightMode ? "bg-[#0b0b0b]" : "bg-[#f0eff4]"
        } md:${
          showHeader ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
        style={{
          borderBottomWidth: "0.5px",
          borderStyle: "solid",
          borderColor: isNightMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(140, 140, 140, 0.1)",
        }}
      >
        <Header />
      </div>

      <div
        className={`flex relative ${
          showHeader ? "flex-grow mt-[13em] md:mt-[7em]" : "h-full"
        } w-full`}
      >
        {/* Create Post Button for Mobile */}
        {showPostButton && (
          <div
            className={`${
              isNightMode ? "text-black" : "text-white"
            } fixed z-[1000] right-2 bottom-20 md:hidden bg-[#02995D] flex items-center rounded-full p-3 h-fit w-fit justify-center`}
          >
            <Icon path={mdiPlusBoxOutline} size={1.2} />
          </div>
        )}

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

        {/* Main Content */}
        <div
          className={`w-full md:ml-[1em] md:mr-[1em] md:w-[70%] xl:w-[44%] lg:mr-[0em] md:ml-[30%] xl:ml-[28%] xl:mr-[28%]`}
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

      {/* Sidebar Left Menu Mobile */}
      <div className="flex md:hidden sticky bottom-0 z-[1000]">
        <MenuMobile />
      </div>
    </div>
  );
};

export default MainLayout;
