// PostPreview.tsx
import React from "react";
import { Icon } from "@mdi/react";
import {
  mdiAccount,
  mdiMapMarker,
  mdiDotsHorizontal,
  mdiThumbUp,
  mdiPoll,
  mdiShareVariant,
} from "@mdi/js";

interface UploadedFile {
  base64: string;
}

interface PostDetails {
  condition: string;
  description: {
    title: string;
    description: string;
    usageTime: string;
    brand: string;
    size: string;
    color: string;
    materials: string[];
    location: {
      city: string;
      country: string;
    };
    tags: string[];
  };
  media: UploadedFile[];
}

interface PostPreviewProps {
  isNightMode: boolean;
  user: User;
  postDetails: PostDetails;
  truncateText: (text: string, maxLength: number) => string;
  t: (key: string) => string;
}

const conditions = [
  { id: 1, title: "New", description: "DescriptionNew", value: "new" },
  { id: 2, title: "As New", description: "DescriptionAsNew", value: "as_new" },
  { id: 3, title: "Used", description: "DescriptionUsed", value: "used" },
  {
    id: 4,
    title: "Bad Condition",
    description: "DescriptionBadCondition",
    value: "bad_condition",
  },
];

const colors = [
  { label: "Alice Blue", value: "aliceblue", hex: "#F0F8FF" },
  { label: "Antique White", value: "antiquewhite", hex: "#FAEBD7" },
];

const sizes = [
  { title: "S (Small)", value: "S" },
  { title: "M (Medium)", value: "M" },
  { title: "L (Large)", value: "L" },
  { title: "Xl (Extra-Large)", value: "Xl" },
];

const PostPreview: React.FC<PostPreviewProps> = ({
  isNightMode,
  user,
  postDetails,
  truncateText,
  t,
}) => {
  const condition = conditions.find(
    (condition) => condition.value === postDetails?.condition
  );

  const size = sizes.find(
    (size) => size.value === postDetails?.description?.size
  );

  const color = colors.find(
    (color) => color.value === postDetails?.description?.color
  );

  return (
    <>
      <div
        className={` ${
          isNightMode ? "bg-[#232323] text-white" : "bg-[#F1F1F1] text-black"
        } rounded-xl flex-col p-4 gap-4 flex w-full`}
        style={{ userSelect: "none" }}
      >
        {/* PREVIEW DESIGN */}
        <div
          className={`${
            isNightMode ? "bg-[#121212]" : "bg-[#F7F8FA]"
          } rounded-xl p-4 flex flex-col gap-2`}
        >
          {/* PREVIEW HEADER */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  isNightMode ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                {user?.profilePhoto ? (
                  <img
                    src={user?.profilePhoto}
                    alt="Profile Pic"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <Icon path={mdiAccount} size={0.7} />
                )}
              </div>
              <p className="text-[#1B6B44] font-bold">@{user?.userName}</p>
              <div className="flex items-center">
                <Icon
                  path={mdiMapMarker}
                  size={0.5}
                  className="text-[#DF1E32]"
                />
                <p className="font-bold">
                  {postDetails?.description?.location?.city
                    ? postDetails?.description?.location?.city
                    : t("Global.City")}
                  ,{" "}
                  {postDetails?.description?.location?.country
                    ? postDetails?.description?.location?.country
                    : t("Global.Country")}
                </p>
              </div>
            </div>
            <div>
              <Icon path={mdiDotsHorizontal} size={0.8} />
            </div>
          </div>
          {/* PREVIEW TAGS */}
          <div className="overflow-hidden max-w-[100%]">
            <p className="text-xs opacity-50 flex gap-1 truncate">
              {postDetails?.description?.tags.length > 0 ? (
                postDetails.description.tags.map(
                  (tag: string, index: number) => (
                    <span key={index}>#{truncateText(tag, 10)}</span>
                  )
                )
              ) : (
                <span>#tag1 #tag2 #tag3</span>
              )}
            </p>
          </div>

          {/* PREVIEW IMGS */}
          <div className="flex relative gap-4">
            <div className="py-1 px-2 rounded-full absolute top-2 left-2 bg-[#1C1C1C] text-white font-bold text-[0.8em]">
              {condition?.title}
            </div>
            {postDetails?.media.length ? (
              <div className="flex w-full gap-4">
                {postDetails.media
                  .slice(0, 2)
                  .map((img: UploadedFile, index: number) => (
                    <div
                      key={index}
                      className={`rounded-md bg-[#F1F1F1] h-[23em] ${
                        index === 0 ? "w-[60%]" : "w-[40%]"
                      }`}
                    >
                      <img
                        src={img.base64}
                        alt={`Image ${index}`}
                        className={`w-full h-full object-cover ${
                          index === 0 ? "rounded-md" : "rounded-l-md"
                        }`}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex w-full gap-4">
                <div className="w-[60%] h-[20em] bg-[#F1F1F1] rounded-md"></div>
                <div className="w-[40%] h-[20em] bg-[#F1F1F1] rounded-l-md"></div>
              </div>
            )}
          </div>

          {/* PREVIEW OPTIONS */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-[#1B6B44] rounded-full py-1 px-2 flex items-center gap-2 text-white">
                <Icon path={mdiThumbUp} size={0.5} />
                <p className="text-[0.8em]">0</p>
              </div>
              <div className="flex items-center text-[#3498DB]">
                <Icon path={mdiPoll} size={0.5} />
                <p className="font-bold text-[0.8em]">12 {t("Global.Views")}</p>
              </div>
            </div>
            <div
              className={`flex items-center rounded-full ${
                isNightMode
                  ? "bg-[#232323] border-[#232323]"
                  : "bg-[#F1F2F4] border-[#F1F2F4]"
              } px-[0.8em] w-fit py-[0.5em]`}
            >
              <p className="mr-2 text-[0.8em]">{t("Global.Share")}</p>
              <Icon path={mdiShareVariant} size={0.5} />
            </div>
          </div>
          {/* PREVIEW DESCRIPTIONS */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-[1.5em] titleStyles">
                {postDetails?.description?.title
                  ? postDetails?.description?.title
                  : t("CreatePost.YourPostTitle")}
              </p>
              <p className="opacity-50 text-xs description">
                {postDetails?.description?.description
                  ? postDetails?.description?.description
                  : t("CreatePost.ABriefDescription")}
              </p>
            </div>
            <div className="flex gap-2">
              <div
                className={`${
                  isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
                } rounded-full py-1 px-3 w-fit`}
              >
                <p className="text-[0.8em]">
                  {postDetails?.description?.size ? size?.title : "Size"}
                </p>
              </div>
              <div
                className={`${
                  isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
                } rounded-full py-1 px-3 w-fit`}
              >
                <p className="text-[0.8em]">
                  {" "}
                  {postDetails?.description?.brand
                    ? postDetails?.description?.brand
                    : "Brand"}
                </p>
              </div>
              <div
                className={`${
                  isNightMode ? "bg-[#232323]" : "bg-[#F1F1F1]"
                } rounded-full py-1 px-3 w-fit`}
              >
                <p className="text-[0.8em]">
                  {postDetails?.description?.color ? color?.label : "Color"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPreview;
