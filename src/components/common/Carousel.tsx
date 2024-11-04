import React, { useState, useRef, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiMenuLeft, mdiMenuRight } from "@mdi/js";

interface CarouselProps {
  children: React.ReactElement[];
  garmentCondition: string;
}

export default function Carousel({
  children: slides,
  garmentCondition,
}: CarouselProps) {
  const [curr, setCurr] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [orientations, setOrientations] = useState<string[]>([]);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const detectOrientation = () => {
      Promise.all(
        slides.map(
          (slide) =>
            new Promise<string>((resolve) => {
              const img = new Image();
              img.src = slide.props.src;
              img.onload = () => {
                const width = img.width;
                const height = img.height;
                const orientation =
                  Math.abs(width - height) < 100 || width < height
                    ? "vertical"
                    : "horizontal";
                resolve(orientation);
              };
            })
        )
      ).then((newOrientations) => {
        setOrientations(newOrientations);
      });
    };

    detectOrientation();
  }, [slides]);

  const prev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    }
  };

  const next = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    if (deltaX > 50) {
      prev();
      isDraggingRef.current = false;
    } else if (deltaX < -50) {
      next();
      isDraggingRef.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div>
      <div className="overflow-hidden relative">
        <div className="absolute w-full flex justify-between z-10">
          <div
            className="w-fit m-2 rounded-full py-1 px-2"
            style={{
              color: "white",
              backgroundColor: "#1C1C1C",
            }}
          >
            <p className="font-bold whitespace-nowrap">{garmentCondition}</p>
          </div>
        </div>
        <div
          className="flex transition-transform ease-out duration-500 h-[65vw] sm:h-[55vw] md:h-[36vw] lg:h-[26vw] xl:h-[22vw]"
          style={{
            transform: `translateX(-${
              orientations[curr] === "horizontal" ? curr * 105 : curr * 75
            }%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-none ${
                orientations[index] === "horizontal" ? "w-full" : "w-[70%]"
              } h-full rounded-md mr-[5%]`}
            >
              {React.cloneElement(slide, {
                className: `${
                  slide?.props?.className || ""
                } w-full h-full object-cover rounded-md`,
                style: { objectFit: "cover" },
              })}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="p-0"
            disabled={isTransitioning}
          >
            <Icon
              path={mdiMenuLeft}
              size={1}
              className="p-1 rounded-full shadow bg-white opacity-80 text-gray-800 hover:bg-white disabled:opacity-50"
            />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="p-0"
            disabled={isTransitioning}
          >
            <Icon
              path={mdiMenuRight}
              size={1}
              className="p-1 rounded-full shadow bg-white opacity-80 text-gray-800 hover:bg-white disabled:opacity-50"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
