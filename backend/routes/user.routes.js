import express from "express";
import { sendOTP } from "../controllers/otp.controller.js";
import { forgotPassword, login, resetPassword, signUp } from "../controllers/user.controller.js";

const userRoute = express.Router()

userRoute.post("/login", login)
userRoute.post("/signUp", signUp)
userRoute.post("/sendOtp", sendOTP)
userRoute.post("/forgot-password", forgotPassword)
userRoute.post("/reset-password/:resetToken", resetPassword)

export default userRoute;