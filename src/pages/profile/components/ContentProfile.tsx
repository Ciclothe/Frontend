import ProfilePhoto from "./ProfilePhoto";
import UserInformation from "./UserInformation";
import PartiesAndPosts from "./PartiesAndPosts";
import { useTheme } from "@/context/ThemeContext";

function ContentProfile({ userData }) {
  const { themeMode } = useTheme();

  return (
    <div
      className={`${
        themeMode === "dark"
          ? "md:bg-[#0B0B0B] text-white"
          : "md:bg-white text-black"
      } rounded-xl relative p-5 flex flex-col items-center`}
    >
      <div className="w-fit">
        <ProfilePhoto profilePic={userData.profilePic} />
      </div>
      <UserInformation userData={userData} />
      <PartiesAndPosts userActivities={userData.actitivies} />
    </div>
  );
}

export default ContentProfile;
