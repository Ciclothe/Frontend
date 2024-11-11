import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiMagnify, mdiCrosshairsGps } from "@mdi/js";
import { useTranslation } from "react-i18next";

const SearchBar: React.FC = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`${
          isNightMode ? "bg-[#232323]" : "bg-white"
        } rounded-full w-full flex items-center justify-between`}
      >
        {/* ELEMENT SEARCH */}
        <div className="px-3 flex items-center w-full">
          <div
            onClick={() => {
              const inputElement = document.getElementById(
                "searchInput"
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
            id="searchInput"
            type="text"
            placeholder={t("Global.SearchHolder")}
            className="bg-transparent w-full outline-none rounded-full text-white p-2"
          />
        </div>
        {/* LOCATION SEARCH */}
        <div className="bg-[#02995D] border text-[#02995D] border-[#02995D] bg-opacity-10 border-2 h-full gap-6 p-2 md:aspect-square lg:aspect-auto px-4 md:px-[0px] py-[2px] md:py-[0px] lg:py-[2px] rounded-full lg:px-4 flex items-center">
          <div className="flex md:hidden lg:flex flex-col whitespace-nowrap">
            <h2 className="font-bold">Valencia, Spn.</h2>
            <p className="mt-[-3px]">2 km</p>
          </div>
          <div>
            <Icon path={mdiCrosshairsGps} size={0.7} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
