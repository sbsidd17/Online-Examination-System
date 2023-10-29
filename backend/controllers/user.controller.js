import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import ForgotPasswordToken from "../models/forgotPasswordToken.model.js";
import { resetPasswordTemplate } from "../templates/resetPasswordTemplate.js";
import sendEmail from "../helpers/sendEmail.js";
import UserProfile from "../models/userProfile.model.js";

//=================================SignUp================================================
const signUp = async (req, res) => {
  // take data from body
  const { first_name, last_name, email, password, userOtp, role } = req.body;
  console.log(req.body)

  //validation
  if (!first_name || !last_name || !email || !password || !userOtp) {
    return res.status(400).json({
      success: false,
      msg: "All Fields Are Required",
    });
  }
  try {
    //check user exists
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        success: false,
        msg: "User already exists. Please sign in to continue.",
      });
    }

    //check user otp and otp sent on email are same
    const dbOtp = await OTP.findOne({ email });
    if (!dbOtp) {
      return res.status(400).json({
        success: false,
        msg: "OTP Expired",
      });
    }
    if (dbOtp.otp != userOtp) {
      return res.status(400).json({
        success: false,
        msg: "Invalid OTP",
      });
    }

    //Create temp user profile for User
    const userProfile = await UserProfile.create({
      profile_image :`https://api.dicebear.com/5.x/initials/svg?seed=${first_name} ${last_name}`,
      about:"",
      dob:null,
      gender:null
    })

    //Create entry in db

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      role,
      userProfile: userProfile._id
    });

    //return response
    return res.status(200).json({
      success: true,
      msg: "Signed Up Successfully.",
      user,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//===============================Login===========================================
const login = async (req, res) => {
  // take data from body
  const { email, password } = req.body;

  //validation on data
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "All Fields Are Required",
    });
  }

  try {
    //find user from db
    const user = await User.findOne({ email }).populate("userProfile");
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User Not Found. Please SignUp First",
      });
    }

    //match password
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) {
      return res.status(400).json({
        success: false,
        msg: "Invalid Password",
      });
    }

    //generate jwt token
    const jwtToken = user.generateJwtToken();

    //save token in cookies
    res.cookie("jwtToken", jwtToken, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    //send response
    return res.status(200).json({
      success: true,
      msg: "Log In Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//===============================LogOut=======================================================

const logout = (req, res) => {
  try {
    res.cookie("jwtToken", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      msg: "User logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Error In LogOut",
      error: error.message,
    });
  }
};

//=============================================Forgot Password==============================================

const forgotPassword = async (req, res) => {
  //take email from body
  const { email } = req.body;

  // validation
  if(!email){
    return res.status(401).json({
      success: "false",
      msg: "Email Required",
    });
  }

  //check user is exists or not
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: "false",
      msg: "User Not Found",
    });
  }

  // Generate resetToken
  const resetToken = crypto.randomBytes(20).toString("hex");

  // ADD more encription layer on resetToken before save it to database
  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // store encripted token in db
  try {
    await ForgotPasswordToken.findOne({ email });
    //Check token is Already Generated Or Not
    const isEmailExists = await ForgotPasswordToken.findOne({ email });
    if (isEmailExists) {
      return res.status(400).json({
        success: false,
        msg: "Link is Already Generated. Wait for 5 Minutes To Generate New.",
      });
    }
    //save token in database
    await ForgotPasswordToken.create({
      email,
      token: forgotPasswordToken,
    });

    //generate reset link
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    //send email 
    const subject = "Reset Password";
    const message = resetPasswordTemplate(resetPasswordUrl);
    await sendEmail(email, subject, message);

    //send response
    return res.status(200).json({
      success: true,
      msg: `Reset password token has been sent to ${email} successfully`,
      resetToken
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `Reset password Failed`,
      error:error.message
    });
  }
};


//=============================================Reset Password==============================================
const resetPassword = async (req, res) => {
  //get new password and resetToken from body
  let { newPassword, resetToken } = req.body;
  // console.log(newPassword)


  //encript reset token to find forgot password token in db because we stored encripted password in db
  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //find forgot password token in db
  const token = await ForgotPasswordToken.findOne({
    token:forgotPasswordToken,
  });

  if (!token) {
    return res.status(400).json({
      success: false,
      msg: "Invalid Token or token expired",
    });
  }

  //update new password in user db
  const userEmail = token.email
  
  const user = await User.findOne({ email: userEmail });

  if (user) {
    user.password = newPassword;
    await user.save();
  }
  

  //send response
  res.status(200).json({
    success: true,
    msg: "Password changed successfully!",
    user
  });
};

export { login, signUp, logout, forgotPassword, resetPassword };
