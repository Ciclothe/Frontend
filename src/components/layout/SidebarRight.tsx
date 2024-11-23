import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useUserData } from "@/context/UserDataContext";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ProfileImage from "@/components/ui/ProfilePic";

const SidebarRight = () => {
  const { profiles, loading, error } = useUserData();
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const skeletonItems = [1, 2, 3];

  return (
    <div
      className={`relative w-[80%] h-fit ${
        isNightMode ? "text-white" : "text-black"
      }`}
    >
      <div className="flex justify-between">
        <p className="font-bold pb-3">
          {t("RecommendedCard.RecommendedProfiles")}
        </p>
        {!error && !loading && (
          <p className="text-[#0DBC73] cursor-pointer">
            {t("RecommendedCard.SeeMore")}
          </p>
        )}
      </div>
      <div>
        {error || loading ? (
          <div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {skeletonItems.map((_, index) => (
                <Box
                  key={index} // Asignar una key única
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
                        bgcolor: "grey.900",
                        borderRadius: "50%",
                      }}
                    />

                    <Stack sx={{ ml: 2 }}>
                      <Skeleton
                        height={25}
                        width={60}
                        sx={{
                          bgcolor: "grey.900",
                        }}
                      />
                      <Skeleton
                        height={20}
                        width={100}
                        sx={{
                          bgcolor: "grey.900",
                        }}
                      />
                    </Stack>
                  </Box>

                  <Skeleton
                    variant="rounded"
                    width={100}
                    height={35}
                    sx={{ bgcolor: "grey.900" }}
                  />
                </Box>
              ))}
            </Box>
          </div>
        ) : (
          profiles?.slice(0, 4).map((profile) => (
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
                          isNightMode ? "text-white" : "text-black"
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
                    isNightMode
                      ? "hover:bg-white hover:text-black"
                      : "hover:bg-black hover:text-white"
                  }`}
                  style={{
                    borderColor: isNightMode
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
