import { useState, useEffect } from "react";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import Icon from "@mdi/react";
import {
  mdiArrowRight,
  mdiArrowLeft,
  mdiEye,
  mdiEyeOff,
  mdiCheckBold,
} from "@mdi/js";
import API_CONSTANTS from "@/services/config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../common/LanguageSwitch";
import AlertComponent from "../common/Alert";

function CreateAccount() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userName: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
    receivePromotions: false,
    city: "",
    country: "",
  });

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<any>("success");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTermsConditions, setAcceptedTermsConditions] = useState(false);
  const [acceptedNewsletter, setAcceptedNewslatter] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const genderOptions: Record<string, string> = {
    male: "Male",
    female: "Female",
    unspecified: "Not Specified",
  };
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const capitalizeWords = (text: string) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleGenderSelect = (gender: any) => {
    setFormData({ ...formData, gender });
    setShowGender(false);
  };

  useEffect(() => {
    if (step === 4) {
      handleGeolocation();
    }
  }, [step]);

  const handleChange = (event: any) => {
    const { id, value } = event.target;

    if (id === "userName" && value.startsWith("@")) {
      showAlert("Character '@' is not valid", "warning");
      return;
    }

    if (id === "password" || id === "confirmPassword") {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
      if (id === "password") {
        validatePassword(value);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: capitalizeWords(value),
      }));
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchAddress(position.coords.longitude, position.coords.latitude);
      });
    }
  };

  const fetchAddress = async (longitude: any, latitude: any) => {
    const apiKey = "AIzaSyCTbsWXB6D6bDewIo5CrjKqReOY61KBDq0";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const addressComponents = data.results[0].address_components;
        const city = capitalizeWords(
          addressComponents.find((component: any) =>
            component.types.includes("locality")
          )?.long_name
        );
        const country = capitalizeWords(
          addressComponents.find((component: any) =>
            component.types.includes("country")
          )?.long_name
        );

        if (city && country) {
          setFormData((prevData) => ({
            ...prevData,
            city,
            country,
          }));
          showAlert("Location successfully obtained.", "success");
        } else {
          showAlert("Unable to retrieve city or country.", "warning");
        }
      } else {
        showAlert("Unable to obtain address.", "warning");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      showAlert("Error obtaining address.", "error");
    }
  };

  const handleContinue = async () => {
    let message = "";
    let severity = "success";

    if (step === 1) {
      if (!formData.firstName) {
        message = "Alerts.firstNameMissing";
        severity = "warning";
      } else if (!formData.lastName) {
        message = "Alerts.lastNameMissing";
        severity = "warning";
      }
    }
    if (step === 2) {
      if (!formData.email) {
        message = "Alerts.emailMissing";
        severity = "warning";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        message = "Alerts.emailInvalid";
        severity = "warning";
      } else if (!formData.phoneNumber) {
        message = "Alerts.phoneNumberMissing";
        severity = "warning";
      } else if (!/^\+?\d+$/.test(formData.phoneNumber)) {
        message = "Alerts.phoneNumberInvalid";
        severity = "warning";
      }
    }
    if (step === 3) {
      if (!formData.userName) {
        message = "Alerts.userNameMissing";
        severity = "warning";
      } else if (!formData.dob) {
        message = "Alerts.dobMissing";
        severity = "warning";
      } else if (new Date(formData.dob) > new Date()) {
        message = "Alerts.dobFuture";
        severity = "warning";
      } else if (!formData.gender) {
        message = "Alerts.genderMissing";
        severity = "warning";
      }
    }
    if (step === 4) {
      if (!formData.city) {
        message = "Alerts.cityMissing";
        severity = "warning";
      } else if (!formData.country) {
        message = "Alerts.countryMissing";
        severity = "warning";
      }
    }
    if (step === 5) {
      if (!formData.password) {
        message = "Alerts.passwordMissing";
        severity = "warning";
      } else if (formData.password.length < 8) {
        message = "Alerts.passwordLength";
        severity = "warning";
      } else if (!/[A-Z]/.test(formData.password)) {
        message = "Alerts.passwordUppercase";
        severity = "warning";
      } else if (!/[a-z]/.test(formData.password)) {
        message = "Alerts.passwordLowercase";
        severity = "warning";
      } else if (!/\d/.test(formData.password)) {
        message = "Alerts.passwordNumber";
        severity = "warning";
      } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
        message = "Alerts.passwordSpecialChar";
        severity = "warning";
      } else if (!formData.confirmPassword) {
        message = "Alerts.confirmPasswordMissing";
        severity = "warning";
      } else if (formData.password !== formData.confirmPassword) {
        message = "Alerts.passwordMismatch";
        severity = "warning";
      } else if (!acceptedTermsConditions) {
        message = "Alerts.termsConditionsMissing";
        severity = "warning";
      }
    }

    // Show alert if there is an error message
    if (message) {
      showAlert(message, severity);
      return;
    }

    // Proceed to the next step if no errors
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Send data to the backend
      try {
        const response = await fetch(`${API_CONSTANTS.API_AUTH}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          showAlert("Alerts.registrationSuccess", "success");
          navigate("/");
        } else {
          const errorData = await response.json();
          showAlert(
            `${"Alerts.registrationError"} ${errorData.message}`,
            "error"
          );
        }
      } catch (error) {
        showAlert("Alerts.serverError", "error");
        console.error("Error:", error);
      }
    }
  };

  const handleBack = () => {
    if (step === 1) {
      if (
        window.confirm(
          "Are you sure you want to exit the form? All data will be erased."
        )
      ) {
        setFormData({
          firstName: "",
          secondName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          userName: "",
          dob: "",
          gender: "",
          password: "",
          confirmPassword: "",
          city: "",
          termsAndConditions: false,
          receivePromotions: false,
          country: "",
        });
        navigate("/authentication");
      }
    } else {
      setStep(step - 1);
    }
  };

  const showAlert = (message: string, severity: string) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const updateTermsConditions = () => {
    setAcceptedTermsConditions(!acceptedTermsConditions);
    setFormData({
      ...formData,
      termsAndConditions: !acceptedTermsConditions,
    });
  };

  const updateNewsLetter = () => {
    setAcceptedNewslatter(!acceptedNewsletter);
    setFormData({
      ...formData,
      receivePromotions: !acceptedNewsletter,
    });
  };

  const validatePassword = (password: string) => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  return (
    <div className="flex justify-center flex-col items-start min-h-[100vh] bg-[#121212] p-[2vw] md:px-[10vw]">
      <div className="flex gap-4 absolute top-5 right-5">
        <LanguageSwitch onlyFlag={false} position={"right"} />
      </div>

      <Link to="/authentication">
        <CiclotheLogotipo color="#1B6B44" size="8em" />
      </Link>

      {alertVisible && (
        <div className="fixed top-5 left-5 z-10">
          <AlertComponent
            icon={true}
            message={t(alertMessage)}
            severity={alertSeverity}
          />
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="text-white font-bold text-[10vw] sm:text-[5em] md:text-[4em] leading-none mt-5 md:max-w-[90%] lg:max-w-[70%]">
            {t("AuthenticationPage.CreateAccountFirstTitle")}
          </p>
          <p className="text-white mt-3 opacity-50">
            {t("AuthenticationPage.CreateAccountFirstParagraph")}
          </p>
          <div className="md:flex text-white mt-5 md:mt-10 gap-8">
            <div className="flex flex-col">
              <input
                type="text"
                id="firstName"
                placeholder="Antonio"
                value={formData.firstName}
                onChange={handleChange}
                className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 md:w-[15vw] border-none bg-transparent focus:outline-none"
                required
              />
              <label htmlFor="firstName" className="opacity-30">
                {t("AuthenticationPage.FirstName")}*
              </label>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="secondName"
                value={formData.secondName}
                onChange={handleChange}
                className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 md:w-[15vw] border-none bg-transparent focus:outline-none"
              />
              <label htmlFor="secondName" className="opacity-30">
                {t("AuthenticationPage.SecondName")}
              </label>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="lastName"
                placeholder="Banderas"
                value={formData.lastName}
                onChange={handleChange}
                className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 border-none bg-transparent focus:outline-none"
                required
              />
              <label htmlFor="lastName" className="opacity-30">
                {t("AuthenticationPage.LastName")}*
              </label>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-white font-bold text-[10vw] sm:text-[5em] md:text-[4em] leading-none mt-5 md:max-w-[90%] lg:max-w-[70%]">
            {t("AuthenticationPage.CreateAccountSecondTitleFirst")}{" "}
            <span className="text-[#1B6B44]">{formData.firstName}</span>,{" "}
            {t("AuthenticationPage.CreateAccountSecondTitleSecond")}
          </p>
          <p className="text-white mt-3 opacity-50">
            {t("AuthenticationPage.CreateAccountSecondParagraph")}
          </p>
          <div className="md:flex text-white mt-5 md:mt-10 gap-8">
            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                placeholder="antonio@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 border-none bg-transparent focus:outline-none"
                required
              />
              <label htmlFor="email" className="opacity-30">
                {t("AuthenticationPage.Email")}*
              </label>
            </div>
            <div className="flex flex-col">
              <input
                type="tel"
                id="phoneNumber"
                placeholder="+69123456789"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 border-none bg-transparent focus:outline-none"
                required
              />
              <label htmlFor="phoneNumber" className="opacity-30">
                {t("AuthenticationPage.PhoneNumber")}*
              </label>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="text-white font-bold text-[10vw] sm:text-[5em] md:text-[4em] leading-none mt-5 md:max-w-[90%] lg:max-w-[70%]">
            {t("AuthenticationPage.CreateAccountThirdTitle")}
          </p>
          <p className="text-white mt-3 opacity-50">
            {t("AuthenticationPage.CreateAccountThirdParagraph")}
          </p>
          <div className="md:flex text-white mt-5 md:mt-10 gap-8">
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="mr-3 text-[2em] font-bold">@</p>
                <input
                  type="text"
                  id="userName"
                  placeholder="antonito"
                  value={formData.userName}
                  onChange={handleChange}
                  className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold md:w-[15vw] opacity-100 border-none bg-transparent focus:outline-none"
                  required
                />
              </div>
              <label htmlFor="userName" className="opacity-30">
                {t("AuthenticationPage.Username")}*
              </label>
            </div>
            <div className="flex flex-col">
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 border-none bg-transparent focus:outline-none"
                required
              />
              <label htmlFor="dob" className="opacity-30">
                {t("AuthenticationPage.DateBirth")}*
              </label>
            </div>
            <div className="flex flex-col">
              <div className="relative">
                <div
                  id="gender"
                  onClick={() => setShowGender(!showGender)}
                  className="relative w-full font-bold opacity-100 border-none bg-transparent focus:outline-none h-[8vh] cursor-pointer"
                >
                  <p className="text-[2em] sm:text-[3em] md:text-[3.5em]">
                    {formData.gender || "Select"}
                  </p>
                  {showGender && (
                    <div className="absolute left-0 w-full bg-white text-black rounded-xl shadow-lg w-max z-50">
                      {Object.keys(genderOptions).map((key, index, array) => {
                        const isFirst = index === 0;
                        const isLast = index === array.length - 1;
                        const roundedTop = isFirst ? "rounded-t-xl" : "";
                        const roundedBottom = isLast ? "rounded-b-xl" : "";
                        const roundedNone =
                          !isFirst && !isLast ? "rounded-t-0 rounded-b-0" : "";

                        return (
                          <p
                            key={key}
                            onClick={() => handleGenderSelect(key)}
                            className={`py-2 px-4 hover:bg-gray-200 cursor-pointer ${roundedTop} ${roundedBottom} ${roundedNone}`}
                          >
                            {genderOptions[key]}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <label htmlFor="gender" className="opacity-30">
                {t("AuthenticationPage.Gender")}*
              </label>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="text-white font-bold text-[10vw] sm:text-[5em] md:text-[4em] leading-none mt-5 md:max-w-[90%] lg:max-w-[70%]">
            {t("AuthenticationPage.CreateAccountFourTitle")}
          </p>
          <p className="text-white mt-3 opacity-50">
            {t("AuthenticationPage.CreateAccountFourParagraph")}
          </p>
          <div className="md:flex text-white mt-5 md:mt-10 gap-8">
            <div className="flex flex-col">
              <input
                type="text"
                id="city"
                placeholder="Madrid"
                value={formData.city}
                onChange={handleChange}
                className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] md:w-[25vw] font-bold opacity-100 border-none bg-transparent focus:outline-none"
                required
              />
              <label htmlFor="city" className="opacity-30">
                {t("Global.City")}*
              </label>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="country"
                placeholder="Spain"
                value={formData.country}
                onChange={handleChange}
                className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 border-none bg-transparent focus:outline-none"
                required
              />
              <label htmlFor="country" className="opacity-30">
                {t("Global.Country")}*
              </label>
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <p className="text-white font-bold text-[10vw] sm:text-[5em] md:text-[4em] leading-none mt-5 md:max-w-[90%] lg:max-w-[70%]">
            {t("AuthenticationPage.CreateAccountFiveTitle")}
          </p>

          <p className="text-white mt-3">
            {t("AuthenticationPage.CreateAccountFiveParagraphFirst")}
            <ul className="list-disc pl-5 py-3">
              <li
                className={`ml-2 ${
                  passwordRequirements.length
                    ? "text-[#1B6B44] opacity-100"
                    : "text-red-500 opacity-50"
                }`}
              >
                {t("AuthenticationPage.CreateAccountFiveParagraphSecond")}
              </li>
              <li
                className={`ml-2 ${
                  passwordRequirements.uppercase
                    ? "text-[#1B6B44] opacity-100"
                    : "text-red-500 opacity-50"
                }`}
              >
                {t("AuthenticationPage.CreateAccountFiveParagraphThird")}
              </li>
              <li
                className={`ml-2 ${
                  passwordRequirements.lowercase
                    ? "text-[#1B6B44] opacity-100"
                    : "text-red-500 opacity-50"
                }`}
              >
                {t("AuthenticationPage.CreateAccountFiveParagraphFour")}
              </li>
              <li
                className={`ml-2 ${
                  passwordRequirements.number
                    ? "text-[#1B6B44] opacity-100"
                    : "text-red-500 opacity-50"
                }`}
              >
                {t("AuthenticationPage.CreateAccountFiveParagraphFive")}
              </li>
              <li
                className={`ml-2 ${
                  passwordRequirements.specialChar
                    ? "text-[#1B6B44] opacity-100"
                    : "text-red-500 opacity-50"
                }`}
              >
                {t("AuthenticationPage.CreateAccountFiveParagraphSix")} (e.g.,
                !, @, #, $).
              </li>
            </ul>
            {t("AuthenticationPage.CreateAccountFiveParagraphSeven")}
          </p>

          <div className="md:flex text-white md:mt-10 gap-8">
            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 md:w-[15vw] border-none bg-transparent focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon path={showPassword ? mdiEyeOff : mdiEye} size={1} />
                </button>
              </div>
              <label htmlFor="password" className="opacity-30">
                {t("AuthenticationPage.Password")}*
              </label>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="text-[2em] sm:text-[3em] w-full md:text-[3.5em] font-bold opacity-100 md:w-[15vw] border-none bg-transparent focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    path={showConfirmPassword ? mdiEyeOff : mdiEye}
                    size={1}
                  />
                </button>
              </div>
              <label htmlFor="password" className="opacity-30">
                {t("AuthenticationPage.ConfirmPassword")}*
              </label>
            </div>
          </div>
          <div className="mt-5 flex items-center text-white">
            <div
              className={`${
                acceptedTermsConditions ? "bg-[#1B6B44]" : "bg-[#313131]"
              } p-1 rounded-md cursor-pointer`}
              onClick={() => updateTermsConditions()}
              id="termsConditions"
            >
              <Icon path={mdiCheckBold} className="icon text-[#121212]" />
            </div>
            <label htmlFor="termsConditions" className="ml-3">
              {t("AuthenticationPage.TermsConditions")}*
            </label>
          </div>
          <div className="mt-5 flex items-center text-white">
            <div
              className={`${
                acceptedNewsletter ? "bg-[#1B6B44]" : "bg-[#313131]"
              } p-1 rounded-md cursor-pointer`}
              onClick={() => updateNewsLetter()}
              id="termsConditions"
            >
              <Icon path={mdiCheckBold} className="icon text-[#121212]" />
            </div>
            <label htmlFor="termsConditions" className="ml-3">
              {t("AuthenticationPage.SuscribeNewsletter")}*
            </label>
          </div>
        </div>
      )}

      <div className="flex gap-5 w-full mt-10">
        <button
          onClick={handleBack}
          className="text-white px-6 py-2 rounded-lg flex items-center"
        >
          <Icon path={mdiArrowLeft} className="icon" />
          <span className="ml-2">{t("Global.Back")}</span>
        </button>
        <button
          onClick={handleContinue}
          className="text-white bg-[#1B6B44] px-6 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">
            {step === 5
              ? t("AuthenticationPage.CreateAccount")
              : t("AuthenticationPage.Continue")}
          </span>
          <Icon path={mdiArrowRight} className="icon" />
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;
