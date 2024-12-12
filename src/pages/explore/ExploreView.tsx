// ExploreView.tsx
import { useEffect } from "react";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useSidebarRight } from "@/context/SidebarRightContext";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";
import { usePostButton } from "@/context/CreatePostActive";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { ExplorerSection } from "./components/ExplorerSection";

const options = [
  { name: "Explorer", value: 0 },
  { name: "Communities", value: 1 },
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
    <div className="w-full mt-4 px-4">
      {activeSection === 0 && <ExplorerSection />}{" "}
      {/* Renderiza solo si activeSection es 0 */}
    </div>
  );
}

export default ExploreView;
