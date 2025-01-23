import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import API_CONSTANTS from "@/services/config";

interface Location {
  city: string;
  country: string;
}

interface SearchContextProps {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
  locationSearch: Location;
  setLocation: (value: {
    locationCityCountry: { longitude: number; latitude: number };
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
  const [locationSearch, setLocationSearch] = useState<Location>({
    city: "València",
    country: "Spain",
  });
  const token = API_CONSTANTS.MAPBOX_ACCESS_TOKEN;

  const [range, setRange] = useState<number>(2000);

  useEffect(() => {
    const savedLocation = localStorage.getItem("locationSearch");
    const savedRange = localStorage.getItem("range");

    if (savedLocation) {
      setLocationSearch(JSON.parse(savedLocation));
    }

    if (savedRange) {
      setRange(Number(savedRange));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locationSearch", JSON.stringify(locationSearch));
    localStorage.setItem("range", range.toString());
  }, [locationSearch, range]);

  const fetchLocation = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lon}&latitude=${lat}&access_token=${token}`
      );

      if (response.status !== 200) {
        console.error("Error fetching location:", response.statusText);
        return;
      }

      const data = response?.data?.features[0];
      if (data) {
        const city = data.properties?.context?.place?.name || "Undefined";
        const country = data.properties?.context?.country?.name || "Undefined";

        setLocationSearch({ city, country });
      }
      setIsOpened(false);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const setLocation = async (params: {
    locationCityCountry: { longitude: number; latitude: number };
    range: number;
  }) => {
    const { longitude, latitude } = params.locationCityCountry;
    await fetchLocation(latitude, longitude);
    setRange(params.range);
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
    throw new Error(
      "useSearchLocation must be used within a SearchLocationProvider"
    );
  }
  return context;
};
