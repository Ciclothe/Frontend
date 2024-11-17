import Icon from "@mdi/react";
import { mdiBellOutline } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import CiclotheLogotipoMobile from "../../../public/CiclotheLogotipoMobile";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SectionSwitcher from "@/components/layout/SectionSwitcher";

const Header = () => {
  const { isNightMode } = useTheme();

  const sectionOptions = [
    { name: "Following", path: "/feed/following" },
    { name: "Communities", path: "/feed/communities" },
  ];

  return (
    <div
      className={`pb-0 px-[1em] lg:px-[5em] md:pb-[2em] pt-[2em] flex flex-col gap-4 ${
        isNightMode ? "bg-[#0b0b0b]" : "bg-[#f0eff4]"
      }`}
      style={{
        borderBottomWidth: "0.5px",
        borderStyle: "solid",
        borderColor: isNightMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(140, 140, 140, 0.1)",
      }}
    >
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
              <img
                src="https://media-mad2-1.cdn.whatsapp.net/v/t61.24694-24/461311350_1759088984909553_1624269758618571134_n.jpg?ccb=11-4&oh=01_Q5AaIE-DkYrr9S_xW36lSrw-ZHpBCj6TyMwoG9x988eXi6Uv&oe=673DE79B&_nc_sid=5e03e0&_nc_cat=111"
                className="w-8 h-8 rounded-full"
              ></img>
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
              <img
                src="https://media-mad2-1.cdn.whatsapp.net/v/t61.24694-24/461311350_1759088984909553_1624269758618571134_n.jpg?ccb=11-4&oh=01_Q5AaIE-DkYrr9S_xW36lSrw-ZHpBCj6TyMwoG9x988eXi6Uv&oe=673DE79B&_nc_sid=5e03e0&_nc_cat=111"
                className="w-8 h-8 rounded-full"
              ></img>
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
    </div>
  );
};

export default Header;
