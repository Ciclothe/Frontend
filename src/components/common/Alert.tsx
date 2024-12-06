import React from "react";
import InfoIcon from "@/assets/icons/InfoIcon";

// TODO: #58 Create SuccessIcon and ErrorIcon components
// import SuccessIcon from "./SuccessIcon";
// import ErrorIcon from "./ErrorIcon";

interface AlertProps {
  type: "info" | "success" | "error";
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  const iconMap = {
    info: (
      <InfoIcon
        size={"6em"}
        primaryColor={"#F9E250"}
        secondaryOpacity={"10%"}
      />
    ),
    // TODO: Add SuccessIcon and ErrorIcon icons
    success: (
      <InfoIcon
        size={"6em"}
        primaryColor={"#4CAF50"}
        secondaryOpacity={"10%"}
      />
    ),
    error: (
      <InfoIcon
        size={"6em"}
        primaryColor={"#F44336"}
        secondaryOpacity={"10%"}
      />
    ),
  };

  return (
    <div
      className={`p-8 items-center flex flex-col justify-center w-[95vw] sm:w-[70vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw]`}
    >
      <div>{iconMap[type]}</div>
      <p className="font-bold text-[1.5em] sm:text-[2em] lg:text-[2.2em] xl:text-[2.2em]">
        {title}
      </p>
      <p className="opacity-50 text-center">{description}</p>
      {buttonText && onButtonClick && (
        <div className="mt-8 flex items-center justify-center w-full">
          <button
            type="button"
            className="btn-grn-fill"
            onClick={onButtonClick}
          >
            <p>{buttonText}</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;
