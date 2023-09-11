import Answer from "../models/answer.model.js";
import Exam from "../models/exam.model.js";
import Option from "../models/option.model.js";
import Question from "../models/question.model.js";
import Test from "../models/test.model.js";

//=============================================Create Test ==============================================
const createTest = async (req, res) => {
  // get data from body
  const { test_name, total_questions, total_marks, total_time, exam_id } =
    req.body;

  // validation
  if (!test_name || !total_questions || !total_marks || !total_time) {
    return res.status(401).json({
      success: "false",
      msg: "All Fields Required",
    });
  }

  try {
    const exam = await Exam.findById({ _id: exam_id });
    if (!exam) {
      return res.status(400).json({
        success: false,
        msg: "Exam Not Found With This Exam Id",
      });
    }

    //create test entry in db
    const test = await Test.create({
      test_name,
      total_questions,
      total_marks,
      total_time,
      questions: [],
    });

    // push test in exam
    const updatedExam = await Exam.findByIdAndUpdate(
      { _id: exam_id },
      { $push: { all_tests: test._id } },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Test Created Successfully",
      test,
      updatedExam,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//==============================================Edit Test==================================================
const editTest = async (req, res) => {
  // get data from body
  const { test_name, total_questions, total_marks, total_time, test_id } =
    req.body;

  console.log(test_id);

  // check test is avalable or not
  const test = await Test.findById({ _id: test_id });
  if (!test) {
    return res.status(401).json({
      success: "false",
      msg: "Test Not Found With This Id",
    });
  }

  try {
    //create test entry in db
    const updatedTest = await Test.findByIdAndUpdate(
      { _id: test_id },
      {
        $set: {
          test_name,
          total_questions,
          total_marks,
          total_time,
        },
      },
      {
        new: true,
      }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Test Updated Successfully",
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

//===============================================Show All Test================================================
const showAllTests = async (req, res) => {
  try {
    const allTests = await Test.find({}).select("-questions");
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got All Tests Successfully",
      allTests,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

//=================================================Delete Test============================================
const deleteTest = async (req, res) => {
  const { test_id, exam_id } = req.body;

  try {
    //Find test
    const test = await Test.findById({ _id: test_id });
    if (!test) {
      return res.status(401).json({
        success: "false",
        msg: "Test not found with this Id",
      });
    }

    // find all questions answer and options and delete them
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
        // delete all answer
        if (answerId) {
          await Answer.findByIdAndDelete({ _id: answerId });
        }
      }

      // delete all questions
      await Question.findByIdAndDelete({ _id: questionId });
    }

    // remove test id from exam
    await Exam.findByIdAndUpdate(
      { _id: exam_id },
      { $pull: { all_tests: test_id } }
    );
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const getTestData = async (req, res) => {
  const { testId } = req.params;
  try {
    const testData = await Test.findById({ _id: testId })
    .populate({
      path: "questions",
      populate:{
        path: "options answer"
      }
    })
    ;
    // return response
    return res.status(200).json({
      success: "true",
      msg: "Got Data Successfully",
      testData,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};
export { createTest, editTest, showAllTests, deleteTest, getTestData };
