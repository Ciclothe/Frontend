import ProfileImage from "@/components/ui/ProfilePic";
import { Icon } from "@mdi/react";
import {
  mdiCheckDecagram,
  mdiCalendarBlank,
  mdiClockOutline,
  mdiMapMarker,
  mdiShareVariant,
  mdiCalendarPlus,
  mdiCalendarRemove,
} from "@mdi/js";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import SaveIcon from "@/assets/uiIcons/SaveIcon";
import L from "leaflet";
import { useTheme } from "@/context/ThemeContext.js";
import { useRef, useState, useEffect } from "react";
import ChooseItemsModal from "./ChooseItemsModal";
import API_CONSTANTS from "@/services/config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CardEvent({ event }: any) {
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  const [showModalToSelectItems, setShowModalToSelectItems] = useState(false);
  const { t } = useTranslation();

  const mapRef = useRef<any>(null);

  const customIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/?size=200&id=7880&format=png&color=DF1E32",
    iconSize: [25, 25],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

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

    return `${day} ${t(`Dates.${month}`)} ${year}`;
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

  const handleEventClick = (eventId: number, eventName: string) => {
    // Convertir el nombre del evento en un 'slug' seguro para la URL
    const slug = encodeURIComponent(
      eventName.replace(/\s+/g, "-").toLowerCase()
    );

    // Generar la URL con el eventId y el 'slug' codificado
    navigate(`/event/${eventId}/${slug}`);
  };

  const closeModal = () => {
    setShowModalToSelectItems(false);
  };

  return (
    <>
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
              <Icon path={mdiMapMarker} size={0.8} className="flex-shrink-0" />
              <p className="truncate overflow-hidden whitespace-nowrap">
                {locationFetcher(event.location.lat, event.location.lng)}{" "}
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-[100%] aspect-[3/2] rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
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
          <div className="flex items-center gap-2">
            <button
              className={`${
                themeMode === "dark"
                  ? "bg-[#F7F7F7] text-black"
                  : "bg-[#171717] text-white"
              }  px-4 py-2 font-bold rounded-full gap-2`}
            >
              <p>{t("EventsView.ViewEvent")}</p>
            </button>
            <div
              onClick={(e) => {
                e.stopPropagation(), setShowModalToSelectItems(true);
              }}
            >
              <Icon
                path={event?.isJoined ? mdiCalendarRemove : mdiCalendarPlus}
                size={0.8}
                className={`${
                  event?.isJoined ? "text-[#DF1E32]" : "text-[#5BE8FB]"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SaveIcon
              size={"1.3em"}
              colorFill={`#0DBC73`}
              colorStroke={`${themeMode === "dark" ? "#F1F1F1" : "#232323"}`}
              isSelected={event.saved}
            />
            <Icon path={mdiShareVariant} size={0.8} />
          </div>
        </div>
      </div>
      <ChooseItemsModal
        event={event}
        opened={showModalToSelectItems}
        closeModal={closeModal}
      />
    </>
  );
}

export default CardEvent;
