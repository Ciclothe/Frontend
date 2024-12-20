import { FC, useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { usePostButton } from "@/context/CreatePostActive";
import { useSwap } from "@/context/SwapContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useSearch } from "@/context/SearchContext";
import { useSearchLocation } from "@/context/RangeLocationContext";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";
import { useDynamicView } from "@/context/DynamicViewContext";
import { useSidebarRight } from "@/context/SidebarRightContext";
import useMediaQuery from "@/hooks/useMediaQuery";

import MenuDesktop from "@/components/layout/MenuDesktop";
import MenuMobile from "@/components/layout/MenuMobile";
import SidebarRight from "@/components/layout/SidebarRight";
import Header from "@/components/layout/Header";
import SwapModal from "@/components/modals/SwapModal";
import SearchBar from "@/components/layout/SearchBar";
import SectionSwitcher from "@/components/layout/SectionSwitcher";
import SearchResults from "@/components/layout/SearchResults";
import LocationRangeSelector from "@/components/modals/LocationSelectorModal";
import LateralMenuMobile from "@/components/layout/LateralMenuMobile";
import DynamicViewMobile from "@/components/common/DynamicViewMobile";
import HeaderActionDesktop from "@/components/common/HeaderActionDesktop";
import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";

const MainLayout: FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isXlScreen, setIsXlScreen] = useState(true);

  const { themeMode } = useTheme();
  const { showPostButton } = usePostButton();
  const { showModal, selectedPost } = useSwap();
  const { sectionOptions } = useSectionOptions();
  const { isSearching, searchText } = useSearch();
  const { isOpened } = useSearchLocation();
  const { hasScroll } = useLayoutScroll();
  const { showDynamicView } = useDynamicView();
  const { isSidebarRightVisible } = useSidebarRight();

  const location = useLocation();
  const isMdOrLarger = useMediaQuery("(min-width: 768px)");
  const scrollThreshold = sectionOptions.length ? 70 : 100;

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - scrollY) >= scrollThreshold) {
      setShowHeader(currentScrollY <= scrollY);
    }
    setScrollY(currentScrollY);
  }, [scrollY, scrollThreshold]);

  useEffect(() => {
    const handleResize = () => setIsXlScreen(window.innerWidth >= 1280);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("/post/")) {
      setShowHeader(false);
    } else if (!isMdOrLarger) {
      setShowHeader(true);
    }
  }, [location.pathname, isMdOrLarger]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    if (!location.pathname.includes("/post")) {
      window.addEventListener("scroll", throttledScroll);
    }

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll, location.pathname]);

  const renderHeader = () => (
    <div
      className={`w-full px-[1em] lg:px-[5em] md:py-[2em] flex flex-col gap-4 sticky top-0 md:fixed z-[2000] xl:hidden ${
        isSearching ? "hidden md:flex" : ""
      } ${themeMode === "dark" ? "bg-[#0b0b0b]" : "bg-[#ffffff]"} ${
        sectionOptions.length ? "pt-[1em]" : "py-[1em]"
      }`}
      style={{
        borderBottom: `0.5px solid ${
          themeMode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(140, 140, 140, 0.1)"
        }`,
      }}
    >
      <Header />
    </div>
  );

  return (
    <div
      className={`w-full flex flex-col xl:flex-row justify-between relative min-h-screen ${
        hasScroll ? "" : "h-screen max-h-screen"
      }`}
    >
      {showPostButton && renderHeader()}

      {!isSearching && <LateralMenuMobile />}

      {showPostButton && !isSearching && hasScroll && (
        <div
          className={`fixed z-[1000] right-2 bottom-20 md:hidden flex items-center justify-center 
                rounded-full p-3 border-2 bg-[#0DBC73]/25 backdrop-blur-[5px] 
                backdrop-brightness-90 border-[#0DBC73] ${
                  themeMode === "dark" ? "text-black" : "text-white"
                }`}
        >
          <Icon
            path={mdiPlusBoxOutline}
            size={1.2}
            className="text-[#0DBC73]"
          />
        </div>
      )}

      <div
        className={`w-full md:flex ${hasScroll ? "" : "flex-grow xl:h-screen"}`}
      >
        <div
          className={`hidden md:block w-[30%] fixed ${
            showPostButton ? "pt-[8em]" : "pt-[1em]"
          } xl:pt-0 h-screen md:sticky md:top-0 xl:w-[28%] pl-[1em] lg:pl-[5em]`}
          style={{
            borderRight: `0.5px solid ${
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)"
            }`,
          }}
        >
          <MenuDesktop />
        </div>

        <div
          className={`${
            isSidebarRightVisible ? "xl:w-[44%]" : "xl:w-[72%] lg:pr-[5em]"
          } ${
            showPostButton ? "md:pt-[7em]" : ""
          } flex flex-col h-full  xl:pt-0 w-full md:w-[70%] md:px-4`}
        >
          {showPostButton && (
            <div
              className={`hidden md:block fixed left-[30%] w-[70%] xl:w-full px-4 xl:px-0 xl:sticky xl:top-0 z-[1000] ${
                themeMode === "dark"
                  ? "bg-[#0b0b0b] border-t-[0.5px] border-[#FFFFFF1A]"
                  : "bg-[#ffffff] border-t-[0.5px] border-[#8C8C8C1A]"
              } xl:border-0`}
            >
              {!isXlScreen || isSidebarRightVisible ? (
                <div className={`${showHeader ? "pt-[1.5em]" : "hidden"}`}>
                  <div
                    className={`sticky transition-all ${
                      hasScroll ? "" : "hidden xl:block"
                    }`}
                  >
                    <SearchBar />
                  </div>
                  <SectionSwitcher options={sectionOptions} />
                </div>
              ) : (
                <div
                  className={`hidden xl:flex sticky transition-all ${
                    showHeader ? "" : "hidden"
                  } ${hasScroll ? "" : "hidden xl:flex"} justify-between`}
                >
                  <div className={`pt-[1.5em] w-[63%]`}>
                    <SearchBar />
                    <SectionSwitcher options={sectionOptions} />
                  </div>
                  <div className="w-[28%]">
                    <HeaderActionDesktop />
                  </div>
                </div>
              )}
            </div>
          )}
          {isSearching ? (
            <SearchResults searchText={searchText} />
          ) : showDynamicView ? (
            <DynamicViewMobile />
          ) : (
            <div
              className={`${
                hasScroll
                  ? showPostButton
                    ? "md:mt-[9em] xl:mt-[0em]"
                    : ""
                  : ""
              } flex-grow`}
            >
              <Outlet />
            </div>
          )}
        </div>

        {isSidebarRightVisible && (
          <div
            className="hidden xl:flex w-[28%] h-screen sticky top-0 justify-end pr-[1em] lg:pr-[5em] z-[2000]"
            style={{
              borderLeft: `0.5px solid ${
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(140, 140, 140, 0.1)"
              }`,
            }}
          >
            <SidebarRight />
          </div>
        )}
      </div>

      {isOpened && <LocationRangeSelector />}

      {showModal && <SwapModal selectedPost={selectedPost} />}
      {showPostButton && !isSearching && (
        <div className="flex md:hidden sticky bottom-0 z-[1000]">
          <MenuMobile />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
