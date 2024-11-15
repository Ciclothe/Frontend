import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import CommentsIcon from "@/assets/uiIcons/CommentsIcon";
import ShareIcon from "@/assets/uiIcons/ShareIcon";
import SaveIcon from "@/assets/uiIcons/SaveIcon";
import React, { useState, useEffect } from "react";
import PostOptions from "@/components/layout/PostOptions";
import { useTheme } from "@/context/ThemeContext.js";
import Swapicon from "@/assets/icons/Swapicon";
import { useTranslation } from "react-i18next";

interface SwapNotificationProps {
  data: {
    id: number;
    type: string;
    userData?: {
      username: string;
      profilePicture: string;
      location: {
        city: string;
        country: string;
      };
    };
    postDescription?: string;
    postImg?: string;
    imageOrientation?: string;
    postAnalitics: {
      likes: number;
      comments: number;
      shares: number;
      saves: number;
      postLiked: boolean;
      postShared: boolean;
      postSaved: boolean;
    };
    swapData: {
      offered: {
        userName?: string;
        profilePicture: string;
        link: string;
        coverImg: string;
      };
      obtained: {
        userName?: string;
        profilePicture: string;
        link: string;
        coverImg: string;
      };
    };
    comments: Array<{
      username: string;
      profilePicture: string;
      comment: string;
    }>;
  };
}

