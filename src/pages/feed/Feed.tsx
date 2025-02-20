/**
 * FeedView component displays a feed of posts based on the active section.
 * It uses mock data for posts and renders different types of post components
 * such as PostCard, SwapNotification, and TextCard.
 *
 * @component
 * @example
 * return (
 *   <FeedView />
 * )
 *
 * @remarks
 * This component uses several context hooks to manage state:
 * - `useSectionOptions` to set the section options.
 * - `useActiveSection` to get the currently active section.
 * - `usePostButton` to control the visibility of the post button.
 *
 * @returns {JSX.Element} The rendered FeedView component.
 *
 * @function
 * @name FeedView
 *
 * @description
 * The FeedView component initializes the section options and ensures the post button is shown.
 * It also scrolls to the top of the page whenever the active section changes.
 * The component maps through the posts in the active section and renders the appropriate post component
 * based on the post type.
 *
 * @hook
 * @name useNavigate
 * @description
 * The `useNavigate` hook from `react-router-dom` is used to navigate to the post detail page when a post is clicked.
 *
 * @param {Object} post - The post data to be redirected to.
 * @param {string} post.userData.username - The username of the post author.
 *
 * @example
 * const redirectToPost = (post) => {
 *   const postData = encodeURIComponent(JSON.stringify(post));
 *   navigate(`/post/${post?.userData?.username}`, { state: { postData } });
 * };
 */
import PostCard from "./components/PostCard";
import SwapNotification from "./components/SwapNotification";
import TextCard from "./components/TextCard";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useEffect } from "react";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { usePostButton } from "@/context/CreatePostActive";
import { useNavigate } from "react-router-dom";
import { useLayoutScroll } from "@/context/LayoutScrollContext";
import { useSidebarRight } from "@/context/SidebarRightContext";

