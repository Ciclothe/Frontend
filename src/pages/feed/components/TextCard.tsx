import React, { useState, useEffect } from "react";
import PostInteractionsCard from "./cards/PostInteractionsCard";
import PostHeader from "./cards/PostHeader";
import ProfileImage from "@/components/ui/ProfilePic";
import { useTheme } from "@/context/ThemeContext.js";

interface TextCardProps {
  data: {
    id: number;
    category: string;
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

const extractYouTubeThumbnail = (description: string): string | null => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const foundUrl = description.match(urlRegex);

  if (foundUrl) {
    const videoUrl = foundUrl[0];
    const videoIdMatch = videoUrl.match(
      /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/
    );
    return videoIdMatch
      ? `https://img.youtube.com/vi/${videoIdMatch[1]}/0.jpg`
      : null;
  }
  return null;
};

const TextCard: React.FC<TextCardProps> = ({ data, onClick }) => {
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const { themeMode } = useTheme();

  useEffect(() => {
    setVideoThumbnail(extractYouTubeThumbnail(data.postDescription));
  }, [data.postDescription]);

  const isDarkMode = themeMode === "dark";

  return (
    <div
      className={`
        ${
          isDarkMode
            ? "text-white hover:md:bg-[#171717] md:border-white/10"
            : "text-black hover:md:bg-[#F7F7F7] md:border-gray-500/10"
        }
        grid grid-cols-12 rounded-xl md:p-4 gap-2 cursor-pointer md:border
      `}
      onClick={onClick}
    >
      {/* Profile Section */}
      <div className="col-span-1 max-h-full overflow-hidden">
        <div className="flex justify-center">
          <ProfileImage
            profilePic={data.userData.profilePicture}
            height="1.3rem"
          />
        </div>
        <div className="col-span-1 h-full flex justify-center mt-2">
          <div
            className={`w-[1px] h-full mt-2 ${
              isDarkMode ? "bg-white/10" : "bg-gray-500/10"
            }`}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-11 grid grid-cols-12 gap-2">
        <PostHeader data={data} />
        <div className="col-span-12 flex flex-col md:flex-row gap-2">
          <div
            className={`md:flex p-4 rounded-xl ${
              isDarkMode ? "bg-[#202020]" : "bg-[#F5F5F5]"
            }`}
          >
            <div className="flex-1 justify-center">
              <p className="font-bold text-[1.2em] titleStyles">
                {data.postTitle}
              </p>
              <p className="descriptionStylesPreview mt-4">
                {data.postDescription.split(" ").map((word, index) =>
                  word.match(/https?:\/\/[^\s]+/) ? (
                    <a
                      key={index}
                      href={word}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0DBC73] underline"
                    >
                      {word}
                    </a>
                  ) : (
                    ` ${word}`
                  )
                )}
              </p>
              <div
                className={`${
                  themeMode === "dark"
                    ? "bg-[#413F3F] text-[#1C1C1C]"
                    : "bg-[#E4E4E4] text-[#B3B3B5]"
                } px-2 py-1 rounded-full mt-2 w-fit`}
              >
                <p>{data?.category}</p>
              </div>
            </div>
            {videoThumbnail && (
              <div className="aspect-[3/2] md:w-[8em] md:max-w-[8em] w-full">
                <img
                  src={videoThumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Interactions */}
      <PostInteractionsCard data={data} />

      {/* Divider for small screens */}
      <hr
        className={`col-span-12 mt-4 md:hidden ${
          isDarkMode ? "border-white/10" : "border-gray-500/10"
        }`}
      />
    </div>
  );
};

export default TextCard;
