import RecommendedProfiles from "./RecommendedProfiles";
import { useState, useEffect } from "react";

const SidebarRight = () => {
  const [windowHeight, setWindowHeight] = useState("calc(100vh - 6em)");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setWindowHeight(isScrolling ? "100vh" : "calc(100vh - 6em)");
      } else {
        setWindowHeight("calc(100vh - 10em)");
      }
    };

    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        setIsScrolling(window.scrollY > 0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling]);

  return (
    <div
      className={`flex flex-col justify-between p-5 lg:p-0 rounded-t-xl sticky top-0 lg:top-auto lg:fixed md:min-w-[35vw] md:max-w-[35vw] lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] `}
      style={{ height: windowHeight }}
    >
      <div>
        <div>
          <RecommendedProfiles />
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
