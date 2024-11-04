import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import video from "../../assets/videoTest.mp4";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../common/LanguageSwitch";

function Authentication() {
  const { t } = useTranslation();

  return (
    <div className="relative flex justify-start items-center min-h-screen bg-gradient-to-r from-[#D9EFE4] to-[#FFFFFF] max-h-screen px-5">
      {/* Language Switcher */}
      <div className="flex gap-4 absolute top-4 right-4 lg:top-5 lg:right-5 z-20">
        <LanguageSwitch onlyFlag={false} position={"right"} />
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 p-2">
        <div className="h-full relative">
          <video
            src={video}
            className="h-full w-full object-cover rounded-lg"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-black opacity-80 rounded-lg"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-4 lg:p-8 flex flex-col items-start text-start z-10 justify-center">
        <Link to="/explore" className="mb-8">
          <CiclotheLogotipo color="#1B6B44" size="8em" />
        </Link>

        {/* Responsive Text */}
        <p className="text-white font-bold leading-tight text-4xl sm:text-5xl lg:text-7xl">
          {t("AuthenticationPage.OneWardrobe")},<br />
          {t("AuthenticationPage.AThousandPossibilities")}
        </p>

        {/* Description */}
        <p className="text-white opacity-75 text-sm sm:text-base lg:text-xs mt-4 lg:mt-6 max-w-lg lg:max-w-xl">
          {t("AuthenticationPage.AuthenticationViewParagraph")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
          <Link to="/authentication/signIn" className="w-full">
            <button
              type="button"
              className="w-full py-3 bg-[#ECECEC] lg:bg-[#121212] text-black lg:text-white rounded-lg shadow-lg"
            >
              {t("AuthenticationPage.SignIn")}
            </button>
          </Link>
          <Link to="/authentication/signUp" className="w-full">
            <button
              type="button"
              className="w-full py-3 bg-[#121212] lg:bg-[#F2F2F2] text-white lg:text-black rounded-lg shadow-lg"
            >
              {t("AuthenticationPage.CreateAnAccount")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
