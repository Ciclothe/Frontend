import { FC } from "react";
import MenuDesktop from "@/components/layout/MenuDesktop";
import MenuMobile from "@/components/layout/MenuMobile";
import SidebarRight from "@/components/layout/SidebarRight";
import Header from "@/components/layout/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

export const MainLayout: FC = () => {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const { isNightMode } = useTheme();

  const handleMenuClick = () => {
    setShowMenuMobile((prevShowMenuMobile) => !prevShowMenuMobile);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="text-black lg:grid grid-cols-12 relative gap-4">
        {/* Header */}
        <header
          className={`col-span-12 sticky top-0 z-[1000] ${
            isNightMode ? "bg-[#0b0b0b]" : "bg-[#f0eff4]"
          }`}
        >
          <Header toggleMenu={handleMenuClick} />
        </header>

        <div className="col-span-12 flex md:gap-6 px-[1em] lg:px-[5em]">
          {/* Left Sidebar */}
          <div className="hidden md:block min-w-[25vw] lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] relative">
            <MenuDesktop />
          </div>

          <div className="md:hidden">
            <MenuMobile isOpen={showMenuMobile} toggleMenu={handleMenuClick} />
          </div>

          {/* Main Content Area */}
          <div className="my-5 md:mt-0 flex-grow flex flex-col">
            {/* Main Content */}
            <Outlet />
          </div>

          {/* Right Sidebar */}
          <div className="hidden xl:block lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] relative">
            <SidebarRight />
          </div>
        </div>
      </div>
    </>
  );
};
