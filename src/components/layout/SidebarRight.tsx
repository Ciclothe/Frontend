/**
 * SidebarRight component displays a sidebar on the right side of the screen.
 * It includes user profile information, notifications, and recommended profiles.
 *
 * @component
 * @example
 * return (
 *   <SidebarRight />
 * )
 *
 * @returns {JSX.Element} The rendered SidebarRight component.
 *
 * @remarks
 * This component uses various contexts such as ThemeContext, UserDataContext, and SearchContext
 * to manage theme, user data, and search functionality respectively.
 *
 * @dependencies
 * - `useState` from React for managing local state.
 * - `Icon` from @mdi/react for displaying Material Design icons.
 * - `useTheme` from ThemeContext for accessing the current theme mode.
 * - `useTranslation` from react-i18next for internationalization.
 * - `useUserData` from UserDataContext for accessing user data.
 * - `Skeleton`, `Box`, `Stack`, and `ClickAwayListener` from @mui/material for UI components.
 * - `ProfileImage` for displaying user profile pictures.
 * - `NotificationBanner` for displaying notifications.
 * - `useSearch` from SearchContext for managing search state.
 *
 * @state {boolean} showNotifications - State to toggle the visibility of notifications.
 *
 * @function toggleNotifications - Toggles the visibility of the notifications banner.
 *
 * @event onClick - Resets search text and search state when the sidebar is clicked.
 *
 * @css
 * - Uses Tailwind CSS classes for styling.
 * - Conditional classes based on the theme mode (dark or light).
 */
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiMapMarker, mdiBellOutline } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useUserData } from "@/context/UserDataContext";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ProfileImage from "@/components/ui/ProfilePic";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import NotificationBanner from "@/components/common/NotificationBanner";
import { useSearch } from "@/context/SearchContext";

const SidebarRight = () => {
  const { user, profiles, loading, error } = useUserData();
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const skeletonItems = [1, 2, 3];
  const [showNotifications, setShowNotifications] = useState(false);
  const { setIsSearching, setSearchText } = useSearch();
  const isLoadingOrError = error || loading || !profiles?.length;

  const toggleNotifications = () => {
    setShowNotifications((prev: any) => !prev);
  };

  return (
    <div
      className={`relative w-[80%] h-screen ${
        themeMode === "dark" ? "text-white" : "text-black"
      }`}
      onClick={() => {
        setSearchText("");
        setIsSearching(false);
      }}
    >
      {/*HEADERS ACTIONS*/}
      <div className="col-span-5 md:col-span-2 flex items-center justify-end h-[7em]">
        <div className="flex items-center gap-4">
          {/* NOTIFICATIONS */}
          <ClickAwayListener onClickAway={() => setShowNotifications(false)}>
            <div className="relative">
              <div onClick={toggleNotifications}>
                <Icon
                  path={mdiBellOutline}
                  size={0.9}
                  className="cursor-pointer"
                />
              </div>
              {showNotifications && <NotificationBanner />}
            </div>
          </ClickAwayListener>
          {/* PROFILE BUTTON */}
          <div className="hidden md:block">
            <ProfileImage profilePic={user?.profilePhoto} />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="font-bold pb-3">
          {t("RecommendedCard.RecommendedProfiles")}
        </p>
        {(!error && !loading) ||
          (profiles?.length == 0 && (
            <p className="text-[#0DBC73] cursor-pointer">
              {t("RecommendedCard.SeeMore")}
            </p>
          ))}
      </div>
      <div>
        {isLoadingOrError ? (
          <div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {skeletonItems.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{
                        bgcolor: themeMode === "dark" ? "grey.900" : "grey.100",
                        borderRadius: "50%",
                      }}
                    />

                    <Stack sx={{ ml: 2 }}>
                      <Skeleton
                        height={25}
                        width={60}
                        sx={{
                          bgcolor:
                            themeMode === "dark" ? "grey.900" : "grey.100",
                        }}
                      />
                      <Skeleton
                        height={20}
                        width={100}
                        sx={{
                          bgcolor:
                            themeMode === "dark" ? "grey.900" : "grey.100",
                        }}
                      />
                    </Stack>
                  </Box>

                  <Skeleton
                    variant="rounded"
                    width={100}
                    height={35}
                    sx={{
                      bgcolor: themeMode === "dark" ? "grey.900" : "grey.100",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </div>
        ) : (
          Array.isArray(profiles) &&
          profiles.slice(0, 4).map((profile) => (
            <div key={profile?.id} className="py-2">
              <div className="flex justify-between">
                <div className="flex items-center mr-2 max-w-full truncate">
                  <ProfileImage profilePic={profile?.profilePhoto} />
                  <div className="ml-2 w-full">
                    <p className="font-bold">@{profile?.userName}</p>
                    <div className="flex items-center">
                      <Icon
                        path={mdiMapMarker}
                        className="icon text-[#DF1E32]"
                      />
                      <p
                        className={`truncate ${
                          themeMode === "dark" ? "text-white" : "text-black"
                        } text-opacity-50`}
                      >
                        {profile?.city}, {profile?.country}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`bg-none font-bold rounded-full px-4 border ${
                    themeMode === "dark"
                      ? "hover:bg-white hover:text-black"
                      : "hover:bg-black hover:text-white"
                  }`}
                  style={{
                    borderColor:
                      themeMode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(140, 140, 140, 0.1)",
                  }}
                >
                  {t("RecommendedCard.Follow")}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SidebarRight;
