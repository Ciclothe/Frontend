import { useState } from "react";
import { Icon } from "@mdi/react";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiTruckDelivery,
  mdiAccountCircleOutline,
} from "@mdi/js";
import SwipeIcon from "@/assets/uiIcons/SwipeIcon";
import { useTheme } from "@/context/ThemeContext.js";
import SwapCard from "@/components/layout/SwapCard";
import { useTranslation } from "react-i18next";

interface Image {
  src: string;
  orientation: string;
}

interface ImageCarouselProps {
  garmentImgs: Image[];
  data: any;
  isPostDetails: boolean;
}

const ImageCarousel = ({
  garmentImgs,
  data,
  isPostDetails,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : garmentImgs.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < garmentImgs.length - 1 ? prevIndex + 1 : 0
    );
  };

  const getShippingMethod = (method: string) => {
    if (method === "inPerson") {
      return t("Swap.InPerson");
    } else if (method === "delivery") {
      return t("Swap.Delivery");
    }
  };

  return (
    <div
      className={`relative max-w-full overflow-hidden col-span-12 flex items-center ${
        isPostDetails ? "justify-center" : "justify-start"
      }`}
    >
      <div
        className={`flex ${
          garmentImgs[currentIndex]?.orientation === "landscapes"
            ? "aspect-[3/2] w-full"
            : garmentImgs[currentIndex]?.orientation === "square"
              ? "aspect-[5/6] md:aspect-[1/1] w-full md:w-auto md:h-full"
              : "aspect-[4/5] w-full md:w-auto md:h-full"
        } ${isPostDetails ? "justify-center" : "justify-start"} w-full ${
          isPostDetails ? "max-h-[35em]" : "max-h-[40em]"
        }`}
      >
        <div
          className={`flex-shrink-0 relative ${
            garmentImgs[currentIndex]?.orientation === "landscapes"
              ? "aspect-[3/2] md:aspect-[16/9] w-full"
              : garmentImgs[currentIndex]?.orientation === "square"
                ? "aspect-[5/6] md:aspect-[1/1] w-full md:w-auto md:h-full"
                : "aspect-[4/5] w-full md:w-auto md:h-full"
          }`}
        >
          <img
            src={garmentImgs[currentIndex]?.src}
            className={`w-full h-full object-cover ${
              isPostDetails ? " rounded-null" : " rounded-lg"
            }`}
            alt={`garment-${currentIndex}`}
          />
          <div className="absolute left-0 top-2 flex items-center w-full justify-between px-2">
            {data.shippingPreference && (
              <div
                className={`${
                    data.shippingPreference === "delivery"
                    ? "text-[#5F22AA] bg-[#F1DBFE]"
                    : "text-[#0D7359] bg-[#DBFEF5]"
                } px-2 py-[2px] rounded-full  w-fit flex gap-1 items-center`}
              >
                <Icon
                  path={
                    data.shippingPreference === "delivery"
                      ? mdiTruckDelivery
                      : mdiAccountCircleOutline
                  }
                  size={0.8}
                />
                <p className="text-xs">
                  {getShippingMethod(data.shippingPreference)}
                </p>
              </div>
            )}
            <div
              className={`${
                themeMode === "dark" ? "bg-opacity-20" : "bg-opacity-10"
              } text-[#0DBC73] gap-2 px-2 py-1 flex items-center rounded-full bg-[#0DBC73] backdrop-blur-md backdrop-brightness-[60%] border border-[#0DBC73]`}
            >
              <SwipeIcon
                size={"1.2em"}
                colorSelected={"#0DBC73"}
                isSelected={true}
              />
              <p className="font-bold">{currentIndex + 1}</p>
            </div>
          </div>
          {/* SWAP DATA POST */}
          {!isPostDetails && (
            <div className="block absolute bottom-0 w-full p-2 z-[100] sm:opacity-50 hover:opacity-100">
              <SwapCard swapData={data} />
            </div>
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute z-[100] left-0 hover:bg-black text-white px-1 py-2 flex items-center hover:bg-opacity-40 cursor-pointer rounded-r-lg"
            >
              <Icon path={mdiChevronLeft} size={0.8} />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute z-[100] right-0 hover:bg-black text-white px-1 py-2 flex items-center hover:bg-opacity-40 cursor-pointer rounded-l-lg"
            >
              <Icon path={mdiChevronRight} size={0.8} />
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
