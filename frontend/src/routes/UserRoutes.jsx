import { Route, Routes } from "react-router-dom";
import Category from "../components/Category";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import Signup from "../pages/Signup";

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
    </Routes>
  );
}

export default UserRoutes;
