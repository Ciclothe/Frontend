/**
 * SearchBar component renders a search input field with an icon and a location display.
 * It uses the current theme and translation context.
 *
 * @component
 * @example
 * return (
 *   <SearchBar />
 * )
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 *
 * @remarks
 * - The component uses `useTheme` to determine if night mode is enabled.
 * - The component uses `useTranslation` for internationalization.
 * - The search input field can be focused by clicking on the magnifying glass icon.
 * - The location display shows a hardcoded location "Valencia, Spn." and distance "2 km".
 *
 * @dependencies
 * - `useTheme` from "@/context/ThemeContext"
 * - `useTranslation` from "react-i18next"
 * - `Icon` from "@mdi/react"
 * - `mdiMagnify` and `mdiCrosshairsGps` from "@mdi/js"
 */
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiMagnify, mdiCrosshairsGps } from "@mdi/js";
import { useTranslation } from "react-i18next";

const SearchBar: React.FC = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="w-full lg:w-[80%] xl:w-[70%] flex items-center justify-center">
      <div
        className={`${
          isNightMode ? "bg-[#171717] text-white" : "bg-white text-black"
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
          />
        </div>
        {/* LOCATION SEARCH */}
        <div className="bg-[#02995D] text-[#02995D] border-[#02995D] bg-opacity-10 border-2 h-full gap-2 md:gap-6 px-4 py-[2px] rounded-full flex items-center">
          <div className="flex flex-col whitespace-nowrap">
            <h2 className="font-bold">Valencia, Spn.</h2>
            <p className="mt-[-3px]">2 km</p>
          </div>
          <div>
            <Icon path={mdiCrosshairsGps} size={0.8} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
