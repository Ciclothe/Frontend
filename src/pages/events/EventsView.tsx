import { useSidebarRight } from "@/context/SidebarRightContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useEffect, useRef, useState } from "react";
import { useLayoutScroll } from "@/context/LayoutScrollContext";
import { usePostButton } from "@/context/CreatePostActive";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import CardEvent from "./components/CardEvent";
import L from "leaflet";
import { useTheme } from "@/context/ThemeContext.js";
import { Icon } from "@mdi/react";
import { mdiNavigationVariant } from "@mdi/js";
import Map, { Marker, useMap } from "react-map-gl";
import React from "react";

function EventsView() {
  const { setIsSidebarRightVisible } = useSidebarRight();
  const { setSectionOptions } = useSectionOptions();
  const { setHasScroll } = useLayoutScroll();
  const { setShowPostButton } = usePostButton();
  const { toggleVisibility } = useHeaderVisibility();
  const { themeMode } = useTheme();
  const carouselRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft] = useState(0);

  const [filteredEvents, setFilteredEvents] = useState<any>([]);
  const [viewState, setViewState] = React.useState({
    longitude: -0.3763,
    latitude: 39.4699,
    zoom: 13,
  });

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
    {
      id: 4,
      isJoined: true,
      eventName: "Closet Cleanse: Fashion Swap Night",
      createdBy: "tomasinho",
      category: "Sustainable Fashion",
      date: "2025-02-12",
      time: "16:30:00",
      location: { lat: "40.71427", lng: "-74.00597" },
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
    setFilteredEvents(events);
  }, []);

  useEffect(() => {
    setHasScroll(false);
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

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartX(e.clientX - carouselRef.current.offsetLeft);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const x = e.clientX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: any) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - carouselRef.current.offsetLeft);
  };

  const handleTouchMove = (e: any) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCardClick = (coordinates: { lat: string; lng: string }) => {
    const latitude = parseFloat(coordinates.lat);
    const longitude = parseFloat(coordinates.lng);

    setViewState({
      longitude,
      latitude,
      zoom: 15,
    });
    SetFilterEvents(latitude, longitude, 15);
  };

  const SetFilterEvents = (lat?: any, lng?: any, zoom?: any, e?: any) => {
    let bounds;

    if (!e) {
      const range = 0.1 / zoom;

      bounds = L.latLngBounds(
        L.latLng(lat - range, lng - range),
        L.latLng(lat + range, lng + range)
      );
    } else {
      bounds = e.target.getBounds();
    }

    const filtered = events.filter((event) => {
      const eventLatLng = L.latLng(
        Number(event.location.lat),
        Number(event.location.lng)
      );
      return bounds.contains(eventLatLng);
    });

    setFilteredEvents(filtered);
  };

  const MapEventHandler = () => {
    const { current: map } = useMap();

    useEffect(() => {
      if (map) {
        map.resize();
      }
    }, [map]);

    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-0 w-full h-full py-4 xl:pb-4 xl:py-0 overflow-hidden">
      <div className="w-full h-full grid place-items-center max-h-full relative">
        <div
          className="z-10 h-full max-w-full aspect-[16/9] rounded-xl overflow-hidden origin-bottom relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`${
              themeMode === "dark" ? "bg-[#0B0B0B]" : "bg-white"
            } p-2 cursor-pointer aspect-square absolute z-[1000] top-4 right-4 rounded-md flex items-center`}
            onClick={() => {
              setViewState({
                longitude: -0.3763,
                latitude: 39.4699,
                zoom: 15,
              });
              SetFilterEvents(39.4699, -0.3763, 15);
            }}
          >
            <Icon
              path={mdiNavigationVariant}
              size={0.7}
              className="flex-shrink-0 mr-1"
            />
          </div>
          <Map
            {...viewState}
            onMove={(e) => {
              setViewState(e.viewState);
              const { lat, lng } = e.target.getCenter();
              const zoom = e.target.getZoom();
              SetFilterEvents(lat, lng, zoom, e);
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle={`mapbox://styles/alejospinar/${
              themeMode === "dark"
                ? "cm67f0g7500ha01r891ot5w96"
                : "cm67er22x002f01qzf9q3apfd"
            }`}
            mapboxAccessToken="pk.eyJ1IjoiYWxlam9zcGluYXIiLCJhIjoiY20wa2lreDMxMTk5eDJrb2F0N3NtNHBkMyJ9.LV8h87QAtrtHZ2U2FP4V1g"
          >
            <MapEventHandler />
            {filteredEvents.map((event: any, index: number) => (
              <Marker
                key={index}
                longitude={parseFloat(event.location.lng)}
                latitude={parseFloat(event.location.lat)}
                anchor="bottom"
                onClick={() => handleCardClick(event.location)}
              >
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    backdropFilter: "brightness(1)",
                    backgroundColor: "rgba(13, 188, 115, 0.4)",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      border: "3px solid #0DBC73",
                    }}
                  />
                </div>
              </Marker>
            ))}
          </Map>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth whitespace-nowrap no-scrollbar gap-4 absolute z-[1000] left-4 bottom-4 right-4 max-w-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              transition: "scroll-left 0.2s ease",
            }}
          >
            {filteredEvents.map((event: any) => (
              <CardEvent key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsView;
