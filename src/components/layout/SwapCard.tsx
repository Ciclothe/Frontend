import { useState } from "react";
import SwapIcon from "@/assets/icons/Swapicon";
import { useTheme } from "@/context/ThemeContext.js";

interface SwapData {
  garmentImgs: { src: string }[];
  garmentCondition: string;
  garmentTitle: string;
  garmentColor: string;
  garmentSize: string;
  garmentBrand: string;
}

const SwapCard = ({ swapData }: { swapData: SwapData }) => {
  const { isNightMode } = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const {
    garmentImgs,
    garmentCondition,
    garmentTitle,
    garmentColor,
    garmentSize,
    garmentBrand,
  } = swapData;

  const formatCondition = (condition: string) => {
    const conditionColors = {
      new: "text-[#0DBC73]",
      as_new: "text-[#FCBA04]",
      used: "text-[#00BBF9]",
      bad_state: "text-[#CC2936]",
    };

    const formattedText = condition
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const colorClass =
      conditionColors[condition as keyof typeof conditionColors] ||
      "text-gray-500";

    return { formattedText, colorClass };
  };

  const { formattedText, colorClass } = formatCondition(garmentCondition);

  return (
    <div
      className={`${showDetails ? "w-full" : "w-fit"} ${
        isNightMode ? "bg-opacity-50" : "bg-opacity-30"
      } p-2 rounded-md col-span-12 h-full flex gap-2 text-white flex-col mt-2 backdrop-blur-lg backdrop-brightness-10 bg-black`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="flex h-full">
        <div
          className={`aspect-square transition-all duration-300 transform ${
            showDetails
              ? "opacity-100 scale-100 w-[7em]"
              : "opacity-0 scale-0 h-0 w-[0em]"
          }`}
        >
          <img
            src={garmentImgs?.[0]?.src}
            className="w-full h-full object-cover rounded-md"
            alt="Garment Image"
          />
        </div>
        <div className="ml-2 w-full flex flex-col justify-around h-full">
          <p className={`font-bold capitalize ${colorClass}`}>
            {formattedText}
          </p>
          <div className="w-full">
            <h2 className="font-bold text-[1.4em] capitalize">
              {garmentTitle}
            </h2>
            <div className="flex items-center gap-2 opacity-60 capitalize">
              <p>{garmentColor}</p>
              <p className="border-l-[1px] pl-2">{garmentSize}</p>
              <p className="border-l-[1px] pl-2">{garmentBrand}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`${
          showDetails
            ? "flex opacity-100 translate-y-0 w-full"
            : "hidden opacity-0 -translate-y-2 w-[0em]"
        }  bg-[#02995D] text-white items-center justify-center gap-2 transition-all duration-300 transform`}
      >
        <SwapIcon size={"1em"} color={"white"} />
        Swap
      </button>
    </div>
  );
};

export default SwapCard;
