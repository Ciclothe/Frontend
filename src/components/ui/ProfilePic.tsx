/**
 * ProfileImage component displays a user's profile picture.
 * If no profile picture is provided, a default avatar image is used.
 * The component also adapts its background color based on the current theme mode.
 *
 * @component
 * @param {ProfileImageProps} props - The properties object.
 * @param {string} [props.profilePic] - The URL of the profile picture to display.
 * @returns {JSX.Element} The rendered ProfileImage component.
 *
 * @example
 * Usage example:
 * <ProfileImage profilePic="https://example.com/user.jpg" />
 *
 * @remarks
 * This component uses the `useTheme` hook to determine the current theme mode
 * and applies appropriate background color styles.
 */
import React from "react";
import CiclotheAvatar from "@/assets/imgs/CiclotheAvatar.png";
import { useTheme } from "@/context/ThemeContext";

interface ProfileImageProps {
  profilePic?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profilePic }) => {
  const { themeMode } = useTheme();

  return (
    <div
      className={`h-[3em] aspect-square rounded-full ${
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
