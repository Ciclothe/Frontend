import Masonry from "@mui/lab/Masonry";
import ProfileImage from "@/components/ui/ProfilePic";
import { useTheme } from "@/context/ThemeContext.js";
import { Icon } from "@mdi/react";
import { mdiCircleSmall } from "@mdi/js";
import PostImage from "@/pages/feed/components/cards/PostImage";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const postData = [
  {
    id: 1,
    type: "Swap",
    userData: {
      userId: 1,
      username: "johndoe",
      profilePicture:
        "https://i.pinimg.com/280x280_RS/49/17/b7/4917b743f77f549e0fa6a8dc98ff6716.jpg",
      location: {
        city: "Valencia",
        country: "Spain",
      },
    },
    garmentTitle: "Zapatillas Nike Air Max 97",
    garmentCondition: "used",
    garmentColor: "White",
    garmentSize: "US 45",
    garmentBrand: "Nike",
    garmentImgs: [
      {
        src: "https://images1.vinted.net/t/03_00cfa_z194XqSvMvsjneuZHyZpao7G/f800/1722968174.jpeg?s=d0c8e397855b4cd8d9a46268b260601c39fd135f",
        orientation: "square",
      },
      {
        src: "https://images1.vinted.net/t/03_00cfa_z194XqSvMvsjneuZHyZpao7G/f800/1722968174.jpeg?s=d0c8e397855b4cd8d9a46268b260601c39fd135f",
        orientation: "square",
      },
    ],
    postAnalitics: {
      likes: 100,
      shares: 20,
      saves: 10,
      postLiked: true,
      postShared: false,
      postSaved: false,
    },
    createdAt: "2024-11-23T09:00:00Z",
  },
  {
    id: 2,
    type: "Swap",
    userData: {
      userId: 2,
      username: "mahammad1901",
      profilePicture:
        "https://i.pinimg.com/280x280_RS/3f/82/b5/3f82b565f56bbd4993b3f435e53d7314.jpg",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    garmentTitle: "Puma feather light down jacket",
    garmentCondition: "as_new",
    garmentColor: "Purple",
    garmentSize: "S (Small)",
    garmentBrand: "Puma",
    garmentImgs: [
      {
        src: "https://images1.vinted.net/t/04_0018f_jRetdbtKoL8UUhGULEz4Dkik/f800/1734024216.jpeg?s=dded4d04b3f20055acbdaad32c09a40cd8cb9689",
        orientation: "portrait",
      },
      {
        src: "https://images1.vinted.net/t/04_0018f_jRetdbtKoL8UUhGULEz4Dkik/f800/1734024216.jpeg?s=dded4d04b3f20055acbdaad32c09a40cd8cb9689",
        orientation: "portrait",
      },
    ],
    postAnalitics: {
      likes: 5,
      shares: 0,
      saves: 0,
      postLiked: false,
      postShared: false,
      postSaved: false,
    },
    createdAt: "2024-12-13T20:00:00Z",
  },
  {
    id: 3,
    type: "Swap",
    userData: {
      userId: 3,
      username: "morrgannnnn",
      profilePicture:
        "https://i.pinimg.com/280x280_RS/1d/68/43/1d68434265b15fb69fd86cfbba8468d6.jpg",
      location: {
        city: "Valencia",
        country: "Spain",
      },
    },
    garmentTitle: "Bonnets Arcteryx Gris",
    garmentCondition: "as_new",
    garmentColor: "Gray",
    garmentSize: "Unique",
    garmentBrand: "Arcteryx",
    garmentImgs: [
      {
        src: "https://images1.vinted.net/t/01_00f83_os4fnjTfmyd4rVogaqCNS5Hn/f800/1733181847.jpeg?s=bd64615bcc20ca69bacad3d9a358a02e008e3fef",
        orientation: "square",
      },
      {
        src: "https://images1.vinted.net/t/01_00f83_os4fnjTfmyd4rVogaqCNS5Hn/f800/1733181847.jpeg?s=bd64615bcc20ca69bacad3d9a358a02e008e3fef",
        orientation: "square",
      },
    ],
    postAnalitics: {
      likes: 25,
      shares: 5,
      saves: 1,
      postLiked: false,
      postShared: false,
      postSaved: true,
    },
    createdAt: "2024-12-10T09:00:00Z",
  },
];

export const ExplorePosts = () => {
  const navigate = useNavigate();

  const { themeMode } = useTheme();
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>(
    Object.fromEntries(
      postData.map((post) => [post.id, post.postAnalitics.postLiked])
    )
  );

  const { t } = useTranslation();

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // segundos

    const timeFormats = [
      { unit: "year", value: Math.floor(diff / (60 * 60 * 24 * 365)) },
      { unit: "month", value: Math.floor(diff / (60 * 60 * 24 * 30)) },
      { unit: "week", value: Math.floor(diff / (60 * 60 * 24 * 7)) },
      { unit: "day", value: Math.floor(diff / (60 * 60 * 24)) },
      { unit: "hour", value: Math.floor(diff / (60 * 60)) },
      { unit: "minute", value: Math.floor(diff / 60) },
      { unit: "second", value: diff },
    ];

    const result = timeFormats.find(({ value }) => value > 0);
    return result
      ? `${result.value} ${result.unit}${result.value > 1 ? "s" : ""}`
      : "just now";
  };

  const redirectToPost = (post: any) => {
    const updatedPost = {
      ...post,
      type: "Swap",
    };

    const postData = encodeURIComponent(JSON.stringify(updatedPost));
    navigate(`/post/${post?.userData?.username}`, { state: { postData } });
  };

  return (
    <div>
      <p className="font-bold text-[1.3em]">{t("ExplorerView.YourStyle")}</p>
      <div className="mt-4">
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, xl: 4 }}
          spacing={{ xs: 1, lg: 2 }}
        >
          {postData.map((post) => (
            <div key={post.id} onClick={() => redirectToPost(post)}>
              <div
                className={`${
                  themeMode === "dark" ? "text-white" : "text-black"
                } grid grid-cols-12 rounded-xl gap-2 cursor-pointer mb-2`}
              >
                <div className="col-span-12 grid grid-cols-12 gap-2">
                  {/* <PostHeader data={post} /> */}
                  <div className="relative col-span-12">
                    <PostImage data={post} />
                  </div>
                  <div className="col-span-12 flex gap-4 justify-between items-center">
                    <div className="flex gap-2">
                      <ProfileImage
                        profilePic={post?.userData?.profilePicture}
                        height={"1.5rem"}
                      />
                      <div className="flex items-center">
                        <div className="hidden md:flex items-center opacity-50 capitalize">
                          <p className="flex items-center titleStyles">
                            {post?.userData?.location?.city},{" "}
                            {post?.userData?.location?.country}
                          </p>
                          <Icon path={mdiCircleSmall} size={0.8} />
                          <p className="titleStyles">
                            {formatDate(post?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Like Button */}
                    <div
                      className={`${
                        likedPosts[post.id] ? "opacity-100" : "opacity-50"
                      } hidden md:flex items-center justify-center cursor-pointer rounded-lg gap-1`}
                      onClick={(e) => {
                        e.stopPropagation(), toggleLike(post.id);
                      }}
                    >
                      <HeartIcon
                        size={"1.3em"}
                        colorFill={`#0DBC73`}
                        colorStroke={`${
                          themeMode === "dark" ? "#F1F1F1" : "#232323"
                        }`}
                        isSelected={likedPosts[post.id]}
                      />
                      <p
                        className={`${
                          likedPosts[post.id]
                            ? "text-[#0DBC73]"
                            : themeMode === "dark"
                            ? "text-[#F1F1F1]"
                            : "text-[#3A3A3A]"
                        } font-bold`}
                      >
                        {post.postAnalitics.likes +
                          (likedPosts[post.id] ? 1 : 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};
