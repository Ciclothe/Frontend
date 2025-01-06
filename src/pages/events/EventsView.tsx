import { useSidebarRight } from "@/context/SidebarRightContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useEffect, useState } from "react";
import ProfileImage from "@/components/ui/ProfilePic";
import { Icon } from "@mdi/react";
import { mdiCircleSmall, mdiCheckDecagram } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext.js";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";
import { usePostButton } from "@/context/CreatePostActive";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import { useTranslation } from "react-i18next";

function EventsView() {
  const { setIsSidebarRightVisible } = useSidebarRight();
  const { setSectionOptions } = useSectionOptions();
  const { setHasScroll } = useLayoutScroll();
  const { setShowPostButton } = usePostButton();
  const { toggleVisibility } = useHeaderVisibility();

  const { themeMode } = useTheme();
  const [isHoverCard, setIsHoverCard] = useState<any>(null);
  const { t } = useTranslation();

  // Simulated API response
  const events = [
    {
      id: 1,
      profilePic: "",
      username: "/VintageVibes",
      description: "Vintage Clothing",
      date: "04 January 2025",
      location: "Calle de miquel paredes 24",
      members: { current: 25, total: 80 },
      garments: 20,
      verified: false,
    },
    {
      id: 2,
      profilePic:
        "https://i.pinimg.com/736x/45/88/7e/45887ebc2b7eab92a66c1e27e569ce93.jpg",
      username: "/RetroArt",
      description: "Retro Art Pieces",
      date: "10 Jan",
      location: "Av. de la Paz",
      members: { current: 40, total: 100 },
      garments: 15,
      verified: false,
    },
    {
      id: 3,
      profilePic:
        "https://i.pinimg.com/736x/62/e2/26/62e22644e818ca0c37a81982a43ed6d0.jpg",
      username: "/UrbanThreads",
      description: "Urban Clothing",
      date: "15 Jan",
      location: "Calle Mayor",
      members: { current: 60, total: 120 },
      garments: 30,
      verified: true,
    },
    {
      id: 4,
      profilePic:
        "https://i.pinimg.com/736x/21/94/6b/21946b99faa27180d0f372b39b6d19a2.jpg",
      username: "/ClassicLines",
      description: "Classic Styles",
      date: "20 Jan",
      location: "Plaza Central",
      members: { current: 75, total: 90 },
      garments: 25,
      verified: true,
    },
    {
      id: 5,
      profilePic: "",
      username: "/BoldFashion",
      description: "Bold Fashion Statements",
      date: "25 Jan",
      location: "Gran Vía",
      members: { current: 50, total: 70 },
      garments: 40,
      verified: false,
    },
  ];

  useEffect(() => {
    setHasScroll(true);
    toggleVisibility(true);
    setIsSidebarRightVisible(false);
    setShowPostButton(true);
  }, []);

  useEffect(() => {
    setSectionOptions([]);
  }, [setSectionOptions]);

  return (
    <div className="w-full px-4 md:px-0">
      <p className="font-bold text-[1.3em]">{t("EventsView.CloseToYou")}</p>
      <div className="mt-4 grid grid-cols-12 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`col-span-6 sm:col-span-3 md:col-span-6 lg:col-span-4 ${
              isHoverCard === event.id ? "text-center relative z-[100]" : ""
            } w-full items-center`}
            onMouseEnter={() => setIsHoverCard(event.id)}
            onMouseLeave={() => setIsHoverCard(null)}
          >
            <div
              className={`${
                themeMode === "dark" ? "bg-[#1E1E1E]" : "bg-[#F7F7F7]"
              } px-2 py-4 flex flex-col rounded-2xl w-full ${
                isHoverCard === event.id
                  ? "absolute top-0 md:gap-3 left-0 text-center items-center justify-center"
                  : "relative"
              } `}
            >
              {event.verified && (
                <Icon
                  path={mdiCheckDecagram}
                  size={0.8}
                  className="absolute right-2 top-2 text-[#0DBC73]"
                />
              )}
              <div
                className={`${
                  isHoverCard === event.id ? "block" : "flex items-center"
                } justify-between w-full`}
              >
                <div
                  className={`w-full ${
                    isHoverCard === event.id ? "block" : "md:flex gap-2"
                  }`}
                >
                  <div className="flex justify-center">
                    <ProfileImage profilePic={event.profilePic} />
                  </div>
                  <div
                    className={`w-full ${
                      isHoverCard === event.id
                        ? "text-center"
                        : "text-center md:text-start md:pl-2"
                    }`}
                  >
                    <p className="font-bold">{event.username}</p>
                    <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`${
                    isHoverCard === event.id ? "hidden md:flex" : "hidden"
                  } opacity-50 flex`}
                >
                  <p
                    className={`w-[50%] text-end whitespace-nowrap overflow-hidden text-ellipsis`}
                  >
                    {event.date}
                  </p>
                  <Icon path={mdiCircleSmall} size={0.8} />
                  <p
                    className={`w-[50%] text-start whitespace-nowrap overflow-hidden text-ellipsis `}
                  >
                    {event.location}
                  </p>
                </div>
              </div>
              <div
                className={`items-center gap-4 justify-center ${
                  isHoverCard === event.id ? "hidden md:flex" : "hidden"
                }`}
              >
                <div>
                  <p className="text-[1.2em] font-bold">
                    <span className="opacity-50">{event.members.current}</span>/
                    {event.members.total}
                  </p>
                  <p className="opacity-50">{t("EventsView.Members")}</p>
                </div>
                <div className={`w-[2px] h-5 bg-white/50`}></div>
                <div>
                  <p className="text-[1.2em] font-bold">{event.garments}</p>
                  <p className="opacity-50">{t("EventsView.Garments")}</p>
                </div>
              </div>
              <div
                className={`${
                  isHoverCard === event.id ? "grid" : "grid md:hidden"
                } grid-cols-12 gap-3 w-full mt-2 ms:mt-0`}
              >
                <button
                  className={`bg-[#0DBC73] w-full col-span-12 md:col-span-6 py-2 rounded-lg items-center justify-center`}
                >
                  <p
                    className={`${
                      themeMode === "dark" ? "text-black" : "text-white"
                    } font-bold`}
                  >
                    {t("EventsView.ViewEvent")}
                  </p>
                </button>
                <button
                  className={`border-[#DF1E32] border text-[#DF1E32] hover:bg-[#DF1E32] ${
                    themeMode === "dark"
                      ? "hover:text-black"
                      : "hover:text-white"
                  } col-span-12 w-full md:col-span-6 py-2 rounded-lg items-center justify-center`}
                >
                  <p className={`font-bold`}> {t("EventsView.Join")}</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsView;
