import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { mdiAlertBox, mdiCloseBox, mdiAccountOff } from "@mdi/js";

interface PostOptionsProps {
  postId: number;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const PostOptions: React.FC<PostOptionsProps> = ({ setOpened, opened }) => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    setShowPostOptions(opened);
  }, [opened]);

  const [showPostOptions, setShowPostOptions] = useState(opened);

  const postOptions = [
    { icon: mdiAlertBox, label: "ReportPost" },
    { icon: mdiCloseBox, label: "HidePost" },
    { icon: mdiAccountOff, label: "UnfollowAccount" },
  ];

  return (
    <div className="w-full flex items-center justify-center absolute mt-6">
      {showPostOptions && (
        <ClickAwayListener onClickAway={() => setOpened(false)}>
          <div
            className={`dropdown ${isNightMode ? "night-mode" : "day-mode"}`}
          >
            <div className="dropdown-menu absolute right-0 mt-2 min-w-48 rounded-md z-50">
              {postOptions.map((option, index) => (
                <div
                  key={index}
                  className={`dropdown-item flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                    index === 0 ? "rounded-tl-xl rounded-tr-xl" : ""
                  } ${
                    index === postOptions.length - 1
                      ? "rounded-bl-xl rounded-br-xl"
                      : ""
                  }`}
                >
                  <Icon path={option.icon} className="w-[1.5em] h-[1.5em]" />
                  <p className="ml-2 font-bold whitespace-nowrap">
                    {t(`PostOptions.${option.label}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default PostOptions;
