import { useSidebarRight } from "@/context/SidebarRightContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useEffect, useState } from "react";
import ProfileImage from "@/components/ui/ProfilePic";
import { Icon } from "@mdi/react";
import { mdiCheckDecagram } from "@mdi/js";
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
      eventName: "VintageVibes",
      eventPic:
        "https://i.pinimg.com/736x/89/42/7b/89427b6937dc02ce04bd6802f36cff93.jpg",
      category: "Vintage",
      date: "04 January 2025",
      location: "Calle de miquel paredes 24",
      members: { current: 25, total: 80 },
      garments: 20,
      verified: false,
      participants: [
        {
          userId: 1,
          userName: "lielcita1230",
          profilePic:
            "https://i.pinimg.com/736x/3b/43/7d/3b437d344167319ea707b2970caf4dee.jpg",
        },
        {
          userId: 2,
          userName: "marcRios24",
          profilePic:
            "https://i.pinimg.com/736x/3b/43/7d/3b437d344167319ea707b2970caf4dee.jpg",
        },
        {
          userId: 3,
          userName: "jorgeTD",
          profilePic:
            "https://i.pinimg.com/736x/3b/43/7d/3b437d344167319ea707b2970caf4dee.jpg",
        },
        {
          userId: 4,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/3b/43/7d/3b437d344167319ea707b2970caf4dee.jpg",
        },
      ],
      saved: false,
    },
    {
      id: 2,
      eventName: "Urban Explorers",
      eventPic:
        "https://i.pinimg.com/736x/b0/74/b0/b074b08427f6b27ce054a2737aa336da.jpg",
      category: "Streetwear",
      date: "10 January 2025",
      location: "Avenida del Arte 52",
      members: { current: 45, total: 100 },
      garments: 35,
      verified: true,
      participants: [
        {
          userId: 5,
          userName: "explorerX",
          profilePic:
            "https://i.pinimg.com/736x/64/77/62/647762393c7ce848b7b451b6f94bc8de.jpg",
        },
        {
          userId: 6,
          userName: "citywanderer",
          profilePic:
            "https://i.pinimg.com/736x/64/77/62/647762393c7ce848b7b451b6f94bc8de.jpg",
        },
      ],
      saved: true,
    },
    {
      id: 3,
      eventName: "Classic Couture",
      eventPic:
        "https://i.pinimg.com/736x/ff/bc/db/ffbcdbf226806a31708e6c601f4ce464.jpg",
      category: "Formal",
      date: "18 January 2025",
      location: "Boulevard de la Moda 10",
      members: { current: 15, total: 50 },
      garments: 10,
      verified: true,
      participants: [
        {
          userId: 7,
          userName: "suitlover",
          profilePic:
            "https://i.pinimg.com/736x/00/07/cc/0007cc15239017d80fbef9de83a70f8f.jpg",
        },
      ],
      saved: false,
    },
    {
      id: 4,
      eventName: "Eco Fashion Fest",
      eventPic:
        "https://i.pinimg.com/736x/34/e9/f2/34e9f260eb8743ff49b63c800eb30b1f.jpg",
      category: "Sustainable",
      date: "22 January 2025",
      location: "Plaza Verde 15",
      members: { current: 30, total: 75 },
      garments: 50,
      verified: false,
      participants: [
        {
          userId: 8,
          userName: "ecoWarrior",
          profilePic:
            "https://i.pinimg.com/736x/e9/d9/7f/e9d97f5f46ad1e3c9ae91afa64056150.jpg",
        },
        {
          userId: 9,
          userName: "greenQueen",
          profilePic:
            "https://i.pinimg.com/736x/e9/d9/7f/e9d97f5f46ad1e3c9ae91afa64056150.jpg",
        },
      ],
      saved: true,
    },
    {
      id: 5,
      eventName: "Summer Splash Style",
      eventPic:
        "https://i.pinimg.com/736x/5d/be/3f/5dbe3f5f6acf415a820e4235fe76af4b.jpg",
      category: "Casual",
      date: "28 January 2025",
      location: "Paseo del Sol 22",
      members: { current: 60, total: 100 },
      garments: 25,
      verified: false,
      participants: [
        {
          userId: 10,
          userName: "sunnyDays",
          profilePic:
            "https://i.pinimg.com/736x/f9/73/ce/f973ceadaf66b020f9e8b337f9ef4717.jpg",
        },
        {
          userId: 11,
          userName: "beachBum",
          profilePic:
            "https://i.pinimg.com/736x/f9/73/ce/f973ceadaf66b020f9e8b337f9ef4717.jpg",
        },
        {
          userId: 12,
          userName: "poolParty",
          profilePic:
            "https://i.pinimg.com/736x/f9/73/ce/f973ceadaf66b020f9e8b337f9ef4717.jpg",
        },
      ],
      saved: false,
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
            className={`${
              themeMode === "dark" ? "hover:bg-[#1E1E1E]" : "hover:bg-[#F7F7F7]"
            } col-span-12 cursor-pointer sm:col-span-6 xl:col-span-4 w-full items-center rounded-2xl p-4 flex flex-col justify-between`}
            style={{
              border: `0.5px solid ${
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(140, 140, 140, 0.1)"
              }`,
            }}
          >
            <div className="w-full">
              <div className="flex w-full justify-between items-center">
                <p
                  className="text-[1.1em]"
                  style={{
                    fontFamily: "droid-serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                  }}
                >
                  {event.eventName}
                </p>
                {event.verified && (
                  <Icon
                    path={mdiCheckDecagram}
                    size={0.8}
                    className="text-[#0DBC73]"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div
                  className={`${
                    themeMode === "dark"
                      ? "bg-[#F7F7F7] text-black"
                      : "bg-[#171717] text-white"
                  }  px-3 flex items-center justify-center cursor-pointer rounded-full gap-2 w-fit`}
                >
                  <p>{event.date}</p>
                </div>
                <div
                  className={`${
                    themeMode === "dark"
                      ? "bg-[#F7F7F7] text-black"
                      : "bg-[#171717] text-white"
                  }  px-3 flex items-center justify-center cursor-pointer rounded-full gap-2 w-fit`}
                >
                  <p>{event.location}</p>
                </div>
              </div>
            </div>
            <div className="w-full mt-10">
              <div className={`items-center gap-4 justify-center flex`}>
                <div className="text-center">
                  <p className="text-[1.2em] font-bold">{event.category}</p>
                  <p className="opacity-50">{t("EventsView.Category")}</p>
                </div>
                <div className={`w-[2px] h-5 bg-white/50`}></div>
                <div className="text-center">
                  <p className="text-[1.2em] font-bold">
                    <span className="opacity-50">{event.members.current}</span>/
                    {event.members.total}
                  </p>
                  <p className="opacity-50">{t("EventsView.Members")}</p>
                </div>
                <div className={`w-[2px] h-5 bg-white/50`}></div>
                <div className="text-center">
                  <p className="text-[1.2em] font-bold">{event.garments}</p>
                  <p className="opacity-50">{t("EventsView.Garments")}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 w-full">
                {event.participants.length > 0 && (
                  <div className="flex items-center">
                    {event.participants
                      .slice(0, 3)
                      .map((participant: any, i: number) => (
                        <div key={i} className="relative ml-[-10px]">
                          <ProfileImage
                            profilePic={participant?.profilePic}
                            height={"1.2rem"}
                          />
                        </div>
                      ))}

                    {/* Mostrar el número de usuarios restantes */}
                    {event.participants.length > 3 && (
                      <div className="flex ml-[-10px] z-[100] items-center justify-center rounded-full bg-[#EEEEEE] h-5 w-5 text-center text-sm text-black">
                        <p className="text-[8px] font-bold">
                          +{event.participants.length - 3}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <button className="bg-[#0DBC73] w-full py-2 gap-2 rounded-lg flex items-center justify-center">
                  <p
                    className={`${
                      themeMode === "dark" ? "text-black" : "text-white"
                    } font-bold`}
                  >
                    View event
                  </p>
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
