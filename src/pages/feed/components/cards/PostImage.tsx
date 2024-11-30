import React, { useState } from "react";
import ImageCarousel from "@/components/ui/ImageCarousel";
import SwapCard from "@/components/layout/SwapCard";
import Swapicon from "@/assets/icons/Swapicon";
import { useTheme } from "@/context/ThemeContext.js";
import Skeleton from "@mui/material/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

type PostImageProps = {
  data: any;
};

const PostImage: React.FC<PostImageProps> = ({ data }) => {
  const { isNightMode } = useTheme();
  const [isLoadingOffered, setIsLoadingOffered] = useState(true);
  const [isLoadingObtained, setIsLoadingObtained] = useState(true);
  const [isLoadingPostImg, setIsLoadingPostImg] = useState(true);

  return (
    <div className="col-span-12 grid grid-cols-12">
      <div className="col-span-12 grid grid-cols-12 gap-1 justify-center">
        {/* POST IMAGE */}
        {data?.type === "Swap" ? (
          <ImageCarousel
            garmentImgs={data?.garmentImgs || []}
            data={data}
            isPostDetails={false}
          />
        ) : (
          <div className="col-span-12 grid grid-cols-12">
            <div
              className={`${
                data.imageOrientation === "landscapes"
                  ? "aspect-[3/2] md:aspect-[16/9]"
                  : data.imageOrientation === "square"
                  ? "aspect-[1/1]"
                  : "aspect-[4/5]"
              } max-h-[40em] col-span-12 rounded-lg relative flex items-center justify-start`}
            >
              <div className="relative w-full h-full">
                {/* Imagen principal con Skeleton */}
                {isLoadingPostImg && (
                  <Skeleton
                    sx={{
                      height: "100%",
                      width: "100%",
                      bgcolor: isNightMode ? "grey.900" : "grey.400",
                      borderRadius: "5%",
                    }}
                    variant="rectangular"
                    className="absolute inset-0"
                  />
                )}
                <LazyLoadImage
                  src={data?.postImg}
                  className={`w-full h-full object-cover rounded-md`}
                  onLoad={() => setIsLoadingPostImg(false)}
                />

                {/* SWAP DATA OVERLAY */}
                {data?.type === "OutfitShowcase" && (
                  <div
                    className={`p-2 ${
                      isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
                    } rounded-lg absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10`}
                  >
                    <div className="flex gap-2 items-center justify-center">
                      {/* OFFERED GARMENT */}
                      <div className="relative w-[4em] h-[4em] md:w-[6em] md:h-[6em] rounded-md">
                        {isLoadingOffered && (
                          <Skeleton
                            sx={{
                              width: "100%",
                              height: "100%",
                              bgcolor: isNightMode ? "grey.900" : "grey.400",
                              borderRadius: "5%",
                            }}
                            variant="rectangular"
                            className="absolute inset-0"
                          />
                        )}
                        <LazyLoadImage
                          src={data?.swapData?.offered?.coverImg}
                          className="w-full h-full object-cover rounded-md"
                          onLoad={() => setIsLoadingOffered(false)}
                        />
                      </div>

                      {/* OBTAINED GARMENT */}
                      <div className="relative w-[4em] h-[4em] md:w-[6em] md:h-[6em] rounded-md">
                        {isLoadingObtained && (
                          <Skeleton
                            sx={{
                              width: "100%",
                              height: "100%",
                              bgcolor: isNightMode ? "grey.900" : "grey.400",
                              borderRadius: "5%",
                            }}
                            variant="rectangular"
                            className="absolute inset-0"
                          />
                        )}
                        <LazyLoadImage
                          src={data?.swapData?.obtained?.coverImg}
                          className="w-[4em] h-[4em] md:w-[6em] md:h-[6em] object-cover rounded-md"
                          onLoad={() => setIsLoadingObtained(false)}
                        />
                      </div>

                      {/* SWAP ICON */}
                      <div
                        className={`rounded-full bg-[#02995D] ${
                          isNightMode ? "bg-opacity-30" : "bg-opacity-10"
                        } backdrop-blur-md absolute backdrop-brightness-50 border border-[#02995D] p-2`}
                      >
                        <Swapicon size="1em" color="#02995D" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SWAP DATA POST */}
        {data?.type === "Swap" && (
          <div className="col-span-12 mb-2 xl:hidden">
            <SwapCard swapData={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostImage;
