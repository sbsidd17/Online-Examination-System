import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Exam from "../models/exam.model.js";
import Catagory from "../models/catagory.model.js";

const createExam = async (req, res) => {
  // get data from body
  let { exam_name, exam_description, price, catagory, thumbnail } = req.body;

  // validation
  if (!exam_name || !exam_description || !price || !catagory) {
    return res.status(401).json({
      success: "false",
      msg: "All Fields Are Required",
    });
  }

  // take thumbnail and upload it to cloudnary
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      transformation: [{ width: 320, height: 180, crop: "fill",}],
    });

    thumbnail = cloudinaryResponse.secure_url;

    // Delete file from server after upload to cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        return console.error("Error deleting file:", err);
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Error in uploading Thumbnail",
      error: error.message,
    });
  }

  // create exam in db
  try {
    const exam = await Exam.create({
      exam_name,
      exam_description,
      price,
      catagory,
      thumbnail,
      instructor: req.user.id,
    });

    // Add Exam in catagory exams list
    const updatedCatagory = await Catagory.findByIdAndUpdate({_id:catagory},
        {$push : {exams : exam._id}},{new:true}
        ).exec()

    return res.status(200).json({
      success: "true",
      msg: "Exam Created Successfully",
      exam,
      updatedCatagory
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

export { createExam };
