import { FC } from "react";
import SidebarLeft from "@/components/common/SidebarLeft";
import SidebarLeftMobile from "@/components/common/SidebarLeftMobile";
import SidebarRight from "@/components/common/SidebarRight";
import Header from "@/components/common/Header";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  const handleMenuClick = () => {
    setShowLeftMenu((prevShowLeftMenu) => !prevShowLeftMenu);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="px-[2em] pt-[3em] hidden text-black lg:grid grid-cols-12">
        {/* Header */}
        <header className="h-[6em] col-span-12">
          <Header onMenuClick={handleMenuClick} />
        </header>

        <div className="col-span-12 flex">
          {/* Left Sidebar */}
          <div className="lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] relative">
            <SidebarLeft />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow flex flex-col">
            {/* Main Content */}
            <Outlet />
          </div>

          {/* Right Sidebar */}
          <div className="lg:min-w-[25vw] lg:max-w-[25vw] xl:min-w-[20vw] xl:max-w-[20vw] relative">
            <SidebarRight />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden text-black">
        {/* Header */}
        <header>
          <Header onMenuClick={handleMenuClick} />
        </header>

        {showLeftMenu && (
          <ClickAwayListener onClickAway={handleMenuClick}>
            <div
              className="fixed h-full hidden sm:block top-0 h-[100vh]"
              style={{ zIndex: 100 }}
            >
              <SidebarLeftMobile />
            </div>
          </ClickAwayListener>
        )}

        <div className="flex">
          {/* Main Content */}
          <div className="p-5 lg:p-4 flex-grow">
            <Outlet />
          </div>

          {/* Right Sidebar */}
          <div className="md:min-w-[35vw] md:max-w-[35vw] hidden md:block relative">
            <SidebarRight />
          </div>
        </div>
      </div>
    </>
  );
};
