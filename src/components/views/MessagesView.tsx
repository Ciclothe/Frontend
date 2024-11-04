import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import NoChatsImgNightMode from "../../assets/imgs/NoChatsImgNightMode.png";
import NoChatsImgDayMode from "../../assets/imgs/NoChatsImgDayMode.png";
import NoMessagesNightMode from "../../assets/imgs/NoMessagesImgNightMode.png";
import NoMessagesDayMode from "../../assets/imgs/NoMessagesImgDayMode.png";
import ChatConversation from "../common/ChatConversation";
import ChatSelectedUserData from "../common/ChatSelectedUserData";

interface Message {
  text: string;
  date: string;
}

interface Chat {
  photo: string;
  userName: string;
  name: string;
  messages: Message[];
  readed: boolean;
}

function MessagesView() {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const [isChatSelected, setIsChatSelected] = useState<Chat | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const chats: Chat[] = [
    {
      photo:
        "https://hips.hearstapps.com/hmg-prod/images/octavia-spencer-20724237-1-402.jpg",
      userName: "alinaadede",
      name: "Alexander Lukashenko",
      messages: [
        {
          text: "Hola, estás ubicado en Valencia?",
          date: "2024-07-24T09:00:00Z",
        },
      ],
      readed: false,
    },
    {
      photo:
        "https://imgs.smoothradio.com/images/48244?width=1984&crop=4_3&signature=Ja1fhfZB9PSCRTG6Usg_PSwZS-Q=",
      userName: "nolanontherun",
      name: "Nolan Antherum Renum",
      messages: [
        {
          text: "Hola, qué tal estás? Podrías decirme cuánto tiempo de uso tiene?",
          date: "2024-07-24T10:00:00Z",
        },
        { text: "Por cierto", date: "2024-07-23T10:05:00Z" },
        { text: "Gracias", date: "2024-07-23T10:05:00Z" },
      ],
      readed: false,
    },
    {
      photo:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTc-QLnqSfM84lp6NzkOLxXOegrrnrQ32MKpbHhgpp1MDM0fBAo",
      userName: "nolanontherun",
      name: "Nolan Antherum Renum",
      messages: [
        {
          text: "Te interesa unos Nike vapor nuevos?",
          date: "2024-07-20T13:00:00Z",
        },
      ],
      readed: false,
    },
    {
      photo:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTc-QLnqSfM84lp6NzkOLxXOegrrnrQ32MKpbHhgpp1MDM0fBAo",
      userName: "nolanontherun",
      name: "Nolan Antherum Renum",
      messages: [
        {
          text: "Te interesa unos Nike vapor nuevos?",
          date: "2024-07-20T13:00:00Z",
        },
      ],
      readed: true,
    },
    {
      photo:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTc-QLnqSfM84lp6NzkOLxXOegrrnrQ32MKpbHhgpp1MDM0fBAo",
      userName: "nolanontherun",
      name: "Nolan Antherum Renum",
      messages: [
        {
          text: "Te interesa unos Nike vapor nuevos?",
          date: "2024-07-20T13:00:00Z",
        },
      ],
      readed: true,
    },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`${
        isNightMode ? "text-white" : "text-black"
      } bg-transparent px-2 md:bg-transparent flex md:mt-5 lg:mt-0 w-[100%] h-[calc(100vh-7em)] md:h-[calc(100vh-10em)]`}
    >
      <div
        className={`border-r md:border-none bg-transparent ${
          isNightMode ? "md:bg-[#141414]" : "md:bg-white"
        } md:rounded-xl p-3 w-fit md:w-[30%] xl:w-[20%]`}
      >
        <div className="hidden md:flex items-center mb-3">
          <p className="text-[1.3em] font-bold">{t("Chat.Messages")}</p>
        </div>
        <hr className="hidden md:block" />
        <div className="hidden md:block">
          <input
            type="text"
            className={`p-2 rounded-lg w-full mt-5 ${
              isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
            }`}
            placeholder={t("Global.Search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 12em)" }}
        >
          {filteredChats.length > 0 ? (
            <div className="md:mt-5">
              {filteredChats.map((user, index) => (
                <div
                  key={index}
                  className={`py-3 hover:bg-[#1B6B44] rounded-xl cursor-pointer md:px-3 hover:bg-opacity-10 ${
                    !user.readed
                      ? "opacity-100"
                      : "opacity-70 hover:opacity-100"
                  } ${isNightMode ? "text-white" : "text-black"}`}
                  onClick={() => setIsChatSelected(user)}
                >
                  <div className="flex items-center justify-between max-w-[100%]">
                    <div className="flex" style={{ overflow: "hidden" }}>
                      <img
                        src={user.photo}
                        className="h-[3em] w-[3em] object-cover rounded-full"
                      />
                      <div
                        className="hidden md:block mx-2"
                        style={{ overflow: "hidden" }}
                      >
                        <p className="font-bold">@{user.userName}</p>
                        <p
                          className="truncate"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {user.messages[0].text}
                        </p>
                      </div>
                    </div>
                    {!user.readed && (
                      <div
                        className={`hidden md:block text-white bg-[#1B6B44] px-2 py-[0.2em] rounded-full font-bold flex items-center justify-center text-xs`}
                      >
                        <p className="text-[9px]">{user.messages.length}</p>
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
                  src={isNightMode ? NoMessagesNightMode : NoMessagesDayMode}
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
      </div>
      <div
        className={`${
          isChatSelected
            ? "bg-transparent md:bg-white w-full md:w-[70%] lg:w-[40%] xl:w-[60%]"
            : "w-[80%]"
        } rounded-xl md:mx-8`}
        style={{ maxHeight: "calc(100vh - 10em)" }}
      >
        {isChatSelected ? (
          <div>
            <ChatConversation isChatSelected={isChatSelected} />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-[15em]">
              <img
                src={isNightMode ? NoChatsImgNightMode : NoChatsImgDayMode}
                alt="No chat selected"
              />
            </div>
            <p className="font-bold text-[1.2em] mt-3">
              No Hay Chats Seleccionados
            </p>
          </div>
        )}
      </div>
      <div
        className={`${isNightMode ? "bg-[#141414]" : "bg-white"} ${
          !isChatSelected
            ? "hidden"
            : "hidden lg:block lg:w-[30%] xl:w-[20%] rounded-xl p-3"
        }`}
      >
        <ChatSelectedUserData isChatSelected={isChatSelected} />
      </div>
    </div>
  );
}

export default MessagesView;
