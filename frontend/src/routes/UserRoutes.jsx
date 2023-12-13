import { Route, Routes } from "react-router-dom";
import Category from "../components/Category";
import AboutPage from "../pages/Home/AboutPage";
import ContactUsPage from "../pages/Home/ContactUsPage";
import ForgotPassword from "../pages/User/ForgotPassword";
import Home from "../pages/Home/Home";
import Login from "../pages/User/Login";
import Profile from "../pages/User/Profile";
import ResetPassword from "../pages/User/ResetPassword";
import Signup from "../pages/User/Signup";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/category/:id" element={<Category />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactUsPage />} />
    </Routes>
  );
}

export default UserRoutes;
