import React, { useState, useEffect, useRef } from "react";
import Icon from "@mdi/react";
import { mdiMagnify, mdiMapMarkerOutline, mdiClose } from "@mdi/js";
import "leaflet/dist/leaflet.css";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import API_CONSTANTS from "@/services/config";
import { useSearchLocation } from "@/context/RangeLocationContext";
import Map, { useMap, Source, Layer } from "react-map-gl";
import * as turf from "@turf/turf";
import { Units } from "@turf/turf";
import { FeatureCollection, Polygon } from "geojson";

const LocationRangeSelector = () => {
  const { themeMode } = useTheme();
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;
  const { locationSearch, setLocation, range, setRange, setIsOpened } =
    useSearchLocation();

  const mapRef = useRef<any>(null);
  const [position, setPosition] = React.useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  }>({
    longitude: 39.47391,
    latitude: 39.47391,
    zoom: 10,
  });

  const [circleData, setCircleData] = useState<FeatureCollection<Polygon>>({
    type: "FeatureCollection",
    features: [],
  });

  const fetchGeocoding = async (query: string) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodedQuery}&types=city&language=${i18n.language}&limit=5&session_token=${token}&access_token=${token}`;
      const response = await axios.get(url);

      return response.data.suggestions;
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      return [];
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      const results = await fetchGeocoding(e.target.value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion: any) => {
    try {
      const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?session_token=${token}&access_token=${token}`;
      const response = await axios.get(url);

      if (response.status === 200 && response.data.features?.length > 0) {
        const feature = response.data.features[0];
        const [longitude, latitude] = feature.geometry.coordinates;

        setPosition({
          longitude,
          latitude,
          zoom: 11,
        });
        setSearchQuery(feature.properties?.full_address || suggestion.name);
        setSuggestions([]);
        mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 11 });
      } else {
        console.error("Invalid data received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching detailed location data:", error);
      alert(t("LocationSelector.ErrorFetchingData"));
    }
  };

  const handleRangeChange = (e: Event, newValue: number | number[]) => {
    e.preventDefault();
    setRange(newValue as number);
  };

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
            setPosition({ latitude, longitude, zoom: 10 });
            mapRef.current?.flyTo([latitude, longitude], 10);
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
          alert(t("LocationSelector.ErrorFetchingData"));
        }
      } else {
        navigator.geolocation.getCurrentPosition((locationSearch) => {
          const { latitude, longitude } = locationSearch.coords;
          setPosition({ latitude, longitude, zoom: 10 });
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
        setPosition({ latitude, longitude, zoom: 11 });
        mapRef.current?.flyTo([latitude, longitude], 11);
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
    // try {
    //   const response = await fetch(
    //     `${API_CONSTANTS.API_BASE_URL}/search/publications?search=concert&latitude=${position.longitude}&longitude=${position.latitude}&radius=${range}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       credentials: "include",
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Error al cargar usuario");
    //   }
    //   const data = await response.json();
    //   // TODO: Save response data to context
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }

    setLocation({ locationCityCountry: position, range });
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

  const updateCircleData = (
    longitude: number,
    latitude: number,
    radius: number
  ) => {
    const center = turf.point([longitude, latitude]);
    const options = { steps: 64, units: "meters" as Units };

    const circle = turf.circle(center, radius, options);
    circle.properties = { radius };

    setCircleData({
      type: "FeatureCollection",
      features: [circle],
    });
  };

  useEffect(() => {
    updateCircleData(position.longitude, position.latitude, range);
  }, [position, range]);

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
        } rounded-xl p-6 md:px-20 flex flex-col gap-4 max-h-[90vh] overflow-auto max-w-[90vw] w-[55em] items-center relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`${
            themeMode === "dark" ? "bg-[#232323]" : "bg-[#F7F7F7]"
          } p-2 flex items-center justify-center rounded-full absolute p-2 right-4 top-4`}
          onClick={() => setIsOpened(false)}
        >
          <Icon path={mdiClose} size={0.7} />
        </button>
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
                    {suggestion?.name}, {suggestion?.context?.country?.name}
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

        <div className="w-full h-[300px] rounded-2xl overflow-hidden">
          <Map
            {...position}
            onMove={(e) => {
              setPosition(e.viewState);
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle={`mapbox://styles/alejospinar/${
              themeMode === "dark"
                ? "cm67f0g7500ha01r891ot5w96"
                : "cm67er22x002f01qzf9q3apfd"
            }`}
            mapboxAccessToken="pk.eyJ1IjoiYWxlam9zcGluYXIiLCJhIjoiY20wa2lreDMxMTk5eDJrb2F0N3NtNHBkMyJ9.LV8h87QAtrtHZ2U2FP4V1g"
          >
            <Source id="circle" type="geojson" data={circleData}>
              <Layer
                id="circle-layer"
                type="fill"
                source="my-source"
                paint={{
                  "fill-color": "#0DBC73",
                  "fill-opacity": 0.3,
                }}
              />

              <Layer
                id="circle-border"
                type="line"
                source="my-source"
                paint={{
                  "line-color": "#0DBC73",
                  "line-width": 2,
                }}
              />
            </Source>
            <MapEventHandler />
          </Map>
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
