import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { Icon } from "@mdi/react";
import { mdiBellOutline } from "@mdi/js";
import NotificationBanner from "@/components/common/NotificationBanner";
import ProfileImage from "@/components/ui/ProfilePic";
import { useUserData } from "@/context/UserDataContext";
import { Link } from "react-router-dom";

const HeaderActionDesktop = () => {
  const { user } = useUserData();

  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
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
        <Link to={"/profile"}>
          <div className="hidden md:block">
            <ProfileImage profilePic={user?.profilePhoto} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeaderActionDesktop;
