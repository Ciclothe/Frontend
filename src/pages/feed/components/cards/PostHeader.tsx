import React, { useState } from "react";
import { Icon } from "@mdi/react";
import {
  mdiCircleSmall,
  mdiDotsVertical,
  mdiCameraIris,
  mdiThoughtBubble,
} from "@mdi/js";
import PostOptions from "@/components/layout/PostOptions";
import { useTheme } from "@/context/ThemeContext.js";
import Swapicon from "@/assets/icons/Swapicon";

type PostHeaderProps = {
  data: any;
  type?: string;
};

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

  if (years > 0) return date.getFullYear().toString();
  if (months > 0) return `${months} ${months === 1 ? "month" : "months"}`;
  if (weeks > 0) return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  if (days > 0) return `${days} ${days === 1 ? "day" : "days"}`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};

const PostHeader: React.FC<PostHeaderProps> = ({ data, type }) => {
  const [opened, setOpened] = useState(false);
  const { themeMode } = useTheme();

  // Render post type indicator
  const renderPostTypeIndicator = () => {
    const commonProps = `p-1 rounded-full ${
      themeMode === "dark" ? "text-black" : "text-white"
    }`;

    if (type !== "event") {
      switch (data?.type) {
        case "Photo":
          return (
            <div className={`${commonProps} bg-[#8846F2]`}>
              <Icon path={mdiCameraIris} size={0.5} />
            </div>
          );
        case "Swap":
          return (
            <div className={`p-1 rounded-full bg-[#0DBC73]`}>
              <Swapicon
                size={"0.8em"}
                color={themeMode === "dark" ? "black" : "white"}
              />
            </div>
          );
        case "Text":
          return (
            <div className={`${commonProps} bg-[#DF1E32]`}>
              <Icon path={mdiThoughtBubble} size={0.5} />
            </div>
          );
        default:
          return null;
      }
    }
  };

  // Render community info if available
  const renderCommunityInfo = () => {
    if (data?.communityData) {
      return (
        <div className="flex items-center gap-1">
          <img
            src={data?.communityData.communityPicture}
            alt="Community pic"
            className="w-5 h-5 rounded-full"
          />
          <p className="opacity-50">/{data?.communityData.url}</p>
        </div>
      );
    }
    return null;
  };

  // Render location and date
  const renderLocationAndDate = () => (
    <div className="flex items-center opacity-50">
      <p>
        {data?.userData?.location?.city}, {data?.userData?.location?.country}
      </p>
      <Icon path={mdiCircleSmall} size={0.8} />
      <p>{formatDate(data?.createdAt)}</p>
    </div>
  );

  return (
    <div className="col-span-12 grid grid-cols-12">
      {/* Username and Location */}
      <div className="col-span-11 flex flex-col gap-1">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="font-bold">@{data?.userData?.username}</p>
            {type !== "event" && (
              <>
                {renderPostTypeIndicator()}
                {renderCommunityInfo()}
              </>
            )}
          </div>

          {type !== "event" && renderLocationAndDate()}
        </div>
      </div>

      {/* Post Options (Dots) */}
      <div
        className="col-span-1 flex justify-end relative cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOpened(!opened);
        }}
      >
        <Icon path={mdiDotsVertical} size={0.8} />
        <PostOptions postId={data?.id} opened={opened} setOpened={setOpened} />
      </div>
    </div>
  );
};

export default PostHeader;
