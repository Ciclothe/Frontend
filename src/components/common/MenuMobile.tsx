import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import ModeSwitch from "./ModeSwitch";
import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.js";

import {
  mdiPlusBoxOutline,
  mdiHome,
  mdiCompass,
  mdiSwapHorizontalCircle,
  mdiHeart,
  mdiCog,
  mdiMotherHeart,
  mdiChatProcessing,
  mdiAccount,
} from "@mdi/js";

interface MenuMobileProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MenuMobile: React.FC<MenuMobileProps> = ({ isOpen, toggleMenu }) => {
  const { user } = useUser();
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("Home");

  const menuItems = [
    { name: "Home", icon: mdiHome, redirect: "/" },
    { name: "Explore", icon: mdiCompass, redirect: "/explore" },
    { name: "Swap", icon: mdiSwapHorizontalCircle, redirect: "/swaps" },
    { name: "My activity", icon: mdiHeart, redirect: "/myActivity" },
    { name: "Messages", icon: mdiChatProcessing, redirect: "/messages" },
    { name: "doneIt", icon: mdiMotherHeart, redirect: "/doneIt" },
  ];

  const handleMenuClick = (name: string) => {
    setSelectedCategory(name);
    if (name === "Menu") {
      toggleMenu();
    }
  };

  return (
    <div className="relative sm:hidden">
      <div
        className={`${isOpen ? "block" : "hidden"} w-full ${
          isNightMode ? "bg-black text-white" : "bg-white text-black"
        } fixed bottom-0 rounded-t-xl p-4 max-h-[90vh]`}
        style={{
          zIndex: 100,
          overflowY: "scroll",
        }}
      >
        <div className="flex justify-center">
          <hr
            style={{
              borderTopColor: isNightMode ? "white" : "black",
              borderTopWidth: "5px",
            }}
            className="mb-6 mt-2 w-[40%] rounded-full cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <hr style={{ opacity: isNightMode ? 0.3 : 0.5 }} className="mb-6" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="items-center flex justify-center">
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
            <div className="ml-3">
              <p className="font-bold">
                {user?.firstName} {user?.lastName}
              </p>
              <p>@{user?.userName}</p>
            </div>
          </div>
          <div>
            <ModeSwitch />
          </div>
        </div>

        <div className="pt-3 flex items-center justify-center">
          <button type="button" className="btn-grn-fill">
            <p className="mr-2">{t("UserProfileCard.createPost")}</p>
            <Icon path={mdiPlusBoxOutline} className="icon" />
          </button>
        </div>

        <div className="my-5">
          {menuItems.map((item) => (
            <Link to={item?.redirect} key={item.name}>
              <div
                onClick={() => handleMenuClick(item.name)}
                className={`flex items-center py-3 px-3 my-2 cursor-pointer rounded-lg ${
                  selectedCategory === item.name
                    ? isNightMode
                      ? "bg-[#141414] text-white"
                      : "bg-[#EEEEEE] text-black"
                    : item.name === "doneIt"
                    ? "text-[#1B6B44]"
                    : isNightMode
                    ? "text-white text-opacity-30"
                    : "text-black text-opacity-30"
                }`}
              >
                <Icon path={item.icon} className="mr-2 h-[1.5em] w-[1.5em]" />
                <p className="font-bold">
                  {t(
                    `${
                      item.name === "doneIt"
                        ? `DoneItCard.${item.name}`
                        : item.name === "Messages"
                        ? `Chat.${item.name}`
                        : `Menu.${item.name}`
                    }`
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>

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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default MenuMobile;
