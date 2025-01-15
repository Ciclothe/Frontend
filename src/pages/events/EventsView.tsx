import { useSidebarRight } from "@/context/SidebarRightContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useEffect } from "react";
import { useLayoutScroll } from "@/context/LayoutScrollContext";
import { usePostButton } from "@/context/CreatePostActive";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import { useTranslation } from "react-i18next";
import CardEvent from "./components/CardEvent";

function EventsView() {
  const { setIsSidebarRightVisible } = useSidebarRight();
  const { setSectionOptions } = useSectionOptions();
  const { setHasScroll } = useLayoutScroll();
  const { setShowPostButton } = usePostButton();
  const { toggleVisibility } = useHeaderVisibility();
  const { t } = useTranslation();

  // TODO: #97 Connect to backend to fetch events
  const events = [
    {
      id: 1,
      isJoined: false,
      eventName: "Retro Revival Night: Fashion & Music",
      createdBy: "lielcite",
      category: "Vintage",
      date: "2025-01-15",
      time: "19:00:00",
      location: { lat: "39.4676153", lng: "-0.4039672" },
      members: { current: 12, total: 80 },
      garments: 20,
      verified: true,
      participants: [
        {
          userId: 1,
          userName: "lielcita1230",
          profilePic:
            "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
        },
        {
          userId: 2,
          userName: "marcRios24",
          profilePic:
            "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
        },
        {
          userId: 3,
          userName: "jorgeTD",
          profilePic:
            "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
        },
        {
          userId: 4,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
        },
        {
          userId: 5,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
        },
        {
          userId: 6,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
        },
        {
          userId: 7,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
        },
        {
          userId: 8,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
        },
        {
          userId: 9,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
        },
        {
          userId: 10,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
        },
        {
          userId: 11,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
        },
        {
          userId: 12,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
        },
      ],
      eventRules: {
        participantLimit: 50,
        garmentLimitPerPerson: 5,
        garmentMinimumPerPerson: 2,
      },
      saved: false,
      shared: false,
    },
    {
      id: 2,
      isJoined: false,
      eventName: "Urban Fusion Gathering: Style & Sneakers",
      createdBy: "alejosito",
      category: "Streetwear",
      date: "2025-01-21",
      time: "14:30:00",
      location: { lat: "39.480889579488", lng: "-0.34110993065103" },
      members: { current: 25, total: 80 },
      garments: 20,
      verified: false,
      participants: [
        {
          userId: 1,
          userName: "lielcita1230",
          profilePic:
            "https://i.pinimg.com/736x/10/18/20/101820fe913030a0f891efc060d72a60.jpg",
        },
        {
          userId: 2,
          userName: "marcRios24",
          profilePic:
            "https://i.pinimg.com/736x/b7/f3/d4/b7f3d461cb4844a528d30582e0f833d4.jpg",
        },
      ],
      saved: false,
      shared: false,
    },
    {
      id: 3,
      isJoined: true,
      eventName: "Closet Cleanse: Fashion Swap Night",
      createdBy: "tomasinho",
      category: "Sustainable Fashion",
      date: "2025-02-12",
      time: "16:30:00",
      location: { lat: "39.470598", lng: "-0.379076" },
      members: { current: 5, total: 20 },
      verified: true,
      participants: [
        {
          userId: 1,
          userName: "lielcita1230",
          profilePic:
            "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
        },
        {
          userId: 2,
          userName: "marcRios24",
          profilePic:
            "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
        },
        {
          userId: 3,
          userName: "jorgeTD",
          profilePic:
            "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
        },
        {
          userId: 4,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
        },
        {
          userId: 5,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
        },
      ],
      eventRules: {
        participantLimit: 25,
        garmentLimitPerPerson: 3,
        garmentMinimumPerPerson: 1,
      },
      saved: true,
      shared: false,
    },
  ];

  useEffect(() => {
    setHasScroll(true);
    toggleVisibility(true);
    setIsSidebarRightVisible(false);
    setShowPostButton(true);
    setSectionOptions([]);
  }, [
    setHasScroll,
    toggleVisibility,
    setIsSidebarRightVisible,
    setShowPostButton,
    setSectionOptions,
  ]);

  return (
    <div className="w-full px-4 md:px-0">
      <p className="font-bold text-[1.3em]">{t("EventsView.CloseToYou")}</p>
      <div className="mt-4 grid grid-cols-12 gap-4">
        {events.map((event) => (
          <CardEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventsView;
