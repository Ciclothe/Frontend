import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSidebarRight } from "@/context/SidebarRightContext";
import { usePostButton } from "@/context/CreatePostActive";
import { useTheme } from "@/context/ThemeContext.js";
import Icon from "@mdi/react";
import {
  mdiArrowLeft,
  mdiCircleSmall,
  mdiDotsVertical,
  mdiAccountGroup,
  mdiStar,
  mdiCalendarBlank,
  mdiMapMarker,
  mdiHanger,
} from "@mdi/js";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import L from "leaflet";
import API_CONSTANTS from "@/services/config";
import PostOptions from "@/components/layout/PostOptions";
import ProfileImage from "@/components/ui/ProfilePic";
import PostCard from "@/pages/feed/components/PostCard";
import Masonry from "@mui/lab/Masonry";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";

const events = [
  {
    id: 1,
    eventName: "Retro Revival Night: Fashion & Music",
    createdBy: "lielcite",
    participantLimit: 50,
    garmentLimitPerPerson: 4,
    eventDescription:
      "Join a unique event where streetwear and sneakers enthusiasts come together to trade second-hand fashion. Bring your best pre-loved pieces, discover new treasures, and connect with a community that values creativity and style. Give your wardrobe a fresh look while making meaningful connections!",
    profilePhoto:
      "https://i.pinimg.com/736x/17/22/de/1722deee0886756862695a2d0d319dd3.jpg",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: "39.4676153", lng: "-0.4039672" },
    members: { current: 12, total: 80 },
    garments: 20,
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
];

