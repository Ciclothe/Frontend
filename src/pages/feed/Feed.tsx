import PostCard from "./components/PostCard";
import SwapNotification from "./components/SwapNotification";
import SectionSwitcher from "@/components/layout/SectionSwitcher";
import { useOutletContext } from "react-router-dom";

// Combined test data for OutfitShowcase and NotificationSwap
const testPosts = [
  {
    id: 1,
    type: "OutfitShowcase",
    userData: {
      username: "MisterX",
      profilePicture:
        "https://i.pinimg.com/280x280_RS/25/60/30/2560309def94ae581758cd7722de0f3d.jpg",
      location: {
        city: "New York",
        country: "USA",
      },
    },
    postDescription:
      "Nahhh, I’m Flipping Out Over This New Hoodie, So Happy With The Decision, Damn Crazy Good!",
    postImg:
      "https://i.pinimg.com/736x/75/e3/e5/75e3e59bc89673ae3946ba91947ea57a.jpg",
    imageOrientation: "portrait",
    postAnalitics: {
      likes: 123,
      comments: 2,
      shares: 5,
      saves: 10,
      postLiked: true,
      postShared: false,
      postSaved: true,
    },
    swapData: {
      offered: {
        link: "https://www.amazon.com/EEPants",
        coverImg:
          "https://images1.vinted.net/t/04_00585_FtGP64tAq7toJToMuhRGohMi/f800/1730389722.jpeg?s=8d86ee31b9d4a54721bd598fb66d3d68ad0628a9",
      },
      obtained: {
        link: "https://www.amazon.com/hoodie",
        coverImg:
          "https://images1.vinted.net/t/01_00674_rEcy8UXFctpwKXDqDCqZz1xY/f800/1709476134.jpeg?s=d81656aa53926c7a4d75d6d589384737203ff481",
      },
    },
    comments: [
      {
        username: "thomastomillo",
        profilePicture:
          "https://i.pinimg.com/280x280_RS/d0/50/97/d0509778eb072559c48ae9dd0b8d96e3.jpg",
        comment: "Damn !! thats a cool Hoodie my man",
      },
      {
        username: "rforrever",
        profilePicture:
          "https://i.pinimg.com/280x280_RS/45/c0/51/45c0513b67958fadcfc29222b5e6a749.jpg",
        comment: "Love it, bro!",
      },
    ],
  },
  {
    id: 2,
    type: "OutfitShowcase",
    userData: {
      username: "MisterX",
      profilePicture:
        "https://i.pinimg.com/75x75_RS/63/58/42/635842ca8a6895adc59e30761996cc12.jpg",
      location: {
        city: "Milan",
        country: "Spain",
      },
    },
    postDescription: "Fuck i love this swap 🤤",
    postImg:
      "https://i.pinimg.com/736x/50/3f/fa/503ffaecdfca550660a913c2ae2f1485.jpg",
    imageOrientation: "landscapes",
    postAnalitics: {
      likes: 745,
      comments: 5,
      shares: 4,
      saves: 50,
      postLiked: true,
      postShared: false,
      postSaved: false,
    },
    swapData: {
      offered: {
        link: "https://www.amazon.com/EEPants",
        coverImg:
          "https://images1.vinted.net/t/04_00585_FtGP64tAq7toJToMuhRGohMi/f800/1730389722.jpeg?s=8d86ee31b9d4a54721bd598fb66d3d68ad0628a9",
      },
      obtained: {
        link: "https://www.amazon.com/hoodie",
        coverImg:
          "https://images1.vinted.net/t/04_01bee_PdZZCTtFcTEB5K3ZKDcbK4BQ/f800/1731155171.jpeg?s=52bc114629b0bb2fe7dbfe49c8aee24595b8240f",
      },
    },
    comments: [
      {
        username: "thomastomillo",
        profilePicture:
          "https://i.pinimg.com/280x280_RS/d0/50/97/d0509778eb072559c48ae9dd0b8d96e3.jpg",
        comment: "Damn !! thats a cool Hoodie my man",
      },
      {
        username: "rforrever",
        profilePicture:
          "https://i.pinimg.com/280x280_RS/45/c0/51/45c0513b67958fadcfc29222b5e6a749.jpg",
        comment: "Love it, bro!",
      },
    ],
  },
  {
    id: 3,
    type: "NotificationSwap",
    postAnalitics: {
      likes: 11,
      comments: 1,
      shares: 0,
      saves: 0,
      postLiked: true,
      postShared: false,
      postSaved: false,
    },
    swapData: {
      offered: {
        userName: "alejospinaro",
        profilePicture:
          "https://i.pinimg.com/75x75_RS/01/99/e6/0199e6920803750e09382d3ee75b13ad.jpg",
        link: "https://www.amazon.com/EEPants",
        coverImg:
          "https://i.pinimg.com/736x/87/aa/71/87aa71cdda853a2e4bc784a7038364d8.jpg",
      },
      obtained: {
        userName: "juansota",
        profilePicture:
          "https://i.pinimg.com/75x75_RS/f9/cc/19/f9cc192266f3273c6c5514148c59e2b2.jpg",
        link: "https://www.amazon.com/hoodie",
        coverImg:
          "https://images1.vinted.net/t/01_00674_rEcy8UXFctpwKXDqDCqZz1xY/f800/1709476134.jpeg?s=d81656aa53926c7a4d75d6d589384737203ff481",
      },
    },
    comments: [
      {
        username: "thomastomillo",
        profilePicture:
          "https://i.pinimg.com/280x280_RS/d0/50/97/d0509778eb072559c48ae9dd0b8d96e3.jpg",
        comment: "Nice swap!",
      },
    ],
  },
  {
    id: 4,
    type: "Swap",
    userData: {
      username: "MisterX",
      profilePicture:
        "https://i.pinimg.com/75x75_RS/63/58/42/635842ca8a6895adc59e30761996cc12.jpg",
      location: {
        city: "Madrid",
        country: "Spain",
      },
    },
    garmentTitle: "Hooded Bomber Jacket",
    garmentCondition: "as_new",
    garmentSize: "M (Medium)",
    garmentBrand: "Trapstar",
    garmentColor: "Black",
    garmentDescription:
      "The Hooded Bomber Is Made In The Italy From Heavy Nubuck Leather With A High Loft Fill To Create Bold Structure.",
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
    },
    comments: [
      {
        username: "thomastomillo",
        profilePicture:
          "https://i.pinimg.com/280x280_RS/d0/50/97/d0509778eb072559c48ae9dd0b8d96e3.jpg",
        comment: "Damn !! thats a cool Hoodie my man",
      },
      {
        username: "rforrever",
        profilePicture:
          "https://i.pinimg.com/280x280_RS/45/c0/51/45c0513b67958fadcfc29222b5e6a749.jpg",
        comment: "Love it, bro!",
      },
    ],
  },
];

const sectionOptions = [
  { name: "Following", path: "/feed/following" },
  { name: "Communities", path: "/feed/communities" },
];

interface MainLayoutContextType {
  showHeader: boolean;
}

const FeedView = () => {
  const { showHeader } = useOutletContext<MainLayoutContextType>();

  return (
    <div className="flex flex-col gap-6">
      <div
        className={`hidden md:flex w-full md:w-[70%] xl:w-[44%] ${
          showHeader ? "fixed" : "fixed top-0"
        } z-[100]`}
      >
        <SectionSwitcher options={sectionOptions} />
      </div>
      <div className="md:mt-[4em] p-4 flex flex-col gap-4">
        {testPosts.map((post: any) =>
          post.type === "NotificationSwap" ? (
            <SwapNotification key={post.id} data={post} />
          ) : (
            <PostCard key={post.id} data={post} />
          )
        )}
      </div>
    </div>
  );
};

export default FeedView;
