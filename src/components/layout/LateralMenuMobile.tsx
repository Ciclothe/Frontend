import { useEffect } from "react";
import Icon from "@mdi/react";
import {
  mdiCogOutline,
  mdiBookmarkOutline,
  mdiHeartOutline,
  mdiChatProcessingOutline,
} from "@mdi/js";
import { useUser } from "@/context/UserContext.js";
import { useTheme } from "@/context/ThemeContext.js";
import { useTranslation } from "react-i18next";
import ProfileImage from "@/components/ui/ProfilePic";
import ModeSwitch from "@/components/ui/ThemeSwitch";
import LanguageSwitch from "@/components/ui/LanguageSwitch";
import { useMobileMenu } from "@/context/MobileMenuContext";
import LocationCard from "@/components/common/LocationCard";

const LateralMenuMobile = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const { user } = useUser();
  const { isOpen, toggleMenu } = useMobileMenu();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  const handleMenuToggle = (e: any) => {
    e.stopPropagation();
    toggleMenu();
  };

  return (
    <div
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"} ${
        themeMode === "dark" ? "bg-[#ffffff]" : "bg-[#171717]"
      } backdrop-effect bg-opacity-20 md:hidden`}
      onClick={(e) => handleMenuToggle(e)}
    >
      <div
        className={`${
          themeMode === "dark"
            ? "bg-[#0b0b0b] text-white"
            : "bg-[#ffffff] text-black"
        } h-full w-[70vw] flex flex-col justify-between transition-transform duration-300 ease-in-out transform overflow-x-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div
            className="p-4 flex flex-col gap-4"
            style={{
              borderBottomWidth: "0.5px",
              borderStyle: "solid",
              borderColor:
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(140, 140, 140, 0.1)",
            }}
          >
            <div>
              <div className="flex justify-between items-center">
                <ProfileImage profilePic={user?.profilePhoto} />
                <LanguageSwitch onlyFlag={false} position={"right"} />
              </div>
              <div className="mt-2">
                <h2 className="font-bold text-[1.2em]">@{user?.userName}</h2>
                <p className="opacity-50">
                  {user?.city}, {user?.country}{" "}
                </p>
              </div>
            </div>

            {/* LOCATION SEARCH */}
            <LocationCard />
          </div>

          <div
            className="p-4 flex w-full justify-between items-center"
            style={{
              borderBottomWidth: "0.5px",
              borderStyle: "solid",
              borderColor:
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(140, 140, 140, 0.1)",
            }}
          >
            <p className="font-bold text-[1.2em]">{t("Global.Theme")}</p>
            <ModeSwitch />
          </div>

          <div
            className="p-4 flex gap-4 items-center"
            style={{
              borderBottomWidth: "0.5px",
              borderStyle: "solid",
              borderColor:
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(140, 140, 140, 0.1)",
            }}
          >
            <Icon path={mdiCogOutline} size={1} />
            <p className="font-bold text-[1.2em]">{t("Global.settings")}</p>
          </div>

          <div className="p-4 flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <Icon path={mdiBookmarkOutline} size={1} />
              <p className="font-bold text-[1.2em]">{t("Global.Saves")}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Icon path={mdiHeartOutline} size={1} />
              <p className="font-bold text-[1.2em]">{t("Global.MyActivity")}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Icon path={mdiChatProcessingOutline} size={1} />
              <p className="font-bold text-[1.2em]">{t("Chat.Messages")}</p>
            </div>
          </div>
        </div>

        <div className="p-4 mt-20">
          <p className="font-bold text-[1.2em]">{t("Global.LogOut")}</p>
        </div>
      </div>
    </div>
  );
};

export default LateralMenuMobile;
