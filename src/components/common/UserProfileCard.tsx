import Icon from "@mdi/react";
import {
  mdiAccountGroup,
  mdiAccountHeart,
  mdiImage,
  mdiPlusBoxOutline,
  mdiAccount,
} from "@mdi/js";
import ModeSwitch from "./ModeSwitch";
import LanguageSwitch from "./LanguageSwitch";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.js";

const UserProfileCard = () => {
  const { user } = useUser();
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  return (
    <div
      className={`cart ${
        isNightMode ? "cardNightMode" : "cardDayMode"
      } rounded-xl p-5`}
    >
      <div className="grid grid-cols-3">
        <div>
          <LanguageSwitch onlyFlag={false} position={"left"} />
        </div>
        <div className="items-center flex justify-center">
          {user?.profilePhoto !== null ? (
            <div className="h-[4em] w-[4em] rounded-full">
              <img
                src={user?.profilePhoto}
                alt="Profile Pic"
                className="h-[4em] w-[4em] rounded-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`h-[4em] w-[4em] items-center flex justify-center  ${
                isNightMode ? "bg-white text-black" : "bg-black text-white"
              } rounded-full`}
            >
              <Icon path={mdiAccount} size={1} />
            </div>
          )}
        </div>
        <div>
          <ModeSwitch />
        </div>
      </div>
      <div className="py-3 items-center flex flex-col">
        <p className="font-bold">
          {user?.firstName} {user?.lastName}
        </p>
        <p>@{user?.userName}</p>
      </div>
      <div className="flex justify-evenly">
        <div
          className={`${
            isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
          } rounded-full py-0.5 px-2 flex items-center justify-center`}
        >
          <Icon path={mdiAccountHeart} className="icon" />
          <p className="font-bold ml-2">12</p>
        </div>
        <div
          className={`${
            isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
          } rounded-full py-0.5 px-2 flex items-center justify-center`}
        >
          <Icon path={mdiAccountGroup} className="icon" />
          <p className="font-bold ml-2">12</p>
        </div>
        <div
          className={`${
            isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
          } rounded-full py-0.5 px-2 flex items-center justify-center`}
        >
          <Icon path={mdiImage} className="icon" />
          <p className="font-bold ml-2">12</p>
        </div>
      </div>
      <div className="pt-3 flex items-center justify-center">
        <Link to={`/addProduct`} className="w-full">
          <button type="button" className="btn-grn-fill">
            <p className="mr-2">{t("UserProfileCard.createPost")}</p>
            <Icon path={mdiPlusBoxOutline} className="icon" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfileCard;
