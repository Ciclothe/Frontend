import { Icon } from "@mdi/react";
import { mdiPencilOutline, mdiMagnify, mdiArrowLeft } from "@mdi/js";
import SectionSwitcher from "@/components/layout/SectionSwitcher";
import { useSearch } from "@/context/SearchContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useTranslation } from "react-i18next";
import SearchResults from "../layout/SearchResults";
import { useTheme } from "@/context/ThemeContext";
import { useDynamicView } from "@/context/DynamicViewContext";
import NotificationsList from "@/components/common/NotificationsList";

const DynamicViewMobile = () => {
  const { sectionOptions } = useSectionOptions();
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const { type, setShowDynamicView } = useDynamicView();

  const { searchText, setSearchText, setIsSearching } = useSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleBlur = () => {
    setShowDynamicView(false);
    setIsSearching(false);
    setSearchText("");
  };

  return (
    <div
      className={`${
        themeMode === "dark" ? "bg-[#0b0b0b]" : "bg-[#ffffff]"
      } absolute top-0 z-[2000] min-h-screen w-full`}
    >
      {/* HEADER */}
      <div className="flex flex-col gap-2 md:hidden w-full px-4 pt-4 sticky top-0">
        {/* DINAMIC HEADER */}
        {type === "pageView" ? (
          <div>
            <div className="flex justify-between items-centers">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowDynamicView(false)}
              >
                <Icon path={mdiArrowLeft} size={1} />
                <p className="font-bold text-[1.3em]">Notifications</p>
              </div>
              <div className="flex items-center">
                <Icon path={mdiPencilOutline} size={0.8} />
              </div>
            </div>
            <div>
              <p>
                <span className="opacity-50">You have </span>
                <span className="text-[#0DBC73]">3 notifications</span>{" "}
                <span className="opacity-50">today</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center w-full">
            <div>
              <Icon
                path={mdiMagnify}
                size={1.2}
                className="cursor-pointer opacity-50"
              />
            </div>
            <input
              type="text"
              className="w-full p-2 bg-transparent outline-none rounded-full"
              placeholder={t("Global.SearchHolder")}
              value={searchText}
              onChange={handleInputChange}
            />
            <p
              className="text-[#0DBC73] font-bold cursor-pointer"
              onClick={handleBlur}
            >
              {t("Global.Cancel")}
            </p>
          </div>
        )}
        {/* SECTION SWITCHER */}
        <SectionSwitcher options={sectionOptions} />
      </div>
      {type === "pageView" ? (
        <NotificationsList />
      ) : (
        <SearchResults searchText={searchText} />
      )}
    </div>
  );
};

export default DynamicViewMobile;
