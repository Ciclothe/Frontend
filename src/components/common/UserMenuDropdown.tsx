import Icon from "@mdi/react";
import { mdiBell, mdiChatProcessing, mdiAccount } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.js";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import NotificationBanner from "./NotificationBanner";
import ProfileDropdownMenu from "./ProfileDropdownMenu";

const UserMenuDropdown = () => {
  const { isNightMode } = useTheme();
  const { user } = useUser();
  const [showNotificationsBanner, setShowNotificationsBanner] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex items-center justify-end">
      <div className="relative">
        <div
          className={`px-3 hover:cursor-pointer ${
            isNightMode ? "text-white" : "text-black"
          }`}
          onClick={() => setShowNotificationsBanner(!showNotificationsBanner)}
        >
          <Icon path={mdiBell} className="w-[1.8em] h-[1.8em]" />
        </div>
        {showNotificationsBanner && (
          <ClickAwayListener
            onClickAway={() => setShowNotificationsBanner(false)}
          >
            <div>
              <NotificationBanner />
            </div>
          </ClickAwayListener>
        )}
      </div>
      <Link to={`/messages`}>
        <div
          className={`px-3 hover:cursor-pointer ${
            isNightMode ? "text-white" : "text-black"
          }`}
        >
          <Icon path={mdiChatProcessing} className="w-[1.8em] h-[1.8em]" />
        </div>
      </Link>
      <div className="relative">
        <div
          className={`flex justify-center items-center cursor-pointer ${
            isNightMode ? "bg-[#141414] text-white" : "bg-[#E2E2E2] text-black"
          } h-fit p-[1em] rounded-md`}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div className="items-center flex justify-center">
            {user?.profilePhoto ? (
              <div className="h-[2.3em] w-[2.3em] rounded-full">
                <img
                  src={user?.profilePhoto}
                  alt="Profile Pic"
                  className="h-[2.3em] w-[2.3em] rounded-full object-cover"
                />
              </div>
            ) : (
              <div
                className={`h-[2.3em] w-[2.3em] items-center flex justify-center ${
                  isNightMode ? "bg-white text-black" : "bg-black text-white"
                } rounded-full`}
              >
                <Icon path={mdiAccount} size={1} />
              </div>
            )}
          </div>
          <p className="font-bold ml-2">{user?.userName}</p>
        </div>
        {showProfileMenu && (
          <ClickAwayListener onClickAway={() => setShowProfileMenu(false)}>
            <div>
              <ProfileDropdownMenu />
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default UserMenuDropdown;
