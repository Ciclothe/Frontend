import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import Icon from "@mdi/react";
import { mdiMagnify, mdiMapMarkerOutline } from "@mdi/js";
import "leaflet/dist/leaflet.css";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import API_CONSTANTS from "@/services/config";
import { useSearchLocation } from "@/context/RangeLocationContext";

const LocationRangeSelector = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const [position, setPosition] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;
  const { locationSearch, setLocation, range, setRange, setIsOpened } =
    useSearchLocation();

  const mapRef = useRef<any>(null);

  // Fetch geocoding data from Mapbox
  const fetchGeocoding = async (query: string) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json`,
        {
          params: {
            access_token: token,
            types: "place,locality,address,poi",
            limit: 5,
          },
        }
      );
      return response.data.features;
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      return [];
    }
  };

  // Handle search input changes
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      const results = await fetchGeocoding(e.target.value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    const { center, place_name } = suggestion;
    const newPosition = [center[1], center[0]];
    setPosition(newPosition);
    setSearchQuery(place_name);
    setSuggestions([]);
    mapRef.current?.flyTo(newPosition, 13);
  };

  // Handle range slider change
  const handleRangeChange = (e: Event, newValue: number | number[]) => {
    e.preventDefault();
    setRange(newValue as number);
  };

  // Fetch user's location based on `location` prop or fallback to current location
  useEffect(() => {
    const fetchUserLocation = async () => {
      if (locationSearch?.city && locationSearch?.country) {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationSearch.city},${locationSearch.country}.json?access_token=${token}`
          );
          const { features } = response.data;
          if (features.length > 0) {
            const [longitude, latitude] = features[0].center;
            setPosition([latitude, longitude]);
            mapRef.current?.flyTo([latitude, longitude], 13);
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
          alert(t("LocationSelector.ErrorFetchingData"));
        }
      } else {
        navigator.geolocation.getCurrentPosition((locationSearch) => {
          const { latitude, longitude } = locationSearch.coords;
          setPosition([latitude, longitude]);
        });
      }
    };

    fetchUserLocation();
  }, [locationSearch]);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(t("LocationSelector.GeolocationNotSupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (locationSearch) => {
        const { latitude, longitude } = locationSearch.coords;
        setPosition([latitude, longitude]);
        mapRef.current?.flyTo([latitude, longitude], 13);
      },
      (error) => {
        console.error("Error obtaining location:", error);

        if (error.code === error.PERMISSION_DENIED) {
          alert(
            t("LocationSelector.PermissionDenied") +
              "\n" +
              t("LocationSelector.EnableLocation")
          );
        } else {
          alert(t("LocationSelector.GeolocationError"));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleApply = async () => {
    try {
      const response = await fetch(
        `${API_CONSTANTS.API_BASE_URL}/search/publications?search=concert&latitude=${position[0]}&longitude=${position[1]}&radius=${range}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Error al cargar usuario");
      }
      const data = await response.json();
      // TODO: Save response data to context
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setLocation({ locationCityCountry: position, range });
  };

  return (
    <div
      className={`${
        themeMode === "dark" ? "bg-[#ffffff]" : "bg-[#171717]"
      } backdrop-effect bg-opacity-20 flex items-center justify-center`}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpened(false);
      }}
    >
      <div
        className={`${
          themeMode === "dark" ? "bg-[#171717]" : "bg-[#FFFFFF]"
        } rounded-xl p-6 w-[50rem] max-w-[90vw] flex flex-col gap-4 items-center justify-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold">{t("LocationSelector.SelectLocation")}</h2>

        <div className="sm:flex gap-2 items-center w-full">
          <div
            className={`relative flex items-center gap-1 ${
              themeMode === "dark" ? "bg-[#232323]" : "bg-[#F7F7F7]"
            } rounded-full p-2 w-full sm:w-[50%]`}
          >
            <Icon path={mdiMagnify} size={0.8} className="opacity-50" />
            <input
              type="text"
              className="bg-transparent w-full focus:outline-none focus:ring-0"
              placeholder={t("LocationSelector.SearchACountry")}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto z-[2000]">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className={`${
                      themeMode === "dark"
                        ? "bg-[#171717] hover:bg-[#292929]"
                        : "bg-[#F7F7F7] hover:bg-[#E9E9E9]"
                    } p-2 cursor-pointer`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="mt-4 sm:mt-0 w-full sm:w-[50%] bg-[#0DBC73] rounded-full text-white flex p-2 items-center gap-1 justify-center"
            onClick={handleUseCurrentLocation}
          >
            <Icon path={mdiMapMarkerOutline} size={0.8} />
            {t("LocationSelector.UseCurrentLocation")}
          </button>
        </div>

        <div className="w-full h-[300px] rounded-2xl">
          {position.length > 0 && (
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              ref={mapRef}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              <Circle
                center={position}
                radius={range}
                pathOptions={{
                  color: "#0DBC73",
                  fillColor: "#0DBC73",
                  fillOpacity: 0.3,
                }}
              />
            </MapContainer>
          )}
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">{t("LocationSelector.SearchRadius")}</h3>
            <p className="opacity-50">{(range / 1000).toFixed(1)} km</p>
          </div>
          <Slider
            aria-label="Rango de búsqueda"
            value={range}
            onChange={handleRangeChange}
            min={1000}
            max={32000}
            step={100}
            className="w-full custom-slider"
            style={{ color: "#0DBC73" }}
          />
        </div>

        <button
          onClick={handleApply}
          className={`${
            themeMode === "dark"
              ? "bg-[#F7F7F7] text-black"
              : "bg-[#171717] text-white "
          } w-full py-2 px-4 rounded-lg font-bold`}
        >
          {t("LocationSelector.Apply")}
        </button>
      </div>
    </div>
  );
};

export default LocationRangeSelector;
