// ExploreView.tsx
import React, { useEffect } from "react";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useSidebarRight } from "@/context/SidebarRightContext";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";
import { usePostButton } from "@/context/CreatePostActive";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { TradingTopics } from "./components/TradingTopics";

const options = [
  { name: "Trendings", value: 0 },
  { name: "Explorer", value: 1 },
  { name: "Communities", value: 2 },
];

function ExploreView() {
  const { isSidebarRightVisible, setIsSidebarRightVisible } = useSidebarRight();
  const { setSectionOptions } = useSectionOptions();
  const { setHasScroll } = useLayoutScroll();
  const { setShowPostButton } = usePostButton();
  const { activeSection } = useActiveSection();

  useEffect(() => {
    setHasScroll(true);
    setShowPostButton(true);
    if (isSidebarRightVisible) {
      setIsSidebarRightVisible(false);
    }
  }, []);

  useEffect(() => {
    setSectionOptions(options);
  }, [setSectionOptions]);

  return (
    <div className="w-full">
      {activeSection === 0 && <TradingTopics />}{" "}
      {/* Renderiza solo si activeSection es 0 */}
    </div>
  );
}

export default ExploreView;
