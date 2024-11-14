import OutfitShowcase from "./components/OutfitShowcase";

interface PostProps {
  type: string;
  data: any;
}

// Test Data
const postTestOutfitShowcase = {
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
      comment:
        "Damn !! thats a cool Hoodie my man dfaf af asfa sfsdfdsf sdfsadf sdfsadfsd sa",
    },
    {
      username: "rforrever",
      profilePicture:
        "https://i.pinimg.com/280x280_RS/45/c0/51/45c0513b67958fadcfc29222b5e6a749.jpg",
      comment: "Fuck bro, i love it",
    },
  ],
};

const FeedView = () => {
  const Post: React.FC<PostProps> = ({ type, data }) => {
    switch (type) {
      case "OutfitShowcase":
        return <OutfitShowcase data={data} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Post type={postTestOutfitShowcase.type} data={postTestOutfitShowcase} />
    </div>
  );
};

export default FeedView;
