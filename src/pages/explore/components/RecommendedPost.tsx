import Masonry from "@mui/lab/Masonry";
import ProfileImage from "@/components/ui/ProfilePic";
import { useTheme } from "@/context/ThemeContext.js";
import { Icon } from "@mdi/react";
import { mdiCircleSmall } from "@mdi/js";
import PostImage from "@/pages/feed/components/cards/PostImage";
import HeartIcon from "@/assets/uiIcons/HeartIcon";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
    id: 3,
    userData: {
      userId: 3,
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
];

const POSTS_PER_PAGE = 20;

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
        <InfiniteScroll
          dataLength={visiblePosts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more posts to show</p>}
          style={{ textAlign: "center" }}
        >
          <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={2}>
            {visiblePosts.map((post) => (
              <div key={post.id}>
                <div
                  className={`${
                    themeMode === "dark" ? "text-white" : "text-black"
                  } grid grid-cols-12 rounded-xl gap-2 cursor-pointer`}
                >
                  <div className="col-span-12 grid grid-cols-12 gap-2">
                    {/* <PostHeader data={post} /> */}
                    <div className="relative col-span-12">
                      <PostImage data={post} />
                      <div className="absolute bottom-0 w-full flex justify-between p-2">
                        <div className="flex w-full bg-black backdrop-blur-lg bg-opacity-30 backdrop-brightness-10 justify-between rounded-lg p-2">
                          <div className="flex gap-2">
                            <div className="col-span-1 max-h-full overflow-hidden">
                              <div className="flex justify-center">
                                <ProfileImage
                                  profilePic={post?.userData?.profilePic}
                                  height={"1.5rem"}
                                />
                              </div>
                              <div className="col-span-1 h-full flex justify-center mt-2">
                                <div
                                  className={`w-[1px] h-full mt-2 ${
                                    themeMode === "dark"
                                      ? "bg-white/10"
                                      : "bg-gray-500/10"
                                  }`}
                                ></div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex gap-2 items-center">
                                <p className="font-bold">
                                  @{post?.userData?.username}
                                </p>
                              </div>
                              <div className="flex items-center opacity-50">
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
                            } flex items-center justify-center cursor-pointer rounded-lg gap-1`}
                            onClick={() => toggleLike(post.id)}
                          >
                            <HeartIcon
                              size={"1.5em"}
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
                  <hr
                    className={`col-span-12 mt-4 md:hidden ${
                      themeMode === "dark"
                        ? "border-white/10"
                        : "border-gray-500/1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </Masonry>
        </InfiniteScroll>
      </div>
    </div>
  );
};
