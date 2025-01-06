import { Routes, Route } from "react-router-dom";
import Authentication from "@/components/views/authentication";
import FeedView from "@/pages/feed/Feed";
import SwipeView from "@/pages/swipe/Swipe";
import ExploreView from "@/pages/explore/ExploreView";
import ResetPassword from "@/components/views/resetPassword";
import AddProduct from "@/pages/createPost/CreatePost";
import MessagesView from "@/components/views/MessagesView";
import CreateAccount from "@/components/views/CreateAccount";
import SignIn from "@/components/views/SignIn";
import MainLayout from "@/layouts/MainLayout";
import PostDetails from "@/pages/post/PostDetails";
import ProfileView from "@/pages/profile/ProfileView";
import EventsView from "@/pages/events/EventsView";

function RoutesViews() {
  return (
    <Routes>
      {/* Route for FeedView and other views with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<FeedView />} />
        <Route path="/feed" element={<FeedView />} />
        <Route path="/swipes" element={<SwipeView />} />
        <Route path="/explore" element={<ExploreView />} />
        <Route path="/post/:username" element={<PostDetails />} />
        {/* //TODO: Add a token to the profile url /profile/${token} */}
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/events" element={<EventsView />} />
      </Route>

      {/* Routes for Authentication */}
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/authentication/signIn" element={<SignIn />} />
      <Route path="/authentication/signUp" element={<CreateAccount />} />
      <Route path="/authentication/resetPassword" element={<ResetPassword />} />

      {/* Routes for Create Posts */}
      <Route path="/addProduct" element={<AddProduct />} />

      {/* Route for Messages view */}
      <Route path="/messages" element={<MessagesView />} />
    </Routes>
  );
}

export default RoutesViews;
