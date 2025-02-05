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
import { useEffect, useState } from "react";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { usePostButton } from "@/context/CreatePostActive";
import { useNavigate } from "react-router-dom";
import { useLayoutScroll } from "@/context/LayoutScrollContext";
import { useSidebarRight } from "@/context/SidebarRightContext";
import axios from "axios";

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
  const [posts, setPosts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/feed', { withCredentials: true });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts({ following: [], communities: [] }); // Inicializa con datos vacíos en caso de error
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetchData();
  }, []);

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
  }, [setIsSidebarRightVisible, setHasScroll, setShowPostButton]);

  const redirectToPost = (post: any) => {
    const postData = encodeURIComponent(JSON.stringify(post));
    navigate(`/post/${post?.userData?.username}`, { state: { postData } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se pudieron cargar los posts.</p>
      </div>
    );
  }

  const selectedPosts = activeSection === 0 ? posts.following : posts.communities;

  return (
    <div className="flex flex-col gap-6 px-4">
      <div className="py-4 flex flex-col gap-4">
        {selectedPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No hay posts para mostrar
          </div>
        ) : (
          selectedPosts.map((post: any) =>
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
          )
        )}
      </div>
    </div>
  );
};

export default FeedView;