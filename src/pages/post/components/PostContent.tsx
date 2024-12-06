import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTheme } from "@/context/ThemeContext.js";

type PostContentProps = {
  postData: any;
  videoThumbnail?: string | null;
  foundUrl?: string;
};

const PostContent: React.FC<PostContentProps> = ({
  postData,
  videoThumbnail,
  foundUrl,
}) => {
  const [isLoadVideoThumbnail, setIsLoadVideoThumbnail] = useState(true);
  const { themeMode } = useTheme();

  return postData?.type !== "Text" ? (
    <div className="col-span-12 mx-4 mt-1">
      <p className="text-[1.3em] font-bold">
        {postData.type === "Swap"
          ? postData?.garmentTitle
          : postData?.postDescription}
      </p>
    </div>
  ) : (
    <div className="col-span-12 m-4 flex flex-col gap-2">
      <p className="text-[1.3em] font-bold">{postData?.postTitle}</p>
      <p className="text-[1.2em] opacity-50">{postData?.postDescription}</p>
      {videoThumbnail && (
        <div
          className="aspect-[16/9] w-full cursor-pointer relative"
          onClick={() => foundUrl && window.open(foundUrl)}
        >
          {isLoadVideoThumbnail && (
            <Skeleton
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: themeMode === "dark" ? "grey.900" : "grey.400",
                borderRadius: "1%",
              }}
              variant="rectangular"
              className="absolute inset-0"
            />
          )}
          <LazyLoadImage
            src={videoThumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-lg"
            onLoad={() => setIsLoadVideoThumbnail(false)}
          />
        </div>
      )}
    </div>
  );
};

export default PostContent;
