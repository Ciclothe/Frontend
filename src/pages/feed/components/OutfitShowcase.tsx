import Icon from "@mdi/react";
import { mdiDotsVertical, mdiEmoticonHappyOutline } from "@mdi/js";
import Swapicon from "@/assets/icons/Swapicon";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import CommentsIcon from "@/assets/uiIcons/CommentsIcon";
import ShareIcon from "@/assets/uiIcons/ShareIcon";
import SaveIcon from "@/assets/uiIcons/SaveIcon";
import React, { useState, useEffect, useRef } from "react";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";

interface OutfitShowcaseProps {
  data: {
    userData: {
      username: string;
      profilePicture: string;
      location: {
        city: string;
        country: string;
      };
    };
    postDescription: string;
    postImg: string;
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
}

const OutfitShowcase: React.FC<OutfitShowcaseProps> = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef<any>(null);

  useEffect(() => {
    if (data?.postAnalitics?.postLiked) {
      setLiked(true);
    }
    if (data?.postAnalitics?.postShared) {
      setShared(true);
    }
    if (data?.postAnalitics?.postSaved) {
      setSaved(true);
    }
  }, []);

  const focusCommentInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    setComment((prevComment) => prevComment + emojiData.emoji);
    commentInputRef.current.focus();
  };

  return (
    <div className="w-full flex items-center justify-center relative sm:border rounded-xl border-1 border-[#3E3E3D]">
      <div className="hidden sm:block absolute left-0 top-0 w-full h-full rounded-xl">
        <div className="relative w-full h-full rounded-xl">
          <img
            src={data?.postImg}
            className="rounded-xl w-full h-full object-cover"
          />
          <div className="bg-black bg-opacity-90 backdrop-blur-md backdrop-brightness-90 absolute z-10 left-0 top-0 w-full h-full rounded-xl"></div>
        </div>
      </div>
      {/* Main Container for Post */}
      <div className="sm:bg-[#232323] md:w-[80%] lg:w-[75%] sm:p-4 text-white gap-4 grid grid-cols-12 z-10 rounded-xl md:rounded-none">
        {/* USER DATA */}
        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-1 flex justify-center">
            {/* User Profile Picture */}
            <img
              src={data?.userData?.profilePicture}
              alt="User pic"
              className="rounded-full h-7 aspect-square"
            />
          </div>
          {/* Username and Location */}
          <div className="col-span-10">
            <div className="flex items-center gap-2">
              <p className="font-bold">@{data?.userData?.username}</p>
              <p className="opacity-50">
                {data?.userData?.location?.city},{" "}
                {data?.userData?.location?.country}
              </p>
            </div>
            {/* POST DESCRIPTION */}
            <p className="titleStyles">{data?.postDescription}</p>
          </div>
          <div className="col-span-1 flex justify-end">
            <Icon path={mdiDotsVertical} size={0.8} />
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-1 h-full flex justify-center mt-[-20px] sm:mt-[0px]">
            <div className="w-[0.5px] h-full bg-gray-50 opacity-50 sm:hidden"></div>
          </div>
          <div className="col-span-11 grid grid-cols-12 gap-1 justify-center">
            {/* POST IMAGE */}
            <div className="col-span-12 grid grid-cols-12">
              <div className="col-span-12 sm:col-span-11 sm:mr-4 aspect-[4/5] rounded-lg relative flex items-center justify-center">
                <img
                  src={data?.postImg}
                  alt="post image"
                  className="h-full w-full object-cover rounded-lg"
                />

                {/* SWAP DATA OVERLAY */}
                <div className="p-2 bg-[#232323] rounded-lg absolute bottom-2">
                  <div className="flex gap-2 items-center justify-center">
                    {/* OFFERED GARMENT */}
                    <div className="w-[6em] h-[6em] rounded-md bg-red-500">
                      <img
                        src={data?.swapData?.offered?.coverImg}
                        alt="Offered garment pic"
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>

                    {/* OBTAINED GARMENT */}
                    <div className="w-[6em] h-[6em] rounded-md bg-red-500">
                      <img
                        src={data?.swapData?.obtained?.coverImg}
                        alt="Obtained garment pic"
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>

                    {/* SWAP ICON */}
                    <div className="rounded-full bg-[#02995D] bg-opacity-30 backdrop-blur-md backdrop-brightness-50 absolute border border-[#02995D] p-2">
                      <Swapicon size={"1em"} color={"#02995D"} />
                    </div>
                  </div>
                </div>

                {/* ANALITICS TABLET & DESKTOP*/}
                <div className="flex sm:hidden col-span-1 h-full flex-col items-center justify-end gap-4 absolute right-2 bottom-2">
                  <div
                    className={`${
                      liked ? "bg-[#0DBC73]" : "bg-[#3A3A3A] "
                    } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                    onMouseEnter={() => setLiked(true)}
                    onMouseLeave={() =>
                      setLiked(data?.postAnalitics?.postLiked)
                    }
                  >
                    <HeartIcon
                      size={"1.5em"}
                      colorFill={"#232323"}
                      colorStroke={"#F1F1F1"}
                      isSelected={liked}
                    />
                    <p
                      className={`${
                        liked ? "text-[#3A3A3A]" : "text-[#F1F1F1]"
                      } font-bold`}
                    >
                      {data?.postAnalitics?.likes}
                    </p>
                  </div>
                  <div
                    className={`bg-[#3A3A3A]  flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                    onClick={focusCommentInput}
                  >
                    <CommentsIcon
                      size={"1.5em"}
                      colorStroke={"#F1F1F1"}
                      isSelected={liked}
                    />
                    <p className={`text-[#F1F1F1] font-bold`}>
                      {data?.postAnalitics?.comments}
                    </p>
                  </div>
                  <div
                    className={`${
                      shared ? "bg-[#0DBC73]" : "bg-[#3A3A3A] "
                    } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                    onMouseEnter={() => setShared(true)}
                    onMouseLeave={() =>
                      setShared(data?.postAnalitics?.postShared)
                    }
                  >
                    <ShareIcon
                      size={"1.5em"}
                      colorFill={"#232323"}
                      colorStroke={"#F1F1F1"}
                      isSelected={shared}
                    />
                    <p
                      className={`${
                        shared ? "text-[#3A3A3A]" : "text-[#F1F1F1]"
                      } font-bold`}
                    >
                      {data?.postAnalitics?.shares}
                    </p>
                  </div>
                  <div
                    className={`${
                      saved ? "bg-[#0DBC73]" : "bg-[#3A3A3A] "
                    } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                    onMouseEnter={() => setSaved(true)}
                    onMouseLeave={() =>
                      setSaved(data?.postAnalitics?.postSaved)
                    }
                  >
                    <SaveIcon
                      size={"1.5em"}
                      colorFill={"#232323"}
                      colorStroke={"#F1F1F1"}
                      isSelected={saved}
                    />
                    <p
                      className={`${
                        saved ? "text-[#3A3A3A]" : "text-[#F1F1F1]"
                      } font-bold`}
                    >
                      {data?.postAnalitics?.saves}
                    </p>
                  </div>
                </div>
              </div>
              {/* ANALITICS TABLET & DESKTOP*/}
              <div className="hidden sm:flex col-span-1 h-full flex-col items-center justify-center gap-4">
                <div
                  className={`${
                    liked ? "bg-[#0DBC73]" : "bg-[#3A3A3A] "
                  } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                  onMouseEnter={() => setLiked(true)}
                  onMouseLeave={() => setLiked(data?.postAnalitics?.postLiked)}
                >
                  <HeartIcon
                    size={"1.5em"}
                    colorFill={"#232323"}
                    colorStroke={"#F1F1F1"}
                    isSelected={liked}
                  />
                  <p
                    className={`${
                      liked ? "text-[#3A3A3A]" : "text-[#F1F1F1]"
                    } font-bold`}
                  >
                    {data?.postAnalitics?.likes}
                  </p>
                </div>
                <div
                  className={`bg-[#3A3A3A]  flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                  onClick={focusCommentInput}
                >
                  <CommentsIcon
                    size={"1.5em"}
                    colorStroke={"#F1F1F1"}
                    isSelected={liked}
                  />
                  <p className={`text-[#F1F1F1] font-bold`}>
                    {data?.postAnalitics?.comments}
                  </p>
                </div>
                <div
                  className={`${
                    shared ? "bg-[#0DBC73]" : "bg-[#3A3A3A] "
                  } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                  onMouseEnter={() => setShared(true)}
                  onMouseLeave={() =>
                    setShared(data?.postAnalitics?.postShared)
                  }
                >
                  <ShareIcon
                    size={"1.5em"}
                    colorFill={"#232323"}
                    colorStroke={"#F1F1F1"}
                    isSelected={shared}
                  />
                  <p
                    className={`${
                      shared ? "text-[#3A3A3A]" : "text-[#F1F1F1]"
                    } font-bold`}
                  >
                    {data?.postAnalitics?.shares}
                  </p>
                </div>
                <div
                  className={`${
                    saved ? "bg-[#0DBC73]" : "bg-[#3A3A3A] "
                  } flex flex-col items-center justify-center cursor-pointer px-[10px] py-[8px] rounded-lg gap-1`}
                  onMouseEnter={() => setSaved(true)}
                  onMouseLeave={() => setSaved(data?.postAnalitics?.postSaved)}
                >
                  <SaveIcon
                    size={"1.5em"}
                    colorFill={"#232323"}
                    colorStroke={"#F1F1F1"}
                    isSelected={saved}
                  />
                  <p
                    className={`${
                      saved ? "text-[#3A3A3A]" : "text-[#F1F1F1]"
                    } font-bold`}
                  >
                    {data?.postAnalitics?.saves}
                  </p>
                </div>
              </div>
            </div>

            {/* COMMENTS */}
            <div className="flex flex-col gap-2 mt-2 col-span-12 sm:col-span-11 sm:mr-4">
              {data?.comments.map((comment, index) => (
                <div key={index} className="flex items-center gap-2 max-w-full">
                  {/* Comment User Picture */}
                  <div className="rounded-full h-4 aspect-square">
                    <img
                      src={comment.profilePicture}
                      alt="User pic"
                      className="rounded-full w-full h-full"
                    />
                  </div>

                  {/* Comment Text */}
                  <div className="flex gap-1 items-center flex-1 min-w-0">
                    <p className="font-bold">{comment.username}</p>
                    <p className="opacity-50 truncate flex-1">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD COMMENT SECTION */}
            <div className="flex w-full justify-between items-center gap-1 my-2 col-span-12 sm:col-span-11 sm:mr-4 relative">
              <input
                type="text"
                ref={commentInputRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none placeholder-gray-500"
                placeholder="Add a comment..."
              />

              {/* Emoji Icon */}
              <div
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="cursor-pointer"
              >
                <Icon
                  path={mdiEmoticonHappyOutline}
                  size={0.8}
                  className="opacity-50"
                />
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-full mb-2 right-0 z-20">
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    emojiStyle={EmojiStyle.GOOGLE}
                    height={"30em"}
                    skinTonesDisabled={true}
                    searchDisabled={true}
                    theme={Theme.DARK}
                    reactionsDefaultOpen={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitShowcase;
