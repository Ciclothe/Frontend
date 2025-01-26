import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "@mui/material/Skeleton";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useTheme } from "@/context/ThemeContext.js";

type PostImageProps = {
  data: any;
};

const PostImage: React.FC<PostImageProps> = ({ data }) => {
  const { themeMode } = useTheme();
  const [isLoadingPostImg, setIsLoadingPostImg] = useState(true);

  // Utility function to handle skeleton color based on theme
  const skeletonColor = themeMode === "dark" ? "grey.900" : "grey.400";

  // Render Swap Post
  const renderSwapPost = () => (
    <div className="col-span-12 grid grid-cols-12 gap-1 justify-center">
      <ImageCarousel
        garmentImgs={data?.garmentImgs || []}
        data={data}
        isPostDetails={false}
      />
    </div>
  );

  // Render Post Image
  const renderPostImage = () => (
    <div className="col-span-12 grid grid-cols-12">
      <div
        className={`${
          data.imageOrientation === "landscapes"
            ? "aspect-[3/2]"
            : data.imageOrientation === "square"
              ? "aspect-[5/6] md:aspect-[1/1]"
              : "aspect-[4/5] max-w-[100%] md:max-w-[80%]"
        } col-span-12 rounded-xl relative flex items-center justify-start`}
      >
        <div className="relative w-full h-full">
          {/* Post Image with Skeleton Loading */}
          {isLoadingPostImg && (
            <Skeleton
              sx={{
                height: "100%",
                width: "100%",
                bgcolor: skeletonColor,
                borderRadius: "5%",
              }}
              variant="rectangular"
              className="absolute inset-0"
            />
          )}
          <LazyLoadImage
            src={data?.postImg}
            className="w-full h-full object-cover rounded-xl"
            onLoad={() => setIsLoadingPostImg(false)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="col-span-12 grid grid-cols-12">
      {data?.type === "Swap" ? renderSwapPost() : renderPostImage()}
    </div>
  );
};

export default PostImage;
