/**
 * SwapModal component allows users to swap garments with each other.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.selectedPost - The selected post data
 * @returns {JSX.Element} The rendered SwapModal component
 *
 * @example
 * <SwapModal selectedPost={selectedPost} />
 *
 * @remarks
 * This component uses various contexts such as ThemeContext, UserContext, and SwapContext.
 * It also uses the `useTranslation` hook for internationalization.
 *
 * @todo
 * Replace the static data with real data fetched from an API (#57).
 *
 * @function
 * @name SwapModal
 *
 * @description
 * The SwapModal component displays a modal that allows users to select garments to swap.
 * It shows the selected post's user data and allows the current user to select their garments for swapping.
 * The component handles the modal state, selected items, and updates the total garments selected.
 *
 * @hook
 * @name useEffect
 * @description
 * - Disables body scroll when the modal is open.
 * - Updates the total garments selected when selected items change.
 *
 * @hook
 * @name useState
 * @description
 * - Manages the state of showing posts, selected items, and total garments selected.
 *
 * @hook
 * @name useTranslation
 * @description
 * - Provides translation functionality for the component.
 *
 * @hook
 * @name useTheme
 * @description
 * - Provides theme-related data such as night mode.
 *
 * @hook
 * @name useUser
 * @description
 * - Provides user-related data such as profile photo and username.
 *
 * @hook
 * @name useSwap
 * @description
 * - Provides swap-related data such as modal state.
 *
 * @param {number} index - The index of the selected item.
 * @returns {void}
 * @function
 * @name handleCheckboxChange
 * @description
 * Toggles the selection of an item based on its index.
 *
 * @param {Object} obj - The object to count properties of.
 * @returns {number} The count of object properties.
 * @function
 * @name countObjects
 * @description
 * Counts the number of object properties in a given object.
 */
import React, { useEffect, useState } from "react";
import Swapicon from "@/assets/icons/Swapicon";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiMenuDown, mdiCheckBold } from "@mdi/js";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import HangerDayMode from "@/assets/imgs/HangerDayMode.png";
import HangerNightMode from "@/assets/imgs/HangerNightMode.png";
import { useTranslation } from "react-i18next";
import { useUser } from "@/context/UserContext.js";
import { useSwap } from "@/context/SwapContext";
import Alert from "@/components/common/Alert";
import ProfileImage from "@/components/ui/ProfilePic";

interface SwapModalProps {
  selectedPost: any;
}

