import Icon from "@mdi/react";
import { mdiPencil, mdiShareVariant } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";

//! STYLES
import "../Profile.css";

function UserInformation({ userData }: any) {
  const { themeMode } = useTheme();

  return (
    <div className="py-5 flex flex-col gap-2 justify-center items-center">
      <div className="text-center md:max-w-[55%]">
        <p className="font-bold userName text-[1.5em]">@{userData.userName}</p>
        <p className="opacity-70 mt-2">{userData.description}</p>
      </div>
      <div className="flex w-full justify-between md:max-w-[45%] my-2">
        <div className="flex flex-col items-center">
          <div className="flex">
            {userData.followers.map(
              (follower: any, index: number) =>
                index < 2 && (
                  <div
                    className={`w-10 h-10 rounded-full ${
                      index > 0 ? "ml-[-10px]" : "ml-0"
                    } border ${
                      themeMode === "dark" ? "border-[#0B0B0B]" : "border-white"
                    } border-[3px]`}
                    key={index}
                  >
                    <img
                      src={follower?.userPic}
                      alt={`Follower ${index}`}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                )
            )}
            {userData?.followers?.length > 2 && (
              <div
                className={`${
                  themeMode === "dark"
                    ? "border-[#0B0B0B] bg-white text-black"
                    : "border-white bg-[#0B0B0B] text-white"
                } w-10 h-10 rounded-full border ml-[-10px] border-[3px] flex items-center justify-center font-bold`}
              >
                +{userData?.followers?.length - 2}
              </div>
            )}
          </div>
          <p className="font-bold text-[#0DBC73]">Followers</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex">
            {userData.following.map(
              (follow: any, index: number) =>
                index < 2 && (
                  <div
                    className={`w-10 h-10 rounded-full ${
                      index > 0 ? "ml-[-10px]" : "ml-0"
                    } border ${
                      themeMode === "dark" ? "border-[#0B0B0B]" : "border-white"
                    } border-[3px]`}
                    key={index}
                  >
                    <img
                      src={follow?.userPic}
                      alt={`Follower ${index}`}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                )
            )}
            {userData?.following?.length > 2 && (
              <div
                className={`${
                  themeMode === "dark"
                    ? "border-[#0B0B0B] bg-white text-black"
                    : "border-white bg-[#0B0B0B] text-white"
                } w-10 h-10 rounded-full border ml-[-10px] border-white border-[3px] flex items-center justify-center font-bold`}
              >
                +{userData?.following?.length - 2}
              </div>
            )}
          </div>
          <p className="font-bold text-[#0DBC73]">Follow</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex">
            {userData?.actitivies?.parties.map(
              (party: any, index: number) =>
                index < 2 && (
                  <div
                    className={`w-10 h-10 rounded-lg ${
                      index > 0 ? "ml-[-10px]" : "ml-0"
                    } border ${
                      themeMode === "dark" ? "border-[#0B0B0B]" : "border-white"
                    } border-[3px]`}
                    key={index}
                  >
                    <img
                      src={party?.partyCover}
                      alt={`Follower ${index}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                )
            )}
            {userData?.actitivies?.parties?.length > 2 && (
              <div
                className={`${
                  themeMode === "dark"
                    ? "border-[#0B0B0B] bg-white text-black"
                    : "border-white bg-[#0B0B0B] text-white"
                } w-10 h-10 rounded-lg border ml-[-10px] border-white border-[3px] flex items-center justify-center font-bold`}
              >
                +{userData?.actitivies?.parties?.length - 2}
              </div>
            )}
          </div>
          <p className="font-bold text-[#0DBC73]">Parties</p>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center w-full">
        <button
          className={`${
            themeMode === "dark" ? "bg-white text-black" : "bg-black text-white"
          } font-bold flex items-center justify-center gap-2 px-8`}
        >
          <Icon path={mdiPencil} className="icon" />
          <p className="hidden md:block">Edit Profile</p>
        </button>
        <button
          className={`${
            themeMode === "dark" ? "bg-white text-black" : "bg-black text-white"
          } font-bold flex items-center justify-center gap-2 px-8`}
        >
          <Icon path={mdiShareVariant} className="icon" />
          <p className="hidden md:block">Share Profile</p>
        </button>
      </div>
    </div>
  );
}

export default UserInformation;
