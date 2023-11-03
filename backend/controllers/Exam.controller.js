import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import Exam from "../models/exam.model.js";
import Category from "../models/category.model.js";
import Test from "../models/test.model.js";
import Question from "../models/question.model.js";
import Option from "../models/option.model.js";
import Answer from "../models/answer.model.js";
import User from "../models/user.model.js";

//=========================================Create Exam=================================================
const createExam = async (req, res) => {
  // get data from body
  let { exam_name, exam_description, price, category, thumbnail } = req.body;

  // validation
  if (!exam_name || !exam_description || !price || !category) {
    return res.status(401).json({
      success: "false",
      msg: "All Fields Are Required",
    });
  }

  // take thumbnail and upload it to cloudnary
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      transformation: [{ width: 320, height: 180, crop: "fill" }],
    });

    thumbnail = cloudinaryResponse.secure_url;

    // Delete file from server after upload to cloudinary
    fs.unlink(req.file.path, (err) => {
      if (err) {
        return console.error("Error deleting file:", err);
      }
    });
  } catch (error) {
    return res.status(501).json({
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
      category,
      thumbnail,
      instructor: req.user.id,
    });

    // Add Exam in category exams list
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: category },
      { $push: { exams: exam._id } },
      { new: true }
    ).exec();

    return res.status(200).json({
      success: "true",
      msg: "Exam Created Successfully",
      exam,
      updatedCategory,
    });
  } catch (error) {
    return res.status(502).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//=========================================Edit Exam====================================================
const editExam = async (req, res) => {
  // get data from body
  let { exam_name, exam_description, price, category, thumbnail, exam_id } =
    req.body;

  const exam = await Exam.findById({ _id: exam_id });
  if (!exam) {
    return res.status(401).json({
      success: "false",
      msg: "Exam Not Found With This Id",
    });
  }

  // take thumbnail and upload it to cloudnary if avalable
  if (req.file) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.file.path,
        {
          transformation: [{ width: 320, height: 180, crop: "fill" }],
        }
      );

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
  }

  // update exam in db
  try {
    const updatedExam = await Exam.findByIdAndUpdate(
      { _id: exam_id },
      {
        exam_name,
        exam_description,
        price,
        category,
        thumbnail,
        instructor: req.user.id,
      },
      { new: true }
    ).exec();

    // Add Exam in category exams list
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: category },
      { $push: { exams: updatedExam._id } },
      { new: true }
    ).exec();

    return res.status(200).json({
      success: "true",
      msg: "Exam Created Successfully",
      updatedExam,
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//=========================================Get exam data by Id====================================================
const getExamData = async (req, res) => {
  const { exam_id } = req.params;
  try {
    const examData = await Exam.findById({ _id: exam_id }).populate(
      "all_tests instructor"
    );

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got Data Successfully",
      examData,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//=========================================Show All Exams===============================================
const showAllExams = async (req, res) => {
  try {
    const allExams = await Exam.find({}).populate({
      path: "instructor",
      select: ["first_name", "last_name"],
      populate: {
        path: "userProfile",
        select: "profile_image",
      },
    });
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got All Exams Successfully",
      allExams,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//=========================================Show All Exams created by Instructor===============================================
const showAllExamsByInstructor = async (req, res) => {
  const { instructor_id } = req.params;
  try {
    const allExams = await Exam.find({ instructor: instructor_id })
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got All Exams Successfully",
      allExams,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//=============================================Delete Exam===========================================
const deleteExam = async (req, res) => {
  const { exam_id, category_id } = req.body;
  try {
    // find exam by id and delete
    // we should give warning to instructor in frontend before deleting exam
    // if exam deleted, all tests, questions, options and anwers related to this exam will also be deleted
    const exam = await Exam.findById({ _id: exam_id });

    if (!exam) {
      return res.status(401).json({
        success: "false",
        msg: "Exam Not Found",
      });
    }

    //find all tests related to this exam
    const allTests = exam.all_tests;

    //find questions related to all tests
    for (const testId of allTests) {
      const test = await Test.findById({ _id: testId });
      if (test) {
        const allQuestions = test.questions;
        for (const questionId of allQuestions) {
          const question = await Question.findById({ _id: questionId });
          if (question) {
            const allOptions = question.options;
            for (const optionId of allOptions) {
              // delete All Options
              if (optionId) {
                await Option.findByIdAndDelete({ _id: optionId });
              }
            }
            const answerId = question.answer;
            if (answerId) {
              await Answer.findByIdAndDelete({ _id: answerId });
            }
          }
          await Question.findByIdAndDelete({ _id: questionId });
        }
      }
      await Test.findByIdAndDelete({ _id: testId });
    }

    //delete exam from catagory
    await Category.findByIdAndUpdate(
      { _id: category_id },
      { $pull: { exams: exam_id } }
    );

    await Exam.findByIdAndDelete({ _id: exam_id });

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Exam deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

export { createExam, showAllExams, showAllExamsByInstructor, getExamData, editExam, deleteExam };
