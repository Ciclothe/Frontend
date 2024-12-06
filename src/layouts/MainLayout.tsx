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
import { mdiPlusBoxOutline, mdiMagnify } from "@mdi/js";
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
import { useTranslation } from "react-i18next";
import LateralMenuMobile from "@/components/layout/LateralMenuMobile";

const MainLayout: FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { themeMode } = useTheme();
  const { showPostButton } = usePostButton();
  const location = useLocation();
  const { showModal, selectedPost } = useSwap();
  const { sectionOptions } = useSectionOptions();
  const scrollThreshold = sectionOptions.length ? 70 : 100;
  const { isSearching, searchText, setSearchText, setIsSearching } =
    useSearch();
  const { isOpened } = useSearchLocation();
  const { t } = useTranslation();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleBlur = () => {
    setIsSearching(false);
    setSearchText("");
  };

  return (
    <div className="w-full flex flex-col xl:flex-row min-h-screen justify-between relative">
      {/* Header */}
      {showPostButton && (
        <div
          className={`${
            isSearching ? "hidden md:flex" : ""
          }  w-full pb-0 px-[1em] lg:px-[5em] md:pb-[2em] pt-[2em] flex flex-col gap-4 sticky top-0 md:fixed z-[1000] xl:hidden ${
            themeMode === "dark" ? "bg-[#0b0b0b]" : "bg-[#ffffff]"
          }`}
          style={{
            borderBottomWidth: "0.5px",
            borderStyle: "solid",
            borderColor:
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)",
          }}
        >
          <Header />
        </div>
      )}

      {/* Lateral Menu Mobile */}
      {!isSearching && <LateralMenuMobile />}

      {/* Create Post Button for Mobile */}
      {showPostButton && !isSearching && (
        <div
          className={`${
            themeMode === "dark" ? "text-black" : "text-white"
          } fixed z-[1000] right-2 bottom-20 md:hidden bg-[#0DBC73] flex items-center rounded-full p-3 h-fit w-fit justify-center`}
        >
          <Icon path={mdiPlusBoxOutline} size={1.2} />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`${
          isSearching ? "block p-4 md:p-0 md:flex" : "flex"
        } w-full`}
      >
        {/* Search Bar Mobile */}
        {isSearching && (
          <div className="flex flex-col gap-2 md:hidden">
            <div className="flex items-center gap-2">
              <Icon
                path={mdiMagnify}
                size={1.2}
                className="cursor-pointer opacity-50"
              />
              <input
                type="text"
                className="w-full p-2 bg-transparent  outline-none rounded-full"
                placeholder={t("Global.SearchHolder")}
                value={searchText}
                onChange={handleInputChange}
              />
              <div onClick={() => handleBlur()} className="cursor-pointer">
                <p className="text-[#0DBC73] font-bold">{t("Global.Cancel")}</p>
              </div>
            </div>
            <SectionSwitcher options={sectionOptions} />
          </div>
        )}

        {/* Left Side */}
        <div
          className={`hidden md:block w-[30%] fixed ${
            showPostButton ? "pt-[8em]" : "pt-[1em]"
          } xl:pt-[0em] h-screen md:sticky md:top-0 xl:w-[28%] pl-[1em] lg:pl-[5em]`}
          style={{
            borderRightWidth: "0.5px",
            borderStyle: "solid",
            borderColor:
              themeMode === "dark"
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
                themeMode === "dark" ? "bg-[#0b0b0b]" : "bg-[#ffffff]"
              } ${
                themeMode === "dark"
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
            borderColor:
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)",
          }}
        >
          <SidebarRight />
        </div>
      </div>

      {/* Location Range Selector Modal */}
      {isOpened && <LocationRangeSelector />}
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
