import Icon from "@mdi/react";
import { mdiLogout, mdiLifebuoy, mdiAccount } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProfileDropdownMenu = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className={`${
        isNightMode ? "cardNightMode" : "cardDayMode"
      } absolute right-0 mt-2 z-[100] rounded-xl min-w-[15em]`}
      style={{
        boxShadow: isNightMode
          ? "0px 0px 5px rgba(255,255,255,0.1)"
          : "0px 0px 5px rgba(0,0,0,0.2)",
      }}
    >
      <Link to={`/profile`}>
        <div
          className={`flex justify-start items-center px-5 ${
            isNightMode
              ? "bg-[#141414] hover:bg-[#232323] text-white"
              : "bg-white hover:bg-[#E2E2E2] text-black"
          } py-3 font-bold rounded-t-xl gap-2 cursor-pointer`}
        >
          <Icon path={mdiAccount} size={0.8} />
          <p>{t("ProfileMenu.Profile")}</p>
        </div>
      </Link>
      <Link to={`/support`}>
        <div
          className={`flex justify-start items-center px-5 ${
            isNightMode
              ? "bg-[#141414] hover:bg-[#232323] text-white"
              : "bg-white hover:bg-[#E2E2E2] text-black"
          } py-3 font-bold gap-2 cursor-pointer`}
        >
          <Icon path={mdiLifebuoy} size={0.8} />
          <p>{t("ProfileMenu.Support")}</p>
        </div>
      </Link>
      <hr
        className={`mx-3 opacity-5 ${
          isNightMode ? "border-white" : "border-black"
        }`}
      />
      <Link to={`/logout`}>
        <div
          className={`flex justify-start items-center px-5 ${
            isNightMode
              ? "bg-[#141414] hover:bg-[#232323] text-white"
              : "bg-white hover:bg-[#E2E2E2] text-black"
          } py-3 font-bold rounded-b-xl gap-2 cursor-pointer`}
        >
          <Icon path={mdiLogout} size={0.8} />
          <p>{t("ProfileMenu.LogOut")}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProfileDropdownMenu;
