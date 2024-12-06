import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiMagnify, mdiCrosshairsGps } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useSearch } from "@/context/SearchContext";
import { useSearchLocation } from "@/context/RangeLocationContext";

const SearchBar: React.FC = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  const { isSearching, setIsSearching, searchText, setSearchText } =
    useSearch();

  const { locationSearch, range, setIsOpened } = useSearchLocation();

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
          className="bg-[#02995D] text-[#02995D] border-[#02995D] bg-opacity-10 border-2 h-full gap-2 md:gap-6 px-4 py-[2px] rounded-full flex items-center cursor-pointer"
          onClick={() => setIsOpened(true)} // Actualiza el estado para abrir el modal
        >
          <div className="flex flex-col whitespace-nowrap">
            <h2 className="font-bold max-w-[100px] md:max-w-[200px] truncate">
              {locationSearch.city}, {locationSearch.country}
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
    </div>
  );
};

export default SearchBar;
