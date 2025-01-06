import HeaderPicture from "./components/HeaderPicture";
import ContentProfile from "./components/ContentProfile";
import { useSidebarRight } from "@/context/SidebarRightContext";
import { useEffect } from "react";
import { useLayoutScroll } from "@/context/LayoutScrollContext ";
import { useSectionOptions } from "@/context/SectionOptionsContext";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";

const userData = {
  coverPic:
    "https://i.pinimg.com/enabled_hi/564x/eb/38/8b/eb388bb821779eb5e91acbe5d004c86a.jpg",
  profilePic:
    "https://i.pinimg.com/564x/e0/d1/db/e0d1dbf7ddd47dbc45884a9d59c08125.jpg",
  name: "Micahel",
  lastName: "Castellon Cifuentes",
  userName: "aprodithe",
  description:
    "Hype hunter 🔥. Always on the lookout for exclusive pieces and limited editions 🧢👟. If you’ve got something interesting to swap, swipe right 👉🏼!",
  followers: [
    {
      userName: "asya",
      userPic:
        "https://i.pinimg.com/enabled_hi/564x/be/f9/66/bef966e59b113aeb18ca61c3dc1b8092.jpg",
    },
    {
      userName: "zoyatsu",
      userPic:
        "https://i.pinimg.com/enabled_hi/236x/09/2a/f0/092af098234c98af5a14f6c9a1d86b99.jpg",
    },
    {
      userName: "kris",
      userPic:
        "https://i.pinimg.com/enabled_hi/236x/d3/50/bc/d350bc86f58d431b53e806d21b0b72a7.jpg",
    },
    {
      userName: "supercluste",
      userPic:
        "https://i.pinimg.com/enabled_hi/236x/7f/f1/3f/7ff13f8f8f1e440dc7ff42912a1f846c.jpg",
    },
    {
      userName: "bradfordkevinr",
      userPic:
        "https://i.pinimg.com/enabled_hi/236x/e6/b5/1e/e6b51e4d3585be45f89603f05780397b.jpg",
    },
  ],
  following: [
    {
      userName: "supercluste",
      userPic:
        "https://i.pinimg.com/enabled_hi/236x/7f/f1/3f/7ff13f8f8f1e440dc7ff42912a1f846c.jpg",
    },
    {
      userName: "bradfordkevinr",
      userPic:
        "https://i.pinimg.com/enabled_hi/236x/e6/b5/1e/e6b51e4d3585be45f89603f05780397b.jpg",
    },
    {
      userName: "asya",
      userPic:
        "https://i.pinimg.com/enabled_hi/564x/be/f9/66/bef966e59b113aeb18ca61c3dc1b8092.jpg",
    },
  ],
  location: {
    city: "Valencia",
    country: "Spain",
  },
  likes: ["StreeWear", "Vintage", "Sneakers", "Fear of God"],
  actitivies: {
    parties: [
      {
        createdBy: "@Dieguinho",
        partyCover:
          "https://i.pinimg.com/564x/01/57/a6/0157a6cda30789dcf4ec0d8e6a4b7c0b.jpg",
        capacity: 32,
        title: "Street Style Shuffle",
        theme: "Streetwear",
        eventDate: "11-10-2024",
        eventHour: "19:00",
        eventLocation: "Avenida Malvarrosa, 64",
        participants: [
          {
            userId: 1,
            userName: "lielcita1230",
            profilePic:
              "https://cdn.wallapop.com/images/13/7g/ta/__/c13p451504293/i3606930840.jpg?pictureSize=W320",
          },
          {
            userId: 2,
            userName: "marcRios24",
            profilePic:
              "https://cdn.wallapop.com/images/13/0a/1l/__/c13p16870086/i3012930977.jpg?pictureSize=W320",
          },
          {
            userId: 3,
            userName: "jorgeTD",
            profilePic:
              "https://cdn.wallapop.com/images/13/5i/ek/__/c13p333243176/i2616846501.jpg?pictureSize=W320",
          },
          {
            userId: 4,
            userName: "Maria_goya",
            profilePic:
              "https://cdn.wallapop.com/images/13/08/bl/__/c13p13977849/i2265143048.jpg?pictureSize=W320",
          },
        ],
      },
      {
        createdBy: "@Dieguinho",
        partyCover:
          "https://i.pinimg.com/564x/36/3f/e3/363fe367184cacc4e7cdba0094510a9a.jpg",
        capacity: 32,
        title: "Street Style Shuffle",
        theme: "Streetwear",
        eventDate: "11-10-2024",
        eventHour: "19:00",
        eventLocation: "Avenida Malvarrosa, 64",
        participants: [
          {
            userId: 1,
            userName: "lielcita1230",
            profilePic:
              "https://cdn.wallapop.com/images/13/7g/ta/__/c13p451504293/i3606930840.jpg?pictureSize=W320",
          },
          {
            userId: 2,
            userName: "marcRios24",
            profilePic:
              "https://cdn.wallapop.com/images/13/0a/1l/__/c13p16870086/i3012930977.jpg?pictureSize=W320",
          },
          {
            userId: 3,
            userName: "jorgeTD",
            profilePic:
              "https://cdn.wallapop.com/images/13/5i/ek/__/c13p333243176/i2616846501.jpg?pictureSize=W320",
          },
          {
            userId: 4,
            userName: "Maria_goya",
            profilePic:
              "https://cdn.wallapop.com/images/13/08/bl/__/c13p13977849/i2265143048.jpg?pictureSize=W320",
          },
        ],
      },
      {
        createdBy: "@Dieguinho",
        partyCover:
          "https://i.pinimg.com/236x/f2/c0/09/f2c009c237bf4fb9a57d44b976d900c7.jpg",
        capacity: 32,
        title: "Street Style Shuffle",
        theme: "Streetwear",
        eventDate: "11-10-2024",
        eventHour: "19:00",
        eventLocation: "Avenida Malvarrosa, 64",
        participants: [
          {
            userId: 1,
            userName: "lielcita1230",
            profilePic:
              "https://cdn.wallapop.com/images/13/7g/ta/__/c13p451504293/i3606930840.jpg?pictureSize=W320",
          },
          {
            userId: 2,
            userName: "marcRios24",
            profilePic:
              "https://cdn.wallapop.com/images/13/0a/1l/__/c13p16870086/i3012930977.jpg?pictureSize=W320",
          },
          {
            userId: 3,
            userName: "jorgeTD",
            profilePic:
              "https://cdn.wallapop.com/images/13/5i/ek/__/c13p333243176/i2616846501.jpg?pictureSize=W320",
          },
          {
            userId: 4,
            userName: "Maria_goya",
            profilePic:
              "https://cdn.wallapop.com/images/13/08/bl/__/c13p13977849/i2265143048.jpg?pictureSize=W320",
          },
        ],
      },
      {
        createdBy: "@Dieguinho",
        partyCover:
          "https://i.pinimg.com/236x/8b/a7/5f/8ba75fd848520ccde678961be86ab1cb.jpg",
        capacity: 32,
        title: "Street Style Shuffle",
        theme: "Streetwear",
        eventDate: "11-10-2024",
        eventHour: "19:00",
        eventLocation: "Avenida Malvarrosa, 64",
        participants: [
          {
            userId: 1,
            userName: "lielcita1230",
            profilePic:
              "https://cdn.wallapop.com/images/13/7g/ta/__/c13p451504293/i3606930840.jpg?pictureSize=W320",
          },
          {
            userId: 2,
            userName: "marcRios24",
            profilePic:
              "https://cdn.wallapop.com/images/13/0a/1l/__/c13p16870086/i3012930977.jpg?pictureSize=W320",
          },
          {
            userId: 3,
            userName: "jorgeTD",
            profilePic:
              "https://cdn.wallapop.com/images/13/5i/ek/__/c13p333243176/i2616846501.jpg?pictureSize=W320",
          },
          {
            userId: 4,
            userName: "Maria_goya",
            profilePic:
              "https://cdn.wallapop.com/images/13/08/bl/__/c13p13977849/i2265143048.jpg?pictureSize=W320",
          },
        ],
      },
    ],
    closet: [
      {
        mainPic:
          "https://cdn.wallapop.com/images/10420/hh/pa/__/c10420p1057657875/i5174297537.jpg?pictureSize=W640",
        views: 10,
        swapOffers: 2,
        shares: 1,
        posted: "15/07/2024",
        status: "available",
      },
      {
        mainPic:
          "https://cdn.wallapop.com/images/10420/hh/la/__/c10420p1057471447/i5173410004.jpg?pictureSize=W640",
        views: 23,
        swapOffers: 5,
        shares: 1,
        posted: "08/05/2024",
        status: "swapped",
      },
    ],
  },
};

function ProfileView() {
  const { isSidebarRightVisible, setIsSidebarRightVisible } = useSidebarRight();
  const { setHasScroll } = useLayoutScroll();
  const { setSectionOptions } = useSectionOptions();
  const { toggleVisibility } = useHeaderVisibility();

  useEffect(() => {
    setHasScroll(true);
    toggleVisibility(false);
    if (isSidebarRightVisible) {
      setIsSidebarRightVisible(false);
      setSectionOptions([]);
    }
  }, []);

  return (
    <div className="flex flex-col flex flex-grow md:py-6">
      <HeaderPicture
        coverPic={userData?.coverPic}
        location={userData?.location}
      />
      <div className="mt-[-10px] px-4 md:px-0">
        <ContentProfile userData={userData} />
      </div>
    </div>
  );
}

export default ProfileView;
