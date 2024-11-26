import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiDotsVertical,
  mdiCircleSmall,
  mdiEmoticonHappyOutline,
  mdiArrowLeft,
} from "@mdi/js";
import Swapicon from "@/assets/icons/Swapicon";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import CommentsIcon from "@/assets/uiIcons/CommentsIcon";
import ShareIcon from "@/assets/uiIcons/ShareIcon";
import SaveIcon from "@/assets/uiIcons/SaveIcon";
import PostOptions from "@/components/layout/PostOptions";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { useTheme } from "@/context/ThemeContext.js";
import { useTranslation } from "react-i18next";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { usePostButton } from "@/context/CreatePostActive";

const PostDetails = () => {
  const { isNightMode } = useTheme();
  const [opened, setOpened] = useState(false);
  const [liked, setLiked] = useState<any>(false);
  const [shared, setShared] = useState<any>(false);
  const [saved, setSaved] = useState<any>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef<any>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [foundUrl, setFoundUrl] = useState<string | any>(null);
  const { setShowPostButton } = usePostButton();

  const { t } = useTranslation();
  const location = useLocation();

  const encodedPostData = location.state?.postData;
  const postData = encodedPostData
    ? JSON.parse(decodeURIComponent(encodedPostData))
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowPostButton(false);
    setVideoThumbnail(null);
    if (postData?.postAnalitics?.postLiked) setLiked(true);
    if (postData?.postAnalitics?.postShared) setShared(true);
    if (postData?.postAnalitics?.postSaved) setSaved(true);

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

  const handleEmojiClick = (emojiData: any) => {
    setComment((prevComment) => prevComment + emojiData.emoji);
    commentInputRef.current.focus();
  };

  return (
    <>
      {/* Main Container for Post */}
      <button
        className={`${
          isNightMode ? "bg-[#232323]" : "bg-white"
        } p-1 flex items-center justify-center rounded-full ml-4 mt-4`}
        onClick={() => window.history.back()}
      >
        <Icon path={mdiArrowLeft} size={0.7} />
      </button>

      <div
        className={`${
          isNightMode ? "text-white" : "text-black"
        } grid grid-cols-12 ${
          postData?.type !== "Swap" ? "mt-4 md:my-4" : "mt-4"
        }`}
      >
        {postData?.type !== "NotificationSwap" ? (
          <>
            {/* POST INFO */}
            <div className="col-span-12 max-h-full flex gap-2 mx-4">
              {/* PROFILE PIC */}
              <div className="flex justify-center">
                <img
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
                      <div>
                        <div className="flex items-center gap-1">
                          <img
                            src={postData?.communityData.communityPicture}
                            alt="Community pic"
                            className="w-5 h-5 rounded-full"
                          />
                          <p className="opacity-50">
                            /{postData?.communityData.url}
                          </p>
                        </div>
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
            {/* POST DESCRIPTION */}
            {postData?.type !== "Text" ? (
              <div className="col-span-12 mx-4 mt-1">
                <p className="text-[1.3em] font-bold">
                  {postData.type == "Swap"
                    ? postData?.garmentTitle
                    : postData?.postDescription}
                </p>
              </div>
            ) : (
              <div className="col-span-12 m-4 flex flex-col gap-2">
                <p className="text-[1.3em] font-bold">{postData?.postTitle}</p>
                <p className="text-[1.2em] opacity-50">
                  {postData?.postDescription}
                </p>
                {videoThumbnail && (
                  <div
                    className="aspect-[16/9] w-full cursor-pointer"
                    onClick={() => window.open(foundUrl)}
                  >
                    <img
                      src={videoThumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}
            {/* MAIN CONTENT */}
            {postData?.type !== "Text" && (
              <div className="col-span-12 grid grid-cols-12 gap-1 h-[35em] justify-center items-center relative rounded-xl m-4">
                {/* POST IMAGE BACKGROUND */}
                <img
                  src={
                    postData?.type == "Swap"
                      ? postData?.garmentImgs[0]?.src
                      : postData?.postImg
                  }
                  className="absolute object-cover h-full w-full rounded-xl"
                />
                <div className="bg-black absolute h-full w-full bg-opacity-60 backdrop-brightness-50 backdrop-blur-md rounded-xl"></div>
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
                    <div className="col-span-12 relative flex items-center justify-center">
                      <div className="relative">
                        <img
                          src={postData?.postImg}
                          alt="post image"
                          className={`${
                            postData?.imageOrientation === "landscapes"
                              ? "aspect-[16/9]"
                              : postData?.imageOrientation === "square"
                              ? "aspect-[1/1]"
                              : "aspect-[4/5]"
                          } max-h-[35em] object-cover`}
                        />

                        {/* SWAP DATA OVERLAY */}
                        {postData?.type === "OutfitShowcase" && (
                          <div
                            className={`p-2 ${
                              isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
                            } rounded-lg absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10`}
                          >
                            <div className="flex gap-2 items-center justify-center">
                              {/* OFFERED GARMENT */}
                              <div className="w-[6em] h-[6em] rounded-md">
                                <img
                                  src={postData?.swapData?.offered?.coverImg}
                                  alt="Offered garment pic"
                                  className="h-full w-full object-cover rounded-md"
                                />
                              </div>

                              {/* OBTAINED GARMENT */}
                              <div className="w-[6em] h-[6em] rounded-md">
                                <img
                                  src={postData?.swapData?.obtained?.coverImg}
                                  alt="Obtained garment pic"
                                  className="h-full w-full object-cover rounded-md"
                                />
                              </div>

                              {/* SWAP ICON */}
                              <div
                                className={`rounded-full bg-[#02995D] ${
                                  isNightMode
                                    ? "bg-opacity-30"
                                    : "bg-opacity-10"
                                } backdrop-blur-md absolute backdrop-brightness-50 border border-[#02995D] p-2`}
                              >
                                <Swapicon size={"1em"} color={"#02995D"} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="col-span-12 flex items-center justify-between gap-4 mx-4">
              {/* Users Data */}
              <div className="flex gap-2 items-center">
                <div className="flex p-1 border rounded-full border-2 border-[#0DBC73]">
                  <img
                    src={postData?.swapData?.offered?.profilePicture}
                    alt="User pic"
                    className={`rounded-full h-7 aspect-square border border-2 ${
                      isNightMode ? "border-[#232323]" : "border-white"
                    }`}
                  />
                  <img
                    src={postData?.swapData?.obtained?.profilePicture}
                    alt="User pic"
                    className={`rounded-full h-7 aspect-square ml-[-10px] border border-2 ${
                      isNightMode ? "border-[#232323]" : "border-white"
                    }`}
                  />
                </div>
                <div className="font-bold truncate flex-1">
                  <p>
                    <span className="text-[#0DBC73]">
                      @{postData?.swapData?.offered?.userName}
                    </span>{" "}
                    {t("Swipe.MadeASwapWith")}{" "}
                    <span className="text-[#0DBC73]">
                      @{postData?.swapData?.obtained?.userName}
                    </span>
                  </p>
                </div>
              </div>
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
            {/* MAIN CONTENT */}
            {/* POST IMAGE */}
            <div className="col-span-12 grid grid-cols-12 m-4">
              <div className="col-span-12 grid grid-cols-12 relative gap-2 flex items-center justify-center">
                <img
                  src={postData?.swapData?.offered?.coverImg}
                  alt="post image"
                  className="aspect-square object-cover rounded-lg col-span-6"
                />
                {/* SWAP ICON */}
                <div
                  className={`rounded-full bg-[#02995D] ${
                    isNightMode ? "bg-opacity-30" : "bg-opacity-10"
                  } backdrop-blur-md backdrop-brightness-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#02995D] p-2`}
                >
                  <Swapicon size={"1.5em"} color={"#02995D"} />
                </div>
                <img
                  src={postData?.swapData?.obtained?.coverImg}
                  alt="post image"
                  className="aspect-square object-cover rounded-lg col-span-6"
                />
              </div>
            </div>
          </>
        )}
        {/* ANALITICS*/}
        <div className="flex col-span-12 items-center justify-between mx-4">
          <div className="flex gap-4">
            <div
              className={`${
                liked ? "opacity-100" : "opacity-50"
              } flex items-center justify-center cursor-pointer rounded-lg gap-1`}
              onMouseEnter={() => setLiked(true)}
              onMouseLeave={() => setLiked(postData?.postAnalitics?.postLiked)}
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
                    ? `text-[#0DBC73]`
                    : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
                } font-bold`}
              >
                {postData?.postAnalitics?.likes}
              </p>
            </div>
            {postData?.type !== "Swap" && (
              <div
                className={`opacity-50 flex items-center justify-center cursor-pointer rounded-lg gap-1`}
              >
                <CommentsIcon
                  size={"1.5em"}
                  colorStroke={`${isNightMode ? "#F1F1F1" : "#232323"}`}
                />
                <p
                  className={`${
                    isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"
                  } font-bold`}
                >
                  {postData?.postAnalitics?.comments}
                </p>
              </div>
            )}
            <div
              className={`${
                shared ? "opacity-100" : "opacity-50"
              } flex items-center justify-center cursor-pointer rounded-lg gap-1`}
              onMouseEnter={() => setShared(true)}
              onMouseLeave={() =>
                setShared(postData?.postAnalitics?.postShared)
              }
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
                    ? `text-[#0DBC73]`
                    : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
                } font-bold`}
              >
                {postData?.postAnalitics?.shares}
              </p>
            </div>
          </div>
          <div
            className={`${
              saved ? "opacity-100" : "opacity-50"
            } flex items-center justify-center cursor-pointer rounded-lg gap-1`}
            onMouseEnter={() => setSaved(true)}
            onMouseLeave={() => setSaved(postData?.postAnalitics?.postSaved)}
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
                  ? `text-[#0DBC73]`
                  : `${isNightMode ? "text-[#F1F1F1]" : "text-[#3A3A3A]"}`
              } font-bold`}
            >
              {postData?.postAnalitics?.saves}
            </p>
          </div>
        </div>
        {postData?.type !== "Swap" ? (
          <>
            {/* ADD COMMENT SECTION DESKTOP */}
            <div className="hidden md:flex w-full justify-between items-center gap-1 my-1 col-span-12 relative py-2 px-4">
              <input
                type="text"
                ref={commentInputRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none placeholder-gray-500"
                placeholder={t("Global.AddComment")}
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
                    theme={isNightMode ? Theme.DARK : Theme.LIGHT}
                    reactionsDefaultOpen={false}
                  />
                </div>
              )}
            </div>
            <hr
              className={`col-span-12 mt-4 md:mt-0 ${
                isNightMode ? "border-white/10" : "border-gray-400/10"
              }`}
            />
            {/* COMMENTS */}
            <div className="flex flex-col gap-2 col-span-12 mx-4 mt-2">
              {postData?.comments.map((comment: any, index: number) => (
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

            <div
              className={`block md:hidden w-full justify-between items-center gap-1 mt-1 col-span-12 py-2 px-4 sticky bottom-0 z-[2000] ${
                isNightMode ? "bg-[#0b0b0b]" : "bg-[#f0eff4]"
              }`}
            >
              <div className="flex items-center py-2">
                <input
                  type="text"
                  ref={commentInputRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none placeholder-gray-500"
                  placeholder={t("Global.AddComment")}
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
                      theme={isNightMode ? Theme.DARK : Theme.LIGHT}
                      reactionsDefaultOpen={false}
                    />
                  </div>
                )}
              </div>

              {/* SEND BUTTOM */}
              {comment.length > 0 && (
                <div className="bg-[#0DBC73] w-full flex items-center justify-center py-2 rounded-lg">
                  {t("Global.Reply")}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* GARMENT INFO*/}
            <div className="col-span-12 m-4">
              <div>
                <p className="font-bold">Description</p>
                <p
                  style={{ whiteSpace: "pre-line" }}
                  className="mt-2 opacity-50"
                >
                  {postData?.garmentDescription}
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {/* SIZE */}
                <div className="flex w-full items-center justify-between">
                  <p className="font-bold">Size</p>
                  <p className="opacity-50">{postData?.garmentSize}</p>
                </div>
                {/* COLOR */}
                <div className="flex w-full items-center justify-between">
                  <p className="font-bold">Main Color</p>
                  <p className="opacity-50">{postData?.garmentColor}</p>
                </div>
                {/* BRAND */}
                <div className="flex w-full items-center justify-between">
                  <p className="font-bold">Brand</p>
                  <p className="opacity-50">{postData?.garmentBrand}</p>
                </div>
                {/* CONDITION */}
                <div className="flex w-full items-center justify-between">
                  <p className="font-bold">Condition</p>
                  <p className="opacity-50">
                    {postData?.garmentCondition
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                  </p>{" "}
                </div>
              </div>
            </div>
            <div className="bg-[#0b0b0b] col-span-12 p-2 sticky bottom-0 z-[100]">
              <button className="bg-[#02995D] w-full py-2 gap-2 rounded-lg flex items-center justify-center">
                <Swapicon
                  size={"1em"}
                  color={isNightMode ? "white" : "black"}
                />
                <p className="font-bold">Swap</p>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default PostDetails;
