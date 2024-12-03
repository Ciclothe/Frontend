import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiMagnify, mdiCrosshairsGps } from "@mdi/js";
import { useTranslation } from "react-i18next";
import LocationRangeSelector from "../common/LocationRangeSelector";
import { useUser } from "@/context/UserContext.js";
import { useSearch } from "@/context/SearchContext";
import axios from "axios";

const SearchBar: React.FC = () => {
  const { user } = useUser();
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  const { isSearching, setIsSearching, searchText, setSearchText } =
    useSearch();
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [position, setPosition] = useState<number[]>([39.4699, -0.3763]);
  const [range, setRange] = useState<number>(5000);
  const [location, setLocation] = useState<{ city: string; country: string }>({
    city: user?.city || "Valencia",
    country: user?.country || "Spain",
  });

  const mapboxToken =
    "pk.eyJ1IjoiYWxlam9zcGluYXIiLCJhIjoiY20wa2lreDMxMTk5eDJrb2F0N3NtNHBkMyJ9.LV8h87QAtrtHZ2U2FP4V1g";

  const fetchLocation = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapboxToken}`
      );
      const data = response.data.features[0];
      if (data) {
        const city =
          data.context.find((item: any) => item.id.includes("place"))?.text ||
          "Desconocida";
        const country =
          data.context.find((item: any) => item.id.includes("country"))?.text ||
          "Desconocido";
        setLocation({ city, country });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    fetchLocation(position[0], position[1]);
  }, [position]);

  const handleFocus = () => {
    setIsSearching(true);
  };

  const handleBlur = () => {
    setIsSearching(false);
    setSearchText("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleLocationRangeChange = async (
    newPosition: number[],
    newRange: number
  ) => {
    try {
      await fetchLocation(newPosition[0], newPosition[1]);
    } catch (error) {
      console.error("Error al actualizar ubicación:", error);
    }
    setPosition(newPosition);
    setRange(newRange);
    setShowLocationSelector(false);
  };

  const handleLocationSelectorClose = () => {
    setShowLocationSelector(false);
  };

  return (
    <div className="w-full flex items-center justify-center gap-2">
      <div
        className={`${
          isNightMode ? "bg-[#171717] text-white" : "bg-[#F7F7F7] text-black"
        } rounded-full w-full flex items-center justify-between`}
      >
        {/* ELEMENT SEARCH */}
        <div className="px-3 flex items-center w-full">
          <div
            onClick={() => {
              const inputElement = document.getElementById(
                "searchInputGlobal"
              ) as HTMLInputElement | null;
              if (inputElement) {
                inputElement.focus();
              }
            }}
          >
            {" "}
            <Icon
              path={mdiMagnify}
              size={1}
              className="cursor-pointer opacity-50"
            />
          </div>
          <input
            id="searchInputGlobal"
            type="text"
            placeholder={t("Global.SearchHolder")}
            className={`bg-transparent w-full outline-none rounded-full ${
              isNightMode ? "text-white" : "text-black"
            } p-2`}
            onFocus={handleFocus}
            onChange={handleInputChange}
            value={searchText}
          />
        </div>

        {/* LOCATION SEARCH */}
        <div
          className="bg-[#02995D] text-[#02995D] border-[#02995D] bg-opacity-10 border-2 h-full gap-2 md:gap-6 px-4 py-[2px] rounded-full flex items-center"
          onClick={() => setShowLocationSelector(true)} // Mostrar el selector de ubicación al hacer clic
        >
          <div className="flex flex-col whitespace-nowrap">
            <h2 className="font-bold max-w-[100px] md:max-w-[200px] truncate">
              {location.city}, {location.country}
            </h2>
            <p className="mt-[-3px]">{(range / 1000).toFixed(1)} km</p>
          </div>

          <div>
            <Icon path={mdiCrosshairsGps} size={0.8} />
          </div>
        </div>
      </div>

      {isSearching && (
        <div onClick={() => handleBlur()} className="cursor-pointer">
          <p className="text-[#0DBC73] font-bold">{t("Global.Cancel")}</p>
        </div>
      )}

      {showLocationSelector && (
        <LocationRangeSelector
          location={location}
          onLocationRangeChange={handleLocationRangeChange}
          onClose={handleLocationSelectorClose}
        />
      )}
    </div>
  );
};

export default SearchBar;
