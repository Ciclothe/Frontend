/**
 * MenuDesktop component renders a sidebar menu for desktop view.
 * It includes navigation links to different sections of the application
 * such as Feed, Swipe, Explore, Events, and Chats. It also includes a
 * button for creating a new post and a settings link.
 *
 * The component uses the current theme mode (dark or light) to adjust
 * the colors of the icons and text. It also uses the current location
 * to highlight the active menu item.
 *
 * The component relies on several context providers:
 * - ThemeContext: to get the current theme mode.
 * - TranslationContext: to get the translation function.
 * - SearchContext: to reset the search state when the menu is clicked.
 *
 * @component
 * @example
 * return (
 *   <MenuDesktop />
 * )
 *
 * @returns {JSX.Element} The rendered MenuDesktop component.
 */
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import FeedIcon from "@/assets/uiIcons/Feedicon";
import SwipeIcon from "@/assets/uiIcons/SwipeIcon";
import ExploreIcon from "@/assets/uiIcons/ExploreIcon";
import EventsIcon from "@/assets/uiIcons/EventsIcon";
// import ChatsIcon from "@/assets/uiIcons/ChatsIcon";
import Icon from "@mdi/react";
import { mdiCog, mdiPlusBoxOutline } from "@mdi/js";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import { useSearch } from "@/context/SearchContext";

const MenuDesktop = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const { setIsSearching, setSearchText } = useSearch();

  const menuItems = [
    {
      icon: (isActive: boolean) => (
        <FeedIcon
          size={"1em"}
          colorSelected={"#0DBC73"}
          colorUnselected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          colorStroke={
            themeMode === "dark"
              ? isActive
                ? "#0a0a0a"
                : "#ffffff"
              : isActive
              ? "#ffffff"
              : "#0a0a0a"
          }
          isSelected={isActive}
        />
      ),
      label: "Feed",
      route: "/feed",
    },
    {
      icon: (isActive: boolean) => (
        <SwipeIcon
          size={"1em"}
          colorSelected={"#0DBC73"}
          colorUnselected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          isSelected={isActive}
        />
      ),
      label: "Swipes",
      route: "/swipes",
    },
    {
      icon: (isActive: boolean) => (
        <ExploreIcon
          size={"1em"}
          colorSelected={"#0DBC73"}
          colorUnselected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          isSelected={isActive}
        />
      ),
      label: "Explore",
      route: "/explore",
    },
    {
      icon: (isActive: boolean) => (
        <EventsIcon
          size={"1em"}
          colorSelected={"#0DBC73"}
          colorUnselected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          isSelected={isActive}
        />
      ),
      label: "Events",
      route: "/events",
    },
    // {
    //   icon: (isActive: boolean) => (
    //     <ChatsIcon
    //       size={"1em"}
    //       colorSelected={"#0DBC73"}
    //       colorUnselected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
    //       colorStroke={themeMode === "dark" ? "#0a0a0a" : "#ffffff"}
    //       isSelected={isActive}
    //     />
    //   ),
    //   label: "Chats",
    //   route: "/chats",
    // },
  ];

  return (
    <div
      className={`flex flex-col justify-between h-full pb-4 ${
        themeMode === "dark" ? "textLight" : "textDark"
      }`}
      style={{
        overflowX: "hidden",
      }}
      onClick={() => {
        setSearchText("");
        setIsSearching(false);
      }}
    >
      <div>
        <div className="hidden xl:flex w-full py-5 h-[7em] items-center">
          <Link to={`/`}>
            <CiclotheLogotipo
              color={themeMode === "dark" ? "white" : "black"}
              size={"10em"}
            />
          </Link>
        </div>
        {menuItems.map((item, index) => {
          const isActive =
            location.pathname === item.route ||
            (location.pathname === "/" && item.route === "/feed");

          const [isHovered, setIsHovered] = React.useState(false);

          const handleMouseEnter = () => setIsHovered(true);
          const handleMouseLeave = () => setIsHovered(false);

          const currentIsActive = isHovered || isActive;

          return (
            <Link
              to={item.route}
              key={index}
              className={`flex items-center w-fit justify-start p-2 rounded-lg text-[1.7em] font-bold ${
                currentIsActive
                  ? "text-[#0DBC73] hover:text-[#0DBC73]"
                  : `${
                      themeMode === "dark" ? "textLight" : "textDark"
                    } hover:text-[#0DBC73]`
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item.icon(currentIsActive)}
              <p className="ml-5">{t(`Menu.${item.label}`)}</p>
            </Link>
          );
        })}
        {/*CREATE POST BUTTON DESKTOP*/}
        <div
          className={`${
            themeMode === "dark" ? "hover:text-black" : "hover:text-white"
          } hidden md:flex bg-[#0DBC73] text-[#0DBC73] border-[#0DBC73] hover:bg-opacity-100 border-2 border bg-opacity-10 flex items-center rounded-full py-3 w-fit px-10 justify-center gap-2 mt-4 cursor-pointer`}
        >
          <Icon path={mdiPlusBoxOutline} size={0.7} />
          <p className="hidden md:flex font-bold">{t("Global.CreatePost")}</p>
        </div>
      </div>
      <div className="mt-20 lg:mt-0">
        <div className="flex items-center w-full justify-start p-2 hover:text-[#0DBC73] rounded-lg text-[1.3em]">
          <Icon path={mdiCog} size={0.8} />
          <p className="ml-2 font-bold">{t("Global.settings")}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuDesktop;
