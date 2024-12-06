import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Swapicon from "@/assets/icons/Swapicon";
import PostOptions from "@/components/layout/PostOptions";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

type SwapPostProps = {
  postData: any;
};

const SwapPost: React.FC<SwapPostProps> = ({ postData }) => {
  const { t } = useTranslation();
  const { isNightMode } = useTheme();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="col-span-12 flex items-center justify-between gap-4 mx-4">
        {/* Users Data */}
        <div className="flex gap-2 items-center">
          <div className="flex p-1 border rounded-full border-2 border-[#0DBC73]">
            <LazyLoadImage
              src={postData?.swapData?.offered?.profilePicture}
              alt="User pic"
              className={`rounded-full h-7 aspect-square border border-2 ${
                isNightMode ? "border-[#232323]" : "border-white"
              }`}
            />
            <LazyLoadImage
              src={postData?.swapData?.obtained?.profilePicture}
              alt="User pic"
              className={`rounded-full h-7 aspect-square ml-[-10px] border border-2 ${
                isNightMode ? "border-[#232323]" : "border-white"
              }`}
            />
          </div>
          <div className="font-bold truncate flex-1">
            <p>
              <span className="text-[#0DBC73]">
                @{postData?.swapData?.offered?.userName}
              </span>{" "}
              {t("Swipe.MadeASwapWith")}{" "}
              <span className="text-[#0DBC73]">
                @{postData?.swapData?.obtained?.userName}
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
            postId={postData?.id}
            opened={opened}
            setOpened={setOpened}
          />
        </div>
      </div>
      {/* POST IMAGE */}
      <div className="col-span-12 grid grid-cols-12 m-4">
        <div className="col-span-12 grid grid-cols-12 relative gap-2 flex items-center justify-center">
          <LazyLoadImage
            src={postData?.swapData?.offered?.coverImg}
            alt="post image"
            className="aspect-square object-cover rounded-lg col-span-6"
          />
          {/* SWAP ICON */}
          <div
            className={`rounded-full bg-[#0DBC73] ${
              isNightMode ? "bg-opacity-30" : "bg-opacity-10"
            } backdrop-blur-md backdrop-brightness-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#0DBC73] p-2`}
          >
            <Swapicon size={"1.5em"} color={"#0DBC73"} />
          </div>
          <LazyLoadImage
            src={postData?.swapData?.obtained?.coverImg}
            alt="post image"
            className="aspect-square object-cover rounded-lg col-span-6"
          />
        </div>
      </div>
    </>
  );
};

export default SwapPost;
