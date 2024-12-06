import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import FeedIcon from "@/assets/uiIcons/Feedicon";
import CommunitiesIcon from "@/assets/uiIcons/CommunitiesIcon";
import ExploreIcon from "@/assets/uiIcons/ExploreIcon";
import EventsIcon from "@/assets/uiIcons/EventsIcon";
import ChatsIcon from "@/assets/uiIcons/ChatsIcon";

interface MenuItemProps {
  item: {
    icon: (isActive: boolean) => JSX.Element;
    label: string;
    route: string;
  };
  themeMode: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  themeMode,
  isActive,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Link
      to={item.route}
      className={`flex items-center w-full justify-center text-[1.7em] font-bold ${
        isActive ? "text-[#0DBC73]" : `${themeMode ? "textLight" : "textDark"}`
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.icon(isActive)}
    </Link>
  );
};

const MenuMobile = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    {
      icon: (isActive: boolean) => (
        <FeedIcon
          size={"1em"}
          colorSelected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          isFilled={true}
          colorUnselected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          colorStroke={themeMode === "dark" ? "#0a0a0a" : "#ffffff"}
          isSelected={isActive}
        />
      ),
      label: "Feed",
      route: "/feed",
    },
    {
      icon: (isActive: boolean) => (
        <ExploreIcon
          size={"1em"}
          isFilled={true}
          colorSelected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
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
          isFilled={true}
          colorSelected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          colorUnselected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
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
          isFilled={true}
          colorSelected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          colorUnselected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
          colorStroke={themeMode === "dark" ? "#0a0a0a" : "#ffffff"}
          isSelected={isActive}
        />
      ),
      label: "Chats",
      route: "/chats",
    },
    {
      icon: (isActive: boolean) => (
        <CommunitiesIcon
          size={"1em"}
          isActive={isActive}
          colorSelected={themeMode === "dark" ? "#ffffff" : "#0a0a0a"}
        />
      ),
      label: "Explore",
      route: "/explore",
    },
  ];

  return (
    <div
      className={`flex flex-col justify-between w-full ${
        themeMode === "dark"
          ? "bg-[#0B0B0B] text-[#ffffff]"
          : "bg-[#ffffff] text-[#0B0B0B]"
      } py-4`}
      style={{
        zIndex: 1000,
        overflowY: "scroll",
        borderTopWidth: "0.5px",
        borderStyle: "solid",
        borderColor:
          themeMode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(140, 140, 140, 0.1)",
      }}
    >
      <div>
        {/* MENU ITEMS */}
        <div className="flex">
          {menuItems.map((item, index) => {
            const isActive =
              location.pathname === item.route ||
              (location.pathname === "/" && item.route === "/feed");
            return (
              <MenuItem
                key={index}
                item={{ ...item, label: t(`Menu.${item.label}`) }}
                themeMode={themeMode === "dark"}
                isActive={hoveredIndex === index || isActive}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
