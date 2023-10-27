import express from "express";
import { sendOTP } from "../controllers/otp.controller.js";
import { updateProfile } from "../controllers/updateProfile.js";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import uploadSingle from "../middlewares/multer.js";

const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/signUp", signUp);
userRoute.get("/logout", logout);
userRoute.post("/sendOtp", sendOTP);
userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", resetPassword);
userRoute.post("/update-profile", auth, uploadSingle, updateProfile);

export default userRoute;
