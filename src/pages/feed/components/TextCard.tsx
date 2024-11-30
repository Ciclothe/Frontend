import React, { useState, useEffect } from "react";
import PostInteractions from "./cards/PostInteractions";
import { useTheme } from "@/context/ThemeContext.js";
import PostHeader from "./cards/PostHeader";

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
  onClick: () => void;
}

const TextCard: React.FC<TextCardProps> = ({ data, onClick }) => {
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const { isNightMode } = useTheme();

  useEffect(() => {
    setVideoThumbnail(null);

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

  return (
    <>
      <div
        className={`${
          isNightMode
            ? "text-white hover:md:bg-[#171717] md:border-white/10"
            : "text-black hover:md:bg-[#F7F7F7] md:border-gray-500/1"
        } grid grid-cols-12 rounded-xl md:p-4 gap-2 cursor-pointer md:border md:border-1`}
        onClick={onClick}
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
          <PostHeader data={data} />
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

        <PostInteractions data={data} />

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
