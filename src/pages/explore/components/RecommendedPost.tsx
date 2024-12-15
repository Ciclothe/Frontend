import Masonry from "@mui/lab/Masonry";
import ProfileImage from "@/components/ui/ProfilePic";
import { useTheme } from "@/context/ThemeContext.js";
import { Icon } from "@mdi/react";
import { mdiCircleSmall } from "@mdi/js";
import PostImage from "@/pages/feed/components/cards/PostImage";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const postData = [
  {
    id: 1,
    userData: {
      userId: 1,
      username: "johndoe",
      profilePic:
        "https://i.pinimg.com/280x280_RS/49/17/b7/4917b743f77f549e0fa6a8dc98ff6716.jpg",
      location: {
        city: "Valencia",
        country: "Spain",
      },
    },
    title: "Zapatillas Nike Air Max 97",
    condition: "used",
    color: "White",
    size: "US 45",
    brand: "Nike",
    postImg:
      "https://images1.vinted.net/t/03_00cfa_z194XqSvMvsjneuZHyZpao7G/f800/1722968174.jpeg?s=d0c8e397855b4cd8d9a46268b260601c39fd135f",
    imageOrientation: "square",
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
    userData: {
      userId: 2,
      username: "mahammad1901",
      profilePic:
        "https://i.pinimg.com/280x280_RS/3f/82/b5/3f82b565f56bbd4993b3f435e53d7314.jpg",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    title: "Puma feather light down jacket",
    condition: "as_new",
    color: "Purple",
    size: "S (Small)",
    brand: "Puma",
    postImg:
      "https://images1.vinted.net/t/04_0018f_jRetdbtKoL8UUhGULEz4Dkik/f800/1734024216.jpeg?s=dded4d04b3f20055acbdaad32c09a40cd8cb9689",
    imageOrientation: "portrait",
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
    userData: {
      userId: 3,
      username: "morrgannnnn",
      profilePic:
        "https://i.pinimg.com/280x280_RS/1d/68/43/1d68434265b15fb69fd86cfbba8468d6.jpg",
      location: {
        city: "Valencia",
        country: "Spain",
      },
    },
    title: "Bonnets Arcteryx Gris",
    condition: "as_new",
    color: "Gray",
    size: "Unique",
    brand: "Arcteryx",
    postImg:
      "https://images1.vinted.net/t/01_00f83_os4fnjTfmyd4rVogaqCNS5Hn/f800/1733181847.jpeg?s=bd64615bcc20ca69bacad3d9a358a02e008e3fef",
    imageOrientation: "square",
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
  {
    id: 4,
    userData: {
      userId: 4,
      username: "justinemsi80000",
      profilePic:
        "https://images1.vinted.net/t/03_01d9a_vPWiS75VE21Yz47m5Mwar5Wj/f800/1726252702.jpeg?s=eceb37da7b17eafc5e0179bfc8bc8aa978a47e1f",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    title: "Chaussettes x 1 Ami Paris blanc",
    condition: "as_new",
    color: "Purple",
    size: "S (Small)",
    brand: "Puma",
    postImg:
      "https://images1.vinted.net/t/02_009c6_nC7Hv7PtqqZgw3R3dwsUHG8p/f800/1734206654.jpeg?s=2384b92a8fee9198f6279318e00f11372fc8e229",
    imageOrientation: "square",
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
    id: 5,
    userData: {
      userId: 5,
      username: "urivance21",
      profilePic:
        "https://images1.vinted.net/t/02_01b09_S5ZVftwXqadih8d9RwuHRctt/f800/1727210617.jpeg?s=a65f928a63a2e407f5f49a2fe80e60a8fb84b59f",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    title: "Sudadera Off-White",
    condition: "as_new",
    color: "Purple",
    size: "S (Small)",
    brand: "Puma",
    postImg:
      "https://images1.vinted.net/t/03_00bcd_1TiZejSefRTyV8t3btYQDxRR/f800/1734120681.jpeg?s=14bd8f4746b63bb8371f5f94cd5ba31aad034fc8",
    imageOrientation: "portrait",
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
    id: 6,
    userData: {
      userId: 6,
      username: "nachocj",
      profilePic:
        "https://images1.vinted.net/t/03_00c6c_HxmbtpKu7CDAN1SvfhrsT3BT/f800/1677970916.jpeg?s=f974d9bf5f99a33ddacd040c15aa07a6a9dbab5b",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    title: "Chaqueta de esquiar",
    condition: "as_new",
    color: "Purple",
    size: "S (Small)",
    brand: "Puma",
    postImg:
      "https://images1.vinted.net/t/04_00096_doHWfhsoDxpd2o28YE3iTDqD/f800/1733089185.jpeg?s=06384ce1e54726736244cc6ec7941aeb3bf12b84",
    imageOrientation: "portrait",
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
    id: 7,
    userData: {
      userId: 7,
      username: "galipetteetprixnet",
      profilePic:
        "https://images1.vinted.net/t/03_012e3_hpimSViTf3jQvmrmKxYHhwgD/f800/1715612060.jpeg?s=790ccb25adc58f5cb8b4e69d214cbaec67808e47",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    title: "Camiseta UFC",
    condition: "as_new",
    color: "Purple",
    size: "S (Small)",
    brand: "Puma",
    postImg:
      "https://images1.vinted.net/t/03_009a7_3VHw2xPjbx2D9McQi4s31hZb/f800/1732721681.jpeg?s=ef3d59df0aa4ce259c84ac39782ad03d62df67de",
    imageOrientation: "portrait",
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
    id: 8,
    userData: {
      userId: 8,
      username: "maratttt.10",
      profilePic:
        "https://images1.vinted.net/t/03_000fe_3u1s3tWrskBK7pyeoMrL8gsF/f800/1705347215.jpeg?s=30b2df19153f776b7ca298d874d1c59ad4eda7a6",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    title: "Guantes Supreme",
    condition: "as_new",
    color: "Purple",
    size: "S (Small)",
    brand: "Puma",
    postImg:
      "https://images1.vinted.net/t/02_02085_rJRnAUEgiN5hBnPkt9vteBdY/f800/1729887968.jpeg?s=1eec5a76d1125be4c1cb636fee8bd9882dbd10a4",
    imageOrientation: "square",
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
    id: 9,
    userData: {
      userId: 9,
      username: "sergigarciaa",
      profilePic:
        "https://images1.vinted.net/t/04_0004f_ghdaS7yDrgak9o4QrSbdhQLU/f800/1733487802.jpeg?s=16dc0e96f04f1d4f393ee4c1575e81aa7fe84cc1",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    title: "Guantes SupremeSudadera con cremallera Prada Paris",
    condition: "as_new",
    color: "Purple",
    size: "S (Small)",
    brand: "Puma",
    postImg:
      "https://images1.vinted.net/t/04_01eea_xWHiDkaLVbkKpdW379NEeRAq/f800/1734091388.jpeg?s=01c6d462a99e945398489f6b7474d53f2bf305f9",
    imageOrientation: "portrait",
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
    id: 10,
    userData: {
      userId: 10,
      username: "matteo7057",
      profilePic:
        "https://images1.vinted.net/t/02_01d5e_Pbn7R3oHaGMz3vyuAduRYPkV/f800/1725962637.jpeg?s=37f57746224443c1e81b785f83ce520aba6fc86a",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    title: "Pull Mohair Aion Era",
    condition: "as_new",
    color: "Purple",
    size: "S (Small)",
    brand: "Puma",
    postImg:
      "https://images1.vinted.net/t/03_01600_ZvSQ9aj386Lu3FJrNmZtgkq2/f800/1732654528.jpeg?s=ffb1e421226ea2f29ae88a974c985510e57740bb",
    imageOrientation: "portrait",
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
];

const POSTS_PER_PAGE = 5;

export const RecommendedPost = () => {
  const { themeMode } = useTheme();
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>(
    Object.fromEntries(
      postData.map((post) => [post.id, post.postAnalitics.postLiked])
    )
  );
  const [visiblePosts, setVisiblePosts] = useState(
    postData.slice(0, POSTS_PER_PAGE)
  );
  const [hasMore, setHasMore] = useState(postData.length > POSTS_PER_PAGE);
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

  const loadMorePosts = () => {
    const currentLength = visiblePosts.length;
    const isMore = currentLength < postData.length;
    const nextPosts = isMore
      ? postData.slice(currentLength, currentLength + POSTS_PER_PAGE)
      : [];
    setVisiblePosts((prevPosts) => [...prevPosts, ...nextPosts]);
    setHasMore(currentLength + POSTS_PER_PAGE < postData.length);
  };

  return (
    <div>
      <p className="font-bold text-[1.3em]">
        {t("ExplorerView.RecommendedForYou")}
      </p>
      <div className="mt-4">
        <Masonry columns={{ xs: 2, lg: 3 }} spacing={{ xs: 1, lg: 2 }}>
          {visiblePosts.map((post) => (
            <div key={post.id}>
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
                  <div className="col-span-12 flex gap-4 justify-between">
                    <div className="flex gap-2">
                      <ProfileImage
                        profilePic={post?.userData?.profilePic}
                        height={"1.5rem"}
                      />
                      <div>
                        <p className="md:font-bold text-start capitalize titleStyles">
                          {post?.title}
                        </p>
                        <div className="hidden md:flex items-center opacity-50 capitalize">
                          <p>
                            {post?.userData?.location?.city},{" "}
                            {post?.userData?.location?.country}
                          </p>
                          <Icon path={mdiCircleSmall} size={0.8} />
                          <p>{formatDate(post?.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    {/* Like Button */}
                    <div
                      className={`${
                        likedPosts[post.id] ? "opacity-100" : "opacity-50"
                      } hidden md:flex items-center justify-center cursor-pointer rounded-lg gap-1`}
                      onClick={() => toggleLike(post.id)}
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
        {hasMore && (
          <div className="w-full flex justify-center py-4">
            <button
              onClick={loadMorePosts}
              className={`border px-20 ${
                themeMode === "dark"
                  ? "border-white hover:bg-white hover:text-black"
                  : "border-black hover:bg-black hover:text-white"
              }`}
            >
              {t("ExplorerView.LoadMore")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
