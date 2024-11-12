import { FC } from "react";
import MenuDesktop from "@/components/common/MenuDesktop";
import MenuMobile from "@/components/common/MenuMobile";
import SidebarRight from "@/components/common/SidebarRight";
import Header from "@/components/common/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const handleMenuClick = () => {
    setShowMenuMobile((prevShowMenuMobile) => !prevShowMenuMobile);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="px-[1em] lg:px-[5em] text-black lg:grid grid-cols-12">
        {/* Header */}
        <header className="col-span-12">
          <Header toggleMenu={handleMenuClick} />
        </header>

        <div className="col-span-12 flex">
          {/* Left Sidebar */}
          <div className="hidden md:block min-w-[25vw] lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] relative">
            <MenuDesktop />
          </div>

          <div className="md:hidden">
            <MenuMobile isOpen={showMenuMobile} toggleMenu={handleMenuClick} />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow flex flex-col">
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
