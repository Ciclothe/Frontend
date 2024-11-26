import React, { useEffect, useState } from "react";
import Swapicon from "@/assets/icons/Swapicon";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiMenuDown, mdiCheckBold, mdiAccount } from "@mdi/js";
import InfoIcon from "@/assets/icons/InfoIcon";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import HangerDayMode from "@/assets/imgs/HangerDayMode.png";
import HangerNightMode from "@/assets/imgs/HangerNightMode.png";
import { useTranslation } from "react-i18next";
import { useUser } from "@/context/UserContext.js";
import { useSwap } from "@/context/SwapContext";

interface SwapModalProps {
  selectedPost: any;
}

const SwapModal: React.FC<SwapModalProps> = ({ selectedPost }) => {
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
  const { isNightMode } = useTheme();
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
    <div className="left-0 bg-black bg-opacity-50 fixed top-0 h-screen w-full z-[2000] flex items-center justify-center">
      <ClickAwayListener
        onClickAway={(e) => {
          e.stopPropagation();
          setModalState(false);
        }}
      >
        <Box
          className={`w-fit rounded-xl ${
            isNightMode ? "bg-[#0B0B0B] text-white" : "bg-white text-black"
          }`}
        >
          {Object.keys(testPosts).length > 0 ? (
            <div>
              <div className="px-[1em] md:px-[3em] py-4">
                <p className="font-bold">{t(`Swipe.SwapTitle`)}</p>
              </div>
              <hr />
              <div className="px-[1em] py-[1em] md:px-[3em] md:py-[3em] w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[40vw]">
                <div
                  className={`rounded-xl ${
                    isNightMode ? "bg-[#171717]" : "bg-[#F7F8FA]"
                  }`}
                >
                  <div className="px-5 py-4 grid grid-cols-12">
                    <div className="flex items-center col-span-5 sm:col-span-4">
                      {selectedPost?.userData.profilePicture ? (
                        <img
                          src={selectedPost?.userData.profilePicture}
                          className="hidden sm:block rounded-full h-[2.3em] w-[2.3em] object-cover"
                          alt="profile"
                        />
                      ) : (
                        <div
                          className={`h-[2.3em] w-[2.3em] flex items-center justify-center ${
                            isNightMode
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          } rounded-full`}
                        >
                          <Icon path={mdiAccount} size={0.7} />
                        </div>
                      )}
                      <p className="font-bold text-[#1B6B44] sm:ml-3">
                        @{selectedPost?.userData?.username}
                      </p>
                    </div>
                    <div className="items-center flex justify-center col-span-2 sm:col-span-4">
                      <Swapicon size={"1.2em"} color={"#1B6B44"} />
                    </div>
                    <div className="relative col-span-5 sm:col-span-4">
                      <div
                        className="flex items-center justify-between col-span-4  hover:cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPosts(!showPosts);
                        }}
                      >
                        <div className="flex items-center">
                          {user?.profilePhoto ? (
                            <img
                              src={user?.profilePhoto}
                              className="hidden sm:block rounded-full h-[2.3em] w-[2.3em] object-cover"
                              alt="user profile"
                            />
                          ) : (
                            <div
                              className={`h-[2.3em] w-[2.3em] flex items-center justify-center ${
                                isNightMode
                                  ? "bg-white text-black"
                                  : "bg-black text-white"
                              } rounded-full`}
                            >
                              <Icon path={mdiAccount} size={0.7} />
                            </div>
                          )}
                          <p className="font-bold text-[#1B6B44] sm:ml-3">
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
                              isNightMode ? "night-mode" : "day-mode"
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
                                    <div className="w-8 h-8 flex items-center justify-center rounded-md overflow-hidden">
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
                                        ? "bg-[#1B6B44]"
                                        : isNightMode
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
                          className="rounded-xl h-[17em] w-full object-cover"
                          alt="post"
                        />
                      )}
                    </div>
                    <div className="hidden sm:flex col-span-4 flex relative items-center justify-center">
                      <div className="h-[0.15em] w-2 bg-black opacity-10 relative">
                        <div className="absolute bg-black h-[0.2em] w-3 transform origin-bottom-left rotate-45 left-0"></div>
                      </div>
                      {[...Array(7)].map((_, index) => (
                        <div
                          key={index}
                          className="h-[0.15em] bg-black opacity-10 w-2 mx-1"
                        ></div>
                      ))}
                      <div className="h-[0.15em] bg-black opacity-10 w-2 relative">
                        <div className="absolute h-[0.2em] w-3 bg-black transform origin-bottom-right rotate-45 right-0"></div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      {totalGarmentsSelected.length > 0 ? (
                        <img
                          src={totalGarmentsSelected[0].img}
                          className="rounded-xl h-[17em] w-full object-cover"
                          alt="post"
                        />
                      ) : (
                        <div
                          className={`flex flex-col items-center justify-center h-full rounded-xl h-[17em] ${
                            isNightMode ? "bg-[#0E0E0E]" : "bg-[#F3F3F3]"
                          }`}
                        >
                          <img
                            src={isNightMode ? HangerNightMode : HangerDayMode}
                            className="w-[60%]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`rounded-b-xl px-5 py-3 grid grid-cols-12 ${
                      isNightMode ? "bg-[#0E0E0E]" : "bg-[#F3F3F3]"
                    }`}
                  >
                    <div className="col-span-4 flex justify-center items-center">
                      {Array.from({ length: 1 }, (_, index) => (
                        <div
                          key={index}
                          className="rounded-full w-2 h-2 bg-[#1B6B44] mr-2"
                        ></div>
                      ))}
                    </div>
                    <div className="col-span-4 flex justify-center font-bold">
                      <p className="hidden sm:block text-center opacity-50">
                        {`1 ${t("Global.Garment")}`}
                      </p>

                      <div className="mx-2 flex items-center">
                        <Swapicon size={"1.2em"} color={"#1B6B44"} />
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
                            className="rounded-full w-2 h-2 bg-[#1B6B44] mr-2"
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
                      isNightMode ? "hover:bg-[#232323]" : "hover:bg-[#F1F2F4]"
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
            <div className="p-8 items-center flex flex-col justify-center w-[95vw] sm:w-[70vw] md:w-[60vw] lg:w-[45vw] xl:w-[35vw]">
              <InfoIcon
                size={"6em"}
                primaryColor={"#F9E250"}
                secondaryOpacity={"10%"}
              />
              <p className="font-bold text-[1.5em] sm:text-[2em] lg:text-[2.2em] xl:text-[2.2em]">
                {t(`Swipe.EmptyCloset`)}
              </p>
              <p className="font-thin opacity-50 text-center">
                {t(`Swipe.EmptyClosetAlert`)}
              </p>
              <div className="mt-8 flex items-center justify-center w-full">
                <button type="button" className="btn-grn-fill ">
                  <p>{t(`Global.CreatePost`)}</p>
                </button>
              </div>
            </div>
          )}
        </Box>
      </ClickAwayListener>
    </div>
  );
};

export default SwapModal;
