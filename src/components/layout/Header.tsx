import { useState } from "react";
import Icon from "@mdi/react";
import { mdiBellOutline, mdiMagnify } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import CiclotheLogotipoMobile from "../../../public/CiclotheLogotipoMobile";
import { Link } from "react-router-dom";
import SectionSwitcher from "@/components/layout/SectionSwitcher";
import { useUserData } from "@/context/UserDataContext";
import ProfileImage from "@/components/ui/ProfilePic";
import NotificationBanner from "@/components/common/NotificationBanner";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useSearch } from "@/context/SearchContext";
import { useMobileMenu } from "@/context/MobileMenuContext";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";

const Header = () => {
  const { user } = useUserData();
  const { themeMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const { setIsSearching } = useSearch();
  const { toggleMenu } = useMobileMenu();
  const { sectionOptions } = useSectionOptions();
  const { setHasScroll } = useLayoutScroll();

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <>
      <div
        className={`${
          themeMode === "dark" ? "text-white" : "text-black"
        } grid grid-cols-12 md:gap-10`}
      >
        {/*APP LOGO*/}
        <div className="col-span-5 flex items-center">
          <div className="flex gap-4 z-[100]">
            {/* GRID VIEW BUTTON */}
            <div className="block md:hidden" onClick={toggleMenu}>
              <ProfileImage profilePic={user?.profilePhoto} />
            </div>

            <div className="hidden md:block xl:hidden">
              <ProfileImage profilePic={user?.profilePhoto} />
            </div>
          </div>
        </div>
        {/* LOGO MOBILE */}
        <div className="col-span-2 flex items-center justify-center xl:hidden">
          <Link to={`/`}>
            <CiclotheLogotipoMobile
              color={themeMode === "dark" ? "white" : "black"}
              size={"2em"}
            />
          </Link>
        </div>
        {/*HEADERS ACTIONS*/}
        <div className="col-span-5 flex items-center justify-end gap-4">
          <div
            onClick={() => {
              setIsSearching(true), setHasScroll(true);
            }}
          >
            <Icon
              path={mdiMagnify}
              size={1.2}
              className="cursor-pointer md:hidden"
            />
          </div>
          {/* NOTIFICATIONS */}
          <ClickAwayListener onClickAway={() => setShowNotifications(false)}>
            <div className="relative">
              <div onClick={toggleNotifications}>
                <Icon
                  path={mdiBellOutline}
                  size={1.1}
                  className="cursor-pointer"
                />
              </div>
              {showNotifications && <NotificationBanner />}
            </div>
          </ClickAwayListener>
        </div>
      </div>
      {sectionOptions.length > 0 && (
        <div className="md:hidden col-span-12">
          <SectionSwitcher options={sectionOptions} />
        </div>
      )}
    </>
  );
};

export default Header;
