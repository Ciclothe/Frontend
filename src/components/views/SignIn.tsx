import { useState } from "react";
import CiclotheLogotipo from "../../../public/CiclotheLogotipo";
import Icon from "@mdi/react";
import { mdiArrowRight, mdiEye, mdiEyeOff, mdiCheckBold } from "@mdi/js";
import API_CONSTANTS from "@/services/config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../common/LanguageSwitch";
import AlertComponent from "../common/Alert";

function SignIn() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<any>("success");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleContinue = async () => {
    let message = "";
    let severity = "success";

    // Validaciones
    if (!formData.email) {
      message = t("Alerts.PleaseTellUs");
      severity = "warning";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      message = t("Alerts.InvalidEmail");
      severity = "warning";
    } else if (!formData.password) {
      message = t("Alerts.EnterPassword");
      severity = "warning";
    }

    // Mostrar alerta si hay un mensaje de error
    if (message) {
      showAlert(message, severity);
      return;
    }

    // Enviar datos al backend
    try {
      const response = await fetch(`${API_CONSTANTS.API_AUTH}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      if (response.ok) {
        showAlert(t("Alerts.LoginSuccess"), "success");
        navigate("/");
      } else {
        const errorData = await response.json();
        showAlert(`${t("Alerts.LoginError")}: ${errorData.message}`, "warning");
      }
    } catch (error) {
      showAlert(t("Alerts.ServerError"), "warning");
      console.error("Error:", error);
    }
  };

  const showAlert = (message: string, severity: string) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const handleChange = (event: any) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const updateRememberMe = () => {
    setRememberMe(!rememberMe);
    setFormData({
      ...formData,
      rememberMe: !rememberMe,
    });
  };

  return (
    <div className="flex justify-center flex-col items-start min-h-[100vh] bg-[#121212] p-[2vw] md:p-[10vw]">
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
            message={alertMessage}
            severity={alertSeverity}
          />
        </div>
      )}

      <div>
        <p className="text-white font-bold text-[10vw] sm:text-[5em] md:text-[4em] leading-none mt-5 md:max-w-[90%] lg:max-w-[70%]">
          {t("AuthenticationPage.WelcomeBack")}
        </p>
        <p className="text-white mt-3 opacity-50">{t("Alerts.PleaseTellUs")}</p>
        <div className="md:flex text-white mt-5 md:mt-10 gap-8">
          <div className="flex flex-col">
            <input
              type="email"
              id="email"
              placeholder="Antonio@test.com"
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
        </div>
        <div className="mt-5 flex items-center text-white">
          <div
            className={`${
              rememberMe ? "bg-[#1B6B44]" : "bg-[#313131]"
            } p-1 rounded-md cursor-pointer`}
            onClick={() => updateRememberMe()}
            id="termsConditions"
          >
            <Icon path={mdiCheckBold} className="icon text-[#121212]" />
          </div>
          <label htmlFor="termsConditions" className="ml-3">
            {t("AuthenticationPage.RememberMe")}
          </label>
        </div>
      </div>

      <div className="flex gap-5 w-full mt-10">
        <button
          onClick={handleContinue}
          className="text-white bg-[#1B6B44] px-6 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">{t("AuthenticationPage.Enter")}</span>
          <Icon path={mdiArrowRight} className="icon" />
        </button>
        <Link to={`/authentication/resetPassword`}>
          <button className="text-white px-6 py-2 rounded-lg flex items-center">
            <span className="ml-2">
              {t("AuthenticationPage.ForgetPassword")}
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
