import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext.js";
import API_CONSTANTS from "@/services/config";
import { useTranslation } from "react-i18next";

import { Icon } from "@mdi/react";
import {
  mdiStar,
  mdiCalendarBlank,
  mdiMapMarker,
  mdiAccountGroup,
  mdiHanger,
} from "@mdi/js";

interface EventCardProps {
  event: {
    category: string;
    date: string;
    location: { lat: number; lng: number };
    eventDescription: string;
    eventRules: {
      participantLimit: number;
      garmentLimitPerPerson: number;
    };
  };
}

const EventData: React.FC<EventCardProps> = ({ event }) => {
  const { themeMode } = useTheme();
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const borderColor =
    themeMode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(140, 140, 140, 0.1)";

  const renderEventInfo = (
    icon: string,
    label: string,
    value: string | number
  ) => (
    <div className="flex items-center gap-2 w-full">
      <div
        className="p-3 rounded-xl"
        style={{ border: `0.5px solid ${borderColor}` }}
      >
        <Icon path={icon} size={0.8} />
      </div>
      <div className="w-full overflow-hidden">
        <p className="opacity-50 w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {t(`EventsView.${label}`)}
        </p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );

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

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const locationFetcher = (lat: number, lng: number) => {
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
    <div className="col-span-12 px-4 mt-4 gap-4 grid grid-cols-12">
      {/* Event Info */}
      <div
        className="col-span-12 md:col-span-6 rounded-xl p-4 flex flex-col gap-4 items-center justify-center"
        style={{ border: `0.5px solid ${borderColor}` }}
      >
        {renderEventInfo(mdiStar, "EventType", event.category)}
        {renderEventInfo(
          mdiCalendarBlank,
          "EventDate",
          formatDateToHumanReadable(event.date)
        )}
        {renderEventInfo(
          mdiMapMarker,
          "EventLocation",
          locationFetcher(event.location.lat, event.location.lng)
        )}
      </div>

      {/* Event Details */}
      <div
        className="col-span-12 md:col-span-6 rounded-xl p-4"
        style={{ border: `0.5px solid ${borderColor}` }}
      >
        <p className="font-bold text-[1.1em] whitespace-nowrap overflow-hidden text-ellipsis">
          {t("EventsView.EventDetails")}
        </p>
        <div>
          <p className={`opacity-50 mt-1`}>
            <span
              className={`${
                isExpanded ? "" : "line-clamp-[8] overflow-hidden"
              }`}
            >
              {event?.eventDescription}
            </span>
            <div
              onClick={toggleDescription}
              className="cursor-pointer text-blue-500"
            >
              {isExpanded ? t("EventsView.ShowLess") : t("EventsView.ReadMore")}
            </div>
          </p>
        </div>
        <div className="flex items-center mt-2 gap-2">
          <div className="flex items-center gap-2 w-[50%]">
            {renderEventInfo(
              mdiAccountGroup,
              "ParticipantLimits",
              event?.eventRules.participantLimit
            )}
          </div>
          <div className="flex items-center gap-2 w-[50%]">
            {renderEventInfo(
              mdiHanger,
              "GarmentLimit",
              event?.eventRules.garmentLimitPerPerson
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventData;
