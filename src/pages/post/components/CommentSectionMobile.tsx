import { useState, useRef } from "react";
import Icon from "@mdi/react";
import { mdiEmoticonHappyOutline } from "@mdi/js";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

const CommentSectionMobile = () => {
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { themeMode } = useTheme();

  const handleEmojiClick = (emoji: any) => {
    setComment((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleCommentSubmit = () => {
    if (comment.trim().length > 0) {
      setComment("");
    }
  };

  return (
    <div
      className={`md:hidden w-full justify-between items-center gap-1 col-span-12 py-2 px-4 sticky bottom-0 z-[2000] ${
        themeMode === "dark" ? "bg-[#0b0b0b]" : "bg-[#ffffff]"
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
              theme={themeMode === "dark" ? Theme.DARK : Theme.LIGHT}
              reactionsDefaultOpen={false}
            />
          </div>
        )}
      </div>

      {/* Send Button */}
      {comment.length > 0 && (
        <div
          className="bg-[#0DBC73] w-full flex items-center justify-center py-2 rounded-lg cursor-pointer"
          onClick={handleCommentSubmit}
        >
          {t("Global.Reply")}
        </div>
      )}
    </div>
  );
};

export default CommentSectionMobile;
