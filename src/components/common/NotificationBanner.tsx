/**
 * NotificationBanner component displays a notification banner with a list of notifications.
 * It uses the current theme mode and translation context to render the content appropriately.
 *
 * @component
 * @example
 * Usage example:
 * <NotificationBanner />
 *
 * @returns {JSX.Element} The rendered notification banner component.
 *
 * @remarks
 * This component uses the following external libraries:
 * - `@mdi/react` for rendering Material Design Icons.
 * - `react-i18next` for internationalization and translations.
 * - `react-router-dom` for navigation links.
 *
 * @see {@link https://materialdesignicons.com/} for Material Design Icons.
 * @see {@link https://react.i18next.com/} for react-i18next documentation.
 * @see {@link https://reactrouter.com/} for React Router documentation.
 */
import Icon from "@mdi/react";
import { mdiPencilOutline } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotificationBanner = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className={`${
        themeMode === "dark" ? "cardNightMode" : "cardDayMode"
      } absolute right-0 mt-2 z-[1000] rounded-xl min-w-[25em]`}
      style={{
        boxShadow:
          themeMode === "dark"
            ? "0px 0px 5px rgba(255,255,255,0.1)"
            : "0px 0px 5px rgba(0,0,0,0.2)",
      }}
    >
      <div className="flex flex-col gap-1 px-3 pt-3">
        <div className="flex justify-between items-center">
          <p className="font-bold text-[1.5em]">
            {t("Notification.Notifications")}
          </p>
          <Icon path={mdiPencilOutline} size={0.7} />
        </div>
        <div>
          <p>
            <span className="opacity-50">{t("Notification.YouHave")} </span>
            <span className="text-[#1B6B44]">
              3 {t("Notification.notifications")}
            </span>
            <span className="opacity-50"> {t("Notification.Today")}</span>
          </p>
        </div>
        <p className="font-bold">{t("Global.Today")}</p>
      </div>
      <hr
        className={`my-1 mx-3 opacity-5 ${
          themeMode === "dark" ? "border-white" : "border-black"
        }`}
      />
      <div className="px-3 py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 rounded-full bg-red-500 flex-shrink-0"></div>
            <p>
              <span className="text-[#1B6B44] font-bold">@Juanita</span>{" "}
              <span className="opacity-50">
                {t("Notification.NewPostMessage")}
              </span>
            </p>
          </div>
          <div className="rounded-full h-2 w-2 bg-[#1B6B44] flex-shrink-0"></div>
        </div>
      </div>
      <hr
        className={`my-1 mx-3 opacity-5 ${
          themeMode === "dark" ? "border-white" : "border-black"
        }`}
      />
      <Link to={`/messages`}>
        <div
          className={`flex justify-center items-center px-5 ${
            themeMode === "dark"
              ? "bg-[#0B0B0B] hover:bg-[#232323]"
              : "bg-[#ffffff] hover:bg-[#E2E2E2]"
          } py-3 font-bold text-[#1B6B44] rounded-b-xl cursor-pointer`}
        >
          <p>{t("Notification.SeeAllNotifications")}</p>
        </div>
      </Link>
    </div>
  );
};

export default NotificationBanner;
