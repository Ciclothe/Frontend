import React from "react";
import CiclotheAvatar from "@/assets/imgs/CiclotheAvatar.png";
import { useTheme } from "@/context/ThemeContext";

interface ProfileImageProps {
  profilePic?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profilePic }) => {
  const { isNightMode } = useTheme();

  return (
    <div
      className={`h-[3em] aspect-square rounded-full ${
        isNightMode ? "bg-[#171717]" : "bg-white"
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
