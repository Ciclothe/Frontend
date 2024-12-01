import { useState } from "react";
import Icon from "@mdi/react";
import { mdiBellOutline } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import CiclotheLogotipoMobile from "../../../public/CiclotheLogotipoMobile";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SectionSwitcher from "@/components/layout/SectionSwitcher";
import { useUserData } from "@/context/UserDataContext";
import ProfileImage from "@/components/ui/ProfilePic";
import NotificationBanner from "@/components/common/NotificationBanner";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Header = () => {
  const { user } = useUserData();
  const { isNightMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const sectionOptions = [
    { name: "Following", value: 0 },
    { name: "Communities", value: 1 },
  ];

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <>
      <div
        className={`${
          isNightMode ? "text-white" : "text-black"
        } grid grid-cols-12 md:gap-10`}
      >
        {/*APP LOGO*/}
        <div className="col-span-5 flex items-center">
          <div className="flex gap-4 z-[100]">
            {/* GRID VIEW BUTTON */}
            <div className="xl:hidden">
              <ProfileImage profilePic={user?.profilePhoto} />
            </div>
          </div>
        </div>
        {/* LOGO MOBILE */}
        <div className="col-span-2 flex items-center justify-center xl:hidden">
          <Link to={`/`}>
            <CiclotheLogotipoMobile
              color={isNightMode ? "white" : "black"}
              size={"2em"}
            />
          </Link>
        </div>
        {/*HEADERS ACTIONS*/}
        <div className="col-span-5 flex items-center justify-end">
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
        </div>
      </div>
      <div className="md:hidden col-span-12">
        <SectionSwitcher options={sectionOptions} />
      </div>
    </>
  );
};

export default Header;
