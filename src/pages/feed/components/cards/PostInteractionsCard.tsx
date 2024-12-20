import React, { useState } from "react";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import CommentsIcon from "@/assets/uiIcons/CommentsIcon";
import { useTheme } from "@/context/ThemeContext.js";
import ProfileImage from "@/components/ui/ProfilePic";
import SwapIcon from "@/assets/icons/Swapicon";
import { useLocation } from "react-router-dom";

type PostInteractionsProps = {
  data: any;
  isDetails?: boolean;
};

const PostInteractionsCard: React.FC<PostInteractionsProps> = ({
  data,
  isDetails = false,
}) => {
  const [liked, setLiked] = useState(data?.postAnalitics?.postLiked);
  const { themeMode } = useTheme();
  const location = useLocation();
  const isExplore = location.pathname === "/explore";

  return (
    <div className="col-span-12 grid grid-cols-12">
      {!isDetails && <div className="col-span-1"></div>}
      <div
        className={`flex ${
          isDetails ? "col-span-12" : "col-span-11"
        } items-center justify-between gap-2`}
      >
        <div className="flex">
          {data?.type !== "Swap" ? (
            data?.comments?.length ? (
              <div className="flex items-center gap-2">
                <div className="flex">
                  <div>
                    <ProfileImage
                      profilePic={data?.comments[0].profilePicture}
                      height={"1.2rem"}
                    />
                  </div>
                  {data?.comments[1] && (
                    <div className="ml-[-10px]">
                      <ProfileImage
                        profilePic={data?.comments[1].profilePicture}
                        height={"1.2rem"}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <p className="titleStyles">
                    <span className="font-bold">
                      {data?.comments?.length} People
                    </span>
                    <span className="opacity-50"> are chatting about this</span>
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="opacity-50 titleStyles">0 Comments</p>
              </div>
            )
          ) : (
            <>
              {data.swapOffers?.length ? (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <div>
                      <ProfileImage
                        profilePic={data?.swapOffers[0].profilePicture}
                        height={"1.2rem"}
                      />
                    </div>
                    {data?.swapOffers[1] && (
                      <div className="ml-[-10px]">
                        <ProfileImage
                          profilePic={data?.swapOffers[1].profilePicture}
                          height={"1.2rem"}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="titleStyles">
                      <span className="font-bold">
                        {data.swapOffers?.length} People
                      </span>
                      <span className="opacity-50">
                        {" "}
                        are offering a swap right now
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="opacity-50 titleStyles">0 Offers</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex gap-4">
          {/* Comments Button */}
          {data?.type !== "Swap" ? (
            <div
              className={`${
                themeMode === "dark"
                  ? "bg-[#F7F7F7] text-black"
                  : "bg-[#171717] text-white"
              }  px-3 flex items-center justify-center cursor-pointer rounded-full gap-2`}
            >
              <CommentsIcon
                size={"1.2em"}
                colorFill={`${themeMode === "dark" ? "#232323" : "#F1F1F1"}`}
              />
              <p>comment</p>
            </div>
          ) : (
            <div
              className={`${
                themeMode === "dark" ? "text-black" : "text-white"
              } bg-[#0DBC73] px-3 py-1 flex items-center justify-center cursor-pointer rounded-full gap-2`}
            >
              <SwapIcon
                size={"1.2em"}
                color={`${themeMode === "dark" ? "#232323" : "#F1F1F1"}`}
              />
              <p>offer</p>
            </div>
          )}

          {!isExplore && (
            <div
              className={`${
                themeMode === "dark" ? "bg-[#171717]" : "bg-[#F7F7F7]"
              } ${
                liked ? "opacity-100" : "opacity-50"
              } flex items-center justify-center cursor-pointer rounded-full gap-1 p-2`}
              onMouseEnter={() => setLiked(true)}
              onMouseLeave={() => setLiked(data?.postAnalitics?.postLiked)}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <HeartIcon
                size={"1.2em"}
                colorFill={`#0DBC73`}
                colorStroke={`${themeMode === "dark" ? "#F1F1F1" : "#232323"}`}
                isSelected={liked}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostInteractionsCard;
