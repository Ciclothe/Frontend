import { useSidebarRight } from "@/context/SidebarRightContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useEffect, useRef, useState } from "react";
import ProfileImage from "@/components/ui/ProfilePic";
import { Icon } from "@mdi/react";
import {
  mdiCheckDecagram,
  mdiCalendarBlank,
  mdiClockOutline,
  mdiMapMarker,
  mdiShareVariant,
} from "@mdi/js";
import { useTheme } from "@/context/ThemeContext.js";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";
import { usePostButton } from "@/context/CreatePostActive";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer } from "react-leaflet";
import API_CONSTANTS from "@/services/config";
import { Marker } from "react-leaflet";
import L from "leaflet";
import SaveIcon from "@/assets/uiIcons/SaveIcon";
import { useNavigate } from "react-router-dom";

function EventsView() {
  const { setIsSidebarRightVisible } = useSidebarRight();
  const { setSectionOptions } = useSectionOptions();
  const { setHasScroll } = useLayoutScroll();
  const { setShowPostButton } = usePostButton();
  const { toggleVisibility } = useHeaderVisibility();
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;
  const navigate = useNavigate();

  const mapRef = useRef<any>(null);

  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const customIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/?size=200&id=7880&format=png&color=DF1E32",
    iconSize: [25, 25],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Simulated API response
  const events = [
    {
      id: 1,
      eventName: "Retro Revival Night: Fashion & Music",
      createdBy: "lielcite",
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
            "https://i.pinimg.com/736x/3b/43/7d/3b437d344167319ea707b2970caf4dee.jpg",
        },
        {
          userId: 2,
          userName: "marcRios24",
          profilePic:
            "https://i.pinimg.com/736x/6d/7d/b2/6d7db235794ef83e1402f3310979df02.jpg",
        },
        {
          userId: 3,
          userName: "jorgeTD",
          profilePic:
            "https://i.pinimg.com/736x/8a/bc/83/8abc8309179e57a54678324e27499109.jpg",
        },
        {
          userId: 4,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/3b/43/7d/3b437d344167319ea707b2970caf4dee.jpg",
        },
      ],
      saved: false,
      shared: false,
    },
    {
      id: 2,
      eventName: "Urban Fusion Gathering: Style & Sneakers",
      createdBy: "alejosito",
      category: "Streetwear",
      date: "2025-01-21",
      time: "14:30:00",
      location: { lat: "39.480889579488", lng: "-0.34110993065103" },
      members: { current: 25, total: 80 },
      garments: 20,
      verified: true,
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
        {
          userId: 3,
          userName: "jorgeTD",
          profilePic:
            "https://i.pinimg.com/736x/d7/b1/36/d7b136775e2256659202e3059108f5d3.jpg",
        },
        {
          userId: 4,
          userName: "Maria_goya",
          profilePic:
            "https://i.pinimg.com/736x/3b/43/7d/3b437d344167319ea707b2970caf4dee.jpg",
        },
      ],
      saved: false,
      shared: false,
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
    }, [lat, lng]); // Re-run when lat or lng changes

    return location; // Return the location
  };

  const handleEventClick = (eventId: number, eventName: string) => {
    // Convertir el nombre del evento en un 'slug' seguro para la URL
    const slug = encodeURIComponent(
      eventName.replace(/\s+/g, "-").toLowerCase()
    );

    // Generar la URL con el eventId y el 'slug' codificado
    navigate(`/event/${eventId}/${slug}`);
  };

  return (
    <div className="w-full px-4 md:px-0">
      <p className="font-bold text-[1.3em]">{t("EventsView.CloseToYou")}</p>
      <div className="mt-4 grid grid-cols-12 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`${
              themeMode === "dark"
                ? "md:hover:bg-[#1E1E1E]"
                : "md:hover:bg-[#F7F7F7]"
            } col-span-12 cursor-pointer sm:col-span-6 xl:col-span-4 w-full items-center rounded-2xl p-4 flex gap-3 flex-col justify-between`}
            style={{
              border: `0.5px solid ${
                themeMode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(140, 140, 140, 0.1)"
              }`,
            }}
            onClick={() => handleEventClick(event.id, event.eventName)}
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1">
                {event.participants.length > 0 && (
                  <div className="flex items-center">
                    {event.participants
                      .slice(0, 3)
                      .map((participant: any, i: number) => (
                        <div
                          key={i}
                          className={`relative ${i > 0 ? "ml-[-5px]" : ""}`}
                        >
                          <ProfileImage
                            profilePic={participant?.profilePic}
                            height={"1.2rem"}
                          />
                        </div>
                      ))}

                    {/* Mostrar el número de usuarios restantes */}
                    {event.participants.length > 3 && (
                      <div className="flex ml-[-5px] z-[100] items-center justify-center rounded-full bg-[#EEEEEE] h-5 w-5 text-center text-sm text-black">
                        <p className="text-[8px] font-bold">
                          +{event.members?.current - 3}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <p
                  className="text-[1.1em]"
                  style={{
                    fontFamily: "droid-serif",
                    fontWeight: 700,
                    fontStyle: "italic",
                  }}
                >
                  @{event.createdBy}
                </p>
              </div>
              {event.verified && (
                <Icon
                  path={mdiCheckDecagram}
                  size={0.8}
                  className="text-[#0DBC73]"
                />
              )}
            </div>
            <div className="w-full">
              <div>
                <p className="opacity-50 mb-[-5px]">{event.category}</p>
                <p className="text-[1.2em] font-bold titleStyles">
                  {event.eventName}
                </p>
              </div>
              <div className="flex mt-3 gap-2">
                <div className="flex items-center gap-1 max-w-[33%]">
                  <Icon
                    path={mdiCalendarBlank}
                    size={0.8}
                    className="flex-shrink-0"
                  />
                  <p className="truncate overflow-hidden whitespace-nowrap">
                    {formatDateToHumanReadable(event?.date)}
                  </p>
                </div>
                <div className="flex items-center gap-1 max-w-[33%]">
                  <Icon
                    path={mdiClockOutline}
                    size={0.8}
                    className="flex-shrink-0"
                  />
                  <p className="truncate overflow-hidden whitespace-nowrap">
                    {formatTime(event?.time)}
                  </p>
                </div>
                <div className="flex items-center gap-1 max-w-[33%]">
                  <Icon
                    path={mdiMapMarker}
                    size={0.8}
                    className="flex-shrink-0"
                  />
                  <p className="truncate overflow-hidden whitespace-nowrap">
                    {locationFetcher(event.location.lat, event.location.lng)}{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[100%] aspect-[3/2] rounded-xl overflow-hidden">
              <MapContainer
                center={[
                  parseFloat(event.location.lat),
                  parseFloat(event.location.lng),
                ]}
                zoom={15}
                style={{ height: "150%", width: "150%" }}
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
            <div className="flex items-center justify-between w-full">
              <button
                className={`${
                  themeMode === "dark"
                    ? "bg-[#F7F7F7] text-black"
                    : "bg-[#171717] text-white"
                }  px-4 py-2 font-bold rounded-full gap-2`}
              >
                <p>View event</p>
              </button>
              <div className="flex items-center gap-2">
                <SaveIcon
                  size={"1.3em"}
                  colorFill={`#0DBC73`}
                  colorStroke={`${
                    themeMode === "dark" ? "#F1F1F1" : "#232323"
                  }`}
                  isSelected={event.saved}
                />
                <Icon path={mdiShareVariant} size={0.8} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsView;
