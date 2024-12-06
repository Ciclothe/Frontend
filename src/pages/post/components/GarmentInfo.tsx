import React from "react";
import Swapicon from "@/assets/icons/Swapicon";
import { useTheme } from "@/context/ThemeContext.js";
import { useSwap } from "@/context/SwapContext";

type GarmentInfoProps = {
  postData: any;
};

const GarmentInfo: React.FC<GarmentInfoProps> = ({ postData }) => {
  const { isNightMode } = useTheme();
  const { setModalState } = useSwap();

  const showSwapModal = () => {
    setModalState(true, postData);
  };

  return (
    <>
      {/* Garment Info */}
      <div className="col-span-12 m-4">
        <div>
          <p className="font-bold">Description</p>
          <p style={{ whiteSpace: "pre-line" }} className="mt-2 opacity-50">
            {postData?.garmentDescription}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {/* Size */}
          <div className="flex w-full items-center justify-between">
            <p className="font-bold">Size</p>
            <p className="opacity-50">{postData?.garmentSize}</p>
          </div>
          {/* Main Color */}
          <div className="flex w-full items-center justify-between">
            <p className="font-bold">Main Color</p>
            <p className="opacity-50">{postData?.garmentColor}</p>
          </div>
          {/* Brand */}
          <div className="flex w-full items-center justify-between">
            <p className="font-bold">Brand</p>
            <p className="opacity-50">{postData?.garmentBrand}</p>
          </div>
          {/* Condition */}
          <div className="flex w-full items-center justify-between">
            <p className="font-bold">Condition</p>
            <p className="opacity-50">
              {postData?.garmentCondition
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char: string) => char.toUpperCase())}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer Button */}
      <div
        className={`${
          isNightMode ? "bg-[#0b0b0b]" : "bg-[#ffffff]"
        } col-span-12 p-2 sticky bottom-0 z-[100] text-white`}
      >
        <button
          className="bg-[#0DBC73] w-full py-2 gap-2 rounded-lg flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            showSwapModal();
          }}
        >
          {/* Swap Icon */}
          <Swapicon size={"1em"} color={"white"} />
          <p className="font-bold">Swap</p>
        </button>
      </div>
    </>
  );
};

export default GarmentInfo;
