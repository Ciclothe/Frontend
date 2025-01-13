/**
 * Component that displays a tutorial overlay with swipe gestures.
 *
 * @component
 * @param {TutorialViewProps} props - The props for the component.
 * @param {function} props.onTutorialChange - Callback function to notify when the tutorial visibility changes.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <TutorialView onTutorialChange={(isVisible) => console.log(isVisible)} />
 *
 * @remarks
 * The tutorial overlay can be dismissed by dragging it in any direction. The state of the tutorial visibility is saved in localStorage.
 *
 * @typedef {Object} TutorialViewProps
 * @property {function} onTutorialChange - Callback function to notify when the tutorial visibility changes.
 */
import { motion, useMotionValue, useTransform } from "framer-motion";
import Icon from "@mdi/react";
import { mdiGestureSwipeLeft } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

type TutorialViewProps = {
  onTutorialChange: (isVisible: boolean) => void;
};

function TutorialView({ onTutorialChange }: TutorialViewProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const rotate = useTransform(() => rotateRaw.get());
  const [showTutorial, setShowTutorial] = useState<boolean>(true);

  const { t } = useTranslation();

  // TODO: #69 Create a get function for knowing if the tutorial has been shown before
  useEffect(() => {
    const savedState = localStorage.getItem("showTutorial");

    if (savedState === "false") {
      setShowTutorial(false);
      onTutorialChange(false);
    }
  }, []);

  // TODO: #69 Create a set function for setting the tutorial state
  const handleDragEndTutorial = () => {
    const directionX = x.get();
    const directionY = y.get();

    if (Math.abs(directionX) > 50 || Math.abs(directionY) > 50) {
      localStorage.setItem("showTutorial", "false");
      setShowTutorial(false);
      onTutorialChange(false);
    }
  };

  return (
    <>
      {showTutorial && (
        <motion.div
          drag
          style={{ opacity, rotate, x, y }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="absolute w-auto aspect-[4/5] rounded-xl flex flex-col top-0 h-full max-w-full z-[1000] bg-black bg-opacity-50"
          onDragEnd={handleDragEndTutorial}
        >
          <div className="flex h-full text-white">
            <div className="w-[50%] flex flex-col justify-center items-center">
              <Icon path={mdiGestureSwipeLeft} size={4} />
              <p className="text-center font-bold">
                {t("Global.Discard")} <br /> {t("Global.Garment")}
              </p>
            </div>
            <div className="w-[50%] transform scale-x-[-1] border-r-2 border-dashed border-white flex flex-col justify-center items-center">
              <Icon path={mdiGestureSwipeLeft} size={4} />
              <p className="text-center font-bold transform scale-x-[-1]">
                {t("Global.Send")} <br /> {t("Global.Swap")}
              </p>
            </div>
          </div>

          {/* <div className="flex text-white flex-col justify-center items-center py-6 border-t-2 border-dashed border-white">
            <Icon path={mdiGestureSwipeDown} size={4} />
            <p className="text-center font-bold">
              {t("Global.Send")} <br /> {t("Global.Message")}
            </p>
          </div> */}
        </motion.div>
      )}
    </>
  );
}

export default TutorialView;
