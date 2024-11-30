import React, { useState, useRef } from "react";
import Icon from "@mdi/react";
import { useTheme } from "@/context/ThemeContext.js";
import { useTranslation } from "react-i18next";
import { mdiEmoticonHappyOutline } from "@mdi/js";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

type CommentSectionProps = {
  postData: any;
};

const CommentSection: React.FC<CommentSectionProps> = ({ postData }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef<any>(null);
  const { t } = useTranslation();
  const { isNightMode } = useTheme();

  const handleEmojiClick = (emojiData: any) => {
    setComment((prevComment) => prevComment + emojiData.emoji);
    commentInputRef.current.focus();
  };

  return (
    <>
      {/* Add Comment Section (Desktop) */}
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
      {/* Comments Section */}
      <div className="flex flex-col gap-2 col-span-12 mx-4 mt-2">
        {postData?.comments.map((comment: any, index: number) => (
          <div key={index} className="flex items-center gap-2 max-w-full">
            {/* Comment User Picture */}
            <div className="rounded-full h-4 aspect-square">
              <LazyLoadImage
                src={comment.profilePicture}
                alt="User pic"
                className="rounded-full w-full h-full"
              />
            </div>

            {/* Comment Text */}
            <div className="flex gap-1 items-center flex-1 min-w-0">
              <p className="font-bold">{comment.username}</p>
              <p className="opacity-50 truncate flex-1">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentSection;