const SwapModal: React.FC<SwapModalProps> = ({ selectedPost }) => {
  // TODO: #57 Replace the static data with real data fetched from an API
  const testPosts = [
    {
      img: "https://cdn.wallapop.com/images/10420/h0/f8/__/c10420p1028635413/i5017113198.jpg?pictureSize=W640",
      title: "Fear of God Essentials Arch Logo Hoodie",
    },
    {
      img: "https://cdn.wallapop.com/images/10420/gz/62/__/c10420p1026528402/i5006163997.jpg?pictureSize=W640",
      title: "Fear of god california slip on",
    },
    {
      img: "https://cdn.wallapop.com/images/10420/h0/gh/__/c10420p1028694278/i5017350014.jpg?pictureSize=W640",
      title: "Abrigo Nike chica",
    },
    {
      img: "https://cdn.wallapop.com/images/10420/gu/mc/__/c10420p1018889909/i4966955866.jpg?pictureSize=W640",
      title: "PUFFER - Chaqueta térmica Timberland",
    },
  ];
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const { user } = useUser();
  const [showPosts, setShowPosts] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [totalGarmentsSelected, setTotalGarmentsSelected] = useState<any[]>([]);
  const { setModalState } = useSwap();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const countObjects = (obj: any) => {
    let count = 0;
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        count++;
      }
    }
    return count;
  };

  const handleCheckboxChange = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  useEffect(() => {
    const selectedItemsData = testPosts.filter((_, index) =>
      selectedItems.includes(index)
    );
    setTotalGarmentsSelected(selectedItemsData);
  }, [selectedItems]);

  return (
    <div
      className={`${
        themeMode === "dark" ? "bg-[#ffffff]" : "bg-[#171717]"
      } backdrop-effect bg-opacity-20 flex items-center justify-center`}
      onClick={(e) => {
        e.stopPropagation();
        setModalState(false);
      }}
    >
      <div
        className={`${
          themeMode === "dark" ? "bg-[#171717]" : "bg-[#FFFFFF]"
        } rounded-xl p-6 w-fit max-w-[90vw] lg:max-w-[70vw] xl:max-w-[50vw] flex flex-col gap-4 items-center justify-center`}
        onClick={(e) => e.stopPropagation()}
      >
        {Object.keys(testPosts).length > 0 ? (
          <div>
            <div className="flex justify-center">
              <p className="font-bold">{t(`Swipe.SwapTitle`)}</p>
            </div>
            <div>
              <div
                className={`rounded-xl ${
                  themeMode === "dark" ? "bg-[#171717]" : "bg-[#FFFFFF]"
                }`}
              >
                <div className="px-5 py-4 grid grid-cols-12">
                  <div className="flex items-center col-span-5 sm:col-span-4">
                    <div className="hidden md:block">
                      <ProfileImage
                        profilePic={selectedPost?.userData.profilePicture}
                      />
                    </div>
                    <p className="font-bold text-[#0DBC73] sm:ml-3">
                      @{selectedPost?.userData?.username}
                    </p>
                  </div>
                  <div className="items-center flex justify-center col-span-2 sm:col-span-4">
                    <Swapicon size={"1.2em"} color={"#0DBC73"} />
                  </div>
                  <div className="relative col-span-5 sm:col-span-4">
                    <div
                      className="flex items-center justify-between col-span-4 hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPosts(!showPosts);
                      }}
                    >
                      <div className="flex items-center">
                        <div className="hidden md:block">
                          <ProfileImage profilePic={user?.profilePhoto} />
                        </div>
                        <p className="font-bold text-[#0DBC73] sm:ml-3">
                          @{user?.userName}
                        </p>
                      </div>
                      <div>
                        <Icon path={mdiMenuDown} className="icon" />
                      </div>
                    </div>
                    {showPosts && (
                      <ClickAwayListener
                        onClickAway={(e) => {
                          e.stopPropagation();
                          setShowPosts(false);
                        }}
                      >
                        <div
                          className={`dropdown  ${
                            themeMode === "dark" ? "night-mode" : "day-mode"
                          }`}
                        >
                          <div
                            className={`dropdown-menu absolute right-0 rounded-md z-50 min-w-[220px] max-w-[65px]`}
                          >
                            {testPosts.map((post, index) => (
                              <div
                                key={index}
                                className={`dropdown-item flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                                  index === 0
                                    ? "rounded-tl-xl rounded-tr-xl"
                                    : ""
                                } ${
                                  index === testPosts.length - 1
                                    ? "rounded-bl-xl rounded-br-xl"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCheckboxChange(index);
                                }}
                              >
                                <div className="flex items-center max-w-[85%]">
                                  <div className="w-8 aspect-square flex items-center justify-center rounded-md overflow-hidden">
                                    <img
                                      src={post.img}
                                      className="object-cover w-full h-full"
                                      alt="Garment"
                                    />
                                  </div>
                                  <p
                                    className="mx-2 font-bold truncate max-w-[70%]"
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {post.title}
                                  </p>
                                </div>

                                <div
                                  className={`${
                                    selectedItems.includes(index)
                                      ? "bg-[#0DBC73]"
                                      : themeMode === "dark"
                                      ? "bg-[#0E0E0E]"
                                      : "bg-[#F1F2F4]"
                                  } h-4 w-4 rounded flex justify-center items-center`}
                                >
                                  <Icon
                                    path={mdiCheckBold}
                                    className="icon text-white"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </ClickAwayListener>
                    )}
                  </div>
                </div>
                <hr />
                <div className="px-5 py-4 grid grid-cols-12 gap-5">
                  <div className="col-span-6 sm:col-span-4">
                    {selectedPost?.garmentImgs[0] && (
                      <img
                        src={selectedPost.garmentImgs[0]?.src}
                        className="rounded-xl aspect-square w-full object-cover"
                        alt="post"
                      />
                    )}
                  </div>
                  <div className="hidden sm:flex col-span-4 flex relative items-center justify-center">
                    <div className="h-[0.15em] w-2 bg-[#0DBC73] opacity-20 relative">
                      <div className="absolute bg-[#0DBC73] h-[0.2em] w-3 transform origin-bottom-left rotate-45 left-0"></div>
                    </div>
                    {[...Array(7)].map((_, index) => (
                      <div
                        key={index}
                        className="h-[0.15em] bg-[#0DBC73] opacity-20 w-2 mx-1"
                      ></div>
                    ))}
                    <div className="h-[0.15em] bg-[#0DBC73] opacity-20 w-2 relative">
                      <div className="absolute h-[0.2em] w-3 bg-[#0DBC73] transform origin-bottom-right rotate-45 right-0"></div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    {totalGarmentsSelected.length > 0 ? (
                      <img
                        src={totalGarmentsSelected[0].img}
                        className="rounded-xl aspect-square w-full object-cover"
                        alt="post"
                      />
                    ) : (
                      <div
                        className={`flex flex-col items-center justify-center h-full rounded-xl aspect-square ${
                          themeMode === "dark" ? "bg-[#0E0E0E]" : "bg-[#F3F3F3]"
                        }`}
                      >
                        <img
                          src={
                            themeMode === "dark"
                              ? HangerNightMode
                              : HangerDayMode
                          }
                          className="w-[60%]"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`rounded-b-xl px-5 py-3 grid grid-cols-12 ${
                    themeMode === "dark" ? "bg-[#0E0E0E]" : "bg-[#F3F3F3]"
                  }`}
                >
                  <div className="col-span-4 flex justify-center items-center">
                    {Array.from({ length: 1 }, (_, index) => (
                      <div
                        key={index}
                        className="rounded-full w-2 h-2 bg-[#0DBC73] mr-2"
                      ></div>
                    ))}
                  </div>
                  <div className="col-span-4 flex justify-center font-bold">
                    <p className="hidden sm:block text-center opacity-50">
                      {`1 ${t("Global.Garment")}`}
                    </p>

                    <div className="mx-2 flex items-center">
                      <Swapicon size={"1.2em"} color={"#0DBC73"} />
                    </div>
                    <p className="hidden sm:block text-center">
                      {countObjects(totalGarmentsSelected)}{" "}
                      {countObjects(totalGarmentsSelected) !== 1
                        ? t("Global.Garments")
                        : t("Global.Garment")}
                    </p>
                  </div>
                  <div className="col-span-4 flex justify-center items-center">
                    {Array.from(
                      { length: countObjects(totalGarmentsSelected) },
                      (_, index) => (
                        <div
                          key={index}
                          className="rounded-full w-2 h-2 bg-[#0DBC73] mr-2"
                        ></div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs mt-4">
                <span className="opacity-70">
                  {t(`Swipe.SwapParagraphOne`)}
                </span>
                <span className="font-bold opacity-100">
                  {t(`Swipe.SwapParagraphTwo`)}
                </span>
                <span className="opacity-70">
                  {t(`Swipe.SwapParagraphThree`)}
                </span>
              </p>
              <div className="pt-3 flex items-center justify-center">
                <button type="button" className="btn-grn-fill">
                  <p>{t(`Swipe.SendOffer`)}</p>
                </button>
              </div>
              <div className="pt-3 flex items-center justify-center">
                <button
                  type="button"
                  className={`font-bold w-full ${
                    themeMode === "dark"
                      ? "hover:bg-[#232323]"
                      : "hover:bg-[#F1F2F4]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalState(false);
                  }}
                >
                  <p>{t(`Global.Cancel`)}</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Alert
            type="info"
            title={t(`Swipe.EmptyCloset`)}
            description={t(`Swipe.EmptyClosetAlert`)}
            buttonText={t(`Global.CreatePost`)}
            // TODO: #60 Implement the onButtonClick function to redirect to the create post page
            onButtonClick={() => console.log("Great!")}
          />
        )}
      </div>
    </div>
  );
};

export default SwapModal;
