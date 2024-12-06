import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useTheme } from "@/context/ThemeContext.js";
import { usePostButton } from "@/context/CreatePostActive";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PostInteractions from "@/pages/feed/components/cards/PostInteractions";
import CommentSection from "./components/CommentSection";
import GarmentInfo from "./components/GarmentInfo";
import CommentSectionMobile from "./components/CommentSectionMobile";
import SwapPost from "./components/SwapPost";
import PostImage from "./components/PostImage";
import PostContent from "./components/PostContent";
import PostHeader from "./components/PostHeader";

const PostDetails = () => {
  const { themeMode } = useTheme();
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [foundUrl, setFoundUrl] = useState<string | any>(null);
  const { setShowPostButton } = usePostButton();
  const location = useLocation();

  const encodedPostData = location.state?.postData;
  const postData = encodedPostData
    ? JSON.parse(decodeURIComponent(encodedPostData))
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowPostButton(false);
    setVideoThumbnail(null);
    if (postData?.type === "Text") {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const foundedUrl = postData.postDescription.match(urlRegex);

      setFoundUrl(foundedUrl);
      if (foundedUrl && foundedUrl.length > 0) {
        const videoUrl = foundedUrl[0];

        const videoIdMatch = videoUrl.match(
          /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/
        );
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (videoId) {
          setVideoThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
        }
      }
    }
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        {/* Main Container for Post */}
        <div
          className={`${
            themeMode === "dark" ? "text-white" : "text-black"
          } grid grid-cols-12 ${postData?.type !== "Swap" ? "md:mb-4" : ""}`}
        >
          <div
            className={`${
              themeMode === "dark" ? "bg-[#0B0B0B]" : "bg-[#ffffff]"
            } col-span-12 px-2 py-4 md:px-4 md:py-4 sticky top-0 z-[1000]`}
          >
            <button
              className={`${
                themeMode === "dark" ? "bg-[#232323]" : "bg-[#F7F7F7]"
              } p-2 flex items-center justify-center rounded-full aspect-square w-8 h-8`}
              onClick={() => window.history.back()}
            >
              <Icon path={mdiArrowLeft} size={0.7} />
            </button>
          </div>

          {postData?.type !== "NotificationSwap" ? (
            <>
              {/* POST INFO */}
              <PostHeader postData={postData} />
              {/* POST DESCRIPTION */}
              <PostContent
                postData={postData}
                videoThumbnail={videoThumbnail}
                foundUrl={foundUrl}
              />
              {/* MAIN CONTENT */}
              {postData?.type !== "Text" && (
                <div className="col-span-12 grid grid-cols-12 gap-1 h-[35em] justify-center items-center relative rounded-xl m-4">
                  {/* POST IMAGE BACKGROUND */}
                  <LazyLoadImage
                    src={
                      postData?.type == "Swap"
                        ? postData?.garmentImgs[0]?.src
                        : postData?.postImg
                    }
                    className="absolute object-cover h-full w-full rounded-xl"
                  />
                  <div
                    className={`${
                      themeMode === "dark"
                        ? "bg-black bg-opacity-50"
                        : "bg-white bg-opacity-80"
                    } absolute h-full w-full backdrop-brightness-50 backdrop-blur-md rounded-xl`}
                  ></div>
                  {/* Content */}
                  <div className="relative z-10 col-span-12">
                    {/* POST IMAGE */}
                    {postData?.type === "Swap" ? (
                      <ImageCarousel
                        garmentImgs={postData?.garmentImgs || []}
                        data={postData}
                        isPostDetails={true}
                      />
                    ) : (
                      <PostImage postData={postData} />
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <SwapPost postData={postData} />
          )}
          {/* ANALITICS*/}
          <div className="px-4 col-span-12">
            <PostInteractions data={postData} isDetails={true} />
          </div>

          {postData?.type !== "Swap" ? (
            <CommentSection postData={postData} />
          ) : (
            <GarmentInfo postData={postData} />
          )}
        </div>

        {/* ADD COMMENT MOBILE SECTION */}
        <CommentSectionMobile />
      </div>
    </>
  );
};
export default PostDetails;
