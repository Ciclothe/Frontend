import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import {
  mdiMessageReplyTextOutline,
  mdiMenuDown,
  mdiMenuUp,
  mdiArrowLeft,
  mdiEmoticon,
  mdiPaperclip,
  mdiImageRemove,
  mdiSend,
  mdiImagePlus,
} from "@mdi/js";
import NoMessagesNightMode from "../../assets/imgs/NoMessagesImgNightMode.png";
import NoMessagesDayMode from "../../assets/imgs/NoMessagesImgDayMode.png";
import API_CONSTANTS from "@/services/config";
import io from "socket.io-client";
import { useUser } from "../../context/UserContext.js";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const ChatWindow = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);
  const [selectedUserChat, setSelectedUserChat] = useState<ChatRoom | null>(
    null
  );
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [chatsRoom, setChatsRoom] = useState<ChatRoom[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { user } = useUser();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // Cambiar a un array
  const [showImageModal, setShowImageModal] = useState(false);

  const socket = io(`${API_CONSTANTS.API_BASE_URL}/chat`, {
    withCredentials: true,
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("message", (message: any) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          content: message.content,
          createdAt: new Date().toISOString(),
          sendById: user?.id,
          imageUrl: message.file ? message.file : null,
        },
      ]);
    });

    socket.on("uploadStatus", (img: string) => {
      setSelectedImages([]);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          content: "",
          createdAt: new Date().toISOString(),
          sendById: user?.id,
          img: `${API_CONSTANTS.API_BASE_URL}/uploads/${img}`,
        },
      ]);
    });

    socket.on("disconnect", () => {});

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const openChat = async (user: ChatRoom) => {
    try {
      const response = await fetch(
        `${API_CONSTANTS.API_BASE_URL}/chat/messages/${user.chatRoomId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setChatMessages(data);

      setSelectedUserChat(user);
      setIsChatSelected(true);
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (selectedImages && selectedImages[0] && selectedUserChat) {
      selectedImages.forEach((image) => {
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const buffer = new Uint8Array(arrayBuffer);

          socket.emit(
            "uploadImage",
            {
              recipient: selectedUserChat.otherUser.userName,
              sender: user,
              file: buffer,
            },
            (status: { message: string }) => {}
          );
        };
        reader.readAsArrayBuffer(image);
      });
    } else {
      if (socket && selectedUserChat && user) {
        const messageData: any = {
          message: newMessage,
          recipient: selectedUserChat.otherUser.userName,
          sender: user,
        };

        socket.emit("message", messageData);
      }

      setNewMessage("");
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          content: newMessage,
          createdAt: new Date().toISOString(),
          sendById: user?.id,
        },
      ]);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(`${API_CONSTANTS.API_BASE_URL}/chat`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setChatsRoom(data);
    };

    getMessages();
  }, []);

  const unreadMessagesCount = chatsRoom.filter(
    (chat) => chat.lastMessage && !chat.readed
  ).length;

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
      return date.toLocaleDateString("en-EN", {
        day: "2-digit",
        month: "short",
      });
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiObject: any) => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      if (newImages.length + selectedImages.length <= 5) {
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        setShowImageModal(true);
      } else {
        alert("You can only upload up to 5 images.");
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        className={`${isNightMode ? "cardNightMode" : "cardDayMode"} ${
          isWindowMaximized ? "rounded-t-xl" : "rounded-xl"
        } `}
      >
        <div className="py-3 px-5">
          {isChatSelected ? (
            <div>
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setIsChatSelected(false)}
                  className="cursor-pointer"
                >
                  <Icon path={mdiArrowLeft} className="icon" />
                </div>
                <p className="font-bold ml-2">
                  @{selectedUserChat?.otherUser.userName}
                </p>
                <div className="w-[1.2em] h-1"></div>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                setIsWindowMaximized(!isWindowMaximized);
                setIsChatSelected(false);
              }}
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  <Icon path={mdiMessageReplyTextOutline} className="icon" />
                  <p className="font-bold ml-2">{t("Chat.Messages")}</p>
                </div>
              </div>
              {!isChatSelected && (
                <div>
                  <Icon
                    path={isWindowMaximized ? mdiMenuDown : mdiMenuUp}
                    className="icon"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <hr style={{ opacity: isNightMode ? "10%" : "50%" }} />
        {!isWindowMaximized ? (
          <div className="py-3 px-5">
            <p className="font-bold" style={{ opacity: 0.5 }}>
              {unreadMessagesCount} {t("Chat.NewMessagesQuantity")}
            </p>
          </div>
        ) : (
          <div>
            <div>
              {isChatSelected ? (
                <div className="h-[30vh] p-5 overflow-y-auto">
                  {chatMessages.map((message: any, index) => {
                    const previousMessage: any =
                      index > 0 ? chatMessages[index - 1] : null;
                    const nextMessage: any =
                      index < chatMessages.length - 1
                        ? chatMessages[index + 1]
                        : null;

                    const previousDate =
                      index > 0
                        ? new Date(chatMessages[index - 1].createdAt)
                        : null;
                    const currentDate = new Date(message.createdAt);
                    const showDate =
                      !previousDate ||
                      previousDate.toDateString() !==
                        currentDate.toDateString();

                    const isUserMessage =
                      String(user?.id) == String(message?.sendById);
                    let borderRadiusClass = "";

                    if (
                      !previousMessage ||
                      previousMessage?.sendById !== message?.sendById
                    ) {
                      borderRadiusClass = isUserMessage
                        ? "rounded-t-xl rounded-br-xl"
                        : "rounded-t-xl rounded-bl-xl";
                    } else if (
                      !nextMessage ||
                      nextMessage.sendById !== message.sendById
                    ) {
                      borderRadiusClass = isUserMessage
                        ? "rounded-b-xl rounded-tr-xl"
                        : "rounded-b-xl rounded-tl-xl";
                    } else {
                      borderRadiusClass = isUserMessage
                        ? "rounded-r-xl"
                        : "rounded-l-xl";
                    }

                    return (
                      <div key={index}>
                        {showDate && (
                          <div className="flex justify-center items-center">
                            <hr className="w-[20%]" />
                            <div className="text-center text-[0.8em] w-fit py-1 px-3 opacity-50 font-bold">
                              {formatMessageDate(message.createdAt)}
                            </div>
                            <hr className="w-[20%]" />
                          </div>
                        )}
                        <div
                          className={`flex ${
                            isUserMessage ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`p-2 ${
                              isNightMode
                                ? "bg-[#232323]"
                                : isUserMessage
                                ? "bg-[#F2F3F5]"
                                : "border "
                            } my-2 w-fit flex max-w-[70%] ${borderRadiusClass}`}
                          >
                            {message.img ? (
                              <img
                                src={message.img}
                                alt="message"
                                className="max-w-full h-auto rounded"
                              />
                            ) : (
                              <p
                                className="max-w-full break-words whitespace-pre-wrap"
                                style={{
                                  overflowWrap: "break-word",
                                  wordBreak: "break-word",
                                }}
                              >
                                {message.content}
                              </p>
                            )}
                            <p className="text-[0.8em] opacity-50 ml-1 flex items-end">
                              {new Date(message.createdAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {chatsRoom.length > 0 ? (
                    <div className="max-h-[30vh] overflow-y-auto">
                      {chatsRoom.map((chat, index) => (
                        <div
                          key={index}
                          className={`py-3 hover:bg-[#1B6B44] cursor-pointer hover:bg-opacity-10 px-5 ${
                            !chat.readed
                              ? "opacity-100"
                              : "opacity-70 hover:opacity-100"
                          } ${isNightMode ? "text-white" : "text-black"}`}
                          onClick={() => openChat(chat)}
                        >
                          <div className="flex items-center justify-between max-w-[100%]">
                            <div
                              className="flex"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={chat.otherUser.profilePhoto}
                                className="h-[3em] w-[3em] object-cover rounded-full"
                              />
                              <div
                                className="mx-2"
                                style={{ overflow: "hidden" }}
                              >
                                <p className="font-bold">
                                  @{chat.otherUser.userName}
                                </p>
                                <p
                                  className="truncate"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {chat.lastMessage
                                    ? chat.lastMessage.content
                                    : t("Chat.NoMessages")}
                                </p>
                              </div>
                            </div>
                            {!chat.readed && (
                              <div
                                className={`text-white bg-[#1B6B44] px-2 py-[0.2em] rounded-full font-bold flex items-center justify-center text-xs`}
                              >
                                <p className="text-[9px]">1</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 flex flex-col justify-center items-center px-5">
                      <div className="w-[7em]">
                        <img
                          src={
                            isNightMode
                              ? NoMessagesNightMode
                              : NoMessagesDayMode
                          }
                          alt="No messages"
                        />
                      </div>
                      <p className="font-bold text-[1.2em] mt-3">
                        {t("Chat.NoMessages")}
                      </p>
                      <p>{t("Chat.NewMessages")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isWindowMaximized ? (
        !isChatSelected ? (
          <Link to={`/messages`}>
            <div
              className={`flex justify-center items-center px-5 ${
                isNightMode
                  ? "bg-[#141414] hover:bg-[#232323]"
                  : "bg-white hover:bg-[#E2E2E2]"
              } py-3 font-bold text-[#1B6B44] rounded-b-xl cursor-pointer`}
            >
              <p>{t("Chat.SeeAllmessages")}</p>
            </div>
          </Link>
        ) : (
          <div
            className={`${
              isNightMode ? "cardNightMode" : "cardDayMode"
            } rounded-b-xl py-3 px-5`}
          >
            <div
              className={`${
                selectedImages.length > 0 ? "items-end" : "items-center"
              } flex gap-2`}
            >
              <div className="gap-2 flex justify-center my-1">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Icon path={mdiEmoticon} size={0.8} />
                </div>
                {showEmojiPicker && (
                  <ClickAwayListener
                    onClickAway={() => setShowEmojiPicker(false)}
                  >
                    <div className="absolute bottom-16 right-0 z-10">
                      {" "}
                      <Picker onEmojiClick={handleEmojiClick} />
                    </div>
                  </ClickAwayListener>
                )}
                <div className="flex items-center">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    multiple
                    onChange={handleFileChange}
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <Icon path={mdiPaperclip} size={0.7} />
                  </label>
                </div>
              </div>
              <div
                className={`w-full max-w-[100%] overflow-x-auto ${
                  selectedImages
                    ? "rounded-xl items-end"
                    : "rounded-full items-center"
                } flex justify-between w-full ${
                  isNightMode ? "bg-[#232323]" : "bg-[#F4F4F4]"
                }`}
                onKeyDown={handleKeyDown}
              >
                {showImageModal && selectedImages.length > 0 ? (
                  <div className="flex gap-4 p-2">
                    <div className="bg-[#E1E1E1] h-[5em] w-[5em] flex items-center justify-center rounded-md flex-wrap">
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        multiple
                        onChange={handleFileChange}
                      />
                      <label htmlFor="fileInput" className="cursor-pointer">
                        <Icon
                          path={mdiImagePlus}
                          size={1}
                          className="opacity-20"
                        />
                      </label>
                    </div>
                    <div className="overflow-x-auto flex gap-4">
                      {selectedImages.map((image, index) => (
                        <div className="relative bg-[#E1E1E1] h-[5em] w-[5em] flex items-center justify-center rounded-md ">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Selected Preview ${index}`}
                            className="w-full h-full object-contain"
                          />
                          <div
                            className="absolute h-6 w-6 bg-black bg-opacity-20 rounded-md p-1 flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-opacity-100 transition-colors duration-200"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Icon path={mdiImageRemove} size={0.8} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="p-2 w-full rounded-md bg-transparent focus:outline-none"
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type something..."
                    value={newMessage}
                    onKeyDown={handleKeyDown}
                  ></input>
                )}
              </div>
              <div
                className={`cursor-pointer flex items-center justify-center h-fit w-fit p-2 rounded-full ${
                  isNightMode ? "bg-white text-black" : "bg-black text-white"
                }`}
                onClick={handleSendMessage}
              >
                <Icon
                  path={mdiSend}
                  size={0.5}
                  style={{ transform: "rotate(-40deg)" }}
                />
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default ChatWindow;
