/**
 * DynamicViewMobile component renders a dynamic view for mobile devices.
 * It displays either a notifications list or search results based on the current view type.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <DynamicViewMobile />
 *
 * @remarks
 * This component uses various contexts such as SearchContext, SectionOptionsContext, ThemeContext, and DynamicViewContext
 * to manage state and behavior. It also utilizes the `react-i18next` library for translations.
 *
 * @function handleInputChange
 * Handles the change event for the search input field.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
 *
 * @function handleBlur
 * Handles the blur event for the search input field, resetting the search state.
 */
import { Icon } from "@mdi/react";
import { mdiPencilOutline, mdiMagnify, mdiChevronLeft } from "@mdi/js";
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
      } absolute top-0 z-[2000] min-h-screen w-full md:hidden`}
    >
      {/* HEADER */}
      <div
        className={`${
          themeMode === "dark" ? "bg-[#0b0b0b]" : "bg-[#ffffff]"
        } flex flex-col gap-2 md:hidden w-full px-4 pt-4 sticky top-0 z-[10]`}
      >
        {/* DINAMIC HEADER */}
        {type === "pageView" ? (
          <div>
            <div>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setShowDynamicView(false)}
              >
                <Icon path={mdiChevronLeft} size={1} />
                <p>{t("Global.Back")}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-[1.3em] mt-4">
                  {t("Notification.Notifications")}
                </p>
                <div className="flex items-center">
                  <Icon path={mdiPencilOutline} size={1} />
                </div>
              </div>
            </div>
            <div>
              <p>
                <span className="opacity-50">{t("Notification.YouHave")} </span>
                <span className="text-[#0DBC73]">
                  3 {t("Notification.notifications")}
                </span>{" "}
                <span className="opacity-50"> {t("Notification.Today")}</span>
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
        <div className="mt-4">
          {/* SECTION SWITCHER */}
          <SectionSwitcher options={sectionOptions} />
        </div>
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
