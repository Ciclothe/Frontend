import React from "react";
import { useTheme } from "@/context/ThemeContext.js";
import { useLocation } from "react-router-dom";
import PostInteractionsCard from "./cards/PostInteractionsCard";
import PostHeader from "./cards/PostHeader";
import PostImage from "./cards/PostImage";
import ProfileImage from "@/components/ui/ProfilePic";

interface PostCardProps {
  data: any;
  onClick: () => void;
  type?: string;
}

const PostCard: React.FC<PostCardProps> = ({ data, onClick, type }) => {
  const { themeMode } = useTheme();
  const location = useLocation();
  const isExplorePage = location.pathname === "/explore";

  const containerClasses = [
    "grid",
    "grid-cols-12",
    "rounded-xl",
    "gap-2",
    "cursor-pointer",
    themeMode === "dark" ? "text-white" : "text-black",
    isExplorePage || type === "event"
      ? ""
      : themeMode === "dark"
      ? "md:hover:bg-[#1E1E1E]"
      : "hover:md:bg-[#F7F7F7]",
    !isExplorePage && type !== "event" ? "md:p-4 md:border md:border-1" : "",
    !isExplorePage && themeMode === "dark" ? "md:border-white/10" : "",
    !isExplorePage && themeMode !== "dark" ? "md:border-gray-500/1" : "",
  ].join(" ");

  const dividerClasses =
    themeMode === "dark" ? "bg-white/10" : "bg-gray-500/10";

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* Profile Picture Section */}
      <div className="col-span-1 max-h-full overflow-hidden">
        <div className="flex justify-center">
          <ProfileImage
            profilePic={data?.userData?.profilePicture}
            height="1.3rem"
          />
        </div>
        <div className="col-span-1 h-full flex justify-center mt-2">
          <div className={`w-[1px] h-full mt-2 ${dividerClasses}`}></div>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="col-span-11 grid grid-cols-12 gap-2">
        <PostHeader data={data} type={type} />
        <PostImage data={data} />

        {data?.type !== "Text" && (
          <div className="col-span-12">
            <p className="descriptionStylesPreview text-[1.2em] font-bold">
              {data?.type === "Swap" ? "" : data?.postDescription}
            </p>
          </div>
        )}
      </div>

      {/* Post Interactions */}
      {type !== "event" && <PostInteractionsCard data={data} />}

      {/* Divider for Small Screens */}
      <hr
        className={`col-span-12 mt-4 md:hidden ${
          themeMode === "dark" ? "border-white/10" : "border-gray-500/1"
        }`}
      />
    </div>
  );
};

export default PostCard;
