import PostOptions from "@/components/layout/PostOptions";
import { useTheme } from "@/context/ThemeContext.js";
import Icon from "@mdi/react";
import { mdiCircleSmall, mdiDotsVertical } from "@mdi/js";
import { useEffect, useState } from "react";
import API_CONSTANTS from "@/services/config";
import { t } from "i18next";
import ChooseItemsModal from "./ChooseItemsModal";

const EventAction = ({ event }: any) => {
  const { themeMode } = useTheme();
  const eventDate = new Date(event.date);
  const currentDate = new Date();
  const [opened, setOpened] = useState(false);
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;
  const [showModalToSelectItems, setShowModalToSelectItems] = useState(false);

  const closeModal = () => {
    setShowModalToSelectItems(false);
  };

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
        return "#DF1E32";
      case "this month":
        return "#FDDA0E";
      case "upcoming":
        return "#8846F2";
      default:
        return "#FFFFFF";
    }
  };

  const getText = () => {
    switch (eventStatus) {
      case "this week":
        return "ThisWeek";
      case "this month":
        return "ThisMonth";
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

  return (
    <>
      <div className="col-span-12 flex flex-col sm:flex-row sm:items-center justify-between mx-4 mt-4">
        <div className="flex items-center gap-2">
          <div
            className={`${
              themeMode === "dark" ? "text-black" : "text-white"
            } w-fit px-4 py-1 rounded-full font-bold truncate overflow-hidden whitespace-nowrap`}
            style={{ backgroundColor: getBackgroundColor() }}
          >
            {t(`EventsView.${getText()}`)}
          </div>
          <div className="flex items-center gap-1 opacity-50">
            <p className="truncate overflow-hidden whitespace-nowrap">
              {formatTime(event?.time)}
            </p>
            <Icon path={mdiCircleSmall} size={0.8} />
            <p className="truncate overflow-hidden whitespace-nowrap">
              {cityFetcher(
                event.location.lat.toString(),
                event.location.lng.toString()
              )}{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <button
            className={`
            ${
              event?.isJoined
                ? themeMode === "dark"
                  ? "text-black bg-[#DF1E32]"
                  : "text-white bg-[#DF1E32]"
                : themeMode === "dark" && !event?.isJoined
                ? "hover:text-black bg-opacity-20 hover:bg-[#5BE8FB] bg-[#5BE8FB] border border-[#5BE8FB] text-[#5BE8FB]"
                : "hover:text-white bg-opacity-40 hover:bg-[#5BE8FB] bg-[#5BE8FB] border border-[#5BE8FB] text-[#5BE8FB]"
            }
            px-8 py-2 w-full sm:w-fit font-bold rounded-full gap-2`}
            onClick={(e) => {
              e.stopPropagation(),
                setShowModalToSelectItems(event?.isJoined ? false : true);
            }}
          >
            <p>
              {event?.isJoined ? t("EventsView.Leave") : t("EventsView.Join")}
            </p>
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
      <ChooseItemsModal
        event={event}
        opened={showModalToSelectItems}
        closeModal={closeModal}
      />
    </>
  );
};

export default EventAction;
