import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Swapicon from "@/assets/icons/Swapicon";
import { useTheme } from "@/context/ThemeContext.js";

type PostImageProps = {
  postData: any;
};

const PostImage: React.FC<PostImageProps> = ({ postData }) => {
  const [isLoadingPostImg, setIsLoadingPostImg] = useState(true);
  const { themeMode } = useTheme();

  const imageOrientationClass =
    postData?.imageOrientation === "landscapes"
      ? "aspect-[3/2] md:aspect-[16/9]"
      : postData?.imageOrientation === "square"
      ? "aspect-[1/1]"
      : "aspect-[4/5]";

  return (
    <div className="col-span-12 relative flex items-center justify-center">
      <div className={`${imageOrientationClass} max-h-[35em] relative`}>
        {/* Skeleton Loader */}
        {isLoadingPostImg && (
          <Skeleton
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: themeMode === "dark" ? "grey.900" : "grey.400",
            }}
            variant="rectangular"
            className="absolute inset-0"
          />
        )}

        {/* Lazy Load Image */}
        <LazyLoadImage
          src={postData?.postImg}
          alt="post image"
          className="w-full h-full object-cover"
          onLoad={() => setIsLoadingPostImg(false)}
        />

        {/* Swap Data Overlay */}
        {postData?.type === "OutfitShowcase" && (
          <div
            className={`p-2 ${
              themeMode === "dark" ? "bg-[#232323]" : "bg-[#F1F1F1]"
            } rounded-lg absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10`}
          >
            <div className="flex gap-2 items-center justify-center">
              {/* Offered Garment */}
              <div className="relative w-[4em] h-[4em] md:w-[6em] md:h-[6em] rounded-md">
                <LazyLoadImage
                  src={postData?.swapData?.offered?.coverImg}
                  alt="Offered garment pic"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Obtained Garment */}
              <div className="relative w-[4em] h-[4em] md:w-[6em] md:h-[6em] rounded-md">
                <LazyLoadImage
                  src={postData?.swapData?.obtained?.coverImg}
                  alt="Obtained garment pic"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Swap Icon */}
              <div
                className={`rounded-full bg-[#0DBC73] ${
                  themeMode === "dark" ? "bg-opacity-30" : "bg-opacity-10"
                } backdrop-blur-md absolute backdrop-brightness-50 border border-[#0DBC73] p-2`}
              >
                <Swapicon size="1em" color="#0DBC73" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostImage;
