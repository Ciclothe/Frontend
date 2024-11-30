import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Icon from "@mdi/react";
import { mdiDotsVertical, mdiCircleSmall } from "@mdi/js";
import PostOptions from "@/components/layout/PostOptions";

type PostHeaderProps = {
  postData: any;
};

const PostHeader: React.FC<PostHeaderProps> = ({ postData }) => {
  const [opened, setOpened] = useState(false);

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
    <div className="col-span-12 max-h-full flex gap-2 mx-4">
      {/* PROFILE PIC */}
      <div className="flex justify-center">
        <LazyLoadImage
          src={postData?.userData?.profilePicture}
          alt="User pic"
          className="rounded-full w-full w-auto h-7 aspect-square"
        />
      </div>
      {/* USER DATA */}
      <div className="w-full grid grid-cols-12">
        {/* Username and Location */}
        <div className="col-span-11 flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="font-bold">@{postData?.userData?.username}</p>
            {postData?.communityData && (
              <div className="flex items-center gap-1">
                <LazyLoadImage
                  src={postData?.communityData.communityPicture}
                  alt="Community pic"
                  className="w-5 h-5 rounded-full"
                />
                <p className="opacity-50">/{postData?.communityData.url}</p>
              </div>
            )}
          </div>
          <div className="flex items-center opacity-50">
            <p>
              {postData?.userData?.location?.city},{" "}
              {postData?.userData?.location?.country}
            </p>
            <Icon path={mdiCircleSmall} size={0.8} />
            <p>{formatDate(postData?.createdAt)}</p>
          </div>
        </div>
        {/* POST OPTIONS */}
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
    </div>
  );
};

export default PostHeader;
