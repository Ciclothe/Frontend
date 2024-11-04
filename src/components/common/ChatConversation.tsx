import Icon from "@mdi/react";
import { mdiEmoticon, mdiPaperclip, mdiSend, mdiDotsHorizontal } from "@mdi/js";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Picker from "emoji-picker-react";
import ClickAwayListener from "@mui/material/ClickAwayListener";

interface ChatConversationProps {
  isChatSelected: {
    photo: string;
    userName: string;
    name: string;
    messages: { text: string; date: string }[];
  } | null;
}

const formatMessageDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = now.toDateString() === date.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  if (isToday) {
    return "Today";
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-EN", { day: "2-digit", month: "short" });
  }
};

const ChatConversation: React.FC<ChatConversationProps> = ({
  isChatSelected,
}) => {
  const { isNightMode } = useTheme();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");

  if (!isChatSelected) {
    return null;
  }

  const handleEmojiClick = (emojiObject: any) => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  return (
    <div
      className={`bg-transparent ${
        isNightMode ? "md:bg-[#141414] text-white" : "md:bg-white text-black"
      } chat-conversation flex flex-col justify-between rounded-xl h-[calc(100vh-7em)] md:h-[calc(100vh-10em)] `}
    >
      <header className="hidden md:flex p-4 items-center border-b border-gray-100">
        <img
          src={isChatSelected.photo}
          alt={isChatSelected.userName}
          className="h-6 w-6 object-cover rounded-full mr-3"
        />
        <div className="flex justify-between w-full items-center">
          <p className="font-semibold text-xs">@{isChatSelected.userName}</p>
          <div>
            <Icon path={mdiDotsHorizontal} size={1} />
          </div>
        </div>
      </header>

      <main className="messages p-4 h-full flex flex-col justify-end overflow-y-auto">
        {isChatSelected.messages.length > 0 && (
          <div className="flex flex-col overflow-y-auto">
            {isChatSelected.messages.map((message, index) => {
              const previousDate =
                index > 0
                  ? new Date(isChatSelected.messages[index - 1].date)
                  : null;
              const currentDate = new Date(message.date);
              const showDate =
                !previousDate ||
                previousDate.toDateString() !== currentDate.toDateString();

              const isFirst = index === 0;
              const isLast = index === isChatSelected.messages.length - 1;
              const isMiddle = !isFirst && !isLast;
              let borderRadiusClass = "";

              if (isFirst) {
                borderRadiusClass = "rounded-t-xl rounded-br-xl";
              } else if (isLast) {
                borderRadiusClass = "rounded-b-xl rounded-tr-xl";
              } else if (isMiddle) {
                borderRadiusClass = "rounded-r-xl";
              }

              return (
                <React.Fragment key={index}>
                  {showDate && (
                    <div className="flex justify-center items-center">
                      <hr className="w-[20%]" />
                      <div className="text-center text-[0.8em] w-fit py-1 px-3 opacity-50 font-bold">
                        {formatMessageDate(message.date)}
                      </div>
                      <hr className="w-[20%]" />
                    </div>
                  )}

                  <div className="flex items-end my-3">
                    <div className="flex items-end">
                      <img
                        src={isChatSelected.photo}
                        alt="Sender"
                        className="h-5 w-5 object-cover rounded-full mr-2"
                      />
                    </div>
                    <div
                      className={`message p-3 ${borderRadiusClass} ${
                        isNightMode ? "bg-[#232323]" : "bg-[#F2F3F5]"
                      } w-fit max-w-[90%] md:max-w-[50%]`}
                    >
                      <div className="flex items-center">
                        <div className="flex ">
                          <p
                            className="max-w-full break-words whitespace-pre-wrap"
                            style={{
                              overflowWrap: "break-word",
                              wordBreak: "break-word",
                            }}
                          >
                            {message.text}
                          </p>
                          <p className="text-[0.8em] text-gray-500 ml-2 flex items-end">
                            {new Date(message.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </main>

      <footer className="footer p-4 border-t border-gray-100 flex items-center">
        <div className="gap-2 flex">
          <div
            className="w-fit flex items-center justify-center cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Icon path={mdiEmoticon} size={1} />
          </div>
          {showEmojiPicker && (
            <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
              <div className="absolute bottom-16 z-10">
                {" "}
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            </ClickAwayListener>
          )}
          <div className="w-fit flex items-center justify-center">
            <Icon path={mdiPaperclip} size={0.8} />
          </div>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            value={newMessage}
            className={`flex-grow mx-3 p-3 rounded-full w-full focus:outline-none ${
              isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
            }`}
            placeholder="Type something..."
          />
          <div
            className={`cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center p-2 rounded-full ${
              isNightMode ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <Icon
              path={mdiSend}
              size={0.5}
              style={{ transform: "rotate(-40deg)" }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatConversation;
