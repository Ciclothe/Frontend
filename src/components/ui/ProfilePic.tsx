import React from "react";
import CiclotheAvatar from "@/assets/imgs/CiclotheAvatar.png";
import { useTheme } from "@/context/ThemeContext";

interface ProfileImageProps {
  profilePic?: string;
  height?: string; // Optional height prop
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  profilePic,
  height = "3em",
}) => {
  const { themeMode } = useTheme();

  return (
    <div
      style={{ height: height }}
      className={`aspect-square rounded-full ${
        themeMode === "dark" ? "bg-[#171717]" : "bg-white"
      }`}
    >
      <img
        src={profilePic ? profilePic : CiclotheAvatar}
        alt="profile Pic"
        className="h-full w-full object-cover rounded-full"
      />
    </div>
  );
};

export default ProfileImage;
