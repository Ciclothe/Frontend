import React, { useState } from "react";
import { Icon } from "@mdi/react";
import { mdiCircleSmall, mdiDotsVertical } from "@mdi/js";
import PostOptions from "@/components/layout/PostOptions";

type PostHeaderProps = {
  data: any;
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

const PostHeader: React.FC<PostHeaderProps> = ({ data }) => {
  const [opened, setOpened] = useState(false);

  return (
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
        {data?.type !== "Text" && (
          <p className="descriptionStyles">
            {data?.type === "Swap" ? "" : data?.postDescription}
          </p>
        )}
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
