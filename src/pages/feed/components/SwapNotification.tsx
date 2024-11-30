import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import React, { useState } from "react";
import PostOptions from "@/components/layout/PostOptions";
import { useTheme } from "@/context/ThemeContext.js";
import Swapicon from "@/assets/icons/Swapicon";
import { useTranslation } from "react-i18next";
import PostInteractions from "./cards/PostInteractions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "@mui/material/Skeleton";

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
  onClick: () => void;
}

const SwapNotification: React.FC<SwapNotificationProps> = ({
  data,
  onClick,
}) => {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { isNightMode } = useTheme();
  const [isLoadingOffered, setIsLoadingOffered] = useState(true);
  const [isLoadingObtained, setIsLoadingObtained] = useState(true);

  const handleImageLoadOffered = () => {
    setIsLoadingOffered(false); // Imagen de "offered" cargada
  };

  const handleImageLoadObtained = () => {
    setIsLoadingObtained(false); // Imagen de "obtained" cargada
  };

  return (
    <div
      className={`${
        isNightMode
          ? "text-white hover:md:bg-[#171717] md:border-white/10"
          : "text-black hover:md:bg-[#F7F7F7] md:border-gray-500/1"
      } grid grid-cols-12 rounded-xl md:p-4 gap-2 cursor-pointer	md:border md:border-1`}
      onClick={onClick}
    >
      {/* Main Container for Post */}

      {/* USERS DATA */}
      <div className="col-span-12 flex items-center justify-between gap-4">
        {/* Users Data */}
        <div className="flex gap-2 items-center">
          <div className="flex p-1 border rounded-full border-2 border-[#0DBC73]">
            <LazyLoadImage
              src={data?.swapData?.offered?.profilePicture}
              alt="User pic"
              className={`rounded-full h-7 aspect-square border border-2 ${
                isNightMode ? "border-[#232323]" : "border-white"
              }`}
            />
            <LazyLoadImage
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
          onClick={(e) => {
            e.stopPropagation();
            setOpened(!opened);
          }}
        >
          <Icon path={mdiDotsVertical} size={0.8} />
          <PostOptions
            postId={data?.id}
            opened={opened}
            setOpened={setOpened}
          />
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-12 gap-2">
        <div className="col-span-1 h-full flex justify-center">
          <div
            className={`w-[1px] h-full mt-2 ${
              isNightMode ? "bg-white/10" : "bg-gray-500/10"
            }`}
          ></div>
        </div>
        <div className="col-span-11 grid grid-cols-12 gap-1 justify-center">
          {/* POST IMAGE */}
          <div className="col-span-12 grid grid-cols-12">
            <div className="col-span-12 w-full rounded-lg relative flex items-center justify-center gap-2">
              {/* Loading state for "Offered" image */}
              <div className="relative w-[50%]">
                {isLoadingOffered && (
                  <Skeleton
                    sx={{
                      height: "100%",
                      width: "100%",
                      bgcolor: isNightMode ? "grey.900" : "grey.400",
                      borderRadius: "5%",
                    }}
                    variant="rectangular"
                    className="absolute inset-0"
                  />
                )}
                <LazyLoadImage
                  src={data?.swapData?.offered?.coverImg}
                  className="aspect-square w-full object-cover rounded-lg"
                  onLoad={handleImageLoadOffered}
                />
              </div>

              {/* Loading state for "Obtained" image */}
              <div className="relative w-[50%]">
                {isLoadingObtained && (
                  <Skeleton
                    sx={{
                      height: "100%",
                      width: "100%",
                      bgcolor: isNightMode ? "grey.900" : "grey.400",
                      borderRadius: "5%",
                    }}
                    variant="rectangular"
                    className="absolute inset-0"
                  />
                )}
                <LazyLoadImage
                  src={data?.swapData?.obtained?.coverImg}
                  className="aspect-square w-full object-cover rounded-lg"
                  onLoad={handleImageLoadObtained}
                />
              </div>

              {/* SWAP ICON */}
              <div
                className={`rounded-full bg-[#02995D] ${
                  isNightMode ? "bg-opacity-30" : "bg-opacity-10"
                } backdrop-blur-md backdrop-brightness-50 absolute border border-[#02995D] p-2`}
              >
                <Swapicon size={"1.5em"} color={"#02995D"} />
              </div>
            </div>
          </div>
        </div>
        <PostInteractions data={data} />
      </div>
      <hr
        className={`col-span-12 mt-4 md:hidden ${
          isNightMode ? "border-white/10" : "border-gray-500/1"
        }`}
      />
    </div>
  );
};

export default SwapNotification;
