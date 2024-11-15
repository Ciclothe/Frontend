import { useState } from "react";
import { Icon } from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import SwipeIcon from "@/assets/uiIcons/SwipeIcon";
import { useTheme } from "@/context/ThemeContext.js";
import SwapCard from "@/components/layout/SwapCard";

interface Image {
  src: string;
  orientation: string;
}

interface ImageCarouselProps {
  garmentImgs: Image[];
  data: any;
}

const ImageCarousel = ({ garmentImgs, data }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isNightMode } = useTheme();

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

  return (
    <div
      className={`relative w-full overflow-hidden col-span-12 flex items-center`}
    >
      <div className="flex transition-transform duration-300">
        <div
          className={`w-full flex-shrink-0 relative ${
            garmentImgs[currentIndex]?.orientation === "landscapes"
              ? "aspect-[5/4]"
              : "aspect-[4/5]"
          }`}
        >
          <img
            src={garmentImgs[currentIndex]?.src}
            className={`w-full h-full object-cover rounded-lg`}
            alt={`garment-${currentIndex}`}
          />
          <div
            className={`${
              isNightMode ? "bg-opacity-20" : "bg-opacity-10"
            } absolute right-2 top-2 text-[#0DBC73] gap-2 px-2 py-1 flex items-center rounded-full bg-[#0DBC73] backdrop-blur-md backdrop-brightness-[60%] border border-[#0DBC73]`}
          >
            <SwipeIcon
              size={"1.2em"}
              colorSelected={"#0DBC73"}
              isSelected={true}
            />
            <p className="font-bold">{currentIndex + 1}</p>
          </div>

          {/* SWAP DATA POST */}
          <div className="hidden xl:block absolute bottom-0 w-full p-2 z-[100]">
            <SwapCard swapData={data} />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center">
        <div
          onClick={handlePrev}
          className="absolute left-0 hover:bg-black text-white px-1 py-2 flex items-center hover:bg-opacity-40 cursor-pointer rounded-r-lg"
        >
          <Icon path={mdiChevronLeft} size={0.8} />
        </div>
        <div
          onClick={handleNext}
          className="absolute right-0 hover:bg-black text-white px-1 py-2 flex items-center hover:bg-opacity-40 cursor-pointer rounded-l-lg"
        >
          <Icon path={mdiChevronRight} size={0.8} />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
