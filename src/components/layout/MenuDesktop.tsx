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
import { mdiCog, mdiPlusBoxOutline } from "@mdi/js";

interface MenuDesktopProps {
  showHeader: boolean;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({ showHeader }) => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      icon: (isActive: boolean) => (
        <FeedIcon
          size={"1em"}
          colorSelected={"#0DBC73"}
          colorUnselected={isNightMode ? "#ffffff" : "#0a0a0a"}
          colorStroke={isNightMode ? "#0a0a0a" : "#ffffff"}
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
          colorUnselected={isNightMode ? "#ffffff" : "#0a0a0a"}
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
          colorUnselected={isNightMode ? "#ffffff" : "#0a0a0a"}
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
          colorUnselected={isNightMode ? "#ffffff" : "#0a0a0a"}
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
          colorUnselected={isNightMode ? "#ffffff" : "#0a0a0a"}
          colorStroke={isNightMode ? "#0a0a0a" : "#ffffff"}
          isSelected={isActive}
        />
      ),
      label: "Chats",
      route: "/chats",
    },
  ];

  return (
    <div
      className={`flex flex-col justify-between ${
        isNightMode ? "textLight" : "textDark"
      }`}
      style={{
        height: `${showHeader ? "calc(100vh - 128px)" : "calc(100vh - 32px)"}`,
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
              className={`flex items-center w-fit justify-start p-2 rounded-lg text-[1.7em] font-bold ${
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
              <p className="ml-5">{t(`Menu.${item.label}`)}</p>
            </Link>
          );
        })}
        {/*CREATE POST BUTTON DESKTOP*/}
        <div
          className={`${
            isNightMode ? "hover:text-black" : "hover:text-white"
          } hidden md:flex bg-[#02995D] text-[#02995D] border-[#02995D] hover:bg-opacity-100 border-2 border bg-opacity-10 flex items-center rounded-full py-3 w-fit px-10 justify-center gap-2 mt-4 cursor-pointer`}
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
