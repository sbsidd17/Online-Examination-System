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

  const test = await Test.findById({ _id: test_id });
  if (!test) {
    return res.status(400).json({
      success: false,
      msg: "Test Not Found With This Test Id",
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

    const updatedTest = await Test.findByIdAndUpdate(
      { _id: test_id },
      { $push: { questions: question._id } },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Question Created Successfully",
      question,
      updatedTest,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//====================================Edit Question====================================================
const editQuestion = async (req, res) => {
  //get data
  let { question_title, question_id, question_image } = req.body;

  // validation

  const question = await Question.findById({ _id: question_id });
  if (!question) {
    return res.status(401).json({
      success: "false",
      msg: "No question found with this Id",
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

  // update question in db
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      { _id: question_id },
      {
        question_title,
        question_image,
      },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Question Updated Successfully",
      updatedQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//====================================Delete Question====================================================
const deleteQuestion = async (req, res) => {
  const { test_id, question_id } = req.body;

  try {
    // validation
    const question = await Question.findById({ _id: question_id });
    if (!question) {
      return res.status(401).json({
        success: "false",
        msg: "No question found with this Id",
      });
    }

    // find all options and answer and delete them
    const allOptions = question.options;
    for (const optionId of allOptions) {
      // delete All Options
      if (optionId) {
        await Option.findByIdAndDelete({ _id: optionId });
      }
    }
    const answerId = question.answer;
    // delete all answer
    if (answerId) {
      await Answer.findByIdAndDelete({ _id: answerId });
    }

    // Now delete this question from test questions array
    const updatedTest = await Test.findByIdAndUpdate(
      { _id: test_id },
      {
        $pull: { questions: question_id },
      },
      {
        new: true,
      }
    ).exec();

    // finally delete the question
    await Question.findByIdAndDelete({ _id: question_id });

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Question Deleted Successfully",
      updatedTest,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//=======================================Get Question Data===============================================
const getQuestionData = async (req, res) => {
  const { id } = req.params;
  try {
    const questionData = await Question.findById({ _id: id })
    .populate(["options", "answer"])
    ;
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got Data Successfully",
      questionData,
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

  const question = Question.findById({ _id: question_id });
  if (!question) {
    return res.status(400).json({
      success: false,
      msg: "No Question Found with this id",
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
    const updatedQuestion = await Question.findByIdAndUpdate(
      { _id: question_id },
      { $push: { options: option._id } },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "option Created Successfully",
      option,
      updatedQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//====================================Edit Option====================================================
const editOption = async (req, res) => {
  //get data
  const { option_title, option_id, option_image } = req.body;

  // validation
  const option = await Option.findById({ _id: option_id });
  if (!option) {
    return res.status(401).json({
      success: "false",
      msg: "Option not found with this Id",
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

  // update option in db
  try {
    const updatedOption = await Option.findByIdAndUpdate(
      { _id: option_id },
      {
        option_title,
        option_image,
      },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "option Updated Successfully",
      updatedOption,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//====================================Delete Option====================================================
const deleteOption = async (req, res) => {
  const { option_id, question_id } = req.body;
  try {
    const question = await Question.findById({ _id: question_id });
    if (!question) {
      return res.status(400).json({
        success: false,
        msg: "No Question Found with this Id",
      });
    }
    // delete option from question's options array
    const updatedQuestion = await Question.findByIdAndUpdate(
      { _id: question_id },
      {
        $pull: { questions: option_id },
      },
      {
        new: true,
      }
    ).exec();

    //now delete option
    await Option.findByIdAndDelete({ _id: option_id });
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Option Deleted Successfully",
      updatedQuestion,
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
    const question = await Question.findByIdAndUpdate(
      { _id: question_id },
      { $set: { answer: answer._id } },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "answer Created Successfully",
      answer,
      question,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//====================================Edit Answer====================================================
const editAnswer = async (req, res) => {
  //get data
  const { answer_title, answer_id, answer_image } = req.body;

  // validation
  const answer = await Answer.findById({ _id: answer_id });
  if (!answer) {
    return res.status(401).json({
      success: "false",
      msg: "Answer not found with this Id",
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

  // update answer in db
  try {
    const updatedanswer = await Answer.findByIdAndUpdate(
      { _id: answer_id },
      {
        answer_title,
        answer_image,
      },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Answer Updated Successfully",
      updatedanswer,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};
//====================================Delete Answer====================================================
const deleteAnswer = async (req, res) => {
  const { answer_id, question_id } = req.body;
  try {
    const question = await Question.findById({ _id: question_id });
    if (!question) {
      return res.status(400).json({
        success: false,
        msg: "No Question Found with this Id",
      });
    }
    // delete answer from question
    const updatedQuestion = await Question.findByIdAndUpdate(
      { _id: question_id },
      {
        $unset: { answer: 1 },
      },
      {
        new: true,
      }
    ).exec();
    await Answer.findByIdAndDelete({ _id: answer_id });
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Answer Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};
export {
  createQuestion,
  editQuestion,
  deleteQuestion,
  getQuestionData,
  createOption,
  editOption,
  deleteOption,
  createAnswer,
  editAnswer,
  deleteAnswer,
};
