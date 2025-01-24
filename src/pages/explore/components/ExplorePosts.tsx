import Masonry from "@mui/lab/Masonry";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PostCard from "@/pages/feed/components/PostCard";

const postData = [
  {
    id: 1,
    type: "Swap",
    createdAt: "2024-11-23T05:00:00Z",
    userData: {
      username: "MisterX",
      profilePicture:
        "https://i.pinimg.com/75x75_RS/63/58/42/635842ca8a6895adc59e30761996cc12.jpg",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    shippingPreference: "inPerson",
    garmentTitle: "Hooded Bomber Jacket",
    garmentCondition: "as_new",
    garmentSize: "M (Medium)",
    garmentBrand: "Trapstar",
    garmentColor: "Black",
    garmentDescription:
      "• Super puffer jacket, used for 6 months but no longer my size 👌\n" +
      "• Hood zipper needs repair (see last photo), that’s why it’s priced as it is\n" +
      "• Keeps you warm, perfect for winter ❄️",
    garmentImgs: [
      {
        src: "https://images1.vinted.net/t/04_017c8_X6wmW3YofxA7FWy3izc4D9Nx/f800/1730917127.jpeg?s=aee6af5c500867852c68986eac21ace376ae6b4d",
        orientation: "portrait",
      },
      {
        src: "https://images1.vinted.net/t/04_024a1_cDq4Nvs1NXkoN7Qt1wsqFMBy/f800/1730917127.jpeg?s=db323a4f7e497112ce295d9f3810d0368ba3b62d",
        orientation: "square",
      },
      {
        src: "https://images1.vinted.net/t/02_01a04_JQx5vQr8FwZmzv1Jf8izuTPx/f800/1730917127.jpeg?s=c92619047aa7640c9731a526f7ed5f3af39702ad",
        orientation: "portrait",
      },
      {
        src: "https://images1.vinted.net/t/03_01f3b_RMrZS9Yi49r9jHA2SXhZHxFq/f800/1730917127.jpeg?s=8b342fc8cb3345f5fbf06f7ae47285ab504b1504",
        orientation: "landscapes",
      },
      {
        src: "https://images1.vinted.net/t/02_001f1_dLWuVxtBGRvaLJw3n99nnUxm/f800/1730917127.jpeg?s=f333b75ad3db978b2ffcce0805e427cc755a9df6",
        orientation: "portrait",
      },
      {
        src: "https://images1.vinted.net/t/04_021a1_zJM9Rz6i6gAR9LNoSCYAos3j/f800/1730917127.jpeg?s=db18bf4d38ed9248d36d18354d5b1fbe6b65c6e9",
        orientation: "landscapes",
      },
    ],
    postAnalitics: {
      likes: 745,
      comments: 5,
      shares: 4,
      saves: 50,
      postLiked: false,
      postShared: false,
      postSaved: false,
      swapOffered: false,
    },
    swapOffers: [
      {
        username: "thomastomillo",
        profilePicture:
          "https://i.pinimg.com/280x280_RS/d0/50/97/d0509778eb072559c48ae9dd0b8d96e3.jpg",
      },
    ],
  },
];

export const ExplorePosts = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
            <PostCard
              key={post.id}
              data={post}
              onClick={() => redirectToPost(post)}
            />
          ))}
        </Masonry>
      </div>
    </div>
  );
};