const EventDetails = () => {
  const [opened, setOpened] = useState(false);

  const { setShowPostButton } = usePostButton();
  const { setIsSidebarRightVisible } = useSidebarRight();
  const { setHasScroll } = useLayoutScroll();

  const { themeMode } = useTheme();
  const mapRef = useRef<any>(null);
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsSidebarRightVisible(true);
    setShowPostButton(false);
    setHasScroll(true);
  }, []);

  const customIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/?size=200&id=7880&format=png&color=DF1E32",
    iconSize: [25, 25],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const { eventId, eventName } = useParams();

  const decodedEventName = decodeURIComponent(eventName!).replace(/-/g, " ");

  const event = events.find(
    (e) =>
      e.id === parseInt(eventId!) &&
      e.eventName.toLowerCase() === decodedEventName
  );

  if (!event) {
    return <p>Evento no encontrado</p>;
  }

  const eventDate = new Date(event.date);
  const currentDate = new Date();

  const isThisWeek = () => {
    const currentWeekStart = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay())
    );
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

    return eventDate >= currentWeekStart && eventDate <= currentWeekEnd;
  };

  const isThisMonth = () => {
    return eventDate.getMonth() === currentDate.getMonth();
  };

  const eventStatus = isThisWeek()
    ? "this week"
    : isThisMonth()
    ? "this month"
    : "upcoming";

  const getBackgroundColor = () => {
    switch (eventStatus) {
      case "this week":
        return "#E14E7A";
      case "this month":
        return "#4CAF50";
      case "upcoming":
        return "#FFC107";
      default:
        return "#FFFFFF";
    }
  };

  const getText = () => {
    switch (eventStatus) {
      case "this week":
        return "This Week";
      case "this month":
        return "This Month";
      case "upcoming":
        return "Upcoming";
      default:
        return "";
    }
  };

  const formatTime = (time: any) => {
    const date =
      typeof time === "string" ? new Date(`1970-01-01T${time}`) : time;

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours >= 12 ? "P.M." : "A.M.";

    hours = hours % 12 || 12;

    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}:${formattedMinutes} ${period}`;
  };

  const cityFetcher = (lat: string, lng: string) => {
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
      const fetchLocation = async () => {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
          );
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            const city = data.features.find((feature: any) =>
              feature.place_type.includes("place")
            );
            const country = data.features.find((feature: any) =>
              feature.place_type.includes("country")
            );

            const cityName = city ? city.text : "Unknown city";
            const countryName = country ? country.text : "Unknown country";

            setLocation(`${cityName}, ${countryName}`);
          } else {
            setLocation("No location found");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          setLocation("Error fetching location");
        }
      };

      fetchLocation();
    }, [lat, lng]);

    return location;
  };

  const formatDateToHumanReadable = (dateString: any) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const year = date.getFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[date.getMonth()];

    return `${day} ${month} ${year}`;
  };

  const locationFetcher = (lat: string, lng: string) => {
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
      const fetchLocation = async () => {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
          );
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            setLocation(
              data.features[0].text + ", " + data.features[0].address
            );
          } else {
            setLocation("No location found");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          setLocation("Error fetching location");
        }
      };

      fetchLocation();
    }, [lat, lng]);

    return location;
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div
        className={`${
          themeMode === "dark" ? "text-white" : "text-black"
        } grid grid-cols-12`}
      >
        <div
          className={`${
            themeMode === "dark" ? "bg-[#0B0B0B]" : "bg-[#ffffff]"
          } col-span-12 px-2 py-4 md:px-4 md:py-4 sticky top-0 z-[1000]`}
        >
          <button
            className={`${
              themeMode === "dark" ? "bg-[#232323]" : "bg-[#F7F7F7]"
            } p-2 flex items-center justify-center rounded-full aspect-square w-8 h-8`}
            onClick={() => window.history.back()}
          >
            <Icon path={mdiArrowLeft} size={0.7} />
          </button>
        </div>

        {/* //! MAP */}
        <div className="col-span-12 aspect-[3/2] md:aspect-[16/9] rounded-xl overflow-hidden mx-4">
          <MapContainer
            center={[
              parseFloat(event.location.lat),
              parseFloat(event.location.lng),
            ]}
            zoom={17}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
            zoomControl={false}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/${
                themeMode === "dark" ? "dark-v11" : "light-v11"
              }/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxlam9zcGluYXIiLCJhIjoiY20wa2lreDMxMTk5eDJrb2F0N3NtNHBkMyJ9.LV8h87QAtrtHZ2U2FP4V1g`}
            />
            <Marker
              position={[
                parseFloat(event.location.lat),
                parseFloat(event.location.lng),
              ]}
              icon={customIcon}
            ></Marker>
          </MapContainer>
        </div>

        {/* //! EVENT ACTIONS */}
        <div className="col-span-12 flex flex-col sm:flex-row sm:items-center justify-between mx-4 mt-4">
          <div className="flex items-center gap-2">
            <div
              className={`${
                themeMode === "dark" ? "text-black" : "text-white"
              } w-fit px-4 py-1 rounded-full truncate overflow-hidden whitespace-nowrap`}
              style={{ backgroundColor: getBackgroundColor() }}
            >
              {getText()}
            </div>
            <div className="flex items-center gap-1 opacity-50">
              <p className="truncate overflow-hidden whitespace-nowrap">
                {formatTime(event?.time)}
              </p>
              <Icon path={mdiCircleSmall} size={0.8} />
              <p className="truncate overflow-hidden whitespace-nowrap">
                {cityFetcher(event.location.lat, event.location.lng)}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              className={`${
                themeMode === "dark"
                  ? "hover:text-black bg-opacity-20"
                  : "hover:text-white bg-opacity-40"
              } px-8 py-2 w-full sm:w-fit font-bold rounded-full gap-2 border hover:bg-[#5BE8FB] bg-[#5BE8FB] border-[#5BE8FB] text-[#5BE8FB]`}
            >
              <p>Join</p>
            </button>
            {/* POST OPTIONS */}
            <div
              className="col-span-1 flex justify-end relative cursor-pointer"
              onClick={() => setOpened(!opened)}
            >
              <Icon path={mdiDotsVertical} size={0.8} />
              <PostOptions
                postId={event?.id}
                opened={opened}
                setOpened={setOpened}
              />
            </div>
          </div>
        </div>

        {/* //! EVENT NAME & CREATED BY */}
        <div className="col-span-12 px-4 mt-4">
          <p className="text-[1.5em] font-bold">{event?.eventName}</p>
          <div className="flex items-center gap-2">
            <ProfileImage profilePic={event?.profilePhoto} height="1.5em" />
            <p>
              <span className="opacity-50">Created by </span>
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

        {/* //! EVENT DETAILS */}
        <div className="col-span-12 px-4 mt-4 gap-4 grid grid-cols-12">
          <div
            className="col-span-12 md:col-span-6 rounded-xl p-4 flex flex-col gap-4 items-center justify-center"
            style={{
              border: `0.5px solid ${
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(140, 140, 140, 0.1)"
              }`,
            }}
          >
            <div className="flex items-center gap-2 w-full">
              <div
                className="p-3 rounded-xl"
                style={{
                  border: `0.5px solid ${
                    themeMode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(140, 140, 140, 0.1)"
                  }`,
                }}
              >
                <Icon path={mdiStar} size={0.8} />
              </div>
              <div className="w-full overflow-hidden">
                <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  Event type
                </p>
                <p className="font-bold">{event?.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div
                className="p-3 rounded-xl"
                style={{
                  border: `0.5px solid ${
                    themeMode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(140, 140, 140, 0.1)"
                  }`,
                }}
              >
                <Icon path={mdiCalendarBlank} size={0.8} />
              </div>
              <div className="w-full overflow-hidden">
                <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  Event date
                </p>
                <p className="font-bold">
                  {" "}
                  {formatDateToHumanReadable(event?.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div
                className="p-3 rounded-xl"
                style={{
                  border: `0.5px solid ${
                    themeMode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(140, 140, 140, 0.1)"
                  }`,
                }}
              >
                <Icon path={mdiMapMarker} size={0.8} />
              </div>
              <div className="w-full overflow-hidden">
                <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  Event location
                </p>
                <p className="font-bold">
                  {locationFetcher(event.location.lat, event.location.lng)}{" "}
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-span-12 md:col-span-6 rounded-xl p-4"
            style={{
              border: `0.5px solid ${
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(140, 140, 140, 0.1)"
              }`,
            }}
          >
            <p className="font-bold text-[1.1em] whitespace-nowrap overflow-hidden text-ellipsis">
              Event details
            </p>
            <p className="opacity-50 mt-1">{event?.eventDescription}</p>
            <div className="flex items-center mt-2 gap-2">
              <div className="flex items-center gap-2 w-[50%]">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    border: `0.5px solid ${
                      themeMode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(140, 140, 140, 0.1)"
                    }`,
                  }}
                >
                  <Icon path={mdiAccountGroup} size={0.8} />
                </div>
                <div className="w-full overflow-hidden">
                  <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    Participant limits
                  </p>
                  <p className="font-bold">{event?.participantLimit}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-[50%]">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    border: `0.5px solid ${
                      themeMode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(140, 140, 140, 0.1)"
                    }`,
                  }}
                >
                  <Icon path={mdiHanger} size={0.8} />
                </div>
                <div className="w-full overflow-hidden">
                  <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
                    Garment limit per person
                  </p>
                  <p className="font-bold">{event?.garmentLimitPerPerson}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //! PARTICIPANTS */}
        <div className="col-span-12 px-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[1.1em]">Participants</p>
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
            <p className="font-bold text-[1.1em]">Event closet</p>
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
