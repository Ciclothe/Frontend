import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import {
  mdiEmailOutline,
  mdiCheck,
  mdiChevronLeft,
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiCheckCircleOutline,
} from "@mdi/js";
import OTP from "../common/OTP";
import API_CONSTANTS from "@/services/config";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../ui/LanguageSwitch";

enum AlertSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

function ResetPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordUpdated, setpasswordUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertSeverity | undefined>(
    undefined
  );
  const [progress, setProgress] = useState(33.33);

  const isOtpValid = otp.length === 5;

  const navigate = useNavigate();
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    setAlertMessage(null);
    if (!isValidEmail(email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch(`${API_CONSTANTS.API_AUTH}/forgetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStep(1);
      } else {
        const errorData = await response.json();
        setIsLoading(false);
        setAlertMessage(errorData.message);
        setAlertSeverity(AlertSeverity.WARNING);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in registerUser:", error);
      setAlertMessage("Error in registerUser");
      setAlertSeverity(AlertSeverity.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCode = async () => {
    setIsLoading(true);
    setAlertMessage(null);
    try {
      const requestBody = {
        token: parseInt(otp),
        email: email,
      };

      const response = await fetch(`${API_CONSTANTS.API_AUTH}/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setStep(2);
      } else {
        const errorData = await response.json();
        setIsLoading(false);
        setAlertMessage(errorData.message);
        setAlertSeverity(AlertSeverity.WARNING);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in registerUser:", error);
      setAlertMessage("Error in registerUser");
      setAlertSeverity(AlertSeverity.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setCodeSent(true);
    setCountdown(120);

    handleSendEmail();
  };

  useEffect(() => {
    let timer: number;
    if (codeSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setCodeSent(false);
    }
    return () => clearInterval(timer);
  }, [codeSent, countdown]);

  useEffect(() => {
    const totalSteps = 3;
    const stepIncrement = 100 / totalSteps;
    setProgress((step + 1) * stepIncrement);
  }, [step]);

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    setAlertMessage(null);
    try {
      const requestBody = {
        password: newPassword,
        confirmPassword: confirmPassword,
        token: parseInt(otp),
      };

      const response = await fetch(`${API_CONSTANTS.API_AUTH}/newPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setpasswordUpdated(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setIsLoading(false);
        const errorData = await response.json();
        setAlertMessage(errorData.message);
        setAlertSeverity(AlertSeverity.WARNING);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in registerUser:", error);
      setAlertMessage("Error in registerUser");
      setAlertSeverity(AlertSeverity.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const validatePassword = (password: string) => {
    setNewPassword(password);
    setIsLongEnough(password.length >= 8);
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecialChar(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password));
  };

  const checkPasswordValidity = () => {
    const isPasswordValid =
      isLongEnough &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar;
    setIsPasswordValid(isPasswordValid && newPassword === confirmPassword);
  };

  useEffect(() => {
    checkPasswordValidity();
  }, [newPassword, confirmPassword]);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      {/* Language Switcher */}
      <div className="flex gap-4 absolute top-4 right-4 lg:top-5 lg:right-5 z-20">
        <LanguageSwitch onlyFlag={false} position={"right"} />
      </div>
      <div className="w-[95%] lg:w-[50%]">
        <div className="bg-[#F5F3F4] text-[#1A1A1A] rounded-md py-5 px-[2em] lg:py-8 lg:px-[5em]">
          <div className="flex justify-center items-center">
            <div className="w-[50%]">
              <LinearProgress
                variant="buffer"
                value={progress}
                className="mb-8"
                color="success"
              />
            </div>
          </div>
          <div
            className={`flex items-center ${
              step !== 1 ? "justify-center" : "justify-between"
            }`}
          >
            {step === 1 && (
              <div onClick={() => setStep(step - 1)}>
                <Icon
                  path={mdiChevronLeft}
                  className="icon hover: cursor-pointer"
                />
              </div>
            )}
            {!passwordUpdated && (
              <p className="font-bold text-[2em] text-center">
                {t("RecoveryPassword.ForgotPassword")}
              </p>
            )}
            {step === 1 && <div></div>}
          </div>
          {step === 0 && (
            <div>
              {alertMessage && (
                <Alert
                  severity={alertSeverity}
                  onClose={() => setAlertMessage(null)}
                  className="mb-5"
                >
                  {alertMessage}
                </Alert>
              )}
              <div className="mt-5">
                <label htmlFor="emailResetPassword">
                  {t("RecoveryPassword.EmailAddress")}
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="emailResetPassword"
                  className="px-3 w-full border border-[#BABABABA] py-3 mt-2 rounded-md bg-[#DDDDDD]"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSendEmail}
                  disabled={!email || !isValidEmail(email)}
                  className={`bg-[#1C1C1C] my-5 py-3 flex items-center justify-center w-full text-white text-white rounded-md ${
                    !email || !isValidEmail(email)
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100"
                  }`}
                >
                  {isLoading ? (
                    <CircularProgress
                      style={{ height: "17px", width: "17px" }}
                    />
                  ) : (
                    <p>{t("RecoveryPassword.SendEmail")}</p>
                  )}
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <div
                className="flex justify-between items-center p-5 rounded-lg mt-5"
                style={{
                  border: "1px solid #003900",
                  backgroundColor: "rgba(220, 239, 230, 0.2)",
                }}
              >
                <div className="flex items-center">
                  <div
                    className="p-3 rounded-full mr-5 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(220, 239, 230, 1)" }}
                  >
                    <Icon
                      path={mdiEmailOutline}
                      className="h-7 text-[#003900]"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[1.3em] text-[#003900]">
                      {t("RecoveryPassword.EmailSentSuccessfully")}
                    </p>
                    <p className="w-[80%]">
                      {t("RecoveryPassword.AnEmailHasBeenSentTo")}{" "}
                      <span className="font-bold">{email}</span>.{" "}
                      {t("RecoveryPassword.PleaseCheckYourInbox")}
                    </p>
                  </div>
                </div>
                <div className="p-1 bg-[#003900] rounded-full ml-5 flex items-center justify-center">
                  <Icon path={mdiCheck} className="icon text-[#F5F3F4]" />
                </div>
              </div>
              {alertMessage && (
                <Alert
                  severity={alertSeverity}
                  onClose={() => setAlertMessage(null)}
                  className="my-5"
                >
                  {alertMessage}
                </Alert>
              )}
              <div className="flex justify-center items-center mt-5 flex-col">
                <p className="font-bold text-[1.5em]">
                  {t("RecoveryPassword.EnterTheCode")}
                </p>
                <div className="mt-5">
                  <OTP
                    separator={<span></span>}
                    value={otp}
                    onChange={setOtp}
                    length={5}
                  />
                </div>
              </div>
              <div className="text-center mt-5">
                <p>
                  {!codeSent && (
                    <>
                      {t("RecoveryPassword.DidntReceiveCode")}{" "}
                      <span>
                        <a
                          className="text-[#003900] font-bold hover:cursor-pointer"
                          onClick={handleResend}
                        >
                          {t("RecoveryPassword.Resend")}
                        </a>
                      </span>
                    </>
                  )}
                  {codeSent && (
                    <>
                      {t("RecoveryPassword.ResendCode")}{" "}
                      <span className="text-[#003900] font-bold">
                        {countdown} {t("RecoveryPassword.Second")}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!isOtpValid}
                  className={`bg-[#1C1C1C] my-5 py-3 flex items-center justify-center w-full text-white text-white rounded-md ${
                    !isOtpValid
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100"
                  }`}
                >
                  {isLoading ? (
                    <CircularProgress
                      style={{ height: "17px", width: "17px" }}
                    />
                  ) : (
                    <p>{t("RecoveryPassword.SendCode")}</p>
                  )}
                </button>
              </div>
            </div>
          )}
          {step === 2 && !passwordUpdated && (
            <div>
              <div className="mt-5">
                {alertMessage && (
                  <Alert
                    severity={alertSeverity}
                    onClose={() => setAlertMessage(null)}
                    className="mb-5"
                  >
                    {alertMessage}
                  </Alert>
                )}
                <div>
                  <label htmlFor="newPasswordResetPassword">
                    {t("RecoveryPassword.NewPassword")}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      value={newPassword}
                      onChange={(e) => validatePassword(e.target.value)}
                      type={showConfirmPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPasswordResetPassword"
                      className="px-3 w-full border border-[#BABABABA] py-3 mt-2 rounded-md bg-[#DDDDDD]"
                      required
                    />
                    <div onClick={togglePasswordConfirmVisibility}>
                      <Icon
                        path={
                          showConfirmPassword ? mdiEyeOffOutline : mdiEyeOutline
                        }
                        className="icon absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer mt-[0.3em]"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label htmlFor="confirmPasswordResetPassword">
                    {t("RecoveryPassword.ConfirmPassword")}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPasswordResetPassword"
                      className="px-3 w-full border border-[#BABABABA] py-3 mt-2 rounded-md bg-[#DDDDDD]"
                      required
                    />
                    <div onClick={togglePasswordVisibility}>
                      <Icon
                        path={showPassword ? mdiEyeOffOutline : mdiEyeOutline}
                        className="icon absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer mt-[0.3em]"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-4 font-bold">
                  {t("RecoveryPassword.RevoceryPasswordFiveParagraphFirst")}
                </p>
                <div className="mx-4 my-2">
                  <ul className="list-disc">
                    <li
                      className={isLongEnough ? "text-[#1B6B44] font-bold" : ""}
                    >
                      {t(
                        "RecoveryPassword.RevoceryPasswordFiveParagraphSecond"
                      )}
                    </li>
                    <li
                      className={hasUpperCase ? "text-[#1B6B44] font-bold" : ""}
                    >
                      {t("RecoveryPassword.RevoceryPasswordFiveParagraphThird")}
                    </li>
                    <li
                      className={hasLowerCase ? "text-[#1B6B44] font-bold" : ""}
                    >
                      {t("RecoveryPassword.RevoceryPasswordFiveParagraphFour")}
                    </li>
                    <li className={hasNumber ? "text-[#1B6B44] font-bold" : ""}>
                      {t("RecoveryPassword.RevoceryPasswordFiveParagraphFive")}
                    </li>
                    <li
                      className={
                        hasSpecialChar ? "text-[#1B6B44] font-bold" : ""
                      }
                    >
                      {t("RecoveryPassword.RevoceryPasswordFiveParagraphSix")}
                    </li>
                  </ul>
                </div>
                <p>
                  {t("RecoveryPassword.RevoceryPasswordFiveParagraphSeven")}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  disabled={!isPasswordValid}
                  className={`bg-[#1C1C1C] my-5 py-3 flex items-center justify-center w-full text-white text-white rounded-md ${
                    !isPasswordValid
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100"
                  }`}
                >
                  {isLoading ? (
                    <CircularProgress
                      style={{ height: "17px", width: "17px" }}
                    />
                  ) : (
                    <p>Update Password</p>
                  )}
                </button>
              </div>
            </div>
          )}
          {step === 2 && passwordUpdated && (
            <div className="my-5 flex justify-center items-center font-bold flex-col">
              <div onClick={togglePasswordVisibility}>
                <Icon
                  path={mdiCheckCircleOutline}
                  className="h-[6em] my-5 text-[#1B6B44]"
                />
              </div>
              <h2 className="text-[1.5em]">
                {t("RecoveryPassword.YourPasswordUpdatedSuccessfully")}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
