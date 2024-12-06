import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface SearchContextProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  locationSearch: { city: number; country: number };
  setLocation: (value: {
    locationCityCountry: number[];
    range: number;
  }) => void;
  setRange: (value: number) => void;
  fetchLocation: (lat: number, lon: number) => Promise<void>;
  range: number;
}

const RangeLocationContext = createContext<SearchContextProps | undefined>(
  undefined
);

export const SearchLocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [locationSearch, setLocationSearch] = useState<{
    city: number;
    country: number;
  }>({ city: -0.37966, country: 39.47391 });

  const [range, setRange] = useState<number>(2000);

  const mapboxToken =
    "pk.eyJ1IjoiYWxlam9zcGluYXIiLCJhIjoiY20wa2lreDMxMTk5eDJrb2F0N3NtNHBkMyJ9.LV8h87QAtrtHZ2U2FP4V1g";

  useEffect(() => {
    fetchLocation(locationSearch.city, locationSearch.country);
  }, []);

  const fetchLocation = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lon}.json?access_token=${mapboxToken}`
      );

      const data = response.data.features[0];
      if (data) {
        const city =
          data.context.find((item: any) => item.id.includes("place"))?.text ||
          "Undefined";
        const country =
          data.context.find((item: any) => item.id.includes("country"))?.text ||
          "Undefined";
        setLocationSearch({ city, country });
      }
      setIsOpened(false);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const setLocation = async ({
    locationCityCountry,
    range,
  }: {
    locationCityCountry: number[];
    range: number;
  }) => {
    if (locationCityCountry.length === 2) {
      const [lon, lat] = locationCityCountry;
      await fetchLocation(lat, lon);
    }
    setRange(range);
  };

  return (
    <RangeLocationContext.Provider
      value={{
        isOpened,
        setIsOpened,
        locationSearch,
        setLocation,
        range,
        setRange,
        fetchLocation,
      }}
    >
      {children}
    </RangeLocationContext.Provider>
  );
};

export const useSearchLocation = () => {
  const context = useContext(RangeLocationContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchLocationProvider");
  }
  return context;
};
