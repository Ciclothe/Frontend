import Icon from "@mdi/react";
import { mdiCog } from "@mdi/js";

import UserProfileCard from "./UserProfileCard";
import DonationCalloutCard from "./DonationCalloutCard";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";

const SidebarLeftMobile = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className={` ${isNightMode ? "bg-black" : "bg-[#F7F8FA]"}
      flex flex-col justify-between p-4 min-w-[25em] max-w-[25em]`}
      style={{
        overflowY: "scroll",
        height: `100vh`,
        boxShadow: isNightMode
          ? "0px 20px 20px rgba(218, 218, 218, 0.18)"
          : "0px 3px 6px rgba(0, 0, 0, 0.168)",
      }}
    >
      <div>
        <div className="mt-[0.2em]">
          <CiclotheLogotipo
            color={isNightMode ? "white" : "black"}
            size={"12em"}
          />
        </div>
        <div className="mt-5">
          <UserProfileCard />
        </div>
        <div className="mt-5">
          <DonationCalloutCard />
        </div>
      </div>
      <div>
        <button
          type="button"
          className={`${
            isNightMode ? "text-black bg-white" : "text-white bg-black"
          } flex items-center w-full mt-5`}
        >
          <Icon path={mdiCog} className="icon" />
          <p className="ml-2 font-bold">{t("Global.settings")}</p>
        </button>
      </div>
    </div>
  );
};

export default SidebarLeftMobile;
