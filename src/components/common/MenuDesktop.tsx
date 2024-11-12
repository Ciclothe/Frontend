/**
 * The `MenuDesktop` component renders a vertical menu with navigation links.
 * It uses the current theme and translation context, and highlights the active route.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <MenuDesktop />
 *
 * @remarks
 * This component uses the `useTheme` hook to determine if night mode is active,
 * the `useTranslation` hook for internationalization, and the `useLocation` hook
 * to determine the current route.
 *
 * The menu items are defined in an array with their respective icons, labels, and routes.
 * The active route is highlighted, and the menu items change color on hover.
 *
 * The component also includes a settings button at the bottom.
 *
 * @hook
 * @name useTheme
 * @description Provides the current theme context.
 *
 * @hook
 * @name useTranslation
 * @description Provides the translation context.
 *
 * @hook
 * @name useLocation
 * @description Provides the current location context.
 *
 * @typedef {Object} MenuItem
 * @property {Function} icon - A function that returns the icon component for the menu item.
 * @property {string} label - The label for the menu item.
 * @property {string} route - The route path for the menu item.
 */

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import FeedIcon from "@/assets/uiIcons/Feedicon";
import SwipeIcon from "@/assets/uiIcons/SwipeIcon";
import ExploreIcon from "@/assets/uiIcons/ExploreIcon";
import EventsIcon from "@/assets/uiIcons/EventsIcon";
import ChatsIcon from "@/assets/uiIcons/ChatsIcon";
import Icon from "@mdi/react";
import { mdiCog } from "@mdi/js";

const MenuDesktop = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      icon: (isActive: boolean) => (
        <FeedIcon
          size={"1em"}
          colorSelected={"#0DBC73"}
          colorUnselected={isNightMode ? "#f0eff4" : "#0a0a0a"}
          colorStroke={isNightMode ? "#0a0a0a" : "#f0eff4"}
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
          colorUnselected={isNightMode ? "#f0eff4" : "#0a0a0a"}
          isSelected={isActive}
        />
      ),
      label: "Swipe",
      route: "/swipe",
    },
    {
      icon: (isActive: boolean) => (
        <ExploreIcon
          size={"1em"}
          colorSelected={"#0DBC73"}
          colorUnselected={isNightMode ? "#f0eff4" : "#0a0a0a"}
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
          colorUnselected={isNightMode ? "#f0eff4" : "#0a0a0a"}
          isSelected={isActive}
        />
      ),
      label: "Events",
      route: "/events",
    },
    {
      icon: (isActive: boolean) => (
        <ChatsIcon
          size={"1em"}
          colorSelected={"#0DBC73"}
          colorUnselected={isNightMode ? "#f0eff4" : "#0a0a0a"}
          colorStroke={isNightMode ? "#0a0a0a" : "#f0eff4"}
          isSelected={isActive}
        />
      ),
      label: "Chats",
      route: "/chats",
    },
  ];

  return (
    <div
      className={`flex flex-col justify-between fixed lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] ${
        isNightMode ? "textLight" : "textDark"
      }`}
      style={{
        height: `calc(100vh - 10em)`,
        overflowX: "hidden",
      }}
    >
      <div>
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
              className={`flex items-center w-full justify-start p-2 rounded-lg text-[2em] font-bold ${
                currentIsActive
                  ? "text-[#0DBC73] hover:text-[#0DBC73]"
                  : `${
                      isNightMode ? "textLight" : "textDark"
                    } hover:text-[#0DBC73]`
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item.icon(currentIsActive)}
              <p className="ml-6">{t(`Menu.${item.label}`)}</p>
            </Link>
          );
        })}
      </div>
      <div>
        <button
          type="button"
          className="flex items-center w-full justify-start p-2 hover:text-[#0DBC73] rounded-lg"
        >
          <Icon path={mdiCog} size={0.8} />
          <p className="ml-2 font-bold">{t("Global.settings")}</p>
        </button>
      </div>
    </div>
  );
};

export default MenuDesktop;
