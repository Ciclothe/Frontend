import Icon from "@mdi/react";
import { mdiCog } from "@mdi/js";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import UserProfileCard from "./UserProfileCard";
import DonationCalloutCard from "./DonationCalloutCard";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const SidebarLeft = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col justify-between fixed lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw]"
      style={{
        height: `calc(100vh - 10em)`,
        overflowX: "hidden",
      }}
    >
      <div>
        <div>
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
          } flex items-center w-full justify-start`}
        >
          <Icon path={mdiCog} className="icon" />
          <p className="ml-2 font-bold">{t("Global.settings")}</p>
        </button>
      </div>
    </div>
  );
};

export default SidebarLeft;
