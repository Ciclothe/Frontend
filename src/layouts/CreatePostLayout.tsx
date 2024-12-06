import { FC, ReactNode, useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext.js";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import API_CONSTANTS from "@/services/config";
import PostPreview from "@/pages/createPost/components/PostPreview";
import ModeSwitch from "@/components/ui/ThemeSwitch";
import LanguageSwitch from "@/components/ui/LanguageSwitch";
import CiclotheLogotipo from "../../public/CiclotheLogotipo";
import Icon from "@mdi/react";
import AlertComponent from "@/components/ui/Alert";

//? ICONS
import { mdiArrowRight, mdiArrowLeft, mdiCheck } from "@mdi/js";

interface CreatePostLayoutProps {
  children: ReactNode;
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  postDetails: any;
  setPostDetails: React.Dispatch<React.SetStateAction<any>>;
}

enum AlertSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export const CreatePostLayout: FC<CreatePostLayoutProps> = ({
  children,
  currentStep,
  onNext,
  onPrevious,
  postDetails,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const { user } = useUser();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<any>("success");

  const [canNextStep, setCanNextStep] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  useEffect(() => {
    if (currentStep == 1) {
      setCanNextStep(postDetails?.condition);
    } else if (currentStep == 2) {
      setCanNextStep(
        postDetails?.categories?.category &&
          postDetails?.categories?.genre &&
          postDetails?.categories?.type
      );
    } else if (currentStep == 3) {
      setCanNextStep(
        postDetails?.description?.size &&
          postDetails?.description?.materials.length &&
          postDetails?.description?.title &&
          postDetails?.description?.title.length >= 20 &&
          postDetails?.description?.description &&
          postDetails?.description?.description.length >= 70 &&
          postDetails?.description?.brand &&
          postDetails?.description?.color &&
          postDetails?.description?.usageTime
      );
    } else if (currentStep == 4) {
      setCanNextStep(postDetails?.media.length >= 3);
    } else if (currentStep == 5) {
      setCanNextStep(
        postDetails?.description?.location.city &&
          postDetails?.description?.location.country &&
          postDetails?.description?.tags.length >= 3
      );
    }
  }, [currentStep, postDetails]);

  useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

  const createPost = async () => {
    try {
      await fetch(`${API_CONSTANTS.API_CREATE_POST}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postDetails),
      });

      setCreatedSuccess(true);
      setTimeout(() => {
        navigate("/feed");
      }, 2000);
    } catch (error) {
      setAlertMessage("Alerts.PostCreationError");
      setAlertSeverity(AlertSeverity.ERROR);
      setAlertVisible(true);
    }
  };

  return (
    <div
      className={`${
        themeMode === "dark"
          ? "bg-[#121212] text-white"
          : "bg-[#F7F8FA] text-black"
      } flex justify-center lg:justify-start min-h-screen relative overflow-auto`} // Ajusta el padding aquí
    >
      {/* ALERT MESSAGE */}
      {alertVisible && (
        <div className="fixed top-5 left-5 z-10">
          <AlertComponent
            icon={true}
            message={t(alertMessage)}
            severity={alertSeverity}
          />
        </div>
      )}

      <div className="flex gap-4 fixed top-5 right-5 z-[100]">
        <LanguageSwitch onlyFlag={false} position={"right"} />
        <ModeSwitch />
      </div>

      <div
        className={`min-h-screen relative flex flex-col justify-center py-5 px-[6vw] ${
          currentStep === 3 || currentStep === 4 || currentStep === 5
            ? "w-[100%] sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[60%]"
            : "w-[100%]"
        }`}
      >
        {createdSuccess == false ? (
          <div>
            <Link to="/">
              <CiclotheLogotipo color="#1B6B44" size="8em" />
            </Link>
            <div>
              <p className="font-bold text-[7vw] sm:text-[3em] md:text-[4em] leading-none mt-5 md:max-w-[90%] lg:max-w-[60vw]">
                {currentStep === 1 && t("CreatePost.StepOneTitle")}
                {currentStep === 2 && t("CreatePost.StepTwoTitle")}
                {currentStep === 3 && t("CreatePost.StepThreeTitle")}
                {currentStep === 4 && t("CreatePost.StepFourTitle")}
                {currentStep === 5 && t("CreatePost.StepFiveTitle")}
              </p>
            </div>
            <div>{children}</div>
            {(currentStep === 3 || currentStep === 4 || currentStep === 5) && (
              <div className="flex lg:hidden mt-5">
                <PostPreview
                  user={user}
                  postDetails={postDetails}
                  truncateText={(text, maxLength) =>
                    text.length > maxLength
                      ? text.substring(0, maxLength) + "..."
                      : text
                  }
                  t={t}
                />
              </div>
            )}
            {/* ACTIONS */}
            <div className="flex gap-5 mt-10 justify-center md:justify-start">
              {currentStep !== 1 && (
                <button
                  onClick={onPrevious}
                  className="px-6 py-2 rounded-lg flex items-center"
                  disabled={currentStep === 1}
                >
                  <Icon path={mdiArrowLeft} className="icon" />
                  <span className="ml-2">{t("Global.Back")}</span>
                </button>
              )}
              <button
                onClick={() => {
                  if (currentStep === 5) {
                    createPost();
                  } else {
                    onNext();
                  }
                }}
                className={`text-white px-6 py-2 rounded-lg flex items-center bg-[#1B6B44] ${
                  canNextStep
                    ? "bg-opacity-100 cursor-pointer"
                    : "bg-opacity-50"
                }`}
                disabled={!canNextStep}
              >
                <span className="mr-2">
                  {currentStep === 5
                    ? t("Global.CreatePost")
                    : t("Global.Next")}
                </span>
                <Icon path={mdiArrowRight} className="icon" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className="bg-[#1B6B44] bg-opacity-20 rounded-full p-2 w-fit"
              style={{ border: "4px solid #1B6B44" }}
            >
              <Icon path={mdiCheck} size={2} className="text-[#1B6B44]" />
            </div>
            <p className="font-bold text-[1.5em]">Post Created Succesfully</p>
          </div>
        )}
      </div>

      {/* PREVIEW */}
      {(currentStep === 3 || currentStep === 4 || currentStep === 5) && (
        <div className="relative">
          <div className="fixed top-0 right-0 h-screen hidden lg:flex lg:w-[50%] xl:w-[40%] pr-[6vw] items-center justify-center">
            <PostPreview
              user={user}
              postDetails={postDetails}
              truncateText={(text, maxLength) =>
                text.length > maxLength
                  ? text.substring(0, maxLength) + "..."
                  : text
              }
              t={t}
            />
          </div>
        </div>
      )}
    </div>
  );
};
