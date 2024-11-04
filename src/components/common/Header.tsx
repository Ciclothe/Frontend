import { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiHome,
  mdiCompass,
  mdiSwapHorizontalCircle,
  mdiHeart,
  mdiBell,
  mdiChatProcessing,
  mdiViewGrid,
  mdiAccount,
} from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import MenuMobile from "./MenuMobile";
import LanguageSwitch from "./LanguageSwitch";
import UserMenuDropdown from "./UserMenuDropdown";
import NotificationBanner from "./NotificationBanner";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.js";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import ClickAwayListener from "@mui/material/ClickAwayListener";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useUser();
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotificationsBanner, setShowNotificationsBanner] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menuItems = [
    { name: "Home", icon: mdiHome, redirect: "/" },
    { name: "Explore", icon: mdiCompass, redirect: "/explore" },
    { name: "Swap", icon: mdiSwapHorizontalCircle, redirect: "/swaps" },
    { name: "My activity", icon: mdiHeart, redirect: "/myActivity" },
    { name: "Menu", icon: mdiViewGrid },
  ];

  const handleMenuClick = (name: string) => {
    setSelectedCategory(name);
    if (name === "Menu") {
      onMenuClick();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div
        className={`hidden sm:grid  ${
          isNightMode
            ? "bg-[#141414] lg:bg-[#000000]"
            : "bg-white lg:bg-[#ECEFF1]"
        }  justify-between items-center grid-cols-12 p-4 lg:p-0`}
      >
        <div className="col-span-2">
          <Link to={`/`}>
            <CiclotheLogotipo
              color={isNightMode ? "white" : "black"}
              size={"12em"}
            />
          </Link>
        </div>
        <div className="flex col-span-8 justify-center">
          {menuItems.map((item) => (
            <Link to={item?.redirect || "/"} key={item?.name}>
              <div
                onClick={() => handleMenuClick(item.name)}
                className={`lg:${
                  item.name === "Menu" ? "hidden" : "flex"
                }  items-center py-2 px-3 lg:px-5 cursor-pointer lg:mx-2 rounded-lg flex ${
                  selectedCategory === item.name
                    ? isNightMode
                      ? "lg:bg-[#141414] text-white text-opacity-100"
                      : "lg:bg-[#E2E2E2] text-black text-opacity-100"
                    : isNightMode
                    ? "text-white text-opacity-30 lg:text-opacity-50"
                    : "text-black text-opacity-30 lg:text-opacity-50"
                }`}
              >
                {typeof item.icon === "string" ? (
                  <Icon
                    path={item.icon}
                    className="mr-2 w-[2em] block h-[2em] lg:hidden xl:block lg:w-[1.2em] lg:h-[1.2em]"
                  />
                ) : (
                  <div className="mr-2 w-[2em] h-[2em] lg:w-[1.2em] lg:h-[1.2em]">
                    {item.icon}
                  </div>
                )}
                <p className="font-bold hidden lg:block ">
                  {t(`Menu.${item.name}`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="hidden lg:block col-span-2">
          <UserMenuDropdown />
        </div>
        <div className="flex col-span-2 lg:hidden justify-end gap-4">
          <div className="relative">
            <div
              className={`flex items-center justify-center p-2  ${
                isNightMode
                  ? "bg-[#232323] text-white"
                  : "bg-[#E2E3E4] text-black"
              } rounded-full`}
              onClick={() =>
                setShowNotificationsBanner(!showNotificationsBanner)
              }
            >
              <Icon path={mdiBell} className="w-[1.5em] h-[1.5em]" />
            </div>
            {showNotificationsBanner && (
              <ClickAwayListener
                onClickAway={() => setShowNotificationsBanner(false)}
              >
                <div>
                  <NotificationBanner />
                </div>
              </ClickAwayListener>
            )}
          </div>
          <div
            className={`flex items-center justify-center p-2  ${
              isNightMode
                ? "bg-[#232323] text-white"
                : "bg-[#E2E3E4] text-black"
            } rounded-full`}
          >
            <Icon path={mdiChatProcessing} className="w-[1.5em] h-[1.5em]" />
          </div>
          <div className="relative">
            <div
              className="items-center flex justify-center"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {user?.profilePhoto ? (
                <div className="h-[3em] w-[3em] rounded-full">
                  <img
                    src={user?.profilePhoto}
                    alt="Profile Pic"
                    className="h-[3em] w-[3em] rounded-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className={`h-[3em] w-[3em] items-center flex justify-center  ${
                    isNightMode ? "bg-white text-black" : "bg-black text-white"
                  } rounded-full`}
                >
                  <Icon path={mdiAccount} size={1} />
                </div>
              )}
            </div>
            {showProfileMenu && (
              <ClickAwayListener onClickAway={() => setShowProfileMenu(false)}>
                <div>
                  <ProfileDropdownMenu />
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-12 sm:hidden px-4 py-6 items-center ${
          isNightMode ? "bg-[#141414] text-white" : "bg-white text-black"
        }`}
        style={{
          boxShadow: "0 1px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="col-span-3 flex justify-start items-center">
          <div onClick={() => toggleMenu()}>
            <Icon path={mdiViewGrid} className="w-[2em]" />
          </div>
          <div className="ml-2">
            <LanguageSwitch onlyFlag={true} position={"left"} />
          </div>
        </div>
        <div className="col-span-6 flex justify-center">
          <Link to={`/`}>
            <CiclotheLogotipo
              color={isNightMode ? "white" : "black"}
              size={"30vw"}
            />
          </Link>
        </div>
        <div className="col-span-3 flex justify-end gap-4">
          <div className="flex items-center justify-center relative">
            <div
              onClick={() =>
                setShowNotificationsBanner(!showNotificationsBanner)
              }
            >
              <Icon path={mdiBell} className="w-[2em]" />
              {showNotificationsBanner && (
                <ClickAwayListener
                  onClickAway={() => setShowNotificationsBanner(false)}
                >
                  <div>
                    <NotificationBanner />
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
          <div className="relative">
            <div
              className="items-center flex justify-center"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {user?.profilePhoto ? (
                <div className="h-[3em] w-[3em] rounded-full">
                  <img
                    src={user?.profilePhoto}
                    alt="Profile Pic"
                    className="h-[3em] w-[3em] rounded-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className={`h-[3em] w-[3em] items-center flex justify-center  ${
                    isNightMode ? "bg-white text-black" : "bg-black text-white"
                  } rounded-full`}
                >
                  <Icon path={mdiAccount} size={1} />
                </div>
              )}
            </div>
            {showProfileMenu && (
              <ClickAwayListener onClickAway={() => setShowProfileMenu(false)}>
                <div>
                  <ProfileDropdownMenu />
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>
      <MenuMobile isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Header;
