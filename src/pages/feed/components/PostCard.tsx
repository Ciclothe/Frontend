import Icon from "@mdi/react";
import { mdiDotsVertical, mdiCircleSmall } from "@mdi/js";
import Swapicon from "@/assets/icons/Swapicon";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import CommentsIcon from "@/assets/uiIcons/CommentsIcon";
import ShareIcon from "@/assets/uiIcons/ShareIcon";
import SaveIcon from "@/assets/uiIcons/SaveIcon";
import React, { useState, useEffect } from "react";
import PostOptions from "@/components/layout/PostOptions";
import { useTheme } from "@/context/ThemeContext.js";
import ImageCarousel from "@/components/ui/ImageCarousel";
import SwapCard from "@/components/layout/SwapCard";

interface PostCardProps {
  data: {
    type: string;
    id: number;
    createdAt: string;
    userData: {
      username: string;
      profilePicture: string;
      location: {
        city: string;
        country: string;
      };
    };
    communityData: {
      url: string;
      communityPicture: string;
    };
    postDescription: string;
    postImg: string;
    imageOrientation: string;
    garmentTitle: string;
    garmentCondition: string;
    garmentSize: string;
    garmentBrand: string;
    garmentColor: string;
    garmentDescription: string;
    garmentImgs: Array<{ src: string; orientation: "portrait" | "landscapes" }>;
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
        link: string;
        coverImg: string;
      };
      obtained: {
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

const PostCard: React.FC<PostCardProps> = ({ data, onClick }) => {
  const [liked, setLiked] = useState<any>(false);
  const [shared, setShared] = useState<any>(false);
  const [saved, setSaved] = useState<any>(false);
  const [opened, setOpened] = useState(false);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = now.getFullYear() - date.getFullYear();

    switch (true) {
      case years > 0:
        return date.getFullYear().toString();
      case months > 0:
        return `${months} ${months === 1 ? "month" : "months"}`;
      case weeks > 0:
        return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
      case days > 0:
        return `${days} ${days === 1 ? "day" : "days"}`;
      case hours > 0:
        return `${hours}h`;
      case minutes > 0:
        return `${minutes}m`;
      default:
        return `${seconds}s`;
    }
  };

  return (
    <>
      {/* Main Container for Post */}
      <div
        className={`${
          isNightMode
            ? "text-white hover:md:bg-[#171717] md:border-white/10"
            : "text-black hover:md:bg-white md:border-gray-500/1"
        } grid grid-cols-12 rounded-xl md:p-4 gap-2 cursor-pointermd:border md:border-2`}
        onClick={onClick}
      >
        {/* PROFILE PIC */}
        <div className="col-span-1 max-h-full overflow-hidden">
          <div className="flex justify-center">
            <img
              src={data?.userData?.profilePicture}
              alt="User pic"
              className="rounded-full w-full sm:w-auto sm:h-7 aspect-square"
            />
          </div>
          <div className="col-span-1 h-full flex justify-center mt-4">
            <div
              className={`w-[1px] h-full mt-2 ${
                isNightMode ? "bg-white/10" : "bg-gray-500/10"
              }`}
            ></div>
          </div>
        </div>
        {/* MAIN CONTENT */}
        <div className="col-span-11 grid grid-cols-12 gap-2">
          {/* USER DATA */}
          <div className="col-span-12 grid grid-cols-12">
            {/* Username and Location */}
            <div className="col-span-11 flex flex-col gap-1">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <p className="font-bold">@{data?.userData?.username}</p>
                  {data?.communityData && (
                    <div>
                      <div className="flex items-center gap-1">
                        <img
                          src={data?.communityData.communityPicture}
                          alt="Community pic"
                          className="w-5 h-5 rounded-full"
                        />
                        <p className="opacity-50">/{data?.communityData.url}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center opacity-50">
                  <p>
                    {data?.userData?.location?.city},{" "}
                    {data?.userData?.location?.country}
                  </p>
                  <Icon path={mdiCircleSmall} size={0.8} />
                  <p>{formatDate(data?.createdAt)}</p>
                </div>
              </div>
              {/* POST DESCRIPTION */}
              <p className="descriptionStyles">
                {data.type == "Swap" ? "" : data?.postDescription}
              </p>
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
          {/* MAIN CONTENT */}
          <div className="col-span-12 grid grid-cols-12">
            <div className="col-span-12 grid grid-cols-12 gap-1 justify-center">
              {/* POST IMAGE */}
              {data?.type == "Swap" ? (
                <ImageCarousel
                  garmentImgs={data?.garmentImgs || []}
                  data={data}
                  isPostDetails={false}
                />
              ) : (
                <div className="col-span-12 grid grid-cols-12">
                  <div className="col-span-12 rounded-lg w-fit relative flex items-center justify-start">
                    <div className="relative">
                      <img
                        src={data?.postImg}
                        alt="post image"
                        className={`${
                          data.imageOrientation === "landscapes"
                            ? "aspect-[16/9]"
                            : data.imageOrientation === "square"
                            ? "aspect-[1/1]"
                            : "aspect-[4/5]"
                        } max-h-[40em] object-cover rounded-lg`}
                      />

                      {/* SWAP DATA OVERLAY */}
                      {data?.type === "OutfitShowcase" && (
                        <div
                          className={`p-2 ${
                            isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
                          } rounded-lg absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10`}
                        >
                          <div className="flex gap-2 items-center justify-center">
                            {/* OFFERED GARMENT */}
                            <div className="w-[6em] h-[6em] rounded-md">
                              <img
                                src={data?.swapData?.offered?.coverImg}
                                alt="Offered garment pic"
                                className="h-full w-full object-cover rounded-md"
                              />
                            </div>

                            {/* OBTAINED GARMENT */}
                            <div className="w-[6em] h-[6em] rounded-md">
                              <img
                                src={data?.swapData?.obtained?.coverImg}
                                alt="Obtained garment pic"
                                className="h-full w-full object-cover rounded-md"
                              />
                            </div>

                            {/* SWAP ICON */}
                            <div
                              className={`rounded-full bg-[#02995D] ${
                                isNightMode ? "bg-opacity-30" : "bg-opacity-10"
                              } backdrop-blur-md absolute backdrop-brightness-50 border border-[#02995D] p-2`}
                            >
                              <Swapicon size={"1em"} color={"#02995D"} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SWAP DATA POST */}
              {data?.type == "Swap" && (
                <div className="col-span-12 mb-2 xl:hidden">
                  <SwapCard swapData={data} />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* POST ANALITICS */}
        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-1"></div>
          {/* ANALITICS*/}
          <div className="flex col-span-11 items-center justify-between">
            <div className="flex gap-4">
              <div
                className={`${
                  liked ? "opacity-100" : "opacity-50"
                } flex items-center justify-center cursor-pointer rounded-lg gap-1`}
                onMouseEnter={() => setLiked(true)}
                onMouseLeave={() => setLiked(data?.postAnalitics?.postLiked)}
              >
                <HeartIcon
                  size={"1.5em"}
                  colorFill={`#0DBC73`}
                  colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                  isSelected={liked}
                />
                <p
                  className={`${
                    liked
                      ? `text-[#0DBC73]`
                      : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
                  } font-bold`}
                >
                  {data?.postAnalitics?.likes}
                </p>
              </div>
              {data?.type !== "Swap" && (
                <div
                  className={`opacity-50 flex items-center justify-center cursor-pointer rounded-lg gap-1`}
                >
                  <CommentsIcon
                    size={"1.5em"}
                    colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                  />
                  <p
                    className={`${
                      isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"
                    } font-bold`}
                  >
                    {data?.postAnalitics?.comments}
                  </p>
                </div>
              )}
              <div
                className={`${
                  shared ? "opacity-100" : "opacity-50"
                } flex items-center justify-center cursor-pointer rounded-lg gap-1`}
                onMouseEnter={() => setShared(true)}
                onMouseLeave={() => setShared(data?.postAnalitics?.postShared)}
              >
                <ShareIcon
                  size={"1.5em"}
                  colorFill={`#0DBC73`}
                  colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                  isSelected={shared}
                />
                <p
                  className={`${
                    shared
                      ? `text-[#0DBC73]`
                      : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
                  } font-bold`}
                >
                  {data?.postAnalitics?.shares}
                </p>
              </div>
            </div>
            <div
              className={`${
                saved ? "opacity-100" : "opacity-50"
              } flex items-center justify-center cursor-pointer rounded-lg gap-1`}
              onMouseEnter={() => setSaved(true)}
              onMouseLeave={() => setSaved(data?.postAnalitics?.postSaved)}
            >
              <SaveIcon
                size={"1.5em"}
                colorFill={`#0DBC73`}
                colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                isSelected={saved}
              />
              <p
                className={`${
                  saved
                    ? `text-[#0DBC73]`
                    : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
                } font-bold`}
              >
                {data?.postAnalitics?.saves}
              </p>
            </div>
          </div>
        </div>
        <hr
          className={`col-span-12 mt-4 md:hidden ${
            isNightMode ? "border-white/10" : "border-gray-500/1"
          }`}
        />
      </div>
    </>
  );
};

export default PostCard;
