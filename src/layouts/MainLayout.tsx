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
import SwapModal from "@/components/common/SwapModal";
import { useSwap } from "@/context/SwapContext";
import SearchBar from "@/components/layout/SearchBar";
import SectionSwitcher from "@/components/layout/SectionSwitcher";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useSearch } from "@/context/SearchContext";
import SearchResults from "@/components/layout/SearchResults";

const MainLayout: FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { isNightMode } = useTheme();
  const { showPostButton } = usePostButton();
  const location = useLocation();
  const { showModal, selectedPost } = useSwap();
  const { sectionOptions } = useSectionOptions();
  const scrollThreshold = sectionOptions.length ? 70 : 100;
  const { isSearching, searchText } = useSearch();

  const isMdOrLarger = useMediaQuery("(min-width: 768px)");

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - scrollY) < scrollThreshold) {
      return;
    }

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
    let timeoutId: NodeJS.Timeout | null = null;

    const throttledScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 100);
    };

    if (!location.pathname.includes("/post")) {
      window.addEventListener("scroll", throttledScroll);
      return () => {
        window.removeEventListener("scroll", throttledScroll);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [scrollY, location.pathname]);

  return (
    <div className="w-full flex flex-col xl:flex-row min-h-screen justify-between">
      {/* Header */}
      {showPostButton && (
        <div
          className={`w-full pb-0 px-[1em] lg:px-[5em] md:pb-[2em] pt-[2em] flex flex-col gap-4 sticky top-0 md:fixed z-[2000] xl:hidden ${
            isNightMode ? "bg-[#0b0b0b]" : "bg-[#ffffff]"
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
      )}

      {/* Create Post Button for Mobile */}
      {showPostButton && !isSearching && (
        <div
          className={`${
            isNightMode ? "text-black" : "text-white"
          } fixed z-[1000] right-2 bottom-20 md:hidden bg-[#02995D] flex items-center rounded-full p-3 h-fit w-fit justify-center`}
        >
          <Icon path={mdiPlusBoxOutline} size={1.2} />
        </div>
      )}

      <div className="flex w-full">
        {/* Left Side */}
        <div
          className={`hidden md:block w-[30%] fixed ${
            showPostButton ? "pt-[8em]" : "pt-[1em]"
          } xl:pt-[0em] h-screen md:sticky md:top-0 xl:w-[28%] pl-[1em] lg:pl-[5em]`}
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

        {/* Middle Side */}
        <div
          className={`${
            showPostButton ? "md:mt-[7em]" : ""
          } xl:mt-[0em] w-full md:w-[70%] xl:w-[44%] md:px-4`}
        >
          {/* Search Bar and Section Switcher */}
          {showPostButton && (
            <div
              className={`hidden fixed left-[30%] w-[70%] xl:w-[100%] px-4 xl:px-0 md:block xl:sticky xl:top-0 z-[1000] ${
                isNightMode ? "bg-[#0b0b0b]" : "bg-[#ffffff]"
              } ${
                isNightMode
                  ? "border-t-[0.5px] border-solid border-[#FFFFFF1A]"
                  : "border-t-[0.5px] border-solid border-[#8C8C8C1A]"
              } xl:border-0`}
            >
              {/* Search Bar */}
              <div
                className={`sticky transition-all duration-300 ${
                  showHeader
                    ? `${sectionOptions.length ? "pt-[1.5em]" : "py-[1.5em]"}`
                    : "hidden"
                }`}
              >
                <SearchBar />
              </div>

              {/* Section Switcher */}
              {sectionOptions && (
                <div
                  className={`hidden md:flex w-full ${
                    showHeader ? "" : "xl:sticky top-0"
                  }`}
                >
                  <SectionSwitcher options={sectionOptions} />
                </div>
              )}
            </div>
          )}
          {isSearching ? (
            // Search Results
            <SearchResults searchText={searchText} />
          ) : (
            // Main Content
            <div className={`${showPostButton ? "md:mt-[10em]" : ""} xl:mt-0`}>
              <Outlet />
            </div>
          )}
        </div>

        {/* Right Side */}
        <div
          className={`hidden xl:flex w-[28%] h-screen sticky top-0 justify-end pr-[1em] lg:pr-[5em]`}
          style={{
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

      {/* Swap Modal */}
      {showModal && <SwapModal selectedPost={selectedPost} />}
      {/* Menu Mobile */}
      {showPostButton && (
        <div className="flex md:hidden sticky bottom-0 z-[1000]">
          <MenuMobile />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