const SwapNotification: React.FC<SwapNotificationProps> = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { isNightMode } = useTheme();

  useEffect(() => {
    if (data?.postAnalitics?.postLiked) {
      setLiked(true);
    }
    if (data?.postAnalitics?.postShared) {
      setShared(true);
    }
    if (data?.postAnalitics?.postSaved) {
      setSaved(true);
    }
  }, []);

  return (
    <div
      className={`${
        isNightMode ? "border-[#3E3E3D]" : "border-[#DDDDDE]"
      }  w-full flex items-center justify-center relative sm:border rounded-xl border-1`}
    >
      <div className="hidden sm:block absolute left-0 top-0 w-full h-full rounded-xl">
        <div className="relative w-full h-full rounded-xl">
          <img
            src={data?.swapData?.offered?.coverImg}
            className="rounded-xl w-full h-full object-cover"
          />
          <div
            className={`${
              isNightMode ? "bg-black" : "bg-white"
            } bg-opacity-90 backdrop-blur-md backdrop-brightness-90 absolute z-10 left-0 top-0 w-full h-full rounded-xl`}
          ></div>
        </div>
      </div>
      {/* Main Container for Post */}
      <div
        className={`${
          isNightMode
            ? "w-full sm:bg-[#232323] text-white"
            : "bg-white text-black"
        } md:w-[80%] lg:w-[75%] px-2 py-4 m:py-4 m:px-4 gap-4 grid grid-cols-12 z-10 rounded-xl md:rounded-none`}
      >
        {/* USERS DATA */}
        <div className="col-span-12 flex items-center justify-between gap-4">
          {/* Users Data */}
          <div className="flex gap-2 items-center">
            <div className="flex p-1 border rounded-full border-2 border-[#0DBC73]">
              <img
                src={data?.swapData?.offered?.profilePicture}
                alt="User pic"
                className={`rounded-full h-7 aspect-square border border-2 ${
                  isNightMode ? "border-[#232323]" : "border-white"
                }`}
              />
              <img
                src={data?.swapData?.obtained?.profilePicture}
                alt="User pic"
                className={`rounded-full h-7 aspect-square ml-[-10px] border border-2 ${
                  isNightMode ? "border-[#232323]" : "border-white"
                }`}
              />
            </div>
            <div className="font-bold truncate flex-1">
              <p>
                <span className="text-[#0DBC73]">
                  @{data?.swapData?.offered?.userName}
                </span>{" "}
                {t("Swipe.MadeASwapWith")}{" "}
                <span className="text-[#0DBC73]">
                  @{data?.swapData?.obtained?.userName}
                </span>
              </p>
            </div>
          </div>
          <div
            className="col-span-1 flex justify-end relative cursor-pointer"
            onClick={() => setOpened(!opened)}
          >
            <Icon path={mdiDotsVertical} size={0.8} />
            <PostOptions
              postId={data?.id}
              opened={opened}
              setOpened={setOpened}
            />
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-1 h-full flex justify-center">
            <div
              className={`w-[0.1px] h-full ${
                isNightMode ? "bg-gray-50 opacity-20" : "bg-black opacity-10"
              }`}
            ></div>
          </div>
          <div className="col-span-11 grid grid-cols-12 gap-1 justify-center">
            {/* POST IMAGE */}
            <div className="col-span-12 grid grid-cols-12">
              <div className="col-span-12 w-full rounded-lg relative flex items-center justify-center gap-2">
                <img
                  src={data?.swapData?.offered?.coverImg}
                  alt="post image"
                  className="aspect-square w-[50%] object-cover rounded-lg"
                />
                <img
                  src={data?.swapData?.obtained?.coverImg}
                  alt="post image"
                  className="aspect-square w-[50%] object-cover rounded-lg"
                />
                {/* SWAP ICON */}
                <div
                  className={`rounded-full bg-[#02995D] ${
                    isNightMode ? "bg-opacity-30" : "bg-opacity-10"
                  } backdrop-blur-md backdrop-brightness-50 absolute border border-[#02995D] p-2`}
                >
                  <Swapicon size={"1.5em"} color={"#02995D"} />
                </div>
              </div>

              {/* ANALITICS*/}
              <div className="flex col-span-12 items-center justify-start gap-4 mt-2">
                <div
                  className={`${
                    liked
                      ? "bg-[#0DBC73]"
                      : `${isNightMode ? "bg-[#3A3A3A]" : "bg-[#F1F1F1]"}`
                  } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                  onMouseEnter={() => setLiked(true)}
                  onMouseLeave={() => setLiked(data?.postAnalitics?.postLiked)}
                >
                  <HeartIcon
                    size={"1.5em"}
                    colorFill={`${isNightMode ? "#232323" : "#F1F1F1"}`}
                    colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                    isSelected={liked}
                  />
                  <p
                    className={`${
                      liked
                        ? `${isNightMode ? "text-[#3A3A3A]" : "text-[#F1F1F1]"}`
                        : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
                    } font-bold`}
                  >
                    {data?.postAnalitics?.likes}
                  </p>
                </div>
                <div
                  className={`${
                    isNightMode ? "bg-[#3A3A3A]" : "bg-[#F1F1F1]"
                  } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                >
                  <CommentsIcon
                    size={"1.5em"}
                    colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                    isSelected={liked}
                  />
                  <p
                    className={`${
                      isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"
                    } font-bold`}
                  >
                    {data?.postAnalitics?.comments}
                  </p>
                </div>
                <div
                  className={`${
                    shared
                      ? "bg-[#0DBC73]"
                      : `${isNightMode ? "bg-[#3A3A3A]" : "bg-[#F1F1F1]"}`
                  } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                  onMouseEnter={() => setShared(true)}
                  onMouseLeave={() =>
                    setShared(data?.postAnalitics?.postShared)
                  }
                >
                  <ShareIcon
                    size={"1.5em"}
                    colorFill={`${isNightMode ? "#232323" : "#F1F1F1"}`}
                    colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                    isSelected={shared}
                  />
                  <p
                    className={`${
                      shared
                        ? `${isNightMode ? "text-[#3A3A3A]" : "text-[#F1F1F1]"}`
                        : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
                    } font-bold`}
                  >
                    {data?.postAnalitics?.shares}
                  </p>
                </div>
                <div
                  className={`${
                    saved
                      ? "bg-[#0DBC73]"
                      : `${isNightMode ? "bg-[#3A3A3A]" : "bg-[#F1F1F1]"}`
                  } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                  onMouseEnter={() => setSaved(true)}
                  onMouseLeave={() => setSaved(data?.postAnalitics?.postSaved)}
                >
                  <SaveIcon
                    size={"1.5em"}
                    colorFill={`${isNightMode ? "#232323" : "#F1F1F1"}`}
                    colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                    isSelected={saved}
                  />
                  <p
                    className={`${
                      saved
                        ? `${isNightMode ? "text-[#3A3A3A]" : "text-[#F1F1F1]"}`
                        : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
                    } font-bold`}
                  >
                    {data?.postAnalitics?.saves}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapNotification;
