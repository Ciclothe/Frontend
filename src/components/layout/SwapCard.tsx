import { useState } from "react";
import SwapIcon from "@/assets/icons/Swapicon";
import { useTheme } from "@/context/ThemeContext.js";
import { useTranslation } from "react-i18next";
import { useSwap } from "@/context/SwapContext";

interface SwapCardProps {
  swapData: any;
}

const SwapCard: React.FC<SwapCardProps> = ({ swapData }) => {
  const { setModalState } = useSwap();
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  const formatCondition = (condition: string) => {
    const conditionColors = {
      new: "text-[#0DBC73]",
      as_new: "text-[#FCBA04]",
      used: "text-[#00BBF9]",
      bad_state: "text-[#CC2936]",
    };

    const colorClass =
      conditionColors[condition as keyof typeof conditionColors] ||
      "text-gray-500";

    return { colorClass };
  };

  const { colorClass } = formatCondition(swapData?.garmentCondition);

  const showSwapModal = () => {
    setModalState(true, swapData);
  };

  return (
    <div
      className={`${
        isNightMode
          ? "border-gray-50 border-opacity-20 xl:bg-opacity-50 text-white xl:text-white"
          : "border-black border-opacity-10 xl:bg-opacity-30 text-black xl:text-white"
      } ${
        showDetails ? "w-full" : "w-full xl:w-fit"
      }  p-2 rounded-md border xl:border-none col-span-12 h-full flex gap-2 flex-col mt-2 xl:backdrop-blur-lg xl:backdrop-brightness-10 xl:bg-black`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="flex h-full">
        <div
          className={`aspect-square xl:transition-all xl:duration-300 xl:transform ${
            showDetails
              ? "xl:opacity-100 xl:scale-100 w-[7em]"
              : "xl:opacity-0 xl:scale-0 xl:h-0 w-[7em] xl:w-[0em]"
          }`}
        >
          <img
            src={swapData?.garmentImgs?.[0]?.src}
            className="w-full h-full object-cover rounded-md"
            alt="Garment Image"
          />
        </div>
        <div className="ml-2 w-full flex flex-col justify-around h-full">
          <p className={`font-bold capitalize ${colorClass}`}>
            {t(`GarmentCondition.${swapData?.garmentCondition}`)}{" "}
          </p>
          <div className="w-full">
            <h2 className="font-bold text-[1.2em] capitalize">
              {swapData?.garmentTitle}
            </h2>
            <div className="flex items-center gap-2 opacity-60 capitalize">
              <p>{swapData?.garmentColor}</p>
              <p className="border-l-[1px] pl-2">{swapData?.garmentSize}</p>
              <p className="border-l-[1px] pl-2">{swapData?.garmentBrand}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`${
          showDetails
            ? "flex xl:opacity-100 xl:translate-y-0 w-full"
            : "xl:hidden flex xl:opacity-0 xl:-translate-y-2 xl:w-[0em]"
        } bg-[#0DBC73] w-full py-2 gap-2 rounded-lg flex items-center justify-center`}
        onClick={(e) => {
          e.stopPropagation();
          showSwapModal();
        }}
      >
        <SwapIcon size={"1em"} color={"white"} />
        Swap
      </button>
    </div>
  );
};

export default SwapCard;
