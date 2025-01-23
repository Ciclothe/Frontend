import ProfileImage from "@/components/ui/ProfilePic";
import { Icon } from "@mdi/react";
import {
  mdiCheckDecagram,
  mdiCircleSmall,
  mdiNavigationVariant,
  mdiMapOutline,
} from "@mdi/js";
import { useTheme } from "@/context/ThemeContext.js";
import { useState, useEffect } from "react";
import ChooseItemsModal from "./ChooseItemsModal";
import API_CONSTANTS from "@/services/config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CardEvent({ event, onCardClick }: any) {
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  const [showModalToSelectItems, setShowModalToSelectItems] = useState(false);
  const { t } = useTranslation();

  const formatTime = (time: any) => {
    const date =
      typeof time === "string" ? new Date(`1970-01-01T${time}`) : time;

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}:${formattedMinutes}`;
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
    const slug = encodeURIComponent(
      eventName.replace(/\s+/g, "-").toLowerCase()
    );

    navigate(`/event/${eventId}/${slug}`);
  };

  const closeModal = () => {
    setShowModalToSelectItems(false);
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(event.location);
    }
  };

  return (
    <>
      <div
        key={event.id}
        className={`${
          themeMode === "dark"
            ? "bg-[#0B0B0B] md:hover:bg-[#1E1E1E]"
            : "bg-[#FFFFFF] md:hover:bg-[#F7F7F7]"
        } w-full sm:w-1/2 xl:w-1/3 cursor-pointer items-center rounded-2xl p-4 flex gap-3 flex-col justify-between`}
        style={{ userSelect: "none" }}
        onClick={handleCardClick}
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
            <p
              className="text-[1.2em] font-bold w-full truncate"
              style={{
                fontFamily: "Futura Maxi CG Bold",
                fontWeight: 400,
              }}
            >
              {event.eventName}
            </p>
          </div>
          <div className="flex my-2 opacity-50">
            <Icon
              path={mdiMapOutline}
              size={0.7}
              className="flex-shrink-0 mr-1"
            />
            <div className="flex items-center max-w-[50%]">
              <p className="truncate overflow-hidden whitespace-nowrap">
                {formatTime(event?.time)}
              </p>
            </div>

            <div className="flex items-center max-w-[50%]">
              <Icon
                path={mdiCircleSmall}
                size={0.8}
                className="flex-shrink-0"
              />
              <p className="truncate overflow-hidden whitespace-nowrap">
                {formatDateToHumanReadable(event?.date)}
              </p>
            </div>
          </div>
          <div
            className={`${
              themeMode === "dark" ? "bg-[#2A2A2A]" : "bg-[#EFEFEF]"
            } py-1 px-2 rounded-md gap-1  flex items-center w-fit max-w-[70%]`}
          >
            <Icon
              path={mdiNavigationVariant}
              size={0.7}
              className="flex-shrink-0 mr-1 opacity-50"
            />
            <p className="truncate overflow-hidden whitespace-nowrap opacity-50">
              {locationFetcher(event.location.lat, event.location.lng)}{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-2">
          <button
            className={`${
              themeMode === "dark"
                ? "bg-[#F7F7F7] text-black"
                : "bg-[#171717] text-white"
            }  px-4 py-2 font-bold rounded-md gap-2 w-full`}
            onClick={() => handleEventClick(event.id, event.eventName)}
          >
            <p>{t("EventsView.ViewEvent")}</p>
          </button>
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
