import React from "react";
import { useTheme } from "@/context/ThemeContext.js";
import PostInteractions from "./cards/PostInteractions";
import PostHeader from "./cards/PostHeader";
import PostImage from "./cards/PostImage";

interface PostCardProps {
  data: {
    type: string;
    id: number;
    createdAt: string;
    userData: {
      username: string;
      profilePicture: string;
      location: {
        city: string;
        country: string;
      };
    };
    communityData: {
      url: string;
      communityPicture: string;
    };
    postDescription: string;
    postImg: string;
    imageOrientation: string;
    garmentTitle: string;
    garmentCondition: string;
    garmentSize: string;
    garmentBrand: string;
    garmentColor: string;
    garmentDescription: string;
    garmentImgs: Array<{ src: string; orientation: "portrait" | "landscapes" }>;
    postAnalitics: {
      likes: number;
      comments: number;
      shares: number;
      saves: number;
      postLiked: boolean;
      postShared: boolean;
      postSaved: boolean;
    };
    swapData: {
      offered: {
        link: string;
        coverImg: string;
      };
      obtained: {
        link: string;
        coverImg: string;
      };
    };
    comments: Array<{
      username: string;
      profilePicture: string;
      comment: string;
    }>;
  };
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ data, onClick }) => {
  const { themeMode } = useTheme();

  return (
    <>
      {/* Main Container for Post */}
      <div
        className={`${
          themeMode === "dark"
            ? "text-white hover:md:bg-[#171717] md:border-white/10"
            : "text-black hover:md:bg-[#F7F7F7] md:border-gray-500/1"
        } grid grid-cols-12 rounded-xl md:p-4 gap-2 cursor-pointer md:border md:border-1`}
        onClick={onClick}
      >
        {/* PROFILE PIC */}
        <div className="col-span-1 max-h-full overflow-hidden">
          <div className="flex justify-center">
            <img
              src={data?.userData?.profilePicture}
              alt="User pic"
              className="rounded-full w-full sm:w-auto sm:h-7 aspect-square"
            />
          </div>
          <div className="col-span-1 h-full flex justify-center mt-4">
            <div
              className={`w-[1px] h-full mt-2 ${
                themeMode === "dark" ? "bg-white/10" : "bg-gray-500/10"
              }`}
            ></div>
          </div>
        </div>
        <div className="col-span-11 grid grid-cols-12 gap-2">
          <PostHeader data={data} />
          <PostImage data={data} />
        </div>

        <PostInteractions data={data} />

        <hr
          className={`col-span-12 mt-4 md:hidden ${
            themeMode === "dark" ? "border-white/10" : "border-gray-500/1"
          }`}
        />
      </div>
    </>
  );
};

export default PostCard;
