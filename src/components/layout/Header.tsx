import Icon from "@mdi/react";
import { mdiBellOutline } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import CiclotheLogotipoMobile from "../../../public/CiclotheLogotipoMobile";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SectionSwitcher from "@/components/layout/SectionSwitcher";
import { useUserData } from "@/context/UserDataContext";
import ProfileImage from "@/components/ui/ProfilePic";

const Header = () => {
  const { user } = useUserData();
  const { isNightMode } = useTheme();

  const sectionOptions = [
    { name: "Following", value: 0 },
    { name: "Communities", value: 1 },
  ];

  return (
    <>
      <div
        className={`${
          isNightMode ? "text-white" : "text-black"
        } grid grid-cols-12 md:gap-10`}
      >
        {/*APP LOGO*/}
        <div className="col-span-5 md:col-span-2 flex items-center">
          <div className="flex gap-4 z-[100]">
            {/* LOGO VARIANT */}
            <div className="hidden md:block w-full">
              <div className="hidden xl:flex w-full">
                <Link to={`/`}>
                  <CiclotheLogotipo
                    color={isNightMode ? "white" : "black"}
                    size={"10em"}
                  />
                </Link>
              </div>
              <div className="flex items-center justify-center xl:hidden">
                <Link to={`/`}>
                  <CiclotheLogotipoMobile
                    color={isNightMode ? "white" : "black"}
                    size={"3em"}
                  />
                </Link>
              </div>
            </div>
            {/* GRID VIEW BUTTON */}
            <div className="md:hidden">
              <ProfileImage profilePic={user?.profilePhoto} />
            </div>
          </div>
        </div>
        {/*SEARCH BAR*/}
        <div className="hidden md:flex col-span-8 items-center justify-center">
          <SearchBar />
        </div>
        {/* LOGO MOBILE */}
        <div className="col-span-2 flex items-center justify-center md:hidden">
          <Link to={`/`}>
            <CiclotheLogotipoMobile
              color={isNightMode ? "white" : "black"}
              size={"1.6em"}
            />
          </Link>
        </div>
        {/*HEADERS ACTIONS*/}
        <div className="col-span-5 md:col-span-2 flex items-center justify-end">
          <div className="flex items-center gap-4">
            {/* NOTIFICATIONS */}
            <div>
              <Icon path={mdiBellOutline} size={0.9} />
            </div>
            {/* PROFILE BUTTON */}
            <div className="hidden md:block">
              <ProfileImage profilePic={user?.profilePhoto} />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden col-span-12">
        <SearchBar />
      </div>

      <div className="md:hidden col-span-12">
        <SectionSwitcher options={sectionOptions} />
      </div>
    </>
  );
};

export default Header;
