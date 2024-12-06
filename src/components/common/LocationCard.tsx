import { useSearchLocation } from "@/context/RangeLocationContext";
import { Icon } from "@mdi/react";
import { mdiCrosshairsGps } from "@mdi/js";

const LocationCard = () => {
  const { locationSearch, range, setIsOpened } = useSearchLocation();

  return (
    <div
      className="bg-[#0DBC73] text-[#0DBC73] border-[#0DBC73] bg-opacity-10 border-2 h-full gap-2 md:gap-6 px-4 py-[2px] rounded-full flex justify-between items-center cursor-pointer"
      onClick={() => setIsOpened(true)}
    >
      <div className="flex flex-col whitespace-nowrap">
        <h2 className="font-bold md:max-w-[200px] truncate">
          {locationSearch.city}, {locationSearch.country}
        </h2>
        <p className="mt-[-3px]">{(range / 1000).toFixed(1)} km</p>
      </div>

      <div>
        <Icon path={mdiCrosshairsGps} size={0.8} />
      </div>
    </div>
  );
};

export default LocationCard;
