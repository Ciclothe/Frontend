/**
 * MainLayout component that serves as the primary layout for the application.
 * It includes the header, sidebars, and main content area, and handles
 * responsive design for different screen sizes.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <MainLayout />
 *
 * @remarks
 * This component uses various contexts and hooks to manage theme, post button visibility,
 * search functionality, and location-based features. It also handles scroll events to
 * show or hide the header based on the scroll position.
 *
 * @hook {useTheme} - Retrieves the current theme (night mode or day mode).
 * @hook {usePostButton} - Determines if the post button should be shown.
 * @hook {useLocation} - Provides the current location object.
 * @hook {useSwap} - Manages the state for the swap modal.
 * @hook {useSectionOptions} - Retrieves the section options for the section switcher.
 * @hook {useSearch} - Manages the search state and functionality.
 * @hook {useSearchLocation} - Manages the state for the location range selector.
 * @hook {useTranslation} - Provides translation functions.
 * @hook {useMediaQuery} - Determines if the screen size matches the given media query.
 *
 * @state {boolean} showHeader - State to control the visibility of the header.
 * @state {number} scrollY - State to track the vertical scroll position.
 *
 * @function handleScroll - Handles the scroll event to show or hide the header based on the scroll position.
 * @function handleInputChange - Handles the change event for the search input field.
 * @function handleBlur - Handles the blur event for the search input field.
 *
 * @effect Updates the visibility of the header based on the current location path.
 * @effect Adds and removes the scroll event listener to handle throttled scroll events.
 */
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
import SwapModal from "@/components/modals/SwapModal";
import { useSwap } from "@/context/SwapContext";
import SearchBar from "@/components/layout/SearchBar";
import SectionSwitcher from "@/components/layout/SectionSwitcher";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useSearch } from "@/context/SearchContext";
import SearchResults from "@/components/layout/SearchResults";
import LocationRangeSelector from "@/components/modals/LocationSelectorModal";
import { useSearchLocation } from "@/context/RangeLocationContext";
import LateralMenuMobile from "@/components/layout/LateralMenuMobile";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";
import DynamicViewMobile from "@/components/common/DynamicViewMobile";
import { useDynamicView } from "@/context/DynamicViewContext";

const MainLayout: FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { themeMode } = useTheme();
  const { showPostButton } = usePostButton();
  const location = useLocation();
  const { showModal, selectedPost } = useSwap();
  const { sectionOptions } = useSectionOptions();
  const scrollThreshold = sectionOptions.length ? 70 : 100;
  const { isSearching, searchText } = useSearch();
  const { isOpened } = useSearchLocation();
  const { showDynamicView } = useDynamicView();

  const isMdOrLarger = useMediaQuery("(min-width: 768px)");
  const { hasScroll } = useLayoutScroll();

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
    <div
      className={`w-full flex flex-col xl:flex-row justify-between relative ${
        hasScroll ? "" : "h-screen max-h-screen min-h-screen"
      }`}
    >
      {/* Header */}
      {showPostButton && (
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
      )}

      {/* Lateral Menu Mobile */}
      {!isSearching && <LateralMenuMobile />}

      {/* Create Post Button for Mobile */}
      {showPostButton && !isSearching && hasScroll && (
        <div
          className={`fixed z-[1000] right-2 bottom-20 md:hidden flex items-center rounded-full p-3 bg-[#0DBC73] ${
            themeMode === "dark" ? "text-black" : "text-white"
          }`}
        >
          <Icon path={mdiPlusBoxOutline} size={1.2} />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`w-full md:flex ${hasScroll ? "" : "flex-grow xl:h-screen"}`}
      >
        {/* Columna izquierda */}
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

        {/* Columna central */}
        <div
          className={`${
            showPostButton ? "md:pt-[7em]" : ""
          } flex flex-col h-full  xl:pt-0 w-full md:w-[70%] xl:w-[44%] md:px-4`}
        >
          {showPostButton && (
            <div
              className={`hidden md:block fixed left-[30%] w-[70%] xl:w-full px-4 xl:px-0 xl:sticky xl:top-0 z-[1000] ${
                themeMode === "dark"
                  ? "bg-[#0b0b0b] border-t-[0.5px] border-[#FFFFFF1A]"
                  : "bg-[#ffffff] border-t-[0.5px] border-[#8C8C8C1A]"
              } xl:border-0`}
            >
              <div
                className={`sticky transition-all
                  ${showHeader ? "pt-[1.5em]" : "hidden"}
                  ${hasScroll ? "" : "hidden xl:block"}
                `}
              >
                <SearchBar />
              </div>
              {sectionOptions && <SectionSwitcher options={sectionOptions} />}
            </div>
          )}
          {isSearching ? (
            <SearchResults searchText={searchText} />
          ) : (
            <>
              {/* Dynamic View Mobile */}
              {showDynamicView ? (
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
            </>
          )}
        </div>

        {/* Columna derecha */}
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
      </div>

      {/* Modals */}
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
