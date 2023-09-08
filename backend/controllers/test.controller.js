import Exam from "../models/exam.model.js";
import Test from "../models/test.model.js";

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
    //create test entry in db
    const test = await Test.create({
      test_name,
      total_questions,
      total_marks,
      total_time,
      questions: [],
    });

    // push test in exam
    const exam = await Exam.findByIdAndUpdate(
      { _id: exam_id },
      { $push: { exam_content: test._id } },
      { new: true }
    ).exec();

    // return response
    return res.status(200).json({
      success: "true",
      msg: "Test Created Successfully",
      test,
      exam
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
    createTest
}
