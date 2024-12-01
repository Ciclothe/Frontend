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

interface LocationRangeSelectorProps {
  location: {
    city: string;
    country: string;
  };
  onLocationRangeChange: (position: number[], range: number) => void;
  onClose: () => void;
}

const LocationRangeSelector: React.FC<LocationRangeSelectorProps> = ({
  location,
  onLocationRangeChange,
  onClose,
}) => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  const [position, setPosition] = useState<number[]>([]);
  const [range, setRange] = useState<number>(5000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;

  const mapRef = useRef<any>(null);

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${token}`
          );
          const results = response.data.features;
          const filteredSuggestions = results.filter(
            (result: any) =>
              result.place_type.includes("place") ||
              result.place_type.includes("locality")
          );
          setSuggestions(filteredSuggestions);
        } catch (error) {
          console.error("Error fetching location data: ", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (location?.city && location?.country) {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.city},${location.country}.json?access_token=${token}`
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
        navigator.geolocation.getCurrentPosition((location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
        });
      }
    };

    fetchUserLocation();
  }, [location]);

  const handleRangeChange = (e: Event, newValue: number | number[]) => {
    e.preventDefault();
    setRange(newValue as number);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(t("LocationSelector.GeolocationNotSupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
        mapRef.current?.flyTo([latitude, longitude], 13);
      },
      (error) => {
        console.error("Error obteniendo la ubicación: ", error);

        if (error.code === error.PERMISSION_DENIED) {
          alert(
            t("LocationSelector.PermissionDenied") +
              "\n" +
              t("LocationSelector.EnableLocation") // Ask user to enable location manually
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

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${token}`
        );
        const results = response.data.features;
        const filteredSuggestions = results.filter(
          (result: any) =>
            result.place_type.includes("place") ||
            result.place_type.includes("locality")
        );
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Error fetching location data: ", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const { center, place_name } = suggestion;
    const newPosition = [center[1], center[0]];
    setPosition(newPosition);
    setSuggestions([]);
    setSearchQuery(place_name);

    mapRef.current?.flyTo(newPosition, 13);
  };

  const handleApply = () => {
    onLocationRangeChange(position, range);
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-50 top-0 h-screen w-full z-[2000] left-0 flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      <div
        className={`${
          isNightMode ? "bg-[#171717]" : "bg-[#FFFFFF]"
        } rounded-xl p-6 w-[50rem] max-w-[90vw] flex flex-col gap-4 items-center justify-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[1.em] font-bold">
          {t("LocationSelector.SelectLocation")}
        </h2>
        <div className="sm:flex gap-2 items-center w-full">
          <div
            className={`relative flex items-center gap-1 ${
              isNightMode ? "bg-[#232323]" : "bg-[#F7F7F7]"
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
                      isNightMode
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
              aria-label={t("LocationSelector.Map")}
              center={position}
              zoom={10}
              scrollWheelZoom={true}
              className="h-full w-full rounded-2xl"
              ref={mapRef}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              <Circle
                center={position}
                radius={range}
                pathOptions={{
                  color: "0DBC73",
                  fillColor: "#0DBC73",
                  fillOpacity: 0.2,
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
            isNightMode ? "bg-[#F7F7F7] text-black" : "bg-[#171717] text-white "
          } w-full py-2 px-4 rounded-lg font-bold`}
        >
          {t("LocationSelector.Apply")}
        </button>
      </div>
    </div>
  );
};

export default LocationRangeSelector;