// TODO: #63 Remove this mock data and use the real data from the API
const testPosts = {
  following: [
    {
      id: 1,
      type: "Photo",
      createdAt: "2024-11-22T00:00:00Z",
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
      type: "Photo",
      createdAt: "2024-11-23T08:00:00Z",
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
      comments: [],
    },
    {
      id: 4,
      type: "Swap",
      shippingPreference: "delivery",
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
    {
      id: 5,
      type: "Text",
      createdAt: "2024-11-23T09:00:00Z",
      category: "Vintage",
      userData: {
        username: "MisterX",
        profilePicture:
          "https://i.pinimg.com/75x75_RS/63/58/42/635842ca8a6895adc59e30761996cc12.jpg",
        location: {
          city: "Madrid",
          country: "Spain",
        },
      },
      postTitle: "Why I’m Hooked On Vintage Vibes 🧥✨",
      postDescription:
        "Hey Vintagevibes Crew! I Just Wanted To Take A Second To Talk About Why I’m So Into Vintage Style And Why It Honestly Just Feels Different From Anything Else. For Me, It’s About More Than Just The Look—It's The Stories Behind Each Piece. I Love The Idea Of Wearing Something That’s Been Around For Decades.",
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
    {
      id: 6,
      type: "Text",
      category: "StreetWear",
      createdAt: "2024-11-23T07:20:00Z",
      userData: {
        username: "StreetStyleGuru",
        profilePicture:
          "https://i.pinimg.com/75x75_RS/63/58/42/635842ca8a6895adc59e30761996cc12.jpg",
        location: {
          city: "Tokyo",
          country: "Japan",
        },
      },
      postTitle: "Exploring the Depth of Streetwear Culture 👟✨",
      postDescription:
        "Hey Streetwear Enthusiasts! Just wanted to dive into why streetwear has such a unique vibe. It’s more than just fashion—it's a lifestyle, an attitude. From the oversized hoodies to the vintage sneakers, each piece tells a story of rebellion and creativity. Check out this video for some serious inspiration on the evolution of streetwear: https://www.youtube.com/watch?v=IoImcga6Gq8&ab_channel=makotoarchive",
      postAnalitics: {
        likes: 1020,
        comments: 18,
        shares: 22,
        saves: 75,
        postLiked: false,
        postShared: false,
        postSaved: false,
      },
      comments: [
        {
          username: "urbanlegend",
          profilePicture:
            "https://i.pinimg.com/280x280_RS/d0/50/97/d0509778eb072559c48ae9dd0b8d96e3.jpg",
          comment:
            "Totally agree! Streetwear is all about expressing individuality.",
        },
        {
          username: "vintagesneak",
          profilePicture:
            "https://i.pinimg.com/280x280_RS/45/c0/51/45c0513b67958fadcfc29222b5e6a749.jpg",
          comment: "That video is fire! Thanks for sharing, mate!",
        },
      ],
    },
  ],
  communities: [
    {
      id: 1,
      type: "OutfitShowcase",
      createdAt: "2024-11-23T00:00:00Z",
      userData: {
        username: "Kmpriv100",
        profilePicture:
          "https://i.pinimg.com/75x75_RS/e1/da/4d/e1da4d8d664c3024cd4f1c0ec2bb60dd.jpg",
        location: {
          city: "Madrid",
          country: "Spain",
        },
      },
      communityData: {
        url: "LuxuryStreet",
        communityPicture:
          "https://i.pinimg.com/736x/1b/08/eb/1b08eb909b9ac5b7a4138373a8c79b5b.jpg",
      },
      postDescription:
        "Obsessed with this tee swapfits perfectly, feels unreal. Definitely a win!",
      postImg:
        "https://i.pinimg.com/736x/f8/8b/db/f88bdbbfaa5814e7d6af34f16f053c9a.jpg",
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
            "https://images1.vinted.net/t/03_02385_vFGkatcm85KxXT26TYtLmVeE/f800/1732222054.jpeg?s=8cac532d3feba95c01da3a4180a6626bdff492f7",
        },
        obtained: {
          link: "https://www.amazon.com/hoodie",
          coverImg:
            "https://images1.vinted.net/t/01_00ff6_jA24X8iNyXnzy12Be838UaEy/f800/1680707938.jpeg?s=f681f6fca1c0a14ed81c3c7ace4a8c93321f0e6c",
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
      id: 6,
      type: "Text",
      createdAt: "2024-11-23T07:20:00Z",
      userData: {
        username: "Odozpinho",
        profilePicture:
          "https://i.pinimg.com/75x75_RS/d4/1b/77/d41b777795b4a41193884887a2af8101.jpg",
        location: {
          city: "Madrid",
          country: "Spain",
        },
      },
      communityData: {
        url: "LuxuryStreet",
        communityPicture:
          "https://i.pinimg.com/736x/1b/08/eb/1b08eb909b9ac5b7a4138373a8c79b5b.jpg",
      },
      postTitle: "When Street Meets Luxe: The Perfect Blend 🖤",
      postDescription:
        "Had to take a moment to talk about why luxury streetwear is my go-to. It’s more than just clothes—it’s about combining that raw street vibe with top-tier elegance. High fashion meets the hustle. It's the swagger, the confidence, and the culture, all wrapped up in one piece. It's not just wearing luxury, it’s living it. 🙌",
      postAnalitics: {
        likes: 1020,
        comments: 18,
        shares: 22,
        saves: 75,
        postLiked: false,
        postShared: false,
        postSaved: false,
      },
      comments: [
        {
          username: "urbanlegend",
          profilePicture:
            "https://i.pinimg.com/280x280_RS/d0/50/97/d0509778eb072559c48ae9dd0b8d96e3.jpg",
          comment:
            "Totally agree! Streetwear is all about expressing individuality.",
        },
        {
          username: "vintagesneak",
          profilePicture:
            "https://i.pinimg.com/280x280_RS/45/c0/51/45c0513b67958fadcfc29222b5e6a749.jpg",
          comment: "That video is fire! Thanks for sharing, mate!",
        },
      ],
    },
  ],
};

const options = [
  { name: "Following", value: 0 },
  { name: "Communities", value: 1 },
];

const FeedView = () => {
  const { setIsSidebarRightVisible } = useSidebarRight();

  const navigate = useNavigate();
  const { setShowPostButton } = usePostButton();
  const { setSectionOptions } = useSectionOptions();
  const { activeSection } = useActiveSection();
  const { setHasScroll } = useLayoutScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  useEffect(() => {
    setSectionOptions(options);
  }, [setSectionOptions]);

  useEffect(() => {
    setIsSidebarRightVisible(true);
    setHasScroll(true);
    setShowPostButton(true);
  }, []);

  const redirectToPost = (post: any) => {
    const postData = encodeURIComponent(JSON.stringify(post));
    navigate(`/post/${post?.userData?.username}`, { state: { postData } });
  };

  return (
    <div className="flex flex-col gap-6 px-4">
      <div className="py-4 flex flex-col gap-4">
        {(activeSection === 0
          ? testPosts.following
          : testPosts.communities
        ).map((post: any) =>
          post.type === "NotificationSwap" ? (
            <SwapNotification
              key={post.id}
              data={post}
              onClick={() => redirectToPost(post)}
            />
          ) : post.type === "Text" ? (
            <TextCard
              key={post.id}
              data={post}
              onClick={() => redirectToPost(post)}
            />
          ) : (
            <PostCard
              key={post.id}
              data={post}
              onClick={() => redirectToPost(post)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default FeedView;
