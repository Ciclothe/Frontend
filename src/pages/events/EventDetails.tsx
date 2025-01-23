import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSidebarRight } from "@/context/SidebarRightContext";
import { usePostButton } from "@/context/CreatePostActive";
import { useTheme } from "@/context/ThemeContext.js";
import ProfileImage from "@/components/ui/ProfilePic";
import PostCard from "@/pages/feed/components/PostCard";
import Masonry from "@mui/lab/Masonry";
import { useLayoutScroll } from "@/context/LayoutScrollContext";
import CiclotheLogotipoMobile from "../../../public/CiclotheLogotipoMobile";
import GoBackSticky from "@/components/ui/GoBackSticky";
import EventMapLocation from "./components/EventMapLocation";
import EventAction from "./components/EventAction";
import EventData from "./components/EventData";
import { useTranslation } from "react-i18next";

const events = [
  {
    id: 1,
    isJoined: false,
    eventName: "Retro Revival Night: Fashion & Music",
    createdBy: "lielcite",
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    eventDescription:
      "Join a unique event where streetwear and sneakers enthusiasts come together to trade second-hand fashion. Bring your best pre-loved pieces, discover new treasures, and connect with a community that values creativity and style. Give your wardrobe a fresh look while making meaningful connections!",
    profilePhoto:
      "https://media-mad1-1.cdn.whatsapp.net/v/t61.24694-24/455127078_587333614218666_1704375630759814125_n.jpg?ccb=11-4&oh=01_Q5AaIHx3BsalayzSV5yb0NDjtCQFt6G1oFxpWPg9qWd6Ryoq&oe=6794F071&_nc_sid=5e03e0&_nc_cat=101",
    category: "Vintage",
    date: "2025-01-25",
    time: "19:00:00",
    location: { lat: 39.4676153, lng: -0.4039672 },
    members: { current: 12, total: 80 },
    verified: false,
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
    eventPosts: [
      {
        userData: {
          userId: 1,
          username: "lielcita1230",
          profilePicture:
            "https://i.pinimg.com/736x/17/22/de/1722deee0886756862695a2d0d319dd3.jpg",
        },
        id: 1,
        type: "Swap",
        garmentTitle: "Hooded Bomber Jacket",
        garmentCondition: "as_new",
        garmentSize: "M (Medium)",
        garmentBrand: "Trapstar",
        garmentColor: "Black",
        garmentImgs: [
          {
            src: "https://images1.vinted.net/t/04_017c8_X6wmW3YofxA7FWy3izc4D9Nx/f800/1730917127.jpeg?s=aee6af5c500867852c68986eac21ace376ae6b4d",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/04_024a1_cDq4Nvs1NXkoN7Qt1wsqFMBy/f800/1730917127.jpeg?s=db323a4f7e497112ce295d9f3810d0368ba3b62d",
            orientation: "square",
          },
          {
            src: "https://images1.vinted.net/t/02_01a04_JQx5vQr8FwZmzv1Jf8izuTPx/f800/1730917127.jpeg?s=c92619047aa7640c9731a526f7ed5f3af39702ad",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/03_01f3b_RMrZS9Yi49r9jHA2SXhZHxFq/f800/1730917127.jpeg?s=8b342fc8cb3345f5fbf06f7ae47285ab504b1504",
            orientation: "landscapes",
          },
          {
            src: "https://images1.vinted.net/t/02_001f1_dLWuVxtBGRvaLJw3n99nnUxm/f800/1730917127.jpeg?s=f333b75ad3db978b2ffcce0805e427cc755a9df6",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/04_021a1_zJM9Rz6i6gAR9LNoSCYAos3j/f800/1730917127.jpeg?s=db18bf4d38ed9248d36d18354d5b1fbe6b65c6e9",
            orientation: "landscapes",
          },
        ],
      },
      {
        userData: {
          userId: 1,
          username: "lielcita1230",
          profilePicture:
            "https://i.pinimg.com/736x/17/22/de/1722deee0886756862695a2d0d319dd3.jpg",
        },
        id: 2,
        type: "Swap",
        garmentTitle: "Adidas Samba",
        garmentCondition: "new",
        garmentSize: "42 EU",
        garmentBrand: "Adidas",
        garmentColor: "Cream",
        garmentImgs: [
          {
            src: "https://images1.vinted.net/t/04_00c57_3N9KYALmYn18woM2hnVz1ycz/f800/1736768118.jpeg?s=f2d3b5e731958061ac1e3b3157de69722e33e150",
            orientation: "square",
          },
          {
            src: "https://images1.vinted.net/t/03_000b3_mU6ct3YhNuGpHJ6nc6jGQvFB/f800/1736768118.jpeg?s=cdd0d1ee1d3068e03fea05a9f2747456778a8cd1",
            orientation: "square",
          },
          {
            src: "https://images1.vinted.net/t/02_00d11_4bMDPaoYVn6dkUgE8vSsmaqA/f800/1736768118.jpeg?s=dabfceb60bcb136f8b374ae7af52eb63286bea0b",
            orientation: "landscapes",
          },
        ],
      },
      {
        userData: {
          userId: 2,
          username: "marcRios24",
          profilePicture:
            "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
        },
        id: 3,
        type: "Swap",
        garmentTitle:
          "Supreme Milano Half Zip Pullover jacket Chaqueta sweater jersey FW22 blanc white black noir Talla S",
        garmentCondition: "as_new",
        garmentSize: "M (Medium)",
        garmentBrand: "Supreme",
        garmentColor: "White",
        garmentImgs: [
          {
            src: "https://images1.vinted.net/t/02_0197b_P4nA5418KCwgYHtCsdJHbbKG/f800/1736702367.jpeg?s=8ce3e0aec775060e3ee6abea8e8f7249b05b4f65",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/04_00137_Y3RbkdqQVN5qbrF3PWy79P1c/f800/1736702367.jpeg?s=68582aefc7ac0bcb2e4734b35d114ce3044874ff",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/03_01da4_L1zoP2RntxyjWDM6Y6XHbvWk/f800/1736702367.jpeg?s=ad2eb7e1c04c00937ef0821b4e6c73f6c69c7941",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/04_0199b_z11CPRjZtGd5kWj2dBmfcqfx/f800/1736702367.jpeg?s=85e0e4c5834c48261b2acd5fe0526608a354ad25",
            orientation: "portrait",
          },
        ],
      },
      {
        userData: {
          userId: 5,
          username: "maria_goya",
          profilePicture:
            "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
        },
        id: 4,
        type: "Swap",
        garmentTitle: "Outdoor warm sports hat",
        garmentCondition: "used",
        garmentSize: "Unique",
        garmentBrand: "ARC'TERY X",
        garmentColor: "Black",
        garmentImgs: [
          {
            src: "https://images1.vinted.net/t/04_0093d_CZphkFhd31KHbuwGULEK9zbG/f800/1735298297.jpeg?s=ad52ed4e6281772ea09375ad521f7f0c71556f40",
            orientation: "square",
          },
          {
            src: "https://images1.vinted.net/t/01_0029f_yRoN8wQWCAcLZhiL7RgvkGx1/f800/1735298297.jpeg?s=144eed77106484e8da5831e380d4f02b354ea0ed",
            orientation: "square",
          },
          {
            src: "https://images1.vinted.net/t/04_00873_jA6o5XEMVipmyKsGHztoRBLN/f800/1735298297.jpeg?s=ce5fe3ba4e495ccaaa41a0b9c4051fb8b98e3588",
            orientation: "landscapes",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    isJoined: true,
    eventName: "Closet Cleanse: Fashion Swap Night",
    createdBy: "tomasinho",
    eventRules: {
      participantLimit: 25,
      garmentLimitPerPerson: 3,
      garmentMinimumPerPerson: 1,
    },
    eventDescription:
      "Es hora de hacer una limpieza de armario y darle una nueva vida a tu estilo. Únete a nosotros en la noche de intercambio de moda Closet Cleanse, donde podrás renovar tu guardarropa de forma sostenible. Trae las prendas que ya no usas y cambia con otros participantes para descubrir piezas únicas y frescas que se adapten a tu estilo. Este evento es una oportunidad para limpiar, reciclar y rediseñar tu estilo sin gastar un solo centavo. ¡Ven con tus mejores piezas, encuentra algo nuevo y ayuda al medio ambiente mientras te diviertes!",
    profilePhoto:
      "https://i.pinimg.com/736x/17/22/de/1722deee0886756862695a2d0d319dd3.jpg",
    category: "Sustainable Fashion",
    date: "2025-02-12",
    time: "16:30:00",
    location: { lat: 39.470598, lng: -0.379076 },
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
    eventPosts: [
      {
        userData: {
          userId: 1,
          username: "lielcita1230",
          profilePicture:
            "https://i.pinimg.com/736x/17/22/de/1722deee0886756862695a2d0d319dd3.jpg",
        },
        id: 1,
        type: "Swap",
        garmentTitle: "Hooded Bomber Jacket",
        garmentCondition: "as_new",
        garmentSize: "M (Medium)",
        garmentBrand: "Trapstar",
        garmentColor: "Black",
        garmentImgs: [
          {
            src: "https://images1.vinted.net/t/04_017c8_X6wmW3YofxA7FWy3izc4D9Nx/f800/1730917127.jpeg?s=aee6af5c500867852c68986eac21ace376ae6b4d",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/04_024a1_cDq4Nvs1NXkoN7Qt1wsqFMBy/f800/1730917127.jpeg?s=db323a4f7e497112ce295d9f3810d0368ba3b62d",
            orientation: "square",
          },
          {
            src: "https://images1.vinted.net/t/02_01a04_JQx5vQr8FwZmzv1Jf8izuTPx/f800/1730917127.jpeg?s=c92619047aa7640c9731a526f7ed5f3af39702ad",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/03_01f3b_RMrZS9Yi49r9jHA2SXhZHxFq/f800/1730917127.jpeg?s=8b342fc8cb3345f5fbf06f7ae47285ab504b1504",
            orientation: "landscapes",
          },
          {
            src: "https://images1.vinted.net/t/02_001f1_dLWuVxtBGRvaLJw3n99nnUxm/f800/1730917127.jpeg?s=f333b75ad3db978b2ffcce0805e427cc755a9df6",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/04_021a1_zJM9Rz6i6gAR9LNoSCYAos3j/f800/1730917127.jpeg?s=db18bf4d38ed9248d36d18354d5b1fbe6b65c6e9",
            orientation: "landscapes",
          },
        ],
      },
      {
        userData: {
          userId: 1,
          username: "lielcita1230",
          profilePicture:
            "https://i.pinimg.com/736x/17/22/de/1722deee0886756862695a2d0d319dd3.jpg",
        },
        id: 2,
        type: "Swap",
        garmentTitle: "Adidas Samba",
        garmentCondition: "new",
        garmentSize: "42 EU",
        garmentBrand: "Adidas",
        garmentColor: "Cream",
        garmentImgs: [
          {
            src: "https://images1.vinted.net/t/04_00c57_3N9KYALmYn18woM2hnVz1ycz/f800/1736768118.jpeg?s=f2d3b5e731958061ac1e3b3157de69722e33e150",
            orientation: "square",
          },
          {
            src: "https://images1.vinted.net/t/03_000b3_mU6ct3YhNuGpHJ6nc6jGQvFB/f800/1736768118.jpeg?s=cdd0d1ee1d3068e03fea05a9f2747456778a8cd1",
            orientation: "square",
          },
          {
            src: "https://images1.vinted.net/t/02_00d11_4bMDPaoYVn6dkUgE8vSsmaqA/f800/1736768118.jpeg?s=dabfceb60bcb136f8b374ae7af52eb63286bea0b",
            orientation: "landscapes",
          },
        ],
      },
      {
        userData: {
          userId: 2,
          username: "marcRios24",
          profilePicture:
            "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
        },
        id: 3,
        type: "Swap",
        garmentTitle:
          "Supreme Milano Half Zip Pullover jacket Chaqueta sweater jersey FW22 blanc white black noir Talla S",
        garmentCondition: "as_new",
        garmentSize: "M (Medium)",
        garmentBrand: "Supreme",
        garmentColor: "White",
        garmentImgs: [
          {
            src: "https://images1.vinted.net/t/02_0197b_P4nA5418KCwgYHtCsdJHbbKG/f800/1736702367.jpeg?s=8ce3e0aec775060e3ee6abea8e8f7249b05b4f65",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/04_00137_Y3RbkdqQVN5qbrF3PWy79P1c/f800/1736702367.jpeg?s=68582aefc7ac0bcb2e4734b35d114ce3044874ff",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/03_01da4_L1zoP2RntxyjWDM6Y6XHbvWk/f800/1736702367.jpeg?s=ad2eb7e1c04c00937ef0821b4e6c73f6c69c7941",
            orientation: "portrait",
          },
          {
            src: "https://images1.vinted.net/t/04_0199b_z11CPRjZtGd5kWj2dBmfcqfx/f800/1736702367.jpeg?s=85e0e4c5834c48261b2acd5fe0526608a354ad25",
            orientation: "portrait",
          },
        ],
      },
    ],
  },
];

const EventDetails = () => {
  const { setShowPostButton } = usePostButton();
  const { setIsSidebarRightVisible } = useSidebarRight();
  const { setHasScroll } = useLayoutScroll();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { themeMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsSidebarRightVisible(true);
    setShowPostButton(false);
    setHasScroll(true);
  }, []);

  const { eventId, eventName } = useParams();

  const decodedEventName = decodeURIComponent(eventName!).replace(/-/g, " ");

  const event = events.find(
    (e) =>
      e.id === parseInt(eventId!) &&
      e.eventName.toLowerCase() === decodedEventName
  );

  if (!event) {
    return (
      <div
        className={`${
          themeMode === "dark" ? "text-white" : "text-black"
        } min-h-screen flex flex-col`}
      >
        <GoBackSticky />
        <EventMapLocation
          eventLocation={{ lat: 41.7269, lng: -49.9481 }}
          zoom={3}
        />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div
            className="flex items-center justify-center gap-3"
            style={{ fontFamily: "Bahnschrift" }}
          >
            <p className="text-[5rem] font-bold" style={{ lineHeight: 1 }}>
              4
            </p>
            <div className="mt-[-1em]">
              <CiclotheLogotipoMobile
                color={themeMode === "dark" ? "white" : "black"}
                size={"3rem"}
              />
            </div>
            <p className="text-[5rem] font-bold" style={{ lineHeight: 1 }}>
              4
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h2 className="font-bold text-[1.2em]">
              {t("EventsView.EventOnTitanic")}
            </h2>
            <p className="opacity-50 w-[90%] md:w-[50%] text-center">
              {t("EventsView.CoordinatesNoSense")}
            </p>
            <button
              className={`${
                themeMode === "dark" ? "text-black" : "text-white"
              } bg-[#0DBC73] font-bold mt-4`}
              onClick={() => navigate("/events")}
            >
              {t("EventsView.MoreEventsButton")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div
        className={`${
          themeMode === "dark" ? "text-white" : "text-black"
        } grid grid-cols-12`}
      >
        <GoBackSticky />

        {/* //! MAP */}
        <EventMapLocation
          eventLocation={{ lat: event.location.lat, lng: event.location.lng }}
          zoom={16}
        />

        {/* //! EVENT ACTIONS */}
        <EventAction event={event} />

        {/* //! EVENT NAME & CREATED BY */}
        <div className="col-span-12 px-4 mt-4">
          <p className="text-[1.5em] font-bold">{event?.eventName}</p>
          <div className="flex items-center gap-2">
            <ProfileImage profilePic={event?.profilePhoto} height="1.5em" />
            <p>
              <span className="opacity-50">{t("EventsView.CreatedBy")} </span>
              <span
                style={{
                  fontFamily: "droid-serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                }}
              >
                @{event.createdBy}
              </span>
            </p>
          </div>
        </div>

        {/* //! EVENT DATA */}
        <EventData event={event} />

        {/* //! PARTICIPANTS */}
        <div className="col-span-12 px-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[1.1em]">
              {" "}
              {t("EventsView.Participants")}
            </p>
            <p className="opacity-50">{event.members.current}</p>
          </div>
          <div className="flex gap-4 mt-4 flex-wrap">
            {event.participants.map((participant) => (
              <ProfileImage
                key={participant.userId}
                profilePic={participant.profilePic}
                height="3.5rem"
              />
            ))}
          </div>
        </div>

        {/* //! DIVIDER */}
        <hr
          className="mt-4 col-span-12 mx-4"
          style={{
            borderTop: "0.5px solid",
            borderColor:
              themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(140, 140, 140, 0.1)",
          }}
        />

        {/* //! POST */}
        <div className="col-span-12 px-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[1.1em]">
              {" "}
              {t("EventsView.EventCloset")}
            </p>
            <p className="opacity-50">{event.eventPosts.length}</p>
          </div>
          <div className="mt-4">
            <Masonry columns={{ xs: 1, md: 2 }} spacing={{ xs: 2 }}>
              {event.eventPosts.map((post) => (
                <PostCard
                  key={post.id}
                  data={post}
                  onClick={() => console.log("Hola")}
                  type="event"
                />
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
