import cloudinary from "../config/cloudinary.js";
import Answer from "../models/answer.model.js";
import Option from "../models/option.model.js";
import Question from "../models/question.model.js";
import Test from "../models/test.model.js";
import fs from "fs";

//====================================Create Question====================================================
const createQuestion = async (req, res) => {
  //get data
  const { question_title, test_id } = req.body;
  let question_image = "";

  // validation
  if (!question_title || !test_id) {
    return res.status(401).json({
      success: "false",
      msg: "All Fields Required",
    });
  }

  // if image avalable then upload it on cloudnary
  if (req.file) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.file.path,
        {
          transformation: [{ quality: 90 }],
        }
      );

      question_image = cloudinaryResponse.secure_url;

      // Delete file from server after upload to cloudinary
      fs.unlink(req.file.path, (err) => {
        if (err) {
          return console.error("Error deleting file:", err);
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: "false",
        msg: "Error in uploading Image",
        error: error.message,
      });
    }
  }

  // create question in db
  try {
    const question = await Question.create({
      question_title,
      question_image,
    });

    //push question in test

    const test = await Test.findByIdAndUpdate({_id:test_id},
        {$push : {questions:question._id}},{new:true}
        ).exec()

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Question Created Successfully",
      question,
      test
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};


//=====================================Create Option======================================================
const createOption = async (req, res) => {
    //get data
    const { option_title, question_id } = req.body;
    let option_image = "";
  
    // validation
    if (!option_title) {
      return res.status(401).json({
        success: "false",
        msg: "All Fields Required",
      });
    }
  
    // if image avalable then upload it on cloudnary
    if (req.file) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          req.file.path,
          {
            transformation: [{ quality: 90 }],
          }
        );
  
        option_image = cloudinaryResponse.secure_url;
  
        // Delete file from server after upload to cloudinary
        fs.unlink(req.file.path, (err) => {
          if (err) {
            return console.error("Error deleting file:", err);
          }
        });
      } catch (error) {
        return res.status(500).json({
          success: "false",
          msg: "Error in uploading Image",
          error: error.message,
        });
      }
    }
  
    // create option in db
    try {
      const option = await Option.create({
        option_title,
        option_image,
      });

      //push this in question's options
      const question = await Question.findByIdAndUpdate({_id:question_id},
        {$push : {options:option._id}},{new:true}
        ).exec()
  
      // return response
      return res.status(200).json({
        success: "true",
        msg: "option Created Successfully",
        option,
        question
      });
    } catch (error) {
      return res.status(500).json({
        success: "false",
        msg: "Something Went Wrong",
        error: error.message,
      });
    }
  };


//==============================================Create Answer=============================================
  const createAnswer = async (req, res) => {
    //get data
    const { answer_title, question_id } = req.body;
    let answer_image = "";
  
    // validation
    if (!answer_title || !question_id) {
      return res.status(401).json({
        success: "false",
        msg: "All Fields Required",
      });
    }
  
    // if image avalable then upload it on cloudnary
    if (req.file) {
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          req.file.path,
          {
            transformation: [{ quality: 90 }],
          }
        );
  
        answer_image = cloudinaryResponse.secure_url;
  
        // Delete file from server after upload to cloudinary
        fs.unlink(req.file.path, (err) => {
          if (err) {
            return console.error("Error deleting file:", err);
          }
        });
      } catch (error) {
        return res.status(500).json({
          success: "false",
          msg: "Error in uploading Image",
          error: error.message,
        });
      }
    }
  
    // create answer in db
    try {
      const answer = await Answer.create({
        answer_title,
        answer_image,
      });

      //push this in question's answers
      const question = await Question.findByIdAndUpdate({_id:question_id},
        {$set : {answer:answer._id}},{new:true}
        ).exec()
  
      // return response
      return res.status(200).json({
        success: "true",
        msg: "answer Created Successfully",
        answer,
        question
      });
    } catch (error) {
      return res.status(500).json({
        success: "false",
        msg: "Something Went Wrong",
        error: error.message,
      });
    }
  };  

export {createQuestion, createOption, createAnswer };
