import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import UserProfile from "../models/userProfile.model.js";
import fs from "fs";

const updateProfile = async (req, res) => {
  // get user id from auth middleware
  const { id } = req.user;

  // get updated data from body
  let { first_name, last_name, about, dob, gender, profile_image } = req.body;

  try {
    // get profile image path with the help of multer middleware and upload image to cloudinary if image exists
    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.file.path,
        {
          transformation: [
            { width: 250, height: 250, crop: "fill", gravity: "faces" },
          ],
        }
      );

      profile_image = cloudinaryResponse.secure_url;

      // Delete file from server after upload to cloudinary
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    // find user and update
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        first_name,
        last_name,
      },
      {
        new: true,
      }
    ).exec();

    // find userProfile and update
    const userProfile = await UserProfile.findByIdAndUpdate(
      { _id: user.userProfile },
      {
        profile_image,
        about,
        dob,
        gender,
      },
      {
        new: true,
      }
    ).exec();

    const updatedUser = await User.findById({ _id: id }).populate(
      "userProfile exams"
    );

    //send response
    res.status(200).json({
      success: true,
      msg: "Profile Updated Successfully",
      user: updatedUser,
      userProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

export { updateProfile };
