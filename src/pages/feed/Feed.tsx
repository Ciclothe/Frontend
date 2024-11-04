import { useTheme } from "../../context/ThemeContext.tsx";
import Icon from "@mdi/react";
import Swapicon from "../../assets/icons/Swapicon.tsx";
import { useTranslation } from "react-i18next";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState, useEffect } from "react";
import Carousel from "../../components/common/Carousel.tsx";
import API_CONSTANTS from "@/services/config.ts";
import Modal from "@mui/material/Modal";
import SwapModal from "../../components/common/SwapModal.tsx";
import { useUser } from "../../context/UserContext.js";

import {
  mdiMapMarker,
  mdiPoll,
  mdiDotsHorizontal,
  mdiThumbUp,
  mdiShareVariant,
  mdiAccount,
  mdiAlertBox,
  mdiCloseBox,
  mdiAccountOff,
} from "@mdi/js";

interface PostData {
  brand: string;
  categories: Record<string, unknown>;
  city: string;
  country: string;
  createdBy: Record<string, unknown>;
  createdById: number;
  current_condition: string;
  description: string;
  id: number;
  image: Record<string, unknown>[];
  primary_color: string;
  publicatedAt: string;
  reactions: Array<{
    id: number;
    userId: number;
    publicationId: number;
    reactionTome: string;
  }>;
  reserved: string;
  size: string;
  tags: Array<{ id: number; name: string }>;
  title: string;
  usage_time: string;
}

// ! TEST DATA

const sizes = [
  { title: "S (Small)", value: "S" },
  { title: "M (Medium)", value: "M" },
  { title: "L (Large)", value: "L" },
  { title: "Xl (Extra-Large)", value: "Xl" },
  { title: "US 3.5", value: "us3.5" },
];

const colors = [
  { label: "Alice Blue", value: "aliceblue", hex: "#F0F8FF" },
  { label: "Antique White", value: "antiquewhite", hex: "#FAEBD7" },
  { label: "Green", value: "green", hex: "#2A5B32" },
];

const conditions = [
  {
    title: "New",
    value: "new",
  },
  {
    title: "As New",
    value: "as_new",
  },
  {
    title: "Used",
    value: "used",
  },
  {
    title: "Bad Condition",
    value: "bad_condition",
  },
];

