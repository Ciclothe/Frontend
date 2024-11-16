import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const RecommendedProfiles = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  // TEST DATA
  const users = [
    {
      username: "@aorgk1",
      location: "Madrid, Spn",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/octavia-spencer-20724237-1-402.jpg",
    },
    {
      username: "@lielcita",
      location: "Barcelona, Spn",
      image:
        "https://imgs.smoothradio.com/images/48244?width=1984&crop=4_3&signature=Ja1fhfZB9PSCRTG6Usg_PSwZS-Q=",
    },
    {
      username: "@juancitasadasdsadsadasd",
      location: "Paris, France",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTc-QLnqSfM84lp6NzkOLxXOegrrnrQ32MKpbHhgpp1MDM0fBAo",
    },
    {
      username: "@user4",
      location: "New York, USA",
      image: "https://example.com/user4.jpg",
    },
  ];

  return (
    <div
      className={`cart fixed w-full ${
        isNightMode ? "cardNightMode" : "cardDayMode"
      }`}
    >
      <div className="flex justify-between">
        <p className="font-bold pb-3">
          {t("RecommendedCard.RecommendedProfiles")}
        </p>
        <p className="text-[#0DBC73]">{t("RecommendedCard.SeeMore")}</p>
      </div>
      <div>
        {users.map((user, index) => (
          <div key={index} className="py-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <img
                  src={user.image}
                  alt="profile Pic"
                  className="h-[3em] aspect-square object-cover rounded-full"
                />
                <div className="w-full ml-2">
                  <p className="font-bold whitespace-nowrap">{user.username}</p>
                  <div className="flex items-center">
                    <Icon path={mdiMapMarker} className="icon text-[#DF1E32]" />
                    <p
                      className={`whitespace-nowrap ${
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
                className={`${
                  isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
                } font-bold rounded-full px-4`}
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

export default RecommendedProfiles;
