import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import FeedIcon from "@/assets/uiIcons/Feedicon";
import SwipeIcon from "@/assets/uiIcons/SwipeIcon";
import ExploreIcon from "@/assets/uiIcons/ExploreIcon";
import EventsIcon from "@/assets/uiIcons/EventsIcon";
import ChatsIcon from "@/assets/uiIcons/ChatsIcon";
import { mdiPlusBoxOutline, mdiCog } from "@mdi/js";

interface MenuMobileProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

interface MenuItemProps {
  item: {
    icon: (isActive: boolean) => JSX.Element;
    label: string;
    route: string;
  };
  isNightMode: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isNightMode,
  isActive,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Link
      to={item.route}
      className={`flex items-center w-full justify-start p-2 rounded-lg text-[1.6em] font-bold ${
        isActive
          ? "text-[#0DBC73] hover:text-[#0DBC73]"
          : `${isNightMode ? "textLight" : "textDark"} hover:text-[#0DBC73]`
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.icon(isActive)}
      <p className="ml-6">{item.label}</p>
    </Link>
  );
};

const MenuMobile: React.FC<MenuMobileProps> = ({ isOpen, toggleMenu }) => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    <div className="absolute left-0 sm:hidden">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-[200]"
          onClick={toggleMenu}
        ></div>
      )}

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } flex flex-col justify-between w-full ${
          isNightMode
            ? "bg-[#232323] text-white"
            : "bg-[#FFFFFF] text-[#232323]"
        } fixed bottom-0 rounded-t-xl p-4 min-h-[70vh] max-h-[90vh]`}
        style={{ zIndex: 200, overflowY: "scroll" }}
      >
        <div>
          <div
            className="flex justify-center cursor-pointer"
            onClick={toggleMenu}
          >
            <hr
              className="mb-6 mt-2 w-[30%] rounded-full cursor-pointer"
              style={{
                borderTopColor: isNightMode ? "#F1F1F1" : "black",
                borderTopWidth: "5px",
              }}
            />
          </div>

          <hr style={{ opacity: isNightMode ? 0.1 : 0.3 }} className="mb-6" />

          {/* CREATE POST BUTTON */}
          <button
            className={`${
              isNightMode ? "text-black" : "text-white"
            } bg-[#02995D] flex items-center justify-center gap-2 w-full`}
          >
            <Icon path={mdiPlusBoxOutline} size={0.7} />
            <p className="flex font-bold">{t("Global.CreatePost")}</p>
          </button>

          {/* MENU ITEMS */}
          <div className="my-5">
            {menuItems.map((item, index) => {
              const isActive =
                location.pathname === item.route ||
                (location.pathname === "/" && item.route === "/feed");
              return (
                <MenuItem
                  key={index}
                  item={{ ...item, label: t(`Menu.${item.label}`) }}
                  isNightMode={isNightMode}
                  isActive={hoveredIndex === index || isActive}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </div>
        </div>

        {/* SETTINGS BUTTON */}
        <div>
          <button
            type="button"
            className={`${
              isNightMode ? "text-black bg-white" : "text-white bg-black"
            } flex items-center w-full mt-[10vh]`}
            onClick={toggleMenu}
          >
            <Icon path={mdiCog} className="icon" />
            <p className="ml-2 font-bold">{t("Global.settings")}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
