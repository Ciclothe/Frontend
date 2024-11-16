import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

// TEST DATA
const users = [
  {
    username: "aorgk1",
    location: "Madrid, Spain",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/octavia-spencer-20724237-1-402.jpg",
  },
  {
    username: "lielcita",
    location: "Barcelona, Spain",
    image:
      "https://imgs.smoothradio.com/images/48244?width=1984&crop=4_3&signature=Ja1fhfZB9PSCRTG6Usg_PSwZS-Q=",
  },
  {
    username: "lachyMclean",
    location: "Paris, France",
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTc-QLnqSfM84lp6NzkOLxXOegrrnrQ32MKpbHhgpp1MDM0fBAo",
  },
  {
    username: "markTiesto",
    location: "Paris, France",
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTc-QLnqSfM84lp6NzkOLxXOegrrnrQ32MKpbHhgpp1MDM0fBAo",
  },
];

const SidebarRight = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

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
        <p className="text-[#0DBC73] cursor-pointer">
          {t("RecommendedCard.SeeMore")}
        </p>
      </div>
      <div>
        {users.map((user, index) => (
          <div key={index} className="py-2">
            <div className="flex justify-between ">
              <div className="flex items-center mr-2 max-w-full truncate">
                <img
                  src={user.image}
                  alt="profile Pic"
                  className="h-[3em] aspect-square object-cover rounded-full"
                />
                <div className="ml-2 w-full">
                  <p className="font-bold">@{user.username}</p>
                  <div className="flex items-center">
                    <Icon path={mdiMapMarker} className="icon text-[#DF1E32]" />
                    <p
                      className={`truncate ${
                        isNightMode ? "text-white" : "text-black"
                      } text-opacity-50`}
                    >
                      {user.location}
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={`bg-none font-bold rounded-full px-4 border`}
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
        ))}
      </div>
    </div>
  );
};

export default SidebarRight;
