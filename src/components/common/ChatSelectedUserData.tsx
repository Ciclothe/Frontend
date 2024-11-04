import Icon from "@mdi/react";
import { mdiSwapHorizontal, mdiChartBar, mdiPanoramaVariant } from "@mdi/js";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

interface ChatConversationProps {
  isChatSelected: {
    photo: string;
    userName: string;
    name: string;
    messages: { text: string; date: string }[];
  } | null;
}

const ChatSelectedUserData: React.FC<ChatConversationProps> = ({
  isChatSelected,
}) => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  const userData = {
    rating: 3.5,
    swaps: 18,
    reviews: 15,
    ubicationCity: "Valencia",
    ubicationCountry: "España",
  };

  if (!isChatSelected) {
    return null;
  }

  return (
    <div
      className={`items-between h-full flex flex-col justify-between rounded-xl ${
        isNightMode ? "text-white" : "text-black"
      }`}
    >
      <div className="rounded-full object-cover flex flex-col items-center">
        <img
          src={isChatSelected?.photo}
          className="rounded-full object-cover h-[5em] w-[5em]"
        />
        <div className="my-5 items-center flex flex-col">
          <p className="font-semibold text-sm">@{isChatSelected.userName}</p>
          <p className="text-xs">{isChatSelected.name}</p>
        </div>
        <div className="mb-5 flex gap-4">
          <div className="bg-[#1B6B44] bg-opacity-10 rounded-lg justify-center px-5 py-3">
            <p className="text-[#1B6B44] font-bold flex justify-center opacity-50">
              Swaps
            </p>
            <div className="flex items-center text-[#1B6B44]">
              <Icon path={mdiSwapHorizontal} size={1} className="opacity-50" />
              <p className="text-[1.5em] font-bold">{userData.swaps}</p>
            </div>
          </div>
          <div
            className={`${
              isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
            } rounded-lg justify-center px-5 py-3`}
          >
            <p className="font-bold flex justify-center opacity-50">
              {t("Chat.Reviews")}
            </p>
            <div className="flex items-center">
              <Icon path={mdiChartBar} size={1} className="opacity-50" />
              <p className="text-[1.5em] font-bold">{userData.reviews}</p>
            </div>
          </div>
        </div>
        <div
          className={`py-2 px-4 w-full rounded-md ${
            isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
          }`}
        >
          <p>
            <span className="font-bold mr-2">{t("Global.Ubication")}</span>
            {userData?.ubicationCity},{userData?.ubicationCountry}
          </p>
        </div>
        <div className="my-5 w-full">
          <div className="flex justify-between">
            <p className="font-bold">Media</p>
            <p>0</p>
          </div>
          <div
            className={`mt-5 w-full h-[12em] rounded-xl items-center flex justify-center ${
              isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
            }`}
          >
            <Icon path={mdiPanoramaVariant} size={3} className="opacity-10" />
          </div>
        </div>
      </div>
      <button className="w-full bg-[#B60606] text-white font-bold">
        {t("Chat.BlockUser")}
      </button>
    </div>
  );
};

export default ChatSelectedUserData;
