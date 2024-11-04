import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const RecommendedProfiles = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

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

  const limitedUsers = users.slice(0, 3);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + "...";
  };

  return (
    <div>
      <div
        className={`cart ${
          isNightMode ? "cardNightMode" : "cardDayMode"
        } rounded-t-xl pt-3 px-5`}
      >
        <div>
          <p className="font-bold pb-3">
            {t("RecommendedCard.RecommendedProfiles")}
          </p>
        </div>
        <hr style={{ opacity: isNightMode ? "10%" : "50%" }} />
        <div className="pb-3">
          {limitedUsers.map((user, index) => (
            <div key={index} className="py-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src={user.image}
                    alt="profile Pic"
                    className="h-[3em] w-[3em] object-cover rounded-full"
                  />
                  <div className="w-full ml-2">
                    <p className="font-bold whitespace-nowrap">
                      {" "}
                      {truncateText(user.username, 12)}{" "}
                    </p>
                    <div className="flex items-center">
                      <Icon
                        path={mdiMapMarker}
                        className="icon text-[#DF1E32]"
                      />
                      <p
                        className={`whitespace-nowrap ${
                          isNightMode ? "text-white" : "text-black"
                        } text-opacity-50`}
                      >
                        {truncateText(user.location, 12)}{" "}
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
        <hr style={{ opacity: isNightMode ? "10%" : "50%" }} />
      </div>
      <div
        className={`flex justify-center items-center ${
          isNightMode
            ? "bg-[#141414] hover:bg-[#232323]"
            : "bg-white hover:bg-[#E2E2E2]"
        } py-3 font-bold text-[#1B6B44] rounded-b-xl hover:cursor-pointer`}
      >
        <p>{t("RecommendedCard.SeeMore")}</p>
      </div>
    </div>
  );
};

export default RecommendedProfiles;
