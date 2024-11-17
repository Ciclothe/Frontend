import { Routes, Route } from "react-router-dom";
import Authentication from "../src/components/views/authentication";
import FeedView from "@/pages/feed/Feed";
import ResetPassword from "../src/components/views/resetPassword";
import AddProduct from "@/pages/createPost/CreatePost";
import MessagesView from "../src/components/views/MessagesView";
import CreateAccount from "../src/components/views/CreateAccount";
import SignIn from "../src/components/views/SignIn";
import MainLayout from "@/layouts/MainLayout";

function RoutesViews() {
  return (
    <Routes>
      {/* Route for FeedView and other views with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<FeedView />} />
        <Route path="/feed" element={<FeedView />} />
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
