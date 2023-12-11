import cloudinary from "../config/cloudinary.js";
import Exam from "../models/exam.model.js";
import SliderImages from "../models/slider.model.js";
import User from "../models/user.model.js";
import fs from "fs";

const viewAllStudents = async (req, res) => {
  try {
    const allStudents = await User.find({ role: "Student" });
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got All Successfully",
      allStudents,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });
  try {
    // find this student in exam's enrolled students and delete it first from there
    for (const examId of user.exams) {
      await Exam.findByIdAndUpdate(
        examId,
        { $pull: { enrolled_students: id } },
        { new: true }
      );
    }

    await User.findByIdAndDelete({ _id: id });

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const viewAllInstructors = async (req, res) => {
  try {
    const allInstructors = await User.find({ role: "Instructor" });
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got All Successfully",
      allInstructors,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const approveInstructor = async (req, res) => {
  const { id } = req.params;
  // trycatch
  try {
    const instructor = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: { approved: true },
      },
      { new: true }
    ).exec();
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Instructor Approved Successfully",
      instructor,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const unApproveInstructor = async (req, res) => {
  const { id } = req.params;
  // trycatch
  try {
    const instructor = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: { approved: false },
      },
      { new: true }
    ).exec();
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Instructor UnApproved Successfully",
      instructor,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const uploadSliderImage = async (req, res) => {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      transformation: [{ quality: 99 }],
    });

    const image = cloudinaryResponse.secure_url;

    const sliderImages = await SliderImages.create({
      image,
    });

    // Delete file from server after upload to cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        return console.error("Error deleting file:", err);
      }
    });

    //return response
    return res.status(200).json({
      success: true,
      msg: "Image Uploaded Successfully.",
      sliderImages,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Error in uploading Image",
      error: error.message,
    });
  }
};

const deleteSliderImage = async (req, res) => {
  try {
    const { id } = req.params;
    await SliderImages.findByIdAndDelete({ _id: id });

    //return response
    return res.status(200).json({
      success: true,
      msg: "Image Deleted Successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Error in deleting Image",
      error: error.message,
    });
  }
};

const getAllSliderImage = async (req, res) => {
  try {
    const sliderImages = await SliderImages.find({});

    //return response
    return res.status(200).json({
      success: true,
      msg: "Got All Successfully.",
      sliderImages,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Error in deleting Image",
      error: error.message,
    });
  }
};

export {
  viewAllStudents,
  deleteStudent,
  viewAllInstructors,
  approveInstructor,
  unApproveInstructor,
  uploadSliderImage,
  deleteSliderImage,
  getAllSliderImage,
};
