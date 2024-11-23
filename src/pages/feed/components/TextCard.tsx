import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiDotsVertical, mdiCircleSmall } from "@mdi/js";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import CommentsIcon from "@/assets/uiIcons/CommentsIcon";
import ShareIcon from "@/assets/uiIcons/ShareIcon";
import SaveIcon from "@/assets/uiIcons/SaveIcon";
import PostOptions from "@/components/layout/PostOptions";
import { useTheme } from "@/context/ThemeContext.js";

interface TextCardProps {
  data: {
    id: number;
    type: "Text";
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
    postTitle: string;
    postDescription: string;
    postAnalitics: {
      likes: number;
      comments: number;
      shares: number;
      saves: number;
      postLiked: boolean;
      postShared: boolean;
      postSaved: boolean;
    };
    comments: Array<{
      username: string;
      profilePicture: string;
      comment: string;
    }>;
  };
}

const TextCard: React.FC<TextCardProps> = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);
  const [opened, setOpened] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const { isNightMode } = useTheme();

  useEffect(() => {
    setVideoThumbnail(null);
    if (data?.postAnalitics?.postLiked) setLiked(true);
    if (data?.postAnalitics?.postShared) setShared(true);
    if (data?.postAnalitics?.postSaved) setSaved(true);

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const foundUrl = data.postDescription.match(urlRegex);

    if (foundUrl && foundUrl.length > 0) {
      const videoUrl = foundUrl[0];

      const videoIdMatch = videoUrl.match(
        /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (videoId) {
        setVideoThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
      }
    }
  }, [data]);

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
      <div
        className={`${
          isNightMode
            ? "text-white hover:md:bg-[#171717] md:border-white/10"
            : "text-black hover:md:bg-white md:border-gray-500/1"
        } grid grid-cols-12 rounded-xl md:p-4 gap-2 cursor-pointer md:border md:border-2`}
      >
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
        <div className="col-span-11 grid grid-cols-12 gap-2">
          <div className="col-span-12 grid grid-cols-12">
            <div className="col-span-11">
              <div className="items-center gap-2">
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
          <div className="col-span-12 flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <p className="font-bold text-[1.2em] titleStyles">
                {data?.postTitle}
              </p>
              <p className="opacity-50 descriptionStyles">
                {data?.postDescription.split(" ").map((word, index) => {
                  if (word.match(/https?:\/\/[^\s]+/)) {
                    return (
                      <a
                        key={index}
                        href={word}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0DBC73] underline"
                      >
                        {word}
                      </a>
                    );
                  }
                  return ` ${word}`;
                })}
              </p>
            </div>
            {videoThumbnail && (
              <div className="aspect-[16/9] md:w-[8em] md:max-w-[8em] w-full">
                <img
                  src={videoThumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-1"></div>
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
              <div className="opacity-50 flex items-center justify-center cursor-pointer rounded-lg gap-1">
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

export default TextCard;
