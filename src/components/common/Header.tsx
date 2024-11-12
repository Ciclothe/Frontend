import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiBellOutline, mdiViewGrid } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import CiclotheLogotipoMobile from "../../../public/CiclotheLogotipoMobile";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div
        className={`${
          isNightMode ? "text-white" : "text-black"
        } grid grid-cols-12 md:gap-10 py-[2em]`}
      >
        {/*APP LOGO*/}
        <div className="col-span-5 md:col-span-3 flex items-center">
          <div className="md:fixed flex gap-4 z-[100]">
            {/* LOGO VARIANT */}
            <div className="hidden md:block">
              <div className="hidden xl:flex">
                <Link to={`/`}>
                  <CiclotheLogotipo
                    color={isNightMode ? "white" : "black"}
                    size={"12em"}
                  />
                </Link>
              </div>
              <div className="flex items-center justify-center xl:hidden">
                <Link to={`/`}>
                  <CiclotheLogotipoMobile color="#0DBC73" size={"5em"} />
                </Link>
              </div>
            </div>
            {/* GRID VIEW BUTTON */}
            <div
              className="flex items-center justify-center md:hidden"
              onClick={toggleMenu}
            >
              <Icon path={mdiViewGrid} size={0.9} />
            </div>
            {/* SWITCH LANGUAGUE */}
            <div className="flex items-center">
              <LanguageSwitch onlyFlag={false} position={"left"} />
            </div>
          </div>
        </div>
        {/*SEARCH BAR*/}
        <div className="hidden md:block col-span-6">
          <SearchBar />
        </div>
        {/* LOGO MOBILE */}
        <div className="col-span-2 flex items-center justify-center md:hidden">
          <Link to={`/`}>
            <CiclotheLogotipoMobile color="#0DBC73" size={"5em"} />
          </Link>
        </div>
        {/*HEADERS ACTIONS*/}
        <div className="col-span-5 md:col-span-3 flex items-center justify-end">
          <div className="md:fixed flex items-center gap-4">
            {/*CREATE POST BUTTON*/}
            <button
              className={`${
                isNightMode ? "text-black" : "text-white"
              } hidden md:flex bg-[#02995D] flex items-center justify-center gap-2`}
            >
              <Icon path={mdiPlusBoxOutline} size={0.7} />
              <p className="hidden xl:flex font-bold">
                {t("Global.CreatePost")}
              </p>
            </button>
            {/* NOTIFICATIONS */}
            <div>
              <Icon path={mdiBellOutline} size={0.9} />
            </div>
            {/* PROFILE BUTTON */}
            <div>
              <img
                src="https://media-mad2-1.cdn.whatsapp.net/v/t61.24694-24/461311350_1759088984909553_1624269758618571134_n.jpg?ccb=11-4&oh=01_Q5AaIE-DkYrr9S_xW36lSrw-ZHpBCj6TyMwoG9x988eXi6Uv&oe=673DE79B&_nc_sid=5e03e0&_nc_cat=111"
                className="w-8 h-8 rounded-full"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <hr className="col-span-full opacity-10 md:hidden py-2" />
      <div className="md:hidden col-span-6">
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
