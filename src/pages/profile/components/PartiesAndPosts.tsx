import { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiAccountGroup,
  mdiCalendarBlank,
  mdiClockOutline,
  mdiMapMarker,
  mdiPencil,
} from "@mdi/js";
import Swapicon from "@/assets/icons/Swapicon";
import { useTheme } from "@/context/ThemeContext";

function PartiesAndPosts({ userActivities }) {
  const [selectedEvent, setSelectedEvent] = useState(0);
  const { themeMode } = useTheme();

  const handleClick = (index: number) => {
    setSelectedEvent(index);
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString.split("-").reverse().join("-"));
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  const formatHour = (hourString: any) => {
    const [hours, minutes] = hourString.split(":");
    const hour = hours % 12 || 12;
    const period = hours >= 12 ? "PM" : "AM";
    return `${hour}:${minutes} ${period}`;
  };

  return (
    <div className="py-5 flex flex-col gap-2 w-full">
      <div className="flex font-bold gap-2 w-full justify-center">
        <ul className="flex w-[30%]">
          <li
            onClick={() => handleClick(0)}
            className={`cursor-pointer transition-opacity pt-2 w-[50%] flex justify-center ${
              selectedEvent === 0
                ? `${
                    themeMode === "dark" ? "border-white" : "border-black"
                  } opacity-100 border-t-4 border-black`
                : "opacity-50 border-t-2"
            }`}
          >
            Closet
          </li>
          <li
            onClick={() => handleClick(1)}
            className={`cursor-pointer transition-opacity pt-2 w-[50%] flex justify-center ${
              selectedEvent === 1
                ? `${
                    themeMode === "dark" ? "border-white" : "border-black"
                  } opacity-100 border-t-4 border-black`
                : "opacity-50 border-t-2"
            }`}
          >
            Parties
          </li>
        </ul>
      </div>
      <div className="py-4 flex w-full">
        {selectedEvent === 1 ? (
          <div className="flex flex-wrap">
            {userActivities.parties.map((party: any, index: number) => (
              <div
                key={index}
                className="flex flex-col m-2 gap-2 cursor-pointer w-[20vw] px-4 rounded-xl"
                style={{
                  border: `0.5px solid ${
                    themeMode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(140, 140, 140, 0.1)"
                  }`,
                }}
              >
                <div>
                  <div className="py-3">
                    <div className="flex justify-between items-center">
                      {/* Participantes y nombre de usuario */}
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {party.participants
                            .slice(0, 3)
                            .map((participant: any, i: number) => (
                              <div key={i} className="relative">
                                <img
                                  src={participant?.profilePic}
                                  className="rounded-full h-5 w-5 object-cover"
                                  alt={participant?.userName}
                                />
                              </div>
                            ))}

                          {/* Mostrar el número de usuarios restantes */}
                          {party.participants.length > 3 && (
                            <div className="flex items-center justify-center rounded-full bg-[#EEEEEE] h-5 w-5 text-center text-sm text-black">
                              <p className="text-[8px] font-bold">
                                +{party.participants.length - 3}
                              </p>
                            </div>
                          )}
                        </div>
                        <p className="font-bold">{party?.createdBy}</p>
                      </div>
                      {/* Capacidad */}
                      <div className="flex items-center gap-1 text-[#1B6B44]">
                        <Icon
                          path={mdiAccountGroup}
                          size={0.8}
                          className="flex items-center"
                        />
                        <p className="flex items-center mb-[-5px]">
                          {party?.capacity}
                        </p>
                      </div>
                    </div>
                    {/* Tema y título */}
                    <div className="my-3">
                      <p className="opacity-50">{party?.theme}</p>
                      <h2 className="font-bold text-[1.2em]">{party?.title}</h2>
                    </div>
                    {/* Información del evento: Fecha, Hora y Dirección */}
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Icon
                          path={mdiCalendarBlank}
                          className="flex items-center icon"
                        />
                        <p>{formatDate(party?.eventDate)}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <Icon
                          path={mdiClockOutline}
                          className="flex items-center icon"
                        />
                        <p>{formatHour(party?.eventHour)}</p>
                      </div>

                      <div className="flex items-center gap-1 w-full">
                        <Icon
                          path={mdiMapMarker}
                          className="flex items-center icon"
                        />
                        <p className="truncate overflow-hidden text-ellipsis w-[60px]">
                          {party.eventLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full gap-2">
            {userActivities.closet.map((post: any, index: any) => (
              <div
                key={index}
                className="rounded-xl p-3 relative"
                style={{
                  border: `0.5px solid ${
                    themeMode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(140, 140, 140, 0.1)"
                  }`,
                }}
              >
                {post?.status === "swapped" && (
                  <div className="bg-black absolute top-0 left-0 h-full w-full rounded-xl bg-opacity-30 z-10 text-white flex flex-col gap-2 items-center justify-center">
                    <Swapicon size={"3em"} color={"#ffffff"} />
                    <p className="font-bold">Swapped</p>
                  </div>
                )}
                <div className="relative">
                  <img
                    src={post?.mainPic}
                    className="w-[22em] h-[22em] object-cover rounded-xl"
                  />
                  {post?.status !== "swapped" && (
                    <div className="absolute top-2 right-2 rounded-full bg-black p-2 bg-opacity-70">
                      <Icon
                        path={mdiPencil}
                        size={0.6}
                        className="text-white cursor-pointer"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 items-center justify-between mt-2">
                  <div>
                    <p className="opacity-50">Views</p>
                    <p className="font-bold">{post?.views}</p>
                  </div>
                  <div>
                    <p className="opacity-50">Swap Offers</p>
                    <p className="font-bold">{post?.swapOffers}</p>
                  </div>
                  <div>
                    <p className="opacity-50">Shares</p>
                    <p className="font-bold">{post?.shares}</p>
                  </div>
                  <div>
                    <p className="opacity-50">Posted</p>
                    <p className="font-bold">{post?.posted}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PartiesAndPosts;
