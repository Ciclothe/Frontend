import { useRef, useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext.js";

interface Category {
  label: string;
  value: string;
  img: string;
  url: string;
  active: boolean;
}

interface CategoriesProps {
  data: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ data }) => {
  const { themeMode } = useTheme();

  const carouselRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;
        setShowButtons(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [data]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center relative rounded-lg">
      {showButtons && (
        <>
          <button
            onClick={scrollLeft}
            className={`absolute left-0 z-10 p-1 rounded-l-lg h-full ${
              themeMode === "dark"
                ? "bg-[#171717] text-white"
                : "bg-[#F7F7F7] text-black"
            }`}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <Icon path={mdiChevronLeft} size={0.5} />
          </button>
        </>
      )}

      <div
        ref={carouselRef}
        className="flex items-center gap-4 overflow-x-auto scroll-smooth whitespace-nowrap no-scrollbar rounded-lg"
      >
        {data?.map((category: any, index: number) => (
          <div
            key={index}
            className={`${
              themeMode === "dark"
                ? "text-white border-[#232323]"
                : "text-black border-[#F7F7F7]"
            } pl-4 border rounded-lg flex gap-4 items-center min-w-[11em] justify-center cursor-pointer`}
          >
            <p className="font-bold">{category.label}</p>
            <div className="h-[4em] w-[4em]">
              <img
                src={category?.img}
                className="object-cover h-full w-full"
                alt={category.label}
              />
            </div>
          </div>
        ))}
      </div>

      {showButtons && (
        <>
          <button
            onClick={scrollRight}
            className={`absolute right-0 z-10 p-1 ${
              themeMode === "dark"
                ? "bg-[#171717] text-white"
                : "bg-[#F7F7F7] text-black"
            } rounded-r-lg h-full`}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <Icon path={mdiChevronRight} size={0.5} />
          </button>
        </>
      )}
    </div>
  );
};

export default Categories;