// !------------------------------------------------------------------
const FeedView = () => {
  const { isNightMode } = useTheme();
  const { t } = useTranslation();
  const [showPostOptions, setShowPostOptions] = useState<number | null>(null);
  const [postsFeed, setPostsFeed] = useState<PostData[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const { user } = useUser();

  const handleOpen = (post: PostData) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPost(null);
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_CONSTANTS.API_HOME}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPostsFeed(data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  const postOptions = [
    { icon: mdiAlertBox, label: "ReportPost" },
    { icon: mdiCloseBox, label: "HidePost" },
    { icon: mdiAccountOff, label: "UnfollowAccount" },
  ];

  const getViewColor = (views: any) => {
    if (views < 20) return "#3498DB";
    if (views < 100) return "#F1C40F";
    return "#E74C3C";
  };

  // ! TODO: VALIDAR ESTA FUNCIONALIDAD
  const handleLike = (postId: any) => {
    setPostsFeed(postId);
  };

  const titleOfMatchingSize = (size: any) =>
    sizes.find((sizeValue) => sizeValue.value === size)?.title;

  const titleOfMatchingColor = (colorSelected: any) =>
    colors.find((color) => color.value === colorSelected)?.label;

  const titleOfMatchingCondition = (conditionSelected: any) =>
    conditions.find((condition) => condition.value === conditionSelected)
      ?.title;

  return (
    <div className="lg:mx-[2vw] xl:mx-[10vw]">
      {postsFeed.map((post: any) => (
        <div
          key={post?.id}
          className={`${
            isNightMode ? "bg-[#141414] text-white" : "bg-[#FFFFFF] text-black"
          } p-5 rounded-xl mb-5`}
        >
          <div className="items-center flex justify-between">
            <div className="flex items-center">
              {post?.createdBy?.profilePhoto ? (
                <img
                  src={post?.createdBy?.profilePhoto}
                  alt="Profile"
                  className="h-[2.3em] w-[2.3em] rounded-full object-cover"
                />
              ) : (
                <div
                  className={`h-[2.3em] w-[2.3em] flex items-center justify-center ${
                    isNightMode ? "bg-white text-black" : "bg-black text-white"
                  } rounded-full`}
                >
                  <Icon path={mdiAccount} size={0.7} />
                </div>
              )}
              <p className="font-bold text-[#1B6B44] ml-2">
                @{post?.createdBy?.userName}
              </p>
              <div className="flex items-center ml-1">
                <Icon path={mdiMapMarker} className="icon text-[#DF1E32]" />
                <p className={`font-bold ml-[0.1em]`}>
                  {post.city.charAt(0).toUpperCase() +
                    post.city.slice(1).toLowerCase()}
                  , {post.country.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                onClick={() => setShowPostOptions(post?.id)}
                className="cursor-pointer"
              >
                <Icon path={mdiDotsHorizontal} className="w-[2em]" />
              </div>
              {showPostOptions === post?.id && (
                <ClickAwayListener onClickAway={() => setShowPostOptions(null)}>
                  <div
                    className={`dropdown ${
                      isNightMode ? "night-mode" : "day-mode"
                    }`}
                  >
                    <div
                      className={`dropdown-menu absolute right-0 mt-2 min-w-48 rounded-md z-50`}
                    >
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
                          <Icon
                            path={option.icon}
                            className="w-[1.5em] h-[1.5em]"
                          />
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
          </div>

          <div className="my-3 opacity-70">
            {post?.tags.map((tag: any) => (
              <span className="text-xs mr-1" key={tag?.id}>
                #{tag?.name}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 block gap-4">
              <div className="relative">
                <div>
                  <Carousel
                    garmentCondition={
                      titleOfMatchingCondition(post?.current_condition) ||
                      "Condition not founded"
                    }
                  >
                    {post?.image.map((image: any, index: any) => (
                      <img src={image?.base64} key={index} />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="col-span-12 rounded-md">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    onClick={() => handleLike(post)}
                    className={`flex items-center rounded-full ${
                      post?.reactions?.some(
                        (reaction: any) => reaction.userId === user?.id
                      )
                        ? "bg-[#1B6B44] text-[#1B6B44] border-[#1B6B44] bg-opacity-10"
                        : isNightMode
                        ? "bg-[#232323] text-[#878787] border-[#232323]"
                        : "bg-[#F1F2F4] text-[#878787] border-[#F1F2F4]"
                    }  border-[2px] cursor-pointer px-[0.6em] w-fit py-[0.3em] hover:bg-[#1B6B44] hover:bg-opacity-10 hover:text-[#1B6B44] hover:border-[#1B6B44]`}
                  >
                    <Icon path={mdiThumbUp} className="h-[1em]" />
                    <p className="ml-2 font-bold text-xs">
                      {post?.likes?.length || 0}
                    </p>
                  </div>
                  <div
                    className="flex items-center ml-2 cursor-pointer"
                    style={{ color: getViewColor(post?.views) }}
                  >
                    <Icon path={mdiPoll} className="h-[1em]" />
                    <span className="font-bold">
                      {post?._count?.views} {t("Global.Views")}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center rounded-full ${
                    isNightMode
                      ? "bg-[#232323] border-[#232323] hover:bg-[#F1F2F4] hover:border-[#F1F2F4] hover:border-[#000000] hover:text-[#141414]"
                      : "bg-[#F1F2F4] border-[#F1F2F4] hover:bg-black hover:text-white"
                  } cursor-pointer px-[0.8em] w-fit py-[0.5em]`}
                >
                  <p className="mr-2 text-xs">{t("Global.Share")}</p>
                  <Icon path={mdiShareVariant} className="icon" />
                </div>
              </div>
              <h1 className="font-bold text-[1.5em] sm:text-[2em] lg:text-[2.2em] xl:text-[2.2em] titleStyles">
                {post?.title}
              </h1>
              <p className="my-3 opacity-70 description">{post?.description}</p>
              <div className="flex">
                <div
                  className={`flex justify-between ${
                    isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
                  } rounded-full px-[1.5em] py-[0.5em]`}
                >
                  <p>{titleOfMatchingSize(post?.size)}</p>
                </div>
                <div
                  className={`flex justify-between mx-3 ${
                    isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
                  } rounded-full px-[1.5em] py-[0.5em]`}
                >
                  <p>{post?.brand}</p>
                </div>
                <div
                  className={`flex justify-between ${
                    isNightMode ? "bg-[#232323]" : "bg-[#F1F2F4]"
                  } rounded-full px-[1.5em] py-[0.5em]`}
                >
                  <p>{titleOfMatchingColor(post?.primary_color)}</p>
                </div>
              </div>
              <div className="flex mt-5 items-center">
                <button
                  onClick={() => handleOpen(post)}
                  type="button"
                  className={`${
                    isNightMode
                      ? "bg-[#F1F2F4] text-black"
                      : "bg-[#232323] text-white"
                  } w-full flex items-center justify-center mr-2`}
                >
                  <Swapicon
                    size={"1em"}
                    color={isNightMode ? "black" : "white"}
                  />
                  <p className="ml-2 font-bold">{t("Global.Swap")}</p>
                </button>
                <button
                  type="button"
                  className={`bg-transparent ${
                    isNightMode ? "hover:bg-[#232323]" : "hover:bg-[#F1F2F4]"
                  } w-full flex items-center justify-center ml-2`}
                >
                  <p className="font-bold">{t("Global.Ask")}</p>
                </button>
              </div>
            </div>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            className="min-w-[95%]"
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <SwapModal selectedPost={selectedPost} onClose={handleCloseModal} />
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default FeedView;
