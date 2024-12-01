import React, { useState } from "react";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import CommentsIcon from "@/assets/uiIcons/CommentsIcon";
import ShareIcon from "@/assets/uiIcons/ShareIcon";
import SaveIcon from "@/assets/uiIcons/SaveIcon";
import { useTheme } from "@/context/ThemeContext.js";

type PostInteractionsProps = {
  data: any;
  isDetails?: boolean;
};

const PostInteractions: React.FC<PostInteractionsProps> = ({
  data,
  isDetails = false,
}) => {
  const [liked, setLiked] = useState(data?.postAnalitics?.postLiked);
  const [shared, setShared] = useState(data?.postAnalitics?.postShared);
  const [saved, setSaved] = useState(data?.postAnalitics?.postSaved);
  const { isNightMode } = useTheme();

  return (
    <div className="col-span-12 grid grid-cols-12">
      {!isDetails && <div className="col-span-1"></div>}
      <div
        className={`flex ${
          isDetails ? "col-span-12" : "col-span-11"
        } items-center justify-between`}
      >
        <div className="flex gap-4">
          {/* Like Button */}
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
                  ? "text-[#0DBC73]"
                  : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
              } font-bold`}
            >
              {data?.postAnalitics?.likes}
            </p>
          </div>

          {/* Comments Button */}
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

          {/* Share Button */}
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
                  ? "text-[#0DBC73]"
                  : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
              } font-bold`}
            >
              {data?.postAnalitics?.shares}
            </p>
          </div>
        </div>

        {/* Save Button */}
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
                ? "text-[#0DBC73]"
                : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
            } font-bold`}
          >
            {data?.postAnalitics?.saves}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostInteractions;