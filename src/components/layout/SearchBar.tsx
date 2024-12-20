import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useSearch } from "@/context/SearchContext";
import LocationCard from "@/components/common/LocationCard";
import { useSidebarRight } from "@/context/SidebarRightContext";

const SearchBar: React.FC = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const { setIsSidebarRightVisible } = useSidebarRight();

  const { isSearching, setIsSearching, searchText, setSearchText } =
    useSearch();

  const handleFocus = () => {
    setIsSearching(true);
    setIsSidebarRightVisible(true);
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
          themeMode === "dark"
            ? "bg-[#171717] text-white"
            : "bg-[#F7F7F7] text-black"
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
              themeMode === "dark" ? "text-white" : "text-black"
            } p-2`}
            onFocus={handleFocus}
            onChange={handleInputChange}
            value={searchText}
          />
        </div>

        {/* LOCATION SEARCH */}
        <LocationCard />
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
